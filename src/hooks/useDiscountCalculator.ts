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
  if (cat === 'cleaning' || cat.startsWith('cleaning_') || cat.startsWith('cleaning-') || cat.startsWith('extra-') || cat === 'extras') return 'cleaning';
  if (cat === 'other') return 'furniture';
  return cat;
}

/**
 * Скидка 22% — когда в заказе есть «Уборка» + минимум 1 другая категория услуг.
 * Иначе скидки нет.
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

    if (hasCleaning && hasOther && meetsMinimum) {
      discountPercent = 22;
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
      ru: 'Скидка 22% — уборка + ещё одна услуга',
      en: '22% off — cleaning + any other service',
      pl: 'Rabat 22% — sprzątanie + dowolna druga usługa',
      uk: 'Знижка 22% — прибирання + будь-яка інша послуга',
    },
  };
  return reasons[type][language as keyof typeof reasons.cleaningPlus] || reasons[type].ru;
}

function getDiscountHint(hasCleaning: boolean, hasOther: boolean, language: string): string {
  if (hasCleaning && hasOther) return '';
  const cats = getDiscountEligibleCategories(language).join(', ');
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
  if (!hasCleaning && !hasOther) return l.empty;
  if (hasCleaning && !hasOther) return l.needOther;
  return l.needCleaning;
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
