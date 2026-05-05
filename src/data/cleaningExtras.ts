export interface CleaningExtra {
  id: string;
  name: string;
  standardPrice: number;
  generalPrice: number;
  unit?: string;
}

export const cleaningExtras: CleaningExtra[] = [
  { id: 'oven', name: 'Помоем духовку', standardPrice: 40, generalPrice: 50 },
  { id: 'hood', name: 'Помоем вытяжку', standardPrice: 40, generalPrice: 50 },
  { id: 'cabinets', name: 'Уберем в кухонных шкафчиках', standardPrice: 40, generalPrice: 40 },
  { id: 'dishes', name: 'Помоем посуду', standardPrice: 25, generalPrice: 30 },
  { id: 'fridge', name: 'Почистим холодильник', standardPrice: 40, generalPrice: 50 },
  { id: 'microwave', name: 'Помоем микроволновку', standardPrice: 10, generalPrice: 10 },
  { id: 'balcony', name: 'Уберем на балконе', standardPrice: 8, generalPrice: 8, unit: '/m²' },
  { id: 'ironing', name: 'Глажка', standardPrice: 50, generalPrice: 60, unit: '/ч' },
  { id: 'petLitter', name: 'Убрать лоток для животных', standardPrice: 10, generalPrice: 15 },
  { id: 'closet', name: 'Убрать в шкафу', standardPrice: 30, generalPrice: 35 },
];
