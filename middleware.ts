const BOT_AGENTS = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|whatsapp|telegrambot|applebot|duckduckbot|semrushbot|ahrefsbot|mj12bot|petalbot|saitreport|screaming|sitebulb|seranking|serpstat/i;

const PRERENDER_URL = 'https://iycukvmyvphufsdhlzmj.supabase.co/functions/v1/seo-prerender';

export default async function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Skip static assets
  if (
    pathname.startsWith('/assets') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|mp4|webp|json|xml|txt)$/)
  ) {
    return;
  }

  // Only proxy bot traffic
  if (BOT_AGENTS.test(userAgent)) {
    const prerenderUrl = new URL(PRERENDER_URL);
    prerenderUrl.searchParams.set('path', pathname);
    // Forward language query param so prerender can build language-specific canonical/meta
    const lang = url.searchParams.get('lang');
    if (lang) prerenderUrl.searchParams.set('lang', lang);
    // Force prerender bypass — Vercel edge fetch may strip UA, which would
    // make the function think the request is from a human and 302-redirect
    // back to the site, creating an infinite loop and an empty HTML response.
    prerenderUrl.searchParams.set('_prerender', '1');

    const response = await fetch(prerenderUrl.toString(), {
      headers: {
        'user-agent': userAgent,
        'accept': 'text/html',
      },
      redirect: 'manual',
    });
    // Safety net: if the function still redirected, fall through to the SPA
    // shell instead of serving an empty 302 to Googlebot.
    if (response.status >= 300 && response.status < 400) {
      return;
    }
    return new Response(response.body, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') || 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600',
        'x-prerendered': '1',
      },
    });
  }
}

export const config = {
  matcher: ['/((?!_vercel|assets|favicon.ico).*)'],
};
