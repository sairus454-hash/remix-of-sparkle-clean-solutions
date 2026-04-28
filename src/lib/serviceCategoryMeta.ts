import {
  Home, Sofa, BedDouble, Armchair, Car, Wind, Package, Sparkles, Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Single source of truth for category titles + icons used by the smart filter
 * on both /prices and /city/:slug pages. Guarantees that chip labels stay
 * identical across pages and across all 4 supported languages (PL/RU/EN/UK)
 * because they all flow through the existing translation dictionaries.
 */
export interface ServiceCategoryMeta {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function getServiceCategoryMeta(t: any): Record<string, ServiceCategoryMeta> {
  return {
    cleaning: {
      id: 'cleaning',
      title: t.nav?.cleaning || 'Sprzątanie',
      description: t.cleaning?.subtitle || '',
      icon: Home,
    },
    furniture: {
      id: 'furniture',
      title: t.prices?.furniture || 'Meble',
      description: t.prices?.furnitureDesc || '',
      icon: Sofa,
    },
    mattress: {
      id: 'mattress',
      title: t.prices?.mattressTitle || 'Materace',
      description: t.prices?.mattressDesc || '',
      icon: BedDouble,
    },
    leather: {
      id: 'leather',
      title: t.prices?.leatherFurnitureTitle || 'Meble skórzane',
      description: t.prices?.leatherFurnitureDesc || '',
      icon: Armchair,
    },
    auto: {
      id: 'auto',
      title: t.prices?.autoCleaning || 'Auto',
      description: t.prices?.autoCleaningDesc || '',
      icon: Car,
    },
    ozone: {
      id: 'ozone',
      title: t.prices?.ozonation || 'Ozonowanie',
      description: t.prices?.ozonationDesc || '',
      icon: Wind,
    },
    other: {
      id: 'other',
      title: t.prices?.other || 'Inne',
      description: t.prices?.otherDesc || '',
      icon: Package,
    },
    windows: {
      id: 'windows',
      title: t.windows?.title || 'Mycie okien',
      description: t.windows?.subtitle || '',
      icon: Sparkles,
    },
    handyman: {
      id: 'handyman',
      title: t.handyman?.title || 'Złota rączka',
      description: t.handyman?.subtitle || '',
      icon: Wrench,
    },
  };
}
