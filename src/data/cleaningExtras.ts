export interface CleaningExtra {
  id: string;
  name: string;
  standardPrice: number;
  generalPrice: number;
  unit?: string;
}

export const cleaningExtras: CleaningExtra[] = [
  { id: 'oven', name: 'Помоем духовку', standardPrice: 36.80, generalPrice: 46 },
  { id: 'hood', name: 'Помоем вытяжку', standardPrice: 36.80, generalPrice: 46 },
  { id: 'cabinets', name: 'Уберем в кухонных шкафчиках', standardPrice: 54.28, generalPrice: 67.85 },
  { id: 'dishes', name: 'Помоем посуду', standardPrice: 23, generalPrice: 28.75 },
  { id: 'fridge', name: 'Почистим холодильник', standardPrice: 36.80, generalPrice: 46 },
  { id: 'microwave', name: 'Помоем микроволновку', standardPrice: 16.56, generalPrice: 20.70 },
  { id: 'balcony', name: 'Уберем на балконе', standardPrice: 27.60, generalPrice: 34.50 },
  { id: 'windowInside', name: 'Мытье окон (внутренняя сторона, шт.)', standardPrice: 27.60, generalPrice: 34.50 },
  { id: 'ironing', name: 'Глажка', standardPrice: 46, generalPrice: 57.50, unit: '/ч' },
  { id: 'petLitter', name: 'Убрать лоток для животных', standardPrice: 9.20, generalPrice: 11.50 },
  { id: 'extraHours', name: 'Дополнительные часы', standardPrice: 46, generalPrice: 57.50, unit: '/ч' },
  { id: 'closet', name: 'Убрать в шкафу', standardPrice: 27.60, generalPrice: 34.50 },
];
