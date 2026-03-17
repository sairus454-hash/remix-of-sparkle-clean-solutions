import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Persistent rate limiting via Supabase DB
async function checkRateLimit(req: Request, functionName: string, maxRequests: number, windowMinutes: number): Promise<boolean> {
  const clientIP = req.headers.get('cf-connecting-ip') ||
                   req.headers.get('x-real-ip') ||
                   req.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() ||
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

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB base64 string length
const MAX_CAPTION_LENGTH = 1000;
const MAX_FILENAME_LENGTH = 100;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Persistent rate limit: 3 requests per 10 minutes
  const allowed = await checkRateLimit(req, 'send-telegram-photo', 3, 10);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again in 10 minutes.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram credentials');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const raw = await req.json();
    const imageBase64 = typeof raw.imageBase64 === 'string' ? raw.imageBase64 : '';
    const fileName = typeof raw.fileName === 'string' ? raw.fileName.slice(0, MAX_FILENAME_LENGTH) : 'photo.jpg';
    const caption = typeof raw.caption === 'string' ? raw.caption.slice(0, MAX_CAPTION_LENGTH) : '';

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'No image provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (imageBase64.length > MAX_IMAGE_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Image too large. Maximum 5MB.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Decode base64 to binary
    const binaryString = atob(imageBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const formData = new FormData();
    formData.append('chat_id', TELEGRAM_CHAT_ID);
    formData.append('photo', new Blob([bytes], { type: 'image/jpeg' }), fileName);
    if (caption) {
      formData.append('caption', caption);
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      body: formData,
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramResult);
      return new Response(
        JSON.stringify({ error: 'Failed to send photo' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});