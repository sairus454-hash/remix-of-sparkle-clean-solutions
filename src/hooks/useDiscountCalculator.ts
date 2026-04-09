import { useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export interface DiscountInfo {
  originalTotal: number;
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
  discountReason: string;
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

// Нормализация категории: уборка и доп. услуги считаются как одна категория; химчистка мебели и «другое» — тоже одна
function normalizeCategory(item: CalculatorItem): string {
  const cat = item.category || item.id;
  if (cat === 'cleaning' || cat.startsWith('cleaning_') || cat.startsWith('extra-') || cat === 'extras') return 'cleaning';
  if (cat === 'other') return 'furniture';
  return cat;
}

// ID позиций, исключённых из скидок
const EXCLUDED_IDS: string[] = [];

/**
 * Алгоритм расчёта скидок:
 * - 10% при заказе из 4+ разных категорий
 * - 15% при заказе из 6+ разных категорий (VIP программа)
 */
export const useDiscountCalculator = (items: CalculatorItem[]) => {
  const { language } = useLanguage();

  const discountInfo = useMemo((): DiscountInfo => {
    const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const uniqueCategories = new Set(items.map(normalizeCategory));
    const uniqueCategoriesCount = uniqueCategories.size;
    
    let discountPercent = 0;
    let discountReason = '';

    if (uniqueCategoriesCount >= 6) {
      discountPercent = 15;
      discountReason = getDiscountReason('vip', language);
    } else if (uniqueCategoriesCount >= 4) {
      discountPercent = 10;
      discountReason = getDiscountReason('loyal', language);
    }
    
    const discountAmount = Math.round(originalTotal * discountPercent / 100);
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

function getDiscountReason(type: 'loyal' | 'vip', language: string): string {
  const reasons = {
    loyal: {
      ru: 'Скидка 10% за 4+ категории',
      en: '10% discount for 4+ categories',
      pl: '10% rabatu za 4+ kategorie',
      uk: 'Знижка 10% за 4+ категорії',
    },
    vip: {
      ru: 'Скидка 15% за 6+ категорий',
      en: '15% discount for 6+ categories',
      pl: '15% rabatu za 6+ kategorii',
      uk: 'Знижка 15% за 6+ категорій',
    },
  };
  
  return reasons[type][language as keyof typeof reasons.multi] || reasons[type].ru;
}

// Получить текст для блока с информацией о скидках
export function getDiscountTiers(language: string) {
  const tiers = {
    ru: [
      { services: '4+', discount: '10%', label: 'категорий' },
      { services: '6+', discount: '15%', label: 'категорий' },
    ],
    en: [
      { services: '4+', discount: '10%', label: 'categories' },
      { services: '6+', discount: '15%', label: 'categories' },
    ],
    pl: [
      { services: '4+', discount: '10%', label: 'kategorii' },
      { services: '6+', discount: '15%', label: 'kategorii' },
    ],
    uk: [
      { services: '4+', discount: '10%', label: 'категорій' },
      { services: '6+', discount: '15%', label: 'категорій' },
    ],
  };
  
  return tiers[language as keyof typeof tiers] || tiers.ru;
}
