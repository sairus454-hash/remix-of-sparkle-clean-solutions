import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/submit-review`;

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  "apikey": SUPABASE_ANON_KEY,
};

Deno.test("rejects request with missing captcha", async () => {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: "Test User", rating: 5, text: "Great service and quality!" }),
  });
  assertEquals(res.status, 400);
  const body = await res.json();
  assertEquals(body.error, "Invalid captcha");
});

Deno.test("rejects request with wrong captcha answer", async () => {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: "Test User", rating: 5, text: "Great service and quality!",
      captchaChallenge: "3+4", captchaAnswer: 99,
    }),
  });
  assertEquals(res.status, 400);
  const body = await res.json();
  assertEquals(body.error, "Incorrect captcha answer");
});

Deno.test("rejects request with invalid captcha format", async () => {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: "Test User", rating: 5, text: "Great service and quality!",
      captchaChallenge: "abc", captchaAnswer: 5,
    }),
  });
  assertEquals(res.status, 400);
  const body = await res.json();
  assertEquals(body.error, "Invalid captcha");
});

Deno.test("accepts request with correct captcha", async () => {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: "Test User", rating: 5, text: "Great service and quality!",
      captchaChallenge: "3+4", captchaAnswer: 7,
    }),
  });
  assertEquals(res.status, 200);
  const body = await res.json();
  assertEquals(body.success, true);
  // consumed
});

Deno.test("honeypot silently succeeds without insert", async () => {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: "Bot", rating: 5, text: "Spam message here!",
      website: "http://spam.com",
      captchaChallenge: "1+1", captchaAnswer: 2,
    }),
  });
  assertEquals(res.status, 200);
  const body = await res.json();
  assertEquals(body.success, true);
});
