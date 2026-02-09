import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = 'https://shine-clean-connect.lovable.app';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  jsonLd,
}: SEOProps) => {
  const fullTitle = title.includes('MasterClean') ? title : `${title} | MasterClean`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

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

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:locale" content="ru_RU" />
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
