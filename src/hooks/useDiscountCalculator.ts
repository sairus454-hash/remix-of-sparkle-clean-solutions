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

/** Only the furniture/mattress/leather form promotion is automatic. */
export const useDiscountCalculator = (items: CalculatorItem[]) => {
  const { language } = useLanguage();
  return useMemo((): DiscountInfo => {
    const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const furnitureSubtotal = items
      .filter(item => isFurnitureLike(item) && !item.originalPrice)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = Math.round(furnitureSubtotal * FORM_FURNITURE_DISCOUNT_PERCENT / 100);
    return {
      originalTotal,
      discountPercent: discountAmount > 0 ? FORM_FURNITURE_DISCOUNT_PERCENT : 0,
      discountAmount,
      finalTotal: originalTotal - discountAmount,
      discountReason: discountAmount > 0 ? getFormFurnitureReason(language) : '',
      discountHint: '',
      hasDiscount: discountAmount > 0,
      hasFirstOrderDiscount: false,
      firstOrderDiscountAmount: 0,
    };
  }, [items, language]);
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

