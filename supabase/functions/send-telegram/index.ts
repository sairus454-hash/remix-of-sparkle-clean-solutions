import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(req: Request): boolean {
  const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   req.headers.get('cf-connecting-ip') ||
                   req.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();

  // Cleanup old entries
  if (rateLimits.size > 500) {
    for (const [key, value] of rateLimits.entries()) {
      if (now > value.resetAt) rateLimits.delete(key);
    }
  }

  const record = rateLimits.get(clientIP);
  if (!record || now > record.resetAt) {
    rateLimits.set(clientIP, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

// Input validation limits
const MAX_NAME = 100;
const MAX_PHONE = 30;
const MAX_EMAIL = 255;
const MAX_SHORT = 200;
const MAX_MESSAGE = 2000;

function sanitize(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

interface FormData {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  date?: string;
  time?: string;
  city?: string;
  village?: string;
  address?: string;
  postalCode?: string;
  paymentType?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limit check
  if (!checkRateLimit(req)) {
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

    // Honeypot check - if filled, it's a bot
    if (raw.website) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate and sanitize inputs
    const formData: FormData = {
      name: sanitize(raw.name, MAX_NAME),
      phone: sanitize(raw.phone, MAX_PHONE),
      email: sanitize(raw.email, MAX_EMAIL),
      service: sanitize(raw.service, MAX_SHORT),
      message: sanitize(raw.message, MAX_MESSAGE),
      date: sanitize(raw.date, MAX_SHORT),
      time: sanitize(raw.time, MAX_SHORT),
      city: sanitize(raw.city, MAX_SHORT),
      village: sanitize(raw.village, MAX_SHORT),
      address: sanitize(raw.address, MAX_SHORT),
      postalCode: sanitize(raw.postalCode, 20),
      paymentType: sanitize(raw.paymentType, 20),
    };

    if (!formData.name || !formData.phone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paymentTypeLabel = formData.paymentType === 'cash' ? '💵 Наличные' : 
                             formData.paymentType === 'blik' ? '📱 BLIK' :
                             formData.paymentType === 'invoice' ? '🧾 Фактура' : '';

    const message = `
🔔 *Новая заявка с сайта!*

👤 *Имя:* ${formData.name}
📞 *Телефон:* ${formData.phone}
${formData.email ? `📧 *Email:* ${formData.email}` : ''}
${formData.service ? `🛠 *Услуга:* ${formData.service}` : ''}
${formData.city ? `🏙 *Город:* ${formData.city}` : ''}
${formData.village ? `🏘 *Село:* ${formData.village}` : ''}
${formData.address ? `📍 *Адрес:* ${formData.address}` : ''}
${formData.postalCode ? `📮 *Почтовый код:* ${formData.postalCode}` : ''}
${formData.date ? `📅 *Дата:* ${formData.date}` : ''}
${formData.time ? `🕐 *Время:* ${formData.time}` : ''}
${paymentTypeLabel ? `💳 *Оплата:* ${paymentTypeLabel}` : ''}
${formData.message ? `💬 *Сообщение:* ${formData.message}` : ''}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramResult);
      return new Response(
        JSON.stringify({ error: 'Failed to send message' }),
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
