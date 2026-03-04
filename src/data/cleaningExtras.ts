export interface CleaningExtra {
  id: string;
  name: string;
  standardPrice: number;
  generalPrice: number;
  unit?: string;
}

export const cleaningExtras: CleaningExtra[] = [
  { id: 'oven', name: 'Помоем духовку', standardPrice: 37, generalPrice: 46 },
  { id: 'hood', name: 'Помоем вытяжку', standardPrice: 37, generalPrice: 46 },
  { id: 'cabinets', name: 'Уберем в кухонных шкафчиках', standardPrice: 55, generalPrice: 68 },
  { id: 'dishes', name: 'Помоем посуду', standardPrice: 23, generalPrice: 29 },
  { id: 'fridge', name: 'Почистим холодильник', standardPrice: 37, generalPrice: 46 },
  { id: 'microwave', name: 'Помоем микроволновку', standardPrice: 17, generalPrice: 21 },
  { id: 'balcony', name: 'Уберем на балконе', standardPrice: 28, generalPrice: 35 },
  { id: 'windowInside', name: 'Мытье окон (внутренняя сторона, шт.)', standardPrice: 28, generalPrice: 35 },
  { id: 'ironing', name: 'Глажка', standardPrice: 46, generalPrice: 58, unit: '/ч' },
  { id: 'petLitter', name: 'Убрать лоток для животных', standardPrice: 9, generalPrice: 12 },
  { id: 'extraHours', name: 'Дополнительные часы', standardPrice: 46, generalPrice: 58, unit: '/ч' },
  { id: 'closet', name: 'Убрать в шкафу', standardPrice: 28, generalPrice: 35 },
  { id: 'moldRemoval', name: 'Устранение грибка со стены', standardPrice: 80, generalPrice: 80 },
];
