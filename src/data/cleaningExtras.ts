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
  { id: 'cabinets', name: 'Уберем в кухонных шкафчиках', standardPrice: 55, generalPrice: 70 },
  { id: 'dishes', name: 'Помоем посуду', standardPrice: 25, generalPrice: 30 },
  { id: 'fridge', name: 'Почистим холодильник', standardPrice: 40, generalPrice: 50 },
  { id: 'microwave', name: 'Помоем микроволновку', standardPrice: 20, generalPrice: 25 },
  { id: 'balcony', name: 'Уберем на балконе', standardPrice: 30, generalPrice: 35 },
  { id: 'windowInside', name: 'Мытье окон (внутренняя сторона, шт.)', standardPrice: 30, generalPrice: 35 },
  { id: 'ironing', name: 'Глажка', standardPrice: 50, generalPrice: 60, unit: '/ч' },
  { id: 'petLitter', name: 'Убрать лоток для животных', standardPrice: 10, generalPrice: 15 },
  { id: 'extraHours', name: 'Дополнительные часы', standardPrice: 50, generalPrice: 60, unit: '/ч' },
  { id: 'closet', name: 'Убрать в шкафу', standardPrice: 30, generalPrice: 35 },
  { id: 'moldRemoval', name: 'Устранение грибка со стены', standardPrice: 80, generalPrice: 80 },
];
