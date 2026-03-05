import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Persistent rate limiting via Supabase DB
async function checkRateLimit(req: Request, functionName: string, maxRequests: number, windowMinutes: number): Promise<boolean> {
  const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   req.headers.get('cf-connecting-ip') ||
                   req.headers.get('x-real-ip') || 'unknown';
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_function_name: functionName,
      p_client_ip: clientIP,
      p_max_requests: maxRequests,
      p_window_minutes: windowMinutes,
    });
    if (error) {
      console.error('Rate limit check error:', error.message);
      return true;
    }
    return data === true;
  } catch (e) {
    console.error('Rate limit exception:', e);
    return true;
  }
}

// Strip HTML tags and dangerous characters
function sanitize(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // strip control chars
    .trim()
    .slice(0, maxLen);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Persistent rate limit: 3 requests per 30 minutes
  const allowed = await checkRateLimit(req, 'submit-review', 3, 30);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many reviews. Please try again later.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const raw = await req.json();

    // Honeypot check - if filled, it's a bot
    if (raw.website) {
      // Silently accept but don't insert
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const name = sanitize(raw.name, 100);
    const text = sanitize(raw.text, 1000);
    const rating = typeof raw.rating === 'number' ? Math.floor(raw.rating) : 0;

    // Validate inputs
    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Name must be at least 2 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!text || text.length < 10) {
      return new Response(
        JSON.stringify({ error: 'Review must be at least 10 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Rating must be between 1 and 5' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert using service role (bypasses RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error } = await supabase.from('reviews').insert({
      name,
      rating,
      text,
    });

    if (error) {
      console.error('DB insert error:', error.message);
      return new Response(
        JSON.stringify({ error: 'Failed to submit review' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});