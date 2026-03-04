import { useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export interface DiscountInfo {
  originalTotal: number;
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
  discountReason: string;
  hasDiscount: boolean;
  hasMattressDiscount: boolean;
  mattressDiscountAmount: number;
}

interface CalculatorItem {
  id: string;
  price: number;
  quantity: number;
  category?: string;
}

// Нормализация категории: уборка и доп. услуги считаются как одна категория
function normalizeCategory(item: CalculatorItem): string {
  const cat = item.category || item.id;
  // cleaning_ prefix (уборка) и extra- prefix (доп. услуги к уборке) → одна категория
  if (cat.startsWith('cleaning_') || cat.startsWith('extra-') || cat === 'cleaning') return 'cleaning';
  return cat;
}

// ID матрасов для определения скидки
const MATTRESS_IDS = [
  'mattressDouble', 'mattressSingle', 'mattressSingleDry', 'mattressSingleDry2',
  'mattressDoubleDry', 'mattressDoubleDry2'
];

/**
 * Алгоритм расчёта скидок:
 * - 10% на один матрас (если заказан ровно 1 матрас с quantity=1)
 * - 10% при заказе из 2+ разных категорий услуг
 * - 15% при заказе из 4+ разных категорий
 * - 20% при заказе из 6+ разных категорий (VIP программа)
 */
export const useDiscountCalculator = (items: CalculatorItem[]) => {
  const { language } = useLanguage();

  const discountInfo = useMemo((): DiscountInfo => {
    const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Подсчитываем количество уникальных категорий (уборка + доп. услуги = одна категория)
    const uniqueCategories = new Set(items.map(normalizeCategory));
    const uniqueCategoriesCount = uniqueCategories.size;
    
    // Проверяем скидку на один матрас
    const mattressItems = items.filter(item => MATTRESS_IDS.includes(item.id));
    const hasSingleMattress = mattressItems.length === 1 && 
                               mattressItems[0].quantity === 1 && 
                               uniqueCategoriesCount === 1;
    
    let discountPercent = 0;
    let discountReason = '';
    let hasMattressDiscount = false;
    let mattressDiscountAmount = 0;
    
    // Скидка на один матрас (только если один матрас и больше ничего)
    if (hasSingleMattress) {
      discountPercent = 5;
      discountReason = getMattressDiscountReason(language);
      hasMattressDiscount = true;
      mattressDiscountAmount = Math.round(originalTotal * 0.05);
    }
    // Определяем скидку на основе количества уникальных категорий
    else if (uniqueCategoriesCount >= 6) {
      discountPercent = 15;
      discountReason = getDiscountReason('vip', language);
    } else if (uniqueCategoriesCount >= 4) {
      discountPercent = 10;
      discountReason = getDiscountReason('loyal', language);
    } else if (uniqueCategoriesCount >= 2) {
      discountPercent = 5;
      discountReason = getDiscountReason('multi', language);
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
      hasMattressDiscount,
      mattressDiscountAmount,
    };
  }, [items, language]);

  return discountInfo;
};

function getMattressDiscountReason(language: string): string {
  const reasons = {
    ru: 'Скидка 5% на химчистку матраса',
    en: '5% off mattress cleaning',
    pl: '5% rabatu na czyszczenie materaca',
    uk: 'Знижка 5% на хімчистку матраца',
  };
  
  return reasons[language as keyof typeof reasons] || reasons.ru;
}

function getDiscountReason(type: 'multi' | 'loyal' | 'vip', language: string): string {
  const reasons = {
    multi: {
      ru: 'Скидка 5% за 2+ категории',
      en: '5% discount for 2+ categories',
      pl: '5% rabatu za 2+ kategorie',
      uk: 'Знижка 5% за 2+ категорії',
    },
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
      { services: '2+', discount: '5%', label: 'категорий' },
      { services: '4+', discount: '10%', label: 'категорий' },
      { services: '6+', discount: '15%', label: 'категорий' },
    ],
    en: [
      { services: '2+', discount: '5%', label: 'categories' },
      { services: '4+', discount: '10%', label: 'categories' },
      { services: '6+', discount: '15%', label: 'categories' },
    ],
    pl: [
      { services: '2+', discount: '5%', label: 'kategorii' },
      { services: '4+', discount: '10%', label: 'kategorii' },
      { services: '6+', discount: '15%', label: 'kategorii' },
    ],
    uk: [
      { services: '2+', discount: '5%', label: 'категорій' },
      { services: '4+', discount: '10%', label: 'категорій' },
      { services: '6+', discount: '15%', label: 'категорій' },
    ],
  };
  
  return tiers[language as keyof typeof tiers] || tiers.ru;
}
