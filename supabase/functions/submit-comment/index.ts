import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function checkRateLimit(req: Request, functionName: string, maxRequests: number, windowMinutes: number): Promise<boolean> {
  const clientIP = req.headers.get('cf-connecting-ip') ||
                   req.headers.get('x-real-ip') ||
                   req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   'unknown';
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

function sanitize(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .trim()
    .slice(0, maxLen);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const allowed = await checkRateLimit(req, 'submit-comment', 5, 30);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many comments. Please try again later.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const raw = await req.json();

    // Honeypot check
    if (raw.website) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const article_id = typeof raw.article_id === 'number' ? Math.floor(raw.article_id) : 0;
    const name = sanitize(raw.name, 100);
    const text = sanitize(raw.text, 1000);

    if (article_id < 1) {
      return new Response(
        JSON.stringify({ error: 'Invalid article' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Name must be at least 2 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!text || text.length < 3) {
      return new Response(
        JSON.stringify({ error: 'Comment must be at least 3 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error } = await supabase.from('blog_comments').insert({
      article_id,
      name,
      text,
    });

    if (error) {
      console.error('DB insert error:', error.message);
      return new Response(
        JSON.stringify({ error: 'Failed to submit comment' }),
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
