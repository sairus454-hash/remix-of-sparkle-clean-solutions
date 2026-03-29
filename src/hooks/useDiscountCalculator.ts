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
  // cleaning, extra- (доп. услуги к уборке) → одна категория «cleaning»
  if (cat === 'cleaning' || cat.startsWith('cleaning_') || cat.startsWith('extra-') || cat === 'extras') return 'cleaning';
  // other («другое») → объединяем с furniture, не считается отдельной категорией
  if (cat === 'other') return 'furniture';
  // Все items без явной категории группируются по их id-префиксу
  return cat;
}

// ID матрасов для определения скидки
const MATTRESS_IDS = [
  'mattressDouble', 'mattressSingle', 'mattressSingleDry', 'mattressSingleDry2',
  'mattressDoubleDry', 'mattressDoubleDry2'
];

// Категории, подпадающие под акцию «Первый заказ -10%»
const FIRST_ORDER_CATEGORIES = ['furniture', 'leather', 'mattress'];

// ID позиций, исключённых из скидок
const EXCLUDED_IDS = ['expressRefresh', 'expressRefreshM'];

/**
 * Алгоритм расчёта скидок:
 * - 10% на первый заказ (мебель, матрасы, кожа) — если ВСЕ позиции из этих категорий
 * - 10% при заказе из 2+ разных категорий услуг
 * - 15% при заказе из 4+ разных категорий
 * - 20% при заказе из 6+ разных категорий (VIP программа)
 * 
 * Акция «Первый заказ» применяется если все позиции из категорий мебель/матрасы/кожа
 * и это выгоднее чем скидка по количеству категорий.
 */
export const useDiscountCalculator = (items: CalculatorItem[]) => {
  const { language } = useLanguage();

  const discountInfo = useMemo((): DiscountInfo => {
    const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Подсчитываем количество уникальных категорий (уборка + доп. услуги = одна категория)
    const uniqueCategories = new Set(items.map(normalizeCategory));
    const uniqueCategoriesCount = uniqueCategories.size;
    
    // Проверяем, все ли позиции из категорий «мебель/матрасы/кожа» (акция первого заказа)
    const allItemsAreFirstOrderEligible = items.length > 0 && items.every(item => {
      const cat = normalizeCategory(item);
      return FIRST_ORDER_CATEGORIES.includes(cat);
    });

    // Исключаем позиции expressRefresh из скидки
    const hasExcludedItems = items.some(item => EXCLUDED_IDS.includes(item.id));
    
    let discountPercent = 0;
    let discountReason = '';
    let hasMattressDiscount = false;
    let mattressDiscountAmount = 0;
    let hasFirstOrderDiscount = false;
    let firstOrderDiscountAmount = 0;

    // Определяем скидку по категориям
    let categoryDiscountPercent = 0;
    if (uniqueCategoriesCount >= 6) {
      categoryDiscountPercent = 15;
    } else if (uniqueCategoriesCount >= 4) {
      categoryDiscountPercent = 10;
    } else if (uniqueCategoriesCount >= 2) {
      categoryDiscountPercent = 5;
    }

    // Акция «Первый заказ» — 10% на мебель/матрасы/кожу
    if (allItemsAreFirstOrderEligible && !hasExcludedItems) {
      const firstOrderPercent = 10;
      if (firstOrderPercent >= categoryDiscountPercent) {
        discountPercent = firstOrderPercent;
        discountReason = getFirstOrderDiscountReason(language);
        hasFirstOrderDiscount = true;
        firstOrderDiscountAmount = Math.round(originalTotal * 0.10);
      } else {
        discountPercent = categoryDiscountPercent;
        discountReason = getDiscountReason(
          categoryDiscountPercent >= 15 ? 'vip' : categoryDiscountPercent >= 10 ? 'loyal' : 'multi', 
          language
        );
      }
    }
    // Скидка по количеству категорий
    else if (categoryDiscountPercent > 0) {
      discountPercent = categoryDiscountPercent;
      discountReason = getDiscountReason(
        categoryDiscountPercent >= 15 ? 'vip' : categoryDiscountPercent >= 10 ? 'loyal' : 'multi', 
        language
      );
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
      hasFirstOrderDiscount,
      firstOrderDiscountAmount,
    };
  }, [items, language]);

  return discountInfo;
};

function getFirstOrderDiscountReason(language: string): string {
  const reasons = {
    ru: 'Акция: -10% на первый заказ (мебель, матрасы, кожа)',
    en: '10% off first order (furniture, mattresses, leather)',
    pl: 'Promocja: -10% na pierwsze zamówienie (meble, materace, skóra)',
    uk: 'Акція: -10% на перше замовлення (меблі, матраци, шкіра)',
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
      { services: '🪑', discount: '10%', label: 'первый заказ (мебель, матрасы, кожа)' },
      { services: '2+', discount: '5%', label: 'категорий' },
      { services: '4+', discount: '10%', label: 'категорий' },
      { services: '6+', discount: '15%', label: 'категорий' },
    ],
    en: [
      { services: '🪑', discount: '10%', label: 'first order (furniture, mattresses, leather)' },
      { services: '2+', discount: '5%', label: 'categories' },
      { services: '4+', discount: '10%', label: 'categories' },
      { services: '6+', discount: '15%', label: 'categories' },
    ],
    pl: [
      { services: '🪑', discount: '10%', label: 'pierwsze zamówienie (meble, materace, skóra)' },
      { services: '2+', discount: '5%', label: 'kategorii' },
      { services: '4+', discount: '10%', label: 'kategorii' },
      { services: '6+', discount: '15%', label: 'kategorii' },
    ],
    uk: [
      { services: '🪑', discount: '10%', label: 'перше замовлення (меблі, матраци, шкіра)' },
      { services: '2+', discount: '5%', label: 'категорій' },
      { services: '4+', discount: '10%', label: 'категорій' },
      { services: '6+', discount: '15%', label: 'категорій' },
    ],
  };
  
  return tiers[language as keyof typeof tiers] || tiers.ru;
}
