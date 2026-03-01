export interface CleaningExtra {
  id: string;
  name: string;
  standardPrice: number;
  generalPrice: number;
  unit?: string;
}

export const cleaningExtras: CleaningExtra[] = [
  { id: 'oven', name: 'Помоем духовку', standardPrice: 32, generalPrice: 40 },
  { id: 'hood', name: 'Помоем вытяжку', standardPrice: 32, generalPrice: 40 },
  { id: 'cabinets', name: 'Уберем в кухонных шкафчиках', standardPrice: 47.20, generalPrice: 59 },
  { id: 'dishes', name: 'Помоем посуду', standardPrice: 20, generalPrice: 25 },
  { id: 'fridge', name: 'Почистим холодильник', standardPrice: 32, generalPrice: 40 },
  { id: 'microwave', name: 'Помоем микроволновку', standardPrice: 14.40, generalPrice: 18 },
  { id: 'balcony', name: 'Уберем на балконе', standardPrice: 24, generalPrice: 30 },
  { id: 'windowInside', name: 'Мытье окон (внутренняя сторона, шт.)', standardPrice: 24, generalPrice: 30 },
  { id: 'ironing', name: 'Глажка', standardPrice: 40, generalPrice: 50, unit: '/ч' },
  { id: 'petLitter', name: 'Убрать лоток для животных', standardPrice: 8, generalPrice: 10 },
  { id: 'extraHours', name: 'Дополнительные часы', standardPrice: 40, generalPrice: 50, unit: '/ч' },
  { id: 'closet', name: 'Убрать в шкафу', standardPrice: 24, generalPrice: 30 },
];
