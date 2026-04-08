import { NextRequest, NextResponse } from 'next/server';

const BOT_AGENTS = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|whatsapp|telegrambot|applebot|duckduckbot|semrushbot|ahrefsbot|mj12bot|petalbot|saitreport|screaming|sitebulb|seranking|serpstat/i;

const PRERENDER_URL = 'https://iycukvmyvphufsdhlzmj.supabase.co/functions/v1/seo-prerender';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;

  // Skip static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|mp4|webp|json|xml|txt)$/)
  ) {
    return NextResponse.next();
  }

  // Only proxy bot traffic
  if (BOT_AGENTS.test(userAgent)) {
    const prerenderUrl = new URL(PRERENDER_URL);
    prerenderUrl.searchParams.set('path', pathname);

    return NextResponse.rewrite(prerenderUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
