/**
 * Единый источник цен для химчистки мебели, матрасов и кожаной мебели.
 *
 * Базовые (вроцлавские) цены хранятся здесь как fallback, а актуальные значения
 * подтягиваются из таблицы Supabase `prices` (service_key -> price_value).
 * Благодаря этому поднять/опустить цены можно в одном месте — в базе,
 * без правок в компонентах и калькуляторах.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const BASE_SERVICE_PRICES: Record<string, number> = {
  // Мебель
  pouf: 50,
  chair: 35,
  chairSeat: 25,
  chairWithBack: 35,
  chairConference: 50,
  chairSwivel: 60,
  armchair: 95,
  pillow: 15,
  sofa2: 185,
  sofa3: 210,
  sofaCorner: 265,
  sofaCornerLarge: 325,
  kitchenCorner: 210,
  carseat: 80,
  stroller: 100,
  // Матрасы и кровати
  mattressSingle: 150,
  mattressDouble: 230,
  mattressSingleDry: 150,
  mattressDoubleDry: 230,
  mattressSingleDry2: 230,
  mattressDoubleDry2: 345,
  bedHeadboard: 115,
  bedFrame: 115,
  bedHeadboardM: 115,
  bedFrameM: 115,
  // Кожаная мебель
  leatherPouf: 60,
  leatherChair: 60,
  leatherChairSwivel: 85,
  leatherArmchair: 105,
  leatherPillow: 25,
  leatherSofa2: 185,
  leatherSofa3: 230,
  leatherSofaCorner: 290,
};

export type ServicePriceKey = keyof typeof BASE_SERVICE_PRICES;

const PRICES_EVENT = 'mc_service_prices_updated';
const CACHE_KEY = 'mc_service_prices_v1';

let overrides: Record<string, number> = {};
let loaded = false;

// Мгновенно поднимаем последние известные цены из sessionStorage,
// чтобы не мигать старыми значениями до ответа базы.
try {
  const cached = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(CACHE_KEY) : null;
  if (cached) overrides = JSON.parse(cached) || {};
} catch {
  overrides = {};
}

/** Цена услуги: значение из базы, иначе базовое значение из кода. */
export const servicePrice = (key: string): number =>
  overrides[key] ?? BASE_SERVICE_PRICES[key] ?? 0;

/** Загружает цены из Supabase (один раз за сессию приложения). */
export async function loadServicePrices(force = false): Promise<void> {
  if (loaded && !force) return;
  loaded = true;
  try {
    const { data, error } = await supabase.from('prices').select('service_key, price_value');
    if (error || !data?.length) return;
    const next: Record<string, number> = {};
    for (const row of data) {
      const value = Number(row.price_value);
      if (row.service_key && Number.isFinite(value) && value >= 0) {
        next[row.service_key] = value;
      }
    }
    if (!Object.keys(next).length) return;
    overrides = next;
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota errors */
    }
    window.dispatchEvent(new Event(PRICES_EVENT));
  } catch {
    /* цены останутся базовыми */
  }
}

/**
 * Подписка на обновление цен. Возвращает версию — меняется после загрузки цен
 * из базы, что заставляет дерево перерисоваться с актуальными значениями.
 */
export function useServicePrices(): number {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    let active = true;
    const onUpdate = () => active && setVersion(v => v + 1);
    window.addEventListener(PRICES_EVENT, onUpdate);
    void loadServicePrices();
    return () => {
      active = false;
      window.removeEventListener(PRICES_EVENT, onUpdate);
    };
  }, []);
  return version;
}
