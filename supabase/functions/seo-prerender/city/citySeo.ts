import { cities, type CityData } from './cities.ts';
import { getCityProfile } from './cityProfiles.ts';
import { generateCityContent } from './cityContentGenerator.ts';

export type CityLanguage = 'pl' | 'ru' | 'en' | 'uk';
const SITE_URL = 'https://masterclean1885.com';
const OLAWA_META = {
  pl: {
    title: 'Pranie tapicerki Oława – kanapy, materace, narożniki | MasterClean',
    description: 'Profesjonalne pranie kanap, narożników, materacy i tapicerki samochodowej w Oławie. Dojazd do klienta, profesjonalny sprzęt i szybkie terminy. Zadzwoń!',
  },
  ru: {
    title: 'Химчистка мебели Олава — диваны и матрасы | MasterClean',
    description: 'Профессиональная химчистка диванов, угловой мебели, матрасов и салонов автомобилей в Олаве. Выезд к клиенту, профессиональное оборудование. Звоните!',
  },
  en: {
    title: 'Upholstery cleaning Oława — sofas & mattresses | MasterClean',
    description: 'Professional sofa, corner sofa, mattress and car upholstery cleaning in Oława. We come to you with professional equipment. Call to arrange a visit!',
  },
  uk: {
    title: 'Хімчистка меблів Олава — дивани й матраци | MasterClean',
    description: 'Професійна хімчистка диванів, кутових меблів, матраців і салонів автомобілів в Олаві. Виїзд до клієнта, професійне обладнання. Телефонуйте!',
  },
};

export function cityImageAlt(subject: string, city: string): string {
  return `${subject} — ${city} | MasterClean`;
}

export function getCitySeo(city: CityData, lang: CityLanguage) {
  const content = city.content[lang];
  const location = content.heading.replace(/^(Usługi czyszczenia|Услуги химчистки|Cleaning Services|Послуги хімчистки)\s*/, '');
  const heading = {
    pl: `Pranie tapicerki ${location}`,
    ru: `Химчистка мебели ${location}`,
    en: `Upholstery cleaning ${location}`,
    uk: `Хімчистка меблів ${location}`,
  }[lang];
  const title = {
    pl: `Pranie tapicerki ${city.name} | MasterClean`,
    ru: `Химчистка мебели ${city.name} | MasterClean`,
    en: `Upholstery cleaning ${city.name} | MasterClean`,
    uk: `Хімчистка меблів ${city.name} | MasterClean`,
  }[lang];
  const description = {
    pl: `Pranie kanap, narożników, materacy i tapicerki samochodowej ${location}. Dojazd do klienta, profesjonalny sprzęt. Sprawdź ceny i zamów online.`,
    ru: `Химчистка диванов, угловой мебели, матрасов и салонов авто ${location}. Выезд к клиенту и профессиональное оборудование. Узнайте цены и закажите онлайн.`,
    en: `Sofa, corner sofa, mattress and car upholstery cleaning ${location}. We come to you with professional equipment. Check prices and book your visit online.`,
    uk: `Хімчистка диванів, кутових меблів, матраців та салонів авто ${location}. Виїзд до клієнта, професійне обладнання. Дізнайтеся ціни та замовте онлайн.`,
  }[lang];
  const generated = generateCityContent(city.name, city.slug, lang, getCityProfile(city.slug));
  const imageSlug = city.slug === 'ostrow-wielkopolski' ? 'ostrow' : city.slug;
  const imageCities = new Set(['wroclaw', 'opole', 'legnica', 'lubin', 'olawa', 'kalisz', 'leszno', 'swidnica', 'walbrzych', 'jelenia-gora', 'brzeg', 'ostrow']);
  return {
    title, description,
    ...(city.slug === 'olawa' ? OLAWA_META[lang] : {}),
    headline: heading,
    keywords: lang === 'pl' ? city.seo.keywords : `${heading}, ${city.name}, MasterClean`,
    image: `${SITE_URL}/${imageCities.has(imageSlug) ? `og-${imageSlug}.jpg` : 'og-image.jpg'}`,
    content, generated,
  };
}

export function getCityPage(slug: string, lang: CityLanguage) {
  const city = cities.find(entry => entry.slug === slug);
  return city ? { city, ...getCitySeo(city, lang) } : undefined;
}

export function renderCityBody(slug: string, lang: CityLanguage, escape: (value: string) => string) {
  const page = getCityPage(slug, lang);
  if (!page) return '';
  const { city, content, generated } = page;
  const prefix = lang === 'pl' ? '' : `/${lang}`;
  const contactLabel = { pl: 'Kontakt', ru: 'Контакты', en: 'Contact', uk: 'Контакти' }[lang];
  const services = {
    pl: ['Pranie kanap i narożników', 'Czyszczenie materacy', 'Pranie tapicerki samochodowej'],
    ru: ['Химчистка диванов и угловой мебели', 'Чистка матрасов', 'Химчистка салона автомобиля'],
    en: ['Sofa and corner sofa cleaning', 'Mattress cleaning', 'Car upholstery cleaning'],
    uk: ['Хімчистка диванів і кутових меблів', 'Чищення матраців', 'Хімчистка салону автомобіля'],
  }[lang];
  const images = ['/city-services/sofa.jpg', '/city-services/mattress.jpg', '/city-services/car.jpg'];
  return `<p>${escape(content.subtitle)}</p>
    <section><h2>${escape(city.name)} — ${escape(city.region)}</h2>
    <p>${escape(content.description)}</p>
    ${generated.paragraphs.map(text => `<p>${escape(text)}</p>`).join('\n')}</section>
    <section><h2>${escape(page.headline)}</h2>
    ${services.map((subject, i) => `<figure><img src="${SITE_URL}${images[i]}" alt="${escape(cityImageAlt(subject, city.name))}" width="600" height="600" loading="lazy"><figcaption>${escape(subject)} — ${escape(city.name)}</figcaption></figure>`).join('\n')}</section>
    <section><h2>${contactLabel} — ${escape(city.name)}</h2>
    <p><a href="tel:+48575211401">+48 575 211 401</a></p>
    <p><a href="${SITE_URL}${prefix}/contacts">${contactLabel}</a></p>
    <p><a href="${SITE_URL}${prefix}/prices">${escape({ pl: 'Cennik', ru: 'Цены', en: 'Prices', uk: 'Ціни' }[lang])}</a></p></section>`;
}