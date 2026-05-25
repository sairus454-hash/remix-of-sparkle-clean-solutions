import { useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export interface DiscountInfo {
  originalTotal: number;
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
  discountReason: string;
  discountHint: string;
  hasDiscount: boolean;
  hasFirstOrderDiscount: boolean;
  firstOrderDiscountAmount: number;
}

interface CalculatorItem {
  id: string;
  price: number;
  quantity: number;
  category?: string;
  /** If set, item already has a per-item promo — exclude from form −10% (no stacking) */
  originalPrice?: number;
}

// Минимальная сумма заказа для активации скидки 22%
export const MIN_ORDER_FOR_DISCOUNT = 350;

// Нормализация категории
function normalizeCategory(item: CalculatorItem): string {
  const cat = item.category || item.id;
  if (cat === 'cleaning' || cat.startsWith('cleaning_') || cat.startsWith('cleaning-') || cat.startsWith('extra-') || cat === 'extras') return 'cleaning';
  if (cat === 'other') return 'furniture';
  // Strip `city-{slug}-` prefix that CityPage adds before the real category id
  const m = cat.match(/^city-.+-(furniture|mattress|leather|auto|floorCleaning|cleaning|handyman|windows|ozone|other|gardening)$/);
  if (m) return m[1] === 'cleaning' ? 'cleaning' : m[1];
  return cat;
}

/** Items eligible for the "furniture cleaning via form" −10% promo */
function isFurnitureLike(item: CalculatorItem): boolean {
  const c = normalizeCategory(item);
  return c === 'furniture' || c === 'leather' || c === 'mattress';
}

/** Promo: −10% off furniture cleaning when ordered via the contact form */
export const FORM_FURNITURE_DISCOUNT_PERCENT = 10;

/**
 * Скидка 22% — когда в заказе есть «Уборка» + минимум 1 другая категория услуг.
 * Промо −10% — на химчистку мебели/матрасов/кожи при заказе через формуляр (стекается, если 22% не сработала).
 */
export const useDiscountCalculator = (items: CalculatorItem[]) => {
  const { language } = useLanguage();

  const discountInfo = useMemo((): DiscountInfo => {
    const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const categories = new Set(items.map(normalizeCategory));
    const hasCleaning = categories.has('cleaning');
    const hasOther = Array.from(categories).some((c) => c !== 'cleaning');
    const meetsMinimum = originalTotal >= MIN_ORDER_FOR_DISCOUNT;

    let discountPercent = 0;
    let discountReason = '';
    let discountHint = getDiscountHint(hasCleaning, hasOther, meetsMinimum, originalTotal, language);
    let discountAmount = 0;

    if (hasCleaning && hasOther && meetsMinimum) {
      discountPercent = 22;
      discountReason = getDiscountReason('cleaningPlus', language);
      discountHint = '';
      discountAmount = Math.round((originalTotal * discountPercent) / 100);
    } else {
      // Form-based −10% promo on furniture cleaning items.
      // Does NOT stack with per-item promos: skip items that already have an originalPrice (weekly promo).
      const furnitureSubtotal = items
        .filter((i) => isFurnitureLike(i) && !i.originalPrice)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (furnitureSubtotal > 0) {
        discountAmount = Math.round((furnitureSubtotal * FORM_FURNITURE_DISCOUNT_PERCENT) / 100);
        discountPercent = FORM_FURNITURE_DISCOUNT_PERCENT;
        discountReason = getFormFurnitureReason(language);
        discountHint = '';
      }
    }

    const finalTotal = originalTotal - discountAmount;

    return {
      originalTotal,
      discountPercent,
      discountAmount,
      finalTotal,
      discountReason,
      discountHint,
      hasDiscount: discountAmount > 0,
      hasFirstOrderDiscount: false,
      firstOrderDiscountAmount: 0,
    };
  }, [items, language]);

  return discountInfo;
};

function getFormFurnitureReason(language: string): string {
  const map: Record<string, string> = {
    ru: 'Скидка −10% на химчистку мебели при заказе через форму',
    en: '−10% off furniture cleaning when ordered via the form',
    pl: 'Rabat −10% na pranie mebli przy zamówieniu przez formularz',
    uk: 'Знижка −10% на хімчистку меблів при замовленні через форму',
  };
  return map[language] || map.ru;
}

function getDiscountReason(type: 'cleaningPlus', language: string): string {
  const reasons = {
    cleaningPlus: {
      ru: 'Скидка 22% — уборка + ещё одна услуга',
      en: '22% off — cleaning + any other service',
      pl: 'Rabat 22% — sprzątanie + dowolna druga usługa',
      uk: 'Знижка 22% — прибирання + будь-яка інша послуга',
    },
  };
  return reasons[type][language as keyof typeof reasons.cleaningPlus] || reasons[type].ru;
}

function getDiscountHint(hasCleaning: boolean, hasOther: boolean, meetsMinimum: boolean, currentTotal: number, language: string): string {
  if (hasCleaning && hasOther && meetsMinimum) return '';
  const cats = getDiscountEligibleCategories(language).join(', ');
  const remaining = Math.max(0, MIN_ORDER_FOR_DISCOUNT - currentTotal);
  const minNote = {
    ru: ` Минимальная сумма заказа для скидки — ${MIN_ORDER_FOR_DISCOUNT} zł.`,
    en: ` Minimum order for the discount — ${MIN_ORDER_FOR_DISCOUNT} zł.`,
    pl: ` Minimalna kwota zamówienia dla rabatu — ${MIN_ORDER_FOR_DISCOUNT} zł.`,
    uk: ` Мінімальна сума замовлення для знижки — ${MIN_ORDER_FOR_DISCOUNT} zł.`,
  };
  const needMore = {
    ru: ` Добавьте ещё на ${remaining} zł до минимума ${MIN_ORDER_FOR_DISCOUNT} zł — и скидка применится автоматически.`,
    en: ` Add ${remaining} zł more to reach the ${MIN_ORDER_FOR_DISCOUNT} zł minimum — and the discount will apply automatically.`,
    pl: ` Dodaj jeszcze ${remaining} zł do minimum ${MIN_ORDER_FOR_DISCOUNT} zł — rabat naliczy się automatycznie.`,
    uk: ` Додайте ще ${remaining} zł до мінімуму ${MIN_ORDER_FOR_DISCOUNT} zł — і знижка застосується автоматично.`,
  };
  const hints = {
    ru: {
      empty: `Добавьте уборку + любую вторую услугу и получите −22% на весь заказ. Подходит любая из категорий: ${cats}.`,
      needOther: `Добавьте к уборке любую услугу из: ${cats} — получите −22%.`,
      needCleaning: 'Добавьте уборку к заказу — и получите −22% на всё.',
    },
    en: {
      empty: `Add cleaning + any second service and get −22% off the whole order. Eligible categories: ${cats}.`,
      needOther: `Add any service from: ${cats} to your cleaning — get −22%.`,
      needCleaning: 'Add cleaning to your order — and get −22% off the whole order.',
    },
    pl: {
      empty: `Dodaj sprzątanie + dowolną drugą usługę i otrzymaj −22% na całe zamówienie. Pasuje dowolna z kategorii: ${cats}.`,
      needOther: `Dodaj do sprzątania dowolną usługę z: ${cats} — otrzymasz −22%.`,
      needCleaning: 'Dodaj sprzątanie do zamówienia — i otrzymaj −22% na całość.',
    },
    uk: {
      empty: `Додайте прибирання + будь-яку другу послугу й отримайте −22% на все замовлення. Підходить будь-яка з категорій: ${cats}.`,
      needOther: `Додайте до прибирання будь-яку послугу з: ${cats} — отримаєте −22%.`,
      needCleaning: 'Додайте прибирання до замовлення — й отримайте −22% на все.',
    },
  };
  const l = hints[language as keyof typeof hints] || hints.ru;
  const n = minNote[language as keyof typeof minNote] || minNote.ru;
  const m = needMore[language as keyof typeof needMore] || needMore.ru;
  let base: string;
  if (!hasCleaning && !hasOther) base = l.empty;
  else if (hasCleaning && !hasOther) base = l.needOther;
  else base = l.needCleaning;
  // Если уже есть уборка + вторая услуга, но не хватает суммы — показываем сколько добить
  if (hasCleaning && hasOther && !meetsMinimum) return `${base}${m}`;
  return `${base}${n}`;
}

// Категории, которые засчитываются как «вторая услуга» для скидки −22%
export function getDiscountEligibleCategories(language: string): string[] {
  const map = {
    ru: ['Химчистка мебели', 'Матрасы', 'Кожаная мебель', 'Химчистка авто', 'Озонирование', 'Ковры и полы', 'Мойка окон', 'Мастер на час'],
    en: ['Furniture cleaning', 'Mattresses', 'Leather furniture', 'Auto cleaning', 'Ozonation', 'Carpets & floors', 'Window cleaning', 'Handyman'],
    pl: ['Pranie mebli', 'Materace', 'Meble skórzane', 'Pranie auta', 'Ozonowanie', 'Dywany i podłogi', 'Mycie okien', 'Złota rączka'],
    uk: ['Хімчистка меблів', 'Матраци', 'Шкіряні меблі', 'Хімчистка авто', 'Озонування', 'Килими та підлоги', 'Миття вікон', 'Майстер на годину'],
  };
  return map[language as keyof typeof map] || map.ru;
}

// Тип роли позиции в скидке: 'cleaning' (уборка), 'service' (любая другая услуга)
export function getItemDiscountRole(category: string | undefined): 'cleaning' | 'service' {
  if (!category) return 'service';
  if (category === 'cleaning' || category.startsWith('cleaning_') || category.startsWith('cleaning-') || category.startsWith('extra-') || category === 'extras') return 'cleaning';
  return 'service';
}

export function getDiscountRoleLabel(role: 'cleaning' | 'service', language: string): string {
  const labels = {
    cleaning: { ru: 'Уборка', en: 'Cleaning', pl: 'Sprzątanie', uk: 'Прибирання' },
    service: { ru: 'Услуга для −22%', en: 'Service for −22%', pl: 'Usługa do −22%', uk: 'Послуга для −22%' },
  };
  return labels[role][language as keyof typeof labels.cleaning] || labels[role].ru;
}


// Информация о доступных скидках для UI-блоков
export function getDiscountTiers(language: string) {
  const tiers = {
    ru: [{ services: 'Уборка + услуга', discount: '22%', label: '' }],
    en: [{ services: 'Cleaning + service', discount: '22%', label: '' }],
    pl: [{ services: 'Sprzątanie + usługa', discount: '22%', label: '' }],
    uk: [{ services: 'Прибирання + послуга', discount: '22%', label: '' }],
  };
  return tiers[language as keyof typeof tiers] || tiers.ru;
}
