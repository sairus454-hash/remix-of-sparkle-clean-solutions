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
}

// ID матрасов для определения скидки
const MATTRESS_IDS = [
  'mattressDouble', 'mattressSingle', 'mattressSingleDry', 'mattressSingleDry2',
  'mattressDoubleDry', 'mattressDoubleDry2'
];

/**
 * Алгоритм расчёта скидок:
 * - 10% на один матрас (если заказан ровно 1 матрас с quantity=1)
 * - 10% при заказе от 2 разных услуг
 * - 15% при заказе от 4 разных услуг (для постоянных клиентов / крупный заказ)
 * - 20% при заказе от 6 разных услуг (VIP программа)
 */
export const useDiscountCalculator = (items: CalculatorItem[]) => {
  const { language } = useLanguage();

  const discountInfo = useMemo((): DiscountInfo => {
    const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Подсчитываем количество уникальных услуг (разных позиций)
    const uniqueServicesCount = items.length;
    
    // Проверяем скидку на один матрас
    const mattressItems = items.filter(item => MATTRESS_IDS.includes(item.id));
    const hasSingleMattress = mattressItems.length === 1 && 
                               mattressItems[0].quantity === 1 && 
                               uniqueServicesCount === 1;
    
    let discountPercent = 0;
    let discountReason = '';
    let hasMattressDiscount = false;
    let mattressDiscountAmount = 0;
    
    // Скидка на один матрас (только если один матрас и больше ничего)
    if (hasSingleMattress) {
      discountPercent = 10;
      discountReason = getMattressDiscountReason(language);
      hasMattressDiscount = true;
      mattressDiscountAmount = Math.round(originalTotal * 0.1);
    }
    // Определяем скидку на основе количества уникальных услуг
    else if (uniqueServicesCount >= 6) {
      discountPercent = 20;
      discountReason = getDiscountReason('vip', language);
    } else if (uniqueServicesCount >= 4) {
      discountPercent = 15;
      discountReason = getDiscountReason('loyal', language);
    } else if (uniqueServicesCount >= 2) {
      discountPercent = 10;
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
    ru: 'Скидка 10% на химчистку матраса',
    en: '10% off mattress cleaning',
    pl: '10% rabatu na czyszczenie materaca',
    uk: 'Знижка 10% на хімчистку матраца',
  };
  
  return reasons[language as keyof typeof reasons] || reasons.ru;
}

function getDiscountReason(type: 'multi' | 'loyal' | 'vip', language: string): string {
  const reasons = {
    multi: {
      ru: 'Скидка 10% за 2+ услуги',
      en: '10% discount for 2+ services',
      pl: '10% rabatu za 2+ usługi',
      uk: 'Знижка 10% за 2+ послуги',
    },
    loyal: {
      ru: 'Скидка 15% за 4+ услуги',
      en: '15% discount for 4+ services',
      pl: '15% rabatu za 4+ usługi',
      uk: 'Знижка 15% за 4+ послуги',
    },
    vip: {
      ru: 'VIP скидка 20% за 6+ услуг',
      en: 'VIP 20% discount for 6+ services',
      pl: 'VIP 20% rabatu za 6+ usług',
      uk: 'VIP знижка 20% за 6+ послуг',
    },
  };
  
  return reasons[type][language as keyof typeof reasons.multi] || reasons[type].ru;
}

// Получить текст для блока с информацией о скидках
export function getDiscountTiers(language: string) {
  const tiers = {
    ru: [
      { services: '2+', discount: '10%', label: 'услуг' },
      { services: '4+', discount: '15%', label: 'услуг' },
      { services: '6+', discount: '20%', label: 'услуг (VIP)' },
    ],
    en: [
      { services: '2+', discount: '10%', label: 'services' },
      { services: '4+', discount: '15%', label: 'services' },
      { services: '6+', discount: '20%', label: 'services (VIP)' },
    ],
    pl: [
      { services: '2+', discount: '10%', label: 'usług' },
      { services: '4+', discount: '15%', label: 'usług' },
      { services: '6+', discount: '20%', label: 'usług (VIP)' },
    ],
    uk: [
      { services: '2+', discount: '10%', label: 'послуг' },
      { services: '4+', discount: '15%', label: 'послуг' },
      { services: '6+', discount: '20%', label: 'послуг (VIP)' },
    ],
  };
  
  return tiers[language as keyof typeof tiers] || tiers.ru;
}
