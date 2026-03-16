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
  jsonLd?: Record<string, unknown>;
  breadcrumbs?: BreadcrumbItem[];
}

const SITE_URL = 'https://masterclean1885.pl';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

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
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const path = canonical || '/';

  const breadcrumbJsonLd = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'MasterClean', item: SITE_URL },
      ...breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    ],
  } : null;

  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MasterClean',
    description,
    url: SITE_URL,
    telephone: '+48575211401',
    email: 'masterclean@email.com',
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
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <html lang={hreflangMap[language] || 'pl'} />

      {/* Hreflang tags for multilingual SEO */}
      {Object.entries(hreflangMap).map(([lang, hreflang]) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={`${SITE_URL}${path}?lang=${lang}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
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
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
