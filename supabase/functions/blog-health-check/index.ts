import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = "https://masterclean1885.com";
const LANG_PREFIXES = ["", "/ru", "/en", "/uk"];
const BLOG_IDS = Array.from({ length: 32 }, (_, i) => i + 1);
const CONCURRENCY = 8;
const BOT_UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

interface CheckResult {
  url: string;
  status: number;
  ok: boolean;
  error?: string;
}

function buildUrls(): string[] {
  const urls: string[] = [];
  for (const prefix of LANG_PREFIXES) {
    urls.push(`${BASE_URL}${prefix}/blog`);
    for (const id of BLOG_IDS) urls.push(`${BASE_URL}${prefix}/blog/${id}`);
  }
  return urls;
}

async function checkUrl(url: string): Promise<CheckResult> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      method: "GET",
      redirect: "manual",
      headers: { "User-Agent": BOT_UA, "Accept": "text/html" },
      signal: controller.signal,
    });
    clearTimeout(timer);
    // Drain the body so the connection can be reused/closed.
    await res.arrayBuffer().catch(() => undefined);
    return { url, status: res.status, ok: res.status === 200 };
  } catch (e) {
    return { url, status: 0, ok: false, error: e instanceof Error ? e.message : "fetch failed" };
  }
}

async function runChecks(urls: string[]): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  let cursor = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, urls.length) }, async () => {
    while (cursor < urls.length) {
      const index = cursor++;
      results.push(await checkUrl(urls[index]));
    }
  });
  await Promise.all(workers);
  return results;
}

function buildReport(results: CheckResult[]): string {
  const failed = results.filter((r) => !r.ok);
  const stamp = new Date().toISOString().replace("T", " ").slice(0, 16);
  if (failed.length === 0) {
    return `✅ Blog health check (${stamp} UTC)\nПроверено URL: ${results.length}\nВсе страницы отдают 200.`;
  }
  const lines = failed
    .slice(0, 40)
    .map((r) => `• ${r.status || "ERR"} — ${r.url.replace(BASE_URL, "")}${r.error ? ` (${r.error})` : ""}`);
  const more = failed.length > 40 ? `\n…и ещё ${failed.length - 40} URL` : "";
  return `⚠️ Blog health check (${stamp} UTC)\nПроверено: ${results.length}, с ошибками: ${failed.length}\n\n${lines.join("\n")}${more}`;
}

async function sendTelegram(text: string): Promise<boolean> {
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");
  if (!token || !chatId) {
    console.error("Telegram credentials missing");
    return false;
  }
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) {
    console.error(`Telegram sendMessage failed [${res.status}]: ${await res.text()}`);
    return false;
  }
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const notifyParam = url.searchParams.get("notify");
    // Default: notify only when something is broken.
    const notifyMode = notifyParam === "always" ? "always" : notifyParam === "never" ? "never" : "on-failure";

    const results = await runChecks(buildUrls());
    results.sort((a, b) => a.url.localeCompare(b.url));
    const failed = results.filter((r) => !r.ok);
    const report = buildReport(results);

    let notified = false;
    if (notifyMode === "always" || (notifyMode === "on-failure" && failed.length > 0)) {
      notified = await sendTelegram(report);
    }

    return new Response(
      JSON.stringify({
        checked: results.length,
        failedCount: failed.length,
        failed,
        notified,
        report,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("blog-health-check error:", e);
    return new Response(JSON.stringify({ error: "Health check failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
