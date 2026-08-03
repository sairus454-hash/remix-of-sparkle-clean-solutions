import { useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import { useLanguage } from '@/i18n/LanguageContext';
import { stripLangPrefix } from '@/i18n/localizedPath';
import { getCityBySlug } from '@/data/cities';
import { blogArticles } from '@/data/blogArticles';

interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumb trail rendered on every page except the homepage.
 * The matching BreadcrumbList JSON-LD is emitted by <SEO breadcrumbs={...} />
 * on each page, so this component only handles the visual/semantic markup
 * (nav + ordered list) to keep a single structured-data entity per page.
 */
const Breadcrumbs = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  const logical = stripLangPrefix(location.pathname.split('?')[0]);
  const segments = logical.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const nav = t.nav as Record<string, string>;
  const staticLabels: Record<string, string> = {
    about: nav.about,
    services: nav.services,
    prices: nav.prices,
    equipment: nav.equipment,
    auto: nav.auto,
    ozone: nav.ozone,
    windows: nav.windows,
    cleaning: nav.cleaning,
    'floor-cleaning': nav.floorCleaning,
    handyman: nav.handyman,
    reviews: nav.reviews,
    contacts: nav.contacts,
    blog: nav.blog,
    impregnation: {
      pl: 'Impregnacja',
      ru: 'Импрегнация',
      uk: 'Імпрегнація',
      en: 'Impregnation',
    }[language] as string,
    'privacy-policy': {
      pl: 'Polityka prywatności',
      ru: 'Политика конфиденциальности',
      uk: 'Політика конфіденційності',
      en: 'Privacy Policy',
    }[language] as string,
    terms: {
      pl: 'Regulamin',
      ru: 'Условия',
      uk: 'Умови',
      en: 'Terms',
    }[language] as string,
    cookies: 'Cookies',
    sitemap: 'Sitemap',
    'pranie-materacy': {
      pl: 'Pranie materacy',
      ru: 'Химчистка матрасов',
      uk: 'Хімчистка матраців',
      en: 'Mattress cleaning',
    }[language] as string,
    'poradnik-prania-tapicerki-samochodowej': {
      pl: 'Poradnik prania tapicerki samochodowej',
      ru: 'Гид по химчистке автомобильного салона',
      uk: 'Гід з хімчистки автомобільного салону',
      en: 'Car upholstery cleaning guide',
    }[language] as string,
  };

  const crumbs: Crumb[] = [];

  if (segments[0] === 'city' && segments[1]) {
    const city = getCityBySlug(segments[1]);
    crumbs.push({
      name: city ? city.name : segments[1],
      path: `/city/${segments[1]}`,
    });
  } else if (segments[0] === 'blog') {
    crumbs.push({ name: nav.blog, path: '/blog' });
    if (segments[1]) {
      const list = blogArticles[language] || blogArticles.pl || [];
      const article = list.find((a) => String(a.id) === segments[1]);
      crumbs.push({
        name: article ? article.title : `#${segments[1]}`,
        path: `/blog/${segments[1]}`,
      });
    }
  } else {
    let acc = '';
    segments.forEach((seg) => {
      acc += `/${seg}`;
      crumbs.push({ name: staticLabels[seg] || seg, path: acc });
    });
  }

  if (crumbs.length === 0) return null;

  const homeLabel = nav.home || 'Home';

  return (
    <nav
      aria-label={
        { pl: 'Ścieżka nawigacji', ru: 'Навигационная цепочка', uk: 'Навігаційний ланцюжок', en: 'Breadcrumb' }[
          language
        ] as string
      }
      className="container mx-auto px-4 pt-3 pb-1"
    >
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs sm:text-sm text-muted-foreground">
        <li className="flex items-center">
          <LocalizedLink
            to="/"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{homeLabel}</span>
          </LocalizedLink>
        </li>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center min-w-0">
              <ChevronRight className="w-3.5 h-3.5 mx-0.5 flex-shrink-0 opacity-60" aria-hidden="true" />
              {isLast ? (
                <span aria-current="page" className="text-foreground font-medium truncate max-w-[16rem] sm:max-w-[28rem]">
                  {crumb.name}
                </span>
              ) : (
                <LocalizedLink
                  to={crumb.path}
                  className="hover:text-primary transition-colors truncate max-w-[10rem] sm:max-w-[20rem]"
                >
                  {crumb.name}
                </LocalizedLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
