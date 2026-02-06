import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  date?: string;
  time?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  paymentType?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

    console.log('Bot token exists:', !!TELEGRAM_BOT_TOKEN);
    console.log('Bot token length:', TELEGRAM_BOT_TOKEN?.length || 0);
    console.log('Chat ID:', TELEGRAM_CHAT_ID);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram credentials');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const formData: FormData = await req.json();

    // Validate required fields (name and phone only)
    if (!formData.name || !formData.phone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format payment type for display
    const paymentTypeLabel = formData.paymentType === 'cash' ? '💵 Наличные' : 
                             formData.paymentType === 'blik' ? '📱 BLIK' : '';

    // Format message for Telegram
    const message = `
🔔 *Новая заявка с сайта!*

👤 *Имя:* ${formData.name}
📞 *Телефон:* ${formData.phone}
${formData.email ? `📧 *Email:* ${formData.email}` : ''}
${formData.service ? `🛠 *Услуга:* ${formData.service}` : ''}
${formData.city ? `🏙 *Город:* ${formData.city}` : ''}
${formData.address ? `📍 *Адрес:* ${formData.address}` : ''}
${formData.postalCode ? `📮 *Почтовый код:* ${formData.postalCode}` : ''}
${formData.date ? `📅 *Дата:* ${formData.date}` : ''}
${formData.time ? `🕐 *Время:* ${formData.time}` : ''}
${paymentTypeLabel ? `💳 *Оплата:* ${paymentTypeLabel}` : ''}
${formData.message ? `💬 *Сообщение:* ${formData.message}` : ''}
    `.trim();

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    console.log('Sending to Telegram...');
    
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
        JSON.stringify({ error: 'Failed to send message', details: telegramResult }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Message sent successfully to Telegram');

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
