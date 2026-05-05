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
}

// Нормализация категории
function normalizeCategory(item: CalculatorItem): string {
  const cat = item.category || item.id;
  if (cat === 'cleaning' || cat.startsWith('cleaning_') || cat.startsWith('extra-') || cat === 'extras') return 'cleaning';
  if (cat === 'other') return 'furniture';
  return cat;
}

/**
 * Скидка 20% — когда в заказе есть «Уборка» + минимум 1 другая категория услуг.
 * Иначе скидки нет.
 */
export const useDiscountCalculator = (items: CalculatorItem[]) => {
  const { language } = useLanguage();

  const discountInfo = useMemo((): DiscountInfo => {
    const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const categories = new Set(items.map(normalizeCategory));
    const hasCleaning = categories.has('cleaning');
    const hasOther = Array.from(categories).some((c) => c !== 'cleaning');

    let discountPercent = 0;
    let discountReason = '';
    let discountHint = getDiscountHint(hasCleaning, hasOther, language);

    if (hasCleaning && hasOther) {
      discountPercent = 20;
      discountReason = getDiscountReason('cleaningPlus', language);
      discountHint = '';
    }

    const discountAmount = Math.round((originalTotal * discountPercent) / 100);
    const finalTotal = originalTotal - discountAmount;

    return {
      originalTotal,
      discountPercent,
      discountAmount,
      finalTotal,
      discountReason,
      discountHint,
      hasDiscount: discountPercent > 0,
      hasFirstOrderDiscount: false,
      firstOrderDiscountAmount: 0,
    };
  }, [items, language]);

  return discountInfo;
};

function getDiscountReason(type: 'cleaningPlus', language: string): string {
  const reasons = {
    cleaningPlus: {
      ru: 'Скидка 20% — уборка + ещё одна услуга',
      en: '20% off — cleaning + any other service',
      pl: 'Rabat 20% — sprzątanie + dowolna druga usługa',
      uk: 'Знижка 20% — прибирання + будь-яка інша послуга',
    },
  };
  return reasons[type][language as keyof typeof reasons.cleaningPlus] || reasons[type].ru;
}

function getDiscountHint(hasCleaning: boolean, hasOther: boolean, language: string): string {
  if (hasCleaning && hasOther) return '';
  const hints = {
    ru: {
      empty: 'Добавьте уборку + любую другую услугу и получите −20% на весь заказ',
      needOther: 'Добавьте к уборке любую химчистку (мебель, ковры, матрас, авто) — получите −20%',
      needCleaning: 'Добавьте уборку к заказу — и получите −20% на весь заказ',
    },
    en: {
      empty: 'Add cleaning + any other service and get −20% off the whole order',
      needOther: 'Add any cleaning service (sofa, carpet, mattress, car) to your cleaning — get −20%',
      needCleaning: 'Add cleaning to your order — and get −20% off the whole order',
    },
    pl: {
      empty: 'Dodaj sprzątanie + dowolną drugą usługę i otrzymaj −20% na całe zamówienie',
      needOther: 'Dodaj do sprzątania dowolną usługę pralni chemicznej — otrzymasz −20%',
      needCleaning: 'Dodaj sprzątanie do zamówienia — i otrzymaj −20% na całość',
    },
    uk: {
      empty: 'Додайте прибирання + будь-яку іншу послугу й отримайте −20% на все замовлення',
      needOther: 'Додайте до прибирання будь-яку хімчистку — отримаєте −20%',
      needCleaning: 'Додайте прибирання до замовлення — й отримайте −20% на все',
    },
  };
  const l = hints[language as keyof typeof hints] || hints.ru;
  if (!hasCleaning && !hasOther) return l.empty;
  if (hasCleaning && !hasOther) return l.needOther;
  return l.needCleaning;
}

// Информация о доступных скидках для UI-блоков
export function getDiscountTiers(language: string) {
  const tiers = {
    ru: [{ services: 'Уборка + услуга', discount: '20%', label: '' }],
    en: [{ services: 'Cleaning + service', discount: '20%', label: '' }],
    pl: [{ services: 'Sprzątanie + usługa', discount: '20%', label: '' }],
    uk: [{ services: 'Прибирання + послуга', discount: '20%', label: '' }],
  };
  return tiers[language as keyof typeof tiers] || tiers.ru;
}
