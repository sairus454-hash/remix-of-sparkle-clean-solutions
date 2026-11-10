import { cities } from './city/cities.ts';
import { SNAPSHOT_PL } from './snapshots/pl.ts';
import { SNAPSHOT_RU } from './snapshots/ru.ts';
import { SNAPSHOT_EN } from './snapshots/en.ts';
import { SNAPSHOT_UK } from './snapshots/uk.ts';

export type NavLang = 'pl' | 'ru' | 'en' | 'uk';
const SITE_URL = 'https://masterclean1885.com';

const SNAPSHOTS: Record<NavLang, Record<string, string>> = {
  pl: SNAPSHOT_PL, ru: SNAPSHOT_RU, en: SNAPSHOT_EN, uk: SNAPSHOT_UK,
};

/** Visible page content captured from the visitor version (see scripts/crawler-snapshot.py). */
export function getPageSnapshot(path: string, lang: NavLang): string | undefined {
  const html = SNAPSHOTS[lang]?.[path];
  if (!html) return undefined;
  // Make internal links and stable images absolute for crawlers.
  return html
    .replace(/href="\/(?!\/)/g, `href="${SITE_URL}/`)
    .replace(/src="\/(?!\/)/g, `src="${SITE_URL}/`);
}

const SERVICE_LINKS: Array<[string, Record<NavLang, string>]> = [
  ['/services', { pl: 'Pranie tapicerki meblowej', ru: 'Химчистка мебели', en: 'Upholstery cleaning', uk: 'Хімчистка меблів' }],
  ['/pranie-materacy', { pl: 'Pranie materacy', ru: 'Химчистка матрасов', en: 'Mattress cleaning', uk: 'Хімчистка матраців' }],
  ['/auto', { pl: 'Czyszczenie auta', ru: 'Химчистка авто', en: 'Car interior cleaning', uk: 'Хімчистка авто' }],
  ['/ozone', { pl: 'Ozonowanie', ru: 'Озонирование', en: 'Ozone treatment', uk: 'Озонування' }],
  ['/floor-cleaning', { pl: 'Pranie dywanów i wykładzin', ru: 'Чистка ковров и ковролина', en: 'Carpet cleaning', uk: 'Чищення килимів і ковроліну' }],
  ['/impregnation', { pl: 'Impregnacja', ru: 'Импрегнация', en: 'Impregnation', uk: 'Імпрегнація' }],
  ['/cleaning', { pl: 'Sprzątanie', ru: 'Уборка', en: 'Home cleaning', uk: 'Прибирання' }],
  ['/windows', { pl: 'Mycie okien', ru: 'Мытьё окон', en: 'Window cleaning', uk: 'Миття вікон' }],
  ['/handyman', { pl: 'Złota rączka', ru: 'Муж на час', en: 'Handyman', uk: 'Майстер на годину' }],
  ['/prices', { pl: 'Cennik', ru: 'Цены', en: 'Prices', uk: 'Ціни' }],
  ['/poradnik-prania-tapicerki-samochodowej', { pl: 'Poradnik prania tapicerki samochodowej', ru: 'Руководство по чистке салона', en: 'Car upholstery guide', uk: 'Гайд з чистки салону' }],
  ['/equipment', { pl: 'Sprzęt', ru: 'Оборудование', en: 'Equipment', uk: 'Обладнання' }],
  ['/about', { pl: 'O firmie', ru: 'О компании', en: 'About us', uk: 'Про компанію' }],
  ['/reviews', { pl: 'Opinie', ru: 'Отзывы', en: 'Reviews', uk: 'Відгуки' }],
  ['/blog', { pl: 'Blog', ru: 'Блог', en: 'Blog', uk: 'Блог' }],
  ['/contacts', { pl: 'Kontakt', ru: 'Контакты', en: 'Contact', uk: 'Контакти' }],
];

const HEADINGS: Record<NavLang, { services: string; cities: string }> = {
  pl: { services: 'Usługi MasterClean', cities: 'Miasta, w których pracujemy' },
  ru: { services: 'Услуги MasterClean', cities: 'Города, где мы работаем' },
  en: { services: 'MasterClean services', cities: 'Cities we serve' },
  uk: { services: 'Послуги MasterClean', cities: 'Міста, де ми працюємо' },
};

/** Site-wide internal links so every crawler page connects to services and city pages. */
export function renderCrawlerNav(lang: NavLang, currentPath: string, escape: (v: string) => string): string {
  const prefix = lang === 'pl' ? '' : `/${lang}`;
  const url = (path: string) => path === '/' ? `${SITE_URL}${prefix || '/'}` : `${SITE_URL}${prefix}${path}`;
  const services = SERVICE_LINKS
    .filter(([path]) => path !== currentPath)
    .map(([path, label]) => `<li><a href="${url(path)}">${escape(label[lang])}</a></li>`)
    .join('');
  const cityLinks = cities
    .filter(city => `/city/${city.slug}` !== currentPath)
    .map(city => `<li><a href="${url(`/city/${city.slug}`)}">${escape(city.name)}</a></li>`)
    .join('');
  const home = { pl: 'Strona główna', ru: 'Главная', en: 'Home', uk: 'Головна' }[lang];
  return `<nav aria-label="${escape(HEADINGS[lang].services)}">
    <h2>${escape(HEADINGS[lang].services)}</h2>
    <ul><li><a href="${url('/')}">${escape(home)}</a></li>${services}</ul>
    <h2>${escape(HEADINGS[lang].cities)}</h2>
    <ul>${cityLinks}</ul>
  </nav>`;
}
