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

    if (hasCleaning && hasOther) {
      discountPercent = 20;
      discountReason = getDiscountReason('cleaningPlus', language);
    }

    const discountAmount = Math.round((originalTotal * discountPercent) / 100);
    const finalTotal = originalTotal - discountAmount;

    return {
      originalTotal,
      discountPercent,
      discountAmount,
      finalTotal,
      discountReason,
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
