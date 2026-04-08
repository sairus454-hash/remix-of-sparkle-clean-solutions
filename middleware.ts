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

    const response = await fetch(prerenderUrl.toString());
    return new Response(response.body, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') || 'text/html',
        'cache-control': 'public, max-age=3600',
      },
    });
  }
}

export const config = {
  matcher: ['/((?!_vercel|assets|favicon.ico).*)'],
};
