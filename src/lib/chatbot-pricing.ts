// Quick price estimate logic for the in-chat wizard.
// Mirrors the project pricing engine: Wrocław/Smolec base price; other cities
// +10% (Gardening +5%) rounded UP to nearest 5. Floor-cleaning and auto are
// exempt from city markup per project memory.

export type ServiceKey =
  | 'cleaning'
  | 'furniture'
  | 'mattress'
  | 'auto'
  | 'windows'
  | 'ozone'
  | 'floor'
  | 'handyman'
  | 'gardening';

export interface ServiceMenuItem {
  key: ServiceKey;
  emoji: string;
  url: string;
  /** i18n labels */
  label: { ru: string; en: string; pl: string; uk: string };
  /** "Ask user about quantity" prompt */
  quantityPrompt: { ru: string; en: string; pl: string; uk: string };
  /** Quantity unit shown in chips */
  unit: { ru: string; en: string; pl: string; uk: string };
  /** Estimator: returns base PLN price for given quantity (Wrocław base) */
  baseEstimator: (qty: number) => { min: number; max: number };
  /** Markup type for non-base cities */
  markup: 'standard' | 'gardening' | 'none';
  /** Suggested quantity chips */
  suggestions: number[];
}

const round5 = (x: number) => Math.ceil(x / 5) * 5;

export const BASE_CITIES = ['wroclaw', 'smolec', 'wrocław'];

export const MIN_ORDER = {
  base: 160,
  other: 220,
};

export const SERVICES_MENU: ServiceMenuItem[] = [
  {
    key: 'cleaning',
    emoji: '🧹',
    url: '/cleaning',
    label: { ru: 'Уборка квартир', en: 'Home cleaning', pl: 'Sprzątanie', uk: 'Прибирання' },
    quantityPrompt: {
      ru: 'Какая площадь помещения, м²?',
      en: 'What is the area in m²?',
      pl: 'Jaka jest powierzchnia w m²?',
      uk: 'Яка площа в м²?',
    },
    unit: { ru: 'м²', en: 'm²', pl: 'm²', uk: 'м²' },
    suggestions: [30, 50, 70, 100],
    // Standard 7 PLN/m², deep 10 PLN/m². Show range.
    baseEstimator: (qty) => ({ min: 7 * qty, max: 10 * qty }),
    markup: 'standard',
  },
  {
    key: 'furniture',
    emoji: '🛋',
    url: '/services',
    label: { ru: 'Химчистка мебели', en: 'Furniture cleaning', pl: 'Pranie mebli', uk: 'Хімчистка меблів' },
    quantityPrompt: {
      ru: 'Сколько посадочных мест? (диван 3-местный = 3, угловой = 5)',
      en: 'How many seats? (3-seat sofa = 3, corner = 5)',
      pl: 'Ile miejsc? (sofa 3-os = 3, narożna = 5)',
      uk: 'Скільки місць? (диван 3-міс = 3, кутовий = 5)',
    },
    unit: { ru: 'место', en: 'seat', pl: 'miejsce', uk: 'місце' },
    suggestions: [2, 3, 5, 7],
    // ~50 PLN per seat, 70 max (after +10% Wrocław base update).
    baseEstimator: (qty) => ({ min: round5(qty * 50), max: round5(qty * 70) }),
    markup: 'standard',
  },
  {
    key: 'mattress',
    emoji: '🛏',
    url: '/services',
    label: { ru: 'Химчистка матрасов', en: 'Mattress cleaning', pl: 'Pranie materacy', uk: 'Хімчистка матраців' },
    quantityPrompt: {
      ru: 'Сколько матрасов?',
      en: 'How many mattresses?',
      pl: 'Ile materacy?',
      uk: 'Скільки матраців?',
    },
    unit: { ru: 'шт', en: 'pcs', pl: 'szt', uk: 'шт' },
    suggestions: [1, 2, 3],
    // 130 single, 200 double (Wrocław base after +10% mattress-with-drying update, rounded to tens)
    baseEstimator: (qty) => ({ min: 130 * qty, max: 200 * qty }),
    markup: 'standard',
  },
  {
    key: 'auto',
    emoji: '🚗',
    url: '/auto',
    label: { ru: 'Химчистка авто', en: 'Car cleaning', pl: 'Pranie auta', uk: 'Хімчистка авто' },
    quantityPrompt: {
      ru: 'Какой пакет интересует? (комплекс = 1, VIP = 2)',
      en: 'Which package? (full = 1, VIP = 2)',
      pl: 'Który pakiet? (kompleks = 1, VIP = 2)',
      uk: 'Який пакет? (комплекс = 1, VIP = 2)',
    },
    unit: { ru: 'пакет', en: 'package', pl: 'pakiet', uk: 'пакет' },
    suggestions: [1, 2],
    // 1 = 450 (textile) / 550 (leather), 2 = 700/800
    baseEstimator: (qty) => (qty <= 1 ? { min: 450, max: 550 } : { min: 700, max: 800 }),
    markup: 'none', // car cleaning has NO city markup
  },
  {
    key: 'windows',
    emoji: '🪟',
    url: '/windows',
    label: { ru: 'Мойка окон', en: 'Window cleaning', pl: 'Mycie okien', uk: 'Миття вікон' },
    quantityPrompt: {
      ru: 'Сколько окон?',
      en: 'How many windows?',
      pl: 'Ile okien?',
      uk: 'Скільки вікон?',
    },
    unit: { ru: 'окно', en: 'window', pl: 'okno', uk: 'вікно' },
    suggestions: [3, 5, 8, 12],
    // 40-80 PLN per window
    baseEstimator: (qty) => ({ min: 40 * qty, max: 80 * qty }),
    markup: 'standard',
  },
  {
    key: 'ozone',
    emoji: '💨',
    url: '/ozone',
    label: { ru: 'Озонирование', en: 'Ozonation', pl: 'Ozonowanie', uk: 'Озонування' },
    quantityPrompt: {
      ru: 'Площадь помещения, м²? (или 0 для авто)',
      en: 'Area in m²? (or 0 for car)',
      pl: 'Powierzchnia w m²? (albo 0 dla auta)',
      uk: 'Площа в м²? (або 0 для авто)',
    },
    unit: { ru: 'м²', en: 'm²', pl: 'm²', uk: 'м²' },
    suggestions: [0, 30, 50, 80],
    baseEstimator: (qty) => {
      if (qty === 0) return { min: 120, max: 120 }; // auto
      if (qty <= 40) return { min: 144, max: 144 };
      if (qty <= 60) return { min: 240, max: 240 };
      if (qty <= 100) return { min: 300, max: 360 };
      return { min: 360, max: 480 };
    },
    markup: 'standard',
  },
  {
    key: 'floor',
    emoji: '🪣',
    url: '/floor-cleaning',
    label: {
      ru: 'Химчистка покрытий',
      en: 'Floor cleaning',
      pl: 'Pranie wykładzin',
      uk: 'Хімчистка покриттів',
    },
    quantityPrompt: {
      ru: 'Какая площадь ковра/покрытия, м²?',
      en: 'Carpet/floor area in m²?',
      pl: 'Powierzchnia dywanu/wykładziny w m²?',
      uk: 'Площа килима/покриття в м²?',
    },
    unit: { ru: 'м²', en: 'm²', pl: 'm²', uk: 'м²' },
    suggestions: [6, 12, 25, 50],
    baseEstimator: (qty) => {
      if (qty <= 20) return { min: 15 * qty, max: 15 * qty };
      if (qty <= 50) return { min: 10 * qty, max: 10 * qty };
      return { min: 7 * qty, max: 10 * qty };
    },
    markup: 'none', // floor cleaning has NO city markup
  },
  {
    key: 'handyman',
    emoji: '🔧',
    url: '/handyman',
    label: { ru: 'Мастер на час', en: 'Handyman', pl: 'Złota rączka', uk: 'Майстер' },
    quantityPrompt: {
      ru: 'Сколько часов работы предполагается?',
      en: 'Estimated hours of work?',
      pl: 'Ile godzin pracy?',
      uk: 'Скільки годин роботи?',
    },
    unit: { ru: 'ч', en: 'h', pl: 'h', uk: 'г' },
    suggestions: [1, 2, 4],
    // ~100-130 PLN/hour, available only in Wrocław per memory
    baseEstimator: (qty) => ({ min: 100 * qty, max: 130 * qty }),
    markup: 'none',
  },
];

export const isBaseCity = (city: string) => {
  if (!city) return true;
  const normalized = city
    .toLowerCase()
    .trim()
    .replace(/[ąćęłńóśźż]/g, (c) => ({ ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' }[c]!))
    .replace(/[^a-z]/g, '');
  return BASE_CITIES.some((b) => normalized.includes(b.replace(/[^a-z]/g, '')));
};

/**
 * Shared key with `useCity` hook (src/hooks/useCity.ts) so that a city
 * picked in the chat wizard auto-populates the global pricing engine
 * (calculator, cart, etc.) on the next render.
 */
export const CITY_STORAGE_KEY = 'masterclean_selected_city';

/** Convert any free-text city name to a normalized slug ("Wrocław" → "wroclaw"). */
export const cityToSlug = (city: string): string =>
  city
    .toLowerCase()
    .trim()
    .replace(/[ąćęłńóśźż]/g, (c) => ({ ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' }[c]!))
    .replace(/\s+/g, '-')
    .replace(/[^a-z-]/g, '');

/** Reverse lookup: slug → display name (uses cities catalog when available). */
export const slugToCityName = (slug: string, fallback = ''): string => {
  if (!slug) return fallback;
  // Lazy require to avoid circular import at module load
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getCityBySlug } = require('@/data/cities') as typeof import('@/data/cities');
    const c = getCityBySlug(slug);
    if (c) return c.name;
  } catch {
    /* ignore */
  }
  // Fallback: capitalize slug
  return slug.charAt(0).toUpperCase() + slug.slice(1);
};

/** Read the remembered city slug from localStorage (SSR-safe). */
export const readStoredCity = (): { slug: string; name: string } | null => {
  if (typeof window === 'undefined') return null;
  try {
    const slug = window.localStorage.getItem(CITY_STORAGE_KEY);
    if (!slug) return null;
    return { slug, name: slugToCityName(slug, slug) };
  } catch {
    return null;
  }
};

/** Persist a city to localStorage so it carries over to the calculator. */
export const writeStoredCity = (city: string): void => {
  if (typeof window === 'undefined' || !city.trim()) return;
  try {
    window.localStorage.setItem(CITY_STORAGE_KEY, cityToSlug(city));
    // Notify other tabs / hooks listening for storage changes
    window.dispatchEvent(new StorageEvent('storage', { key: CITY_STORAGE_KEY }));
  } catch {
    /* ignore quota / privacy mode */
  }
};

export interface EstimateResult {
  min: number;
  max: number;
  isBase: boolean;
  minOrder: number;
  belowMin: boolean;
}

export const computeEstimate = (
  service: ServiceMenuItem,
  qty: number,
  city: string,
): EstimateResult => {
  const base = service.baseEstimator(qty);
  const isBase = isBaseCity(city);
  const factor =
    !isBase && service.markup === 'standard'
      ? 1.1
      : !isBase && service.markup === 'gardening'
        ? 1.05
        : 1;

  const min = service.markup === 'none' || isBase ? base.min : round5(base.min * factor);
  const max = service.markup === 'none' || isBase ? base.max : round5(base.max * factor);
  const minOrder = isBase ? MIN_ORDER.base : MIN_ORDER.other;
  return { min, max, isBase, minOrder, belowMin: max < minOrder };
};

export type ChatLang = 'ru' | 'en' | 'pl' | 'uk';

export const ESTIMATE_COPY = {
  ru: {
    menuTitle: '🛠 Виды услуг — выберите интересующую:',
    quickEstimate: '⚡ Быстрый расчёт',
    cityPrompt: 'В каком городе нужна услуга?',
    citySuggestions: ['Wrocław', 'Smolec', 'Opole', 'Legnica', 'Lubin'],
    estimateTitle: '💰 Ориентировочная стоимость',
    estimateRange: (a: number, b: number) =>
      a === b ? `${a} PLN` : `${a}–${b} PLN`,
    cityNote: (isBase: boolean) =>
      isBase
        ? '_Базовый город (без наценки)._'
        : '_Цена с городской наценкой, округление вверх до 5._',
    minOrderNote: (min: number) => `📏 Минимальный заказ: **${min} PLN**.`,
    belowMin:
      '⚠️ Сумма меньше минимального заказа — итог будет округлён до минимума.',
    seePage: 'Подробнее и онлайн-заказ',
    bookNow: '📝 Оформить заявку',
    disclaimer:
      '_Это ориентир. Финальная цена зависит от типа покрытия, степени загрязнения и доп. услуг. Менеджер уточнит при оформлении._',
    pickAnother: '↩️ Выбрать другую услугу',
    rememberedCity: (name: string) => `📍 Город: **${name}** (запомнен из прошлого расчёта)`,
    changeCity: '🏙 Сменить',
  },
  en: {
    menuTitle: '🛠 Our services — pick one:',
    quickEstimate: '⚡ Quick estimate',
    cityPrompt: 'Which city do you need service in?',
    citySuggestions: ['Wrocław', 'Smolec', 'Opole', 'Legnica', 'Lubin'],
    estimateTitle: '💰 Estimated price',
    estimateRange: (a: number, b: number) =>
      a === b ? `${a} PLN` : `${a}–${b} PLN`,
    cityNote: (isBase: boolean) =>
      isBase ? '_Base city (no markup)._' : '_Price includes city markup, rounded up to 5._',
    minOrderNote: (min: number) => `📏 Minimum order: **${min} PLN**.`,
    belowMin: '⚠️ Below minimum — total will be rounded up to minimum.',
    seePage: 'Details & online booking',
    bookNow: '📝 Book now',
    disclaimer:
      '_Estimate only. Final price depends on material type, soiling and add-ons. Manager will confirm._',
    pickAnother: '↩️ Pick another service',
    rememberedCity: (name: string) => `📍 City: **${name}** (remembered from last quote)`,
    changeCity: '🏙 Change',
  },
  pl: {
    menuTitle: '🛠 Nasze usługi — wybierz:',
    quickEstimate: '⚡ Szybka wycena',
    cityPrompt: 'W jakim mieście potrzebujesz usługi?',
    citySuggestions: ['Wrocław', 'Smolec', 'Opole', 'Legnica', 'Lubin'],
    estimateTitle: '💰 Szacunkowa cena',
    estimateRange: (a: number, b: number) =>
      a === b ? `${a} PLN` : `${a}–${b} PLN`,
    cityNote: (isBase: boolean) =>
      isBase
        ? '_Miasto bazowe (bez narzutu)._'
        : '_Cena z narzutem miejskim, zaokrąglona w górę do 5._',
    minOrderNote: (min: number) => `📏 Zamówienie minimalne: **${min} PLN**.`,
    belowMin: '⚠️ Poniżej minimum — kwota zostanie zaokrąglona w górę do minimum.',
    seePage: 'Szczegóły i zamówienie online',
    bookNow: '📝 Zamów teraz',
    disclaimer:
      '_Szacunek. Ostateczna cena zależy od materiału, stopnia zabrudzenia i dodatków. Manager potwierdzi._',
    pickAnother: '↩️ Wybierz inną usługę',
    rememberedCity: (name: string) => `📍 Miasto: **${name}** (zapamiętane z poprzedniej wyceny)`,
    changeCity: '🏙 Zmień',
  },
  uk: {
    menuTitle: '🛠 Наші послуги — оберіть:',
    quickEstimate: '⚡ Швидкий розрахунок',
    cityPrompt: 'У якому місті потрібна послуга?',
    citySuggestions: ['Wrocław', 'Smolec', 'Opole', 'Legnica', 'Lubin'],
    estimateTitle: '💰 Орієнтовна ціна',
    estimateRange: (a: number, b: number) =>
      a === b ? `${a} PLN` : `${a}–${b} PLN`,
    cityNote: (isBase: boolean) =>
      isBase
        ? '_Базове місто (без націнки)._'
        : '_Ціна з міською націнкою, округлення вгору до 5._',
    minOrderNote: (min: number) => `📏 Мінімальне замовлення: **${min} PLN**.`,
    belowMin: '⚠️ Нижче мінімуму — підсумок буде округлено до мінімуму.',
    seePage: 'Детальніше та онлайн-замовлення',
    bookNow: '📝 Оформити заявку',
    disclaimer:
      '_Орієнтир. Фінальна ціна залежить від матеріалу, забруднення та додатків. Менеджер підтвердить._',
    pickAnother: '↩️ Обрати іншу послугу',
    rememberedCity: (name: string) => `📍 Місто: **${name}** (запам'ятано з попереднього розрахунку)`,
    changeCity: '🏙 Змінити',
  },
} as const;
