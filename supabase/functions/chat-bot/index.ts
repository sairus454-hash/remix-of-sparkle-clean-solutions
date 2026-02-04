const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Ты — AI-консультант сайта клининговой компании MasterClean.

Твоя роль: поддержка клиентов и помощь с выбором услуг по уборке.

Услуги компании:
- Химчистка мягкой мебели (диваны, кресла, стулья)
- Химчистка матрасов
- Химчистка ковров и ковровых покрытий
- Химчистка автомобильных салонов
- Озонирование помещений и автомобилей
- Услуги мастера на час (мелкий ремонт)

Правила:
— Пиши на русском языке
— Тон: дружелюбный, уверенный, ненавязчивый
— Отвечай коротко и по делу (2-4 предложения максимум)
— Если вопрос про услугу — уточняй потребности клиента
— Если человек сомневается — предлагай подходящий вариант
— В конце ответа часто задавай один уточняющий вопрос
— Если вопрос сложный или клиент злится — предложи связаться с менеджером по телефону

ВАЖНО:
- Не выдумывай цены, сроки и гарантии
- Если точной информации нет — честно скажи об этом и предложи связаться с менеджером
- Для точных цен направляй в раздел "Цены" на сайте или к калькулятору услуг
- Телефон для связи: указан на странице контактов

Примеры ответов:
- "Отличный выбор! Химчистка дивана обычно занимает 2-3 часа. Какой у вас тип обивки — ткань или кожа?"
- "Понимаю ваши сомнения. Для точного расчёта рекомендую воспользоваться калькулятором на сайте. Могу помочь с чем-то ещё?"
- "Это хороший вопрос! Для точной информации лучше связаться с нашим менеджером. Хотите, подскажу контакты?"`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Chat bot error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process request";
    return new Response(
      JSON.stringify({
        error: errorMessage,
        message: "Извините, произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
