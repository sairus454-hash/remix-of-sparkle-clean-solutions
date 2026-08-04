import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageContext';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
}

const SITE_URL = 'https://masterclean1885.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const hreflangMap: Record<string, string> = {
  ru: 'ru',
  en: 'en',
  pl: 'pl',
  uk: 'uk',
};

const ogLocaleMap: Record<string, string> = {
  ru: 'ru_RU',
  en: 'en_US',
  pl: 'pl_PL',
  uk: 'uk_UA',
};

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  jsonLd,
  breadcrumbs,
}: SEOProps) => {
  const { language } = useLanguage();
  const fullTitle = title.includes('MasterClean') ? title : `${title} | MasterClean`;

  // Each language now has its OWN canonical URL via path prefix:
  //   PL → /something      (default, no prefix)
  //   RU → /ru/something
  //   EN → /en/something
  //   UK → /uk/something
  // This lets Google index every language separately instead of treating
  // them as duplicates of one canonical (the previous behavior).
  // `canonical` prop is the LOGICAL path (no language prefix); we add the
  // prefix here based on the active language. If the prop already includes
  // a prefix (e.g. computed from window.location), strip it first.
  const rawPath = (canonical || '/').split('?')[0];
  const logicalPath = rawPath.replace(/^\/(ru|en|uk)(?=\/|$)/, '') || '/';
  const buildLangPath = (lang: string): string => {
    if (lang === 'pl') return logicalPath;
    return logicalPath === '/' ? `/${lang}` : `/${lang}${logicalPath}`;
  };
  const buildLangUrl = (lang: string): string => `${SITE_URL}${buildLangPath(lang)}`;
  const canonicalUrl = buildLangUrl(language);
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
  // x-default points to the PL (root) version per project convention
  const xDefaultUrl = buildLangUrl('pl');

  // Home label must match the visible breadcrumb trail (nav.home)
  const homeName =
    ({ pl: 'Główna', ru: 'Главная', uk: 'Головна', en: 'Home' } as Record<string, string>)[language] || 'Główna';

  const langSegment = language === 'pl' ? '' : `/${language}`;
  const homeUrl = `${SITE_URL}${langSegment}/`;

  const breadcrumbJsonLd = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
      ...breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${SITE_URL}${langSegment}${crumb.path.replace(/^\/(ru|en|uk)(?=\/|$)/, '')}`,
      })),
    ],
  } : null;

  const serviceCatalog: Record<string, { name: string; desc: string }[]> = {
    pl: [
      { name: 'Pranie tapicerki meblowej', desc: 'Głębokie pranie sof, foteli i narożników metodą ekstrakcyjną.' },
      { name: 'Czyszczenie dywanów i wykładzin', desc: 'Pranie dywanów i wykładzin z dojazdem lub w pralni.' },
      { name: 'Czyszczenie materacy', desc: 'Głębokie pranie materacy z usuwaniem roztoczy i plam.' },
      { name: 'Czyszczenie wnętrza samochodu', desc: 'Pranie tapicerki, sufitu, foteli, bagażnika i plastików.' },
      { name: 'Ozonowanie', desc: 'Usuwanie zapachów, wirusów i bakterii generatorem ozonu.' },
      { name: 'Sprzątanie mieszkań i domów', desc: 'Sprzątanie standardowe, generalne i po remoncie.' },
      { name: 'Mycie okien', desc: 'Profesjonalne mycie okien, ram i parapetów.' },
      { name: 'Złota rączka', desc: 'Drobne naprawy, montaż mebli i prace hydrauliczne.' },
    ],
    ru: [
      { name: 'Химчистка мягкой мебели', desc: 'Глубокая чистка диванов, кресел и угловых диванов экстракторным методом.' },
      { name: 'Чистка ковров и ковролина', desc: 'Химчистка ковров с выездом или в цеху.' },
      { name: 'Чистка матрасов', desc: 'Глубокая чистка матрасов с удалением клещей и пятен.' },
      { name: 'Химчистка салона автомобиля', desc: 'Чистка обивки, потолка, сидений, багажника и пластика.' },
      { name: 'Озонирование', desc: 'Удаление запахов, вирусов и бактерий генератором озона.' },
      { name: 'Уборка квартир и домов', desc: 'Стандартная, генеральная и уборка после ремонта.' },
      { name: 'Мытьё окон', desc: 'Профессиональное мытьё окон, рам и подоконников.' },
      { name: 'Мастер на час', desc: 'Мелкий ремонт, сборка мебели, сантехнические работы.' },
    ],
    en: [
      { name: 'Upholstery cleaning', desc: 'Deep extraction cleaning of sofas, armchairs and corner sofas.' },
      { name: 'Carpet and rug cleaning', desc: 'Carpet cleaning on-site or at our facility.' },
      { name: 'Mattress cleaning', desc: 'Deep mattress cleaning with removal of mites and stains.' },
      { name: 'Car interior cleaning', desc: 'Cleaning of upholstery, headliner, seats, trunk and plastics.' },
      { name: 'Ozone treatment', desc: 'Removal of odours, viruses and bacteria with an ozone generator.' },
      { name: 'Apartment and house cleaning', desc: 'Standard, deep and post-renovation cleaning.' },
      { name: 'Window cleaning', desc: 'Professional cleaning of windows, frames and sills.' },
      { name: 'Handyman services', desc: 'Small repairs, furniture assembly and plumbing.' },
    ],
    uk: [
      { name: 'Хімчистка меблів', desc: 'Глибока екстракторна чистка диванів, крісел і кутових диванів.' },
      { name: 'Чистка килимів і покриттів', desc: 'Хімчистка килимів з виїздом або в цеху.' },
      { name: 'Чистка матраців', desc: 'Глибока чистка матраців з видаленням кліщів і плям.' },
      { name: 'Хімчистка салону авто', desc: 'Чистка оббивки, стелі, сидінь, багажника й пластику.' },
      { name: 'Озонування', desc: 'Видалення запахів, вірусів і бактерій генератором озону.' },
      { name: 'Прибирання квартир і будинків', desc: 'Стандартне, генеральне та після ремонту.' },
      { name: 'Миття вікон', desc: 'Професійне миття вікон, рам і підвіконь.' },
      { name: 'Майстер на годину', desc: 'Дрібний ремонт, збирання меблів, сантехнічні роботи.' },
    ],
  };

  const services = serviceCatalog[language] || serviceCatalog.pl;
  const areaServedCities = [
    'Wrocław','Opole','Legnica','Lubin','Oława','Kalisz','Leszno','Świdnica',
    'Wałbrzych','Ostrów Wielkopolski','Jelenia Góra','Brzeg','Jelcz-Laskowice',
    'Strzegom','Sobótka','Kłodzko','Kiełczów','Dzierżoniów',
  ];

  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'MasterClean',
    description,
    url: canonicalUrl,
    telephone: '+48575211401',
    email: 'masterclean@email.com',
    image: DEFAULT_IMAGE,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.png`,
      width: 256,
      height: 256,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PL',
      addressRegion: 'dolnośląskie',
      addressLocality: 'Wrocław',
    },
    areaServed: areaServedCities.map((name) => ({ '@type': 'City', name })),
    sameAs: [
      'https://www.google.com/maps/place/MasterClean/@51.953761,19.1343692,6z',
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '187',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'MasterClean',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.desc,
          provider: { '@type': 'LocalBusiness', name: 'MasterClean' },
          areaServed: 'PL',
        },
      })),
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <html lang={hreflangMap[language] || 'pl'} />

      {/* Hreflang tags for multilingual SEO — each language has its own URL */}
      {Object.entries(hreflangMap).map(([lang, hreflang]) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={buildLangUrl(lang)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={ogLocaleMap[language] || 'pl_PL'} />
      {Object.entries(ogLocaleMap)
        .filter(([lang]) => lang !== language)
        .map(([, locale]) => (
          <meta key={locale} property="og:locale:alternate" content={locale} />
        ))}
      <meta property="og:site_name" content="MasterClean" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* JSON-LD */}
      {Array.isArray(jsonLd) ? (
        jsonLd.map((entry, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(entry)}
          </script>
        ))
      ) : (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd || defaultJsonLd)}
        </script>
      )}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
