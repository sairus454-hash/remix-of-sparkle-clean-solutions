import { CLEANING_EXTRA_PRICES as CXP } from '../../supabase/functions/_shared/cleaningPrices';

export interface CleaningExtra {
  id: string;
  name: string;
  standardPrice: number;
  generalPrice: number;
  unit?: string;
}

export const cleaningExtras: CleaningExtra[] = [
  { id: 'oven', name: 'Помоем духовку', standardPrice: CXP.oven.standard, generalPrice: CXP.oven.general },
  { id: 'hood', name: 'Помоем вытяжку', standardPrice: CXP.hood.standard, generalPrice: CXP.hood.general },
  { id: 'cabinets', name: 'Уберем в кухонных шкафчиках', standardPrice: CXP.cabinets.standard, generalPrice: CXP.cabinets.general },
  { id: 'dishes', name: 'Помоем посуду', standardPrice: CXP.dishes.standard, generalPrice: CXP.dishes.general },
  { id: 'fridge', name: 'Почистим холодильник', standardPrice: CXP.fridge.standard, generalPrice: CXP.fridge.general },
  { id: 'fridgeSmall', name: 'Холодильник малый', standardPrice: CXP.fridgeSmall.standard, generalPrice: CXP.fridgeSmall.general },
  { id: 'microwave', name: 'Помоем микроволновку', standardPrice: CXP.microwave.standard, generalPrice: CXP.microwave.general },
  { id: 'balcony', name: 'Уберем на балконе', standardPrice: CXP.balcony.standard, generalPrice: CXP.balcony.general, unit: '/m²' },
  { id: 'ironing', name: 'Глажка', standardPrice: CXP.ironing.standard, generalPrice: CXP.ironing.general, unit: '/ч' },
  { id: 'petLitter', name: 'Убрать лоток для животных', standardPrice: CXP.petLitter.standard, generalPrice: CXP.petLitter.general },
  { id: 'closet', name: 'Убрать в шкафу', standardPrice: CXP.closet.standard, generalPrice: CXP.closet.general },
];
