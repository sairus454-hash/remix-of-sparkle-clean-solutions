import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = 'https://masterclean1885.lovable.app';
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
}: SEOProps) => {
  const { language } = useLanguage();
  const fullTitle = title.includes('MasterClean') ? title : `${title} | MasterClean`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const path = canonical || '/';

  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MasterClean',
    description,
    url: SITE_URL,
    telephone: '+48575211401',
    email: 'masterclean@email.com',
    image: DEFAULT_IMAGE,
    areaServed: ['Opole', 'Wrocław', 'Poznań', 'Zielona Góra'],
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
      <html lang={hreflangMap[language] || 'ru'} />

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
      <meta property="og:locale" content={ogLocaleMap[language] || 'ru_RU'} />
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
    </Helmet>
  );
};

export default SEO;
