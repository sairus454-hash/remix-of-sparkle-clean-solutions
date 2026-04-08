const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = 'https://masterclean1885.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const PHONE = '+48 575 211 401';

// Bot user-agent patterns
const BOT_AGENTS = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|whatsapp|telegrambot|applebot|duckduckbot|semrushbot|ahrefsbot|mj12bot|petalbot/i;

// Page metadata registry
interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const staticPages: Record<string, PageMeta> = {
  '/': {
    title: 'MasterClean — Profesjonalne pranie tapicerki i sprzątanie',
    description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i wnętrz samochodowych. Ozonowanie, sprzątanie, mycie okien. Pracujemy 24/7. Zadzwoń: +48 575 211 401',
    keywords: 'pranie tapicerki, czyszczenie dywanów, czyszczenie materacy, pranie kanap, ozonowanie, sprzątanie, mycie okien, Wrocław',
    image: `${SITE_URL}/og-image.png`,
  },
  '/about': {
    title: 'O nas — MasterClean | Profesjonalny zespół',
    description: 'Poznaj zespół MasterClean. Profesjonalne usługi czyszczenia tapicerki, dywanów i materacy. Doświadczenie, nowoczesny sprzęt Kärcher, gwarancja jakości.',
    keywords: 'o nas MasterClean, zespół, doświadczenie, profesjonalne czyszczenie',
    image: `${SITE_URL}/og-about.png`,
  },
  '/services': {
    title: 'Usługi czyszczenia — MasterClean',
    description: 'Pełna lista usług: pranie tapicerki, czyszczenie dywanów, materacy, ozonowanie, sprzątanie, mycie okien, złota rączka. Cennik online.',
    keywords: 'usługi czyszczenia, pranie tapicerki, czyszczenie dywanów, ozonowanie, sprzątanie',
    image: `${SITE_URL}/og-services.png`,
  },
  '/prices': {
    title: 'Cennik usług czyszczenia — MasterClean',
    description: 'Aktualny cennik prania tapicerki, czyszczenia dywanów, materacy, ozonowania i sprzątania. Kalkulator kosztów online. Dojazd gratis od 180 PLN.',
    keywords: 'cennik prania tapicerki, ile kosztuje czyszczenie dywanu, cena ozonowania',
    image: `${SITE_URL}/og-prices.png`,
  },
  '/equipment': {
    title: 'Profesjonalny sprzęt — MasterClean',
    description: 'Używamy profesjonalnego sprzętu Kärcher Puzzi i SantoEmma. Ekstrakcyjne pranie tapicerki z najwyższą skutecznością.',
    keywords: 'sprzęt Kärcher, SantoEmma, ekstrakcja, profesjonalne czyszczenie',
    image: `${SITE_URL}/og-equipment.png`,
  },
  '/impregnation': {
    title: 'Impregnacja tapicerki — MasterClean',
    description: 'Profesjonalna impregnacja tapicerki meblowej i samochodowej. Ochrona przed plamami, wodą i zabrudzeniami. Efekt hydrofobowy.',
    keywords: 'impregnacja tapicerki, ochrona mebli, hydrofobowa powłoka',
    image: `${SITE_URL}/og-impregnation.png`,
  },
  '/auto': {
    title: 'Czyszczenie wnętrza samochodu — MasterClean',
    description: 'Profesjonalne czyszczenie tapicerki samochodowej, pranie foteli, ozonowanie auta. Kompleksowe czyszczenie wnętrza samochodu.',
    keywords: 'czyszczenie tapicerki samochodowej, pranie foteli samochodowych, ozonowanie auta',
    image: `${SITE_URL}/og-auto.png`,
  },
  '/ozone': {
    title: 'Ozonowanie pomieszczeń i samochodów — MasterClean',
    description: 'Profesjonalne ozonowanie mieszkań, biur i samochodów. Usuwanie nieprzyjemnych zapachów, bakterii, grzybów i alergenów.',
    keywords: 'ozonowanie mieszkania, ozonowanie samochodu, usuwanie zapachów',
    image: `${SITE_URL}/og-ozone.png`,
  },
  '/windows': {
    title: 'Mycie okien — MasterClean',
    description: 'Profesjonalne mycie okien w domach, mieszkaniach i biurach. Bezsmugowe czyszczenie szyb, ram i parapetów.',
    keywords: 'mycie okien, czyszczenie szyb, mycie okien Wrocław',
    image: `${SITE_URL}/og-windows.png`,
  },
  '/cleaning': {
    title: 'Sprzątanie mieszkań i biur — MasterClean',
    description: 'Profesjonalne sprzątanie mieszkań, domów i biur we Wrocławiu. Regularne i jednorazowe usługi porządkowe. Ekologiczne środki.',
    keywords: 'sprzątanie mieszkań, sprzątanie biur, sprzątanie Wrocław',
    image: `${SITE_URL}/og-cleaning.png`,
  },
  '/handyman': {
    title: 'Złota rączka — MasterClean',
    description: 'Usługi złotej rączki we Wrocławiu: montaż mebli, naprawy hydrauliczne, elektryczne, drobne prace remontowe.',
    keywords: 'złota rączka Wrocław, montaż mebli, naprawy domowe',
    image: `${SITE_URL}/og-handyman.png`,
  },
  '/reviews': {
    title: 'Opinie klientów — MasterClean',
    description: 'Sprawdź opinie klientów o usługach MasterClean. Pranie tapicerki, czyszczenie dywanów, ozonowanie — 5-gwiazdkowe recenzje.',
    keywords: 'opinie MasterClean, recenzje, pranie tapicerki opinie',
    image: `${SITE_URL}/og-reviews.png`,
  },
  '/contacts': {
    title: 'Kontakt — MasterClean',
    description: 'Skontaktuj się z MasterClean. Telefon: +48 575 211 401. Pracujemy 24/7. Szybka wycena online.',
    keywords: 'kontakt MasterClean, telefon, adres, formularz kontaktowy',
    image: `${SITE_URL}/og-contacts.png`,
  },
  '/blog': {
    title: 'Blog o czyszczeniu — MasterClean',
    description: 'Porady dotyczące czyszczenia tapicerki, pielęgnacji mebli, usuwania plam. Profesjonalne wskazówki od ekspertów MasterClean.',
    keywords: 'blog czyszczenie, porady pranie tapicerki, usuwanie plam',
    image: `${SITE_URL}/og-blog.png`,
  },
  '/sitemap': {
    title: 'Mapa strony — MasterClean',
    description: 'Pełna mapa strony MasterClean. Znajdź wszystkie usługi, cenniki i informacje.',
  },
  '/privacy-policy': {
    title: 'Polityka prywatności — MasterClean',
    description: 'Polityka prywatności MasterClean. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
  },
  '/terms': {
    title: 'Regulamin — MasterClean',
    description: 'Regulamin świadczenia usług MasterClean. Warunki zamówienia, płatności i reklamacji.',
  },
  '/cookies': {
    title: 'Polityka cookies — MasterClean',
    description: 'Informacje o plikach cookies używanych na stronie MasterClean.',
  },
};

// City pages metadata
const cityPages: Record<string, PageMeta> = {
  wroclaw: {
    title: 'Czyszczenie tapicerki i sprzątanie Wrocław — MasterClean',
    description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy, ozonowanie i sprzątanie we Wrocławiu. Dojazd gratis. Cennik online.',
    keywords: 'czyszczenie tapicerki Wrocław, pranie dywanów Wrocław, sprzątanie Wrocław, ozonowanie Wrocław',
    image: `${SITE_URL}/og-wroclaw.png`,
  },
  opole: {
    title: 'Czyszczenie tapicerki i sprzątanie Opole — MasterClean',
    description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Opolu. Szybki dojazd z Wrocławia.',
    keywords: 'czyszczenie tapicerki Opole, pranie dywanów Opole, sprzątanie Opole, ozonowanie Opole',
    image: `${SITE_URL}/og-opole.png`,
  },
  legnica: {
    title: 'Czyszczenie tapicerki i sprzątanie Legnica — MasterClean',
    description: 'Pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Legnicy. Profesjonalny sprzęt Kärcher.',
    keywords: 'czyszczenie tapicerki Legnica, pranie dywanów Legnica, sprzątanie Legnica',
    image: `${SITE_URL}/og-legnica.png`,
  },
  lubin: {
    title: 'Czyszczenie tapicerki Lubin — MasterClean',
    description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Lubinie. Sprawdź cennik online.',
    keywords: 'czyszczenie tapicerki Lubin, pranie dywanów Lubin, ozonowanie Lubin',
    image: `${SITE_URL}/og-lubin.png`,
  },
  olawa: {
    title: 'Czyszczenie tapicerki Oława — MasterClean',
    description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Oławie. Bliskość Wrocławia — szybki dojazd.',
    keywords: 'czyszczenie tapicerki Oława, pranie dywanów Oława',
    image: `${SITE_URL}/og-olawa.png`,
  },
  kalisz: {
    title: 'Czyszczenie tapicerki Kalisz — MasterClean',
    description: 'Profesjonalne pranie tapicerki i czyszczenie dywanów w Kaliszu. Dojazd z Wrocławia.',
    keywords: 'czyszczenie tapicerki Kalisz, pranie dywanów Kalisz',
    image: `${SITE_URL}/og-kalisz.png`,
  },
  leszno: {
    title: 'Czyszczenie tapicerki Leszno — MasterClean',
    description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Lesznie. Sprawdź naszą ofertę.',
    keywords: 'czyszczenie tapicerki Leszno, pranie dywanów Leszno',
    image: `${SITE_URL}/og-leszno.png`,
  },
  swidnica: {
    title: 'Czyszczenie tapicerki Świdnica — MasterClean',
    description: 'Profesjonalne pranie tapicerki i czyszczenie dywanów w Świdnicy. Nowoczesny sprzęt Kärcher.',
    keywords: 'czyszczenie tapicerki Świdnica, pranie dywanów Świdnica',
    image: `${SITE_URL}/og-swidnica.png`,
  },
  walbrzych: {
    title: 'Czyszczenie tapicerki Wałbrzych — MasterClean',
    description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Wałbrzychu. Profesjonalna obsługa.',
    keywords: 'czyszczenie tapicerki Wałbrzych, pranie dywanów Wałbrzych',
    image: `${SITE_URL}/og-walbrzych.png`,
  },
  'ostrow-wielkopolski': {
    title: 'Czyszczenie tapicerki Ostrów Wielkopolski — MasterClean',
    description: 'Profesjonalne pranie tapicerki i czyszczenie dywanów w Ostrowie Wielkopolskim.',
    keywords: 'czyszczenie tapicerki Ostrów Wielkopolski, pranie dywanów Ostrów',
    image: `${SITE_URL}/og-ostrow.png`,
  },
  'jelenia-gora': {
    title: 'Czyszczenie tapicerki Jelenia Góra — MasterClean',
    description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Jeleniej Górze. Dojazd z Wrocławia.',
    keywords: 'czyszczenie tapicerki Jelenia Góra, pranie dywanów Jelenia Góra',
    image: `${SITE_URL}/og-jelenia-gora.png`,
  },
  brzeg: {
    title: 'Czyszczenie tapicerki Brzeg — MasterClean',
    description: 'Profesjonalne pranie tapicerki i czyszczenie dywanów w Brzegu. Szybki dojazd z Wrocławia.',
    keywords: 'czyszczenie tapicerki Brzeg, pranie dywanów Brzeg',
    image: `${SITE_URL}/og-brzeg.png`,
  },
};

function getPageMeta(path: string): PageMeta | null {
  // Static pages
  if (staticPages[path]) return staticPages[path];

  // City pages
  const cityMatch = path.match(/^\/city\/([a-z-]+)$/);
  if (cityMatch && cityPages[cityMatch[1]]) return cityPages[cityMatch[1]];

  return null;
}

function buildHtml(path: string, meta: PageMeta): string {
  const canonicalUrl = `${SITE_URL}${path}`;
  const image = meta.image || DEFAULT_IMAGE;
  const type = meta.type || 'website';

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  ${meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}">` : ''}
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${image}">
  <meta property="og:locale" content="pl_PL">
  <meta property="og:locale:alternate" content="ru_RU">
  <meta property="og:locale:alternate" content="en_US">
  <meta property="og:locale:alternate" content="uk_UA">
  <meta property="og:site_name" content="MasterClean">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="${image}">

  <!-- Hreflang -->
  <link rel="alternate" hreflang="pl" href="${canonicalUrl}?lang=pl">
  <link rel="alternate" hreflang="ru" href="${canonicalUrl}?lang=ru">
  <link rel="alternate" hreflang="en" href="${canonicalUrl}?lang=en">
  <link rel="alternate" hreflang="uk" href="${canonicalUrl}?lang=uk">
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}">

  <!-- Structured Data -->
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MasterClean',
    description: meta.description,
    url: SITE_URL,
    telephone: PHONE,
    image: DEFAULT_IMAGE,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PL',
      addressRegion: 'dolnośląskie',
      addressLocality: 'Wrocław',
    },
    areaServed: [
      { '@type': 'City', name: 'Wrocław' },
      { '@type': 'City', name: 'Opole' },
      { '@type': 'City', name: 'Legnica' },
      { '@type': 'City', name: 'Lubin' },
      { '@type': 'City', name: 'Oława' },
      { '@type': 'City', name: 'Kalisz' },
      { '@type': 'City', name: 'Leszno' },
      { '@type': 'City', name: 'Świdnica' },
      { '@type': 'City', name: 'Wałbrzych' },
      { '@type': 'City', name: 'Ostrów Wielkopolski' },
      { '@type': 'City', name: 'Jelenia Góra' },
      { '@type': 'City', name: 'Brzeg' },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  })}
  </script>

  <!-- Redirect real users to SPA -->
  <noscript>
    <meta http-equiv="refresh" content="0;url=${canonicalUrl}">
  </noscript>
</head>
<body>
  <h1>${escapeHtml(meta.title)}</h1>
  <p>${escapeHtml(meta.description)}</p>
  <p>Telefon: <a href="tel:${PHONE}">${PHONE}</a></p>
  <p><a href="${SITE_URL}">MasterClean — Strona główna</a></p>
  <nav>
    <a href="${SITE_URL}/services">Usługi</a> |
    <a href="${SITE_URL}/prices">Cennik</a> |
    <a href="${SITE_URL}/reviews">Opinie</a> |
    <a href="${SITE_URL}/contacts">Kontakt</a> |
    <a href="${SITE_URL}/blog">Blog</a>
  </nav>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isBot(userAgent: string): boolean {
  return BOT_AGENTS.test(userAgent);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const userAgent = req.headers.get('user-agent') || '';
    const forcePrerender = url.searchParams.get('_prerender') === '1';

    // Only serve to bots or when explicitly requested
    if (!isBot(userAgent) && !forcePrerender) {
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': `${SITE_URL}${path}`,
        },
      });
    }

    const meta = getPageMeta(path);
    if (!meta) {
      return new Response('Not found', {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
      });
    }

    const html = buildHtml(path, meta);

    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Robots-Tag': 'index, follow',
      },
    });
  } catch (error) {
    console.error('Prerender error:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  }
});