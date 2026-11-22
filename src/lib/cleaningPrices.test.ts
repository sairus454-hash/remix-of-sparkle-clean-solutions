import { describe, it, expect } from 'vitest';
import {
  CLEANING_PER_M2,
  APARTMENT_CLEANING_PRICES,
  HOUSE_CLEANING_PRICES,
  CLEANING_EXTRA_PRICES,
} from '../../supabase/functions/_shared/cleaningPrices';
import { SERVICES_MENU, computeEstimate } from './chatbot-pricing';
import { cleaningExtras } from '@/data/cleaningExtras';

// Nov 2026: apartment/house cleaning +20%, add-on services +5%, rounded UP to a whole złoty.
const up = (v: number, f: number) => Math.ceil(Math.round(v * f * 100) / 100);

describe('cleaning price increase', () => {
  it('per-m² cleaning is +20%: standard 7 → 9, general 10 → 12', () => {
    expect(CLEANING_PER_M2).toEqual({ standard: up(7, 1.2), general: up(10, 1.2) });
    expect(CLEANING_PER_M2).toEqual({ standard: 9, general: 12 });
  });

  it('apartment cleaning is +20%: 199/239/279 → 239/287/335', () => {
    expect(APARTMENT_CLEANING_PRICES).toEqual({ a40: 239, a60: 287, a80: 335 });
  });

  it('house cleaning is +20%: 350/400/500 → 420/480/600', () => {
    expect(HOUSE_CLEANING_PRICES).toEqual({ h100: 420, h150: 480, h150plus: 600 });
  });

  it('add-on services are +5% rounded up to whole złoty', () => {
    const old: Record<string, [number, number]> = {
      oven: [40, 50], hood: [40, 50], cabinets: [40, 40], dishes: [25, 30], fridge: [40, 50],
      fridgeSmall: [20, 20], microwave: [10, 10], balcony: [8, 8], ironing: [50, 60],
      petLitter: [10, 15], closet: [30, 35], windowInside: [30, 30], extraHours: [50, 50], moldRemoval: [80, 80],
    };
    for (const [id, [s, g]] of Object.entries(old)) {
      expect(CLEANING_EXTRA_PRICES[id as keyof typeof CLEANING_EXTRA_PRICES]).toEqual({ standard: up(s, 1.05), general: up(g, 1.05) });
    }
    expect(CLEANING_EXTRA_PRICES.oven.standard).toBe(42);
  });

  it('order form add-ons use the shared prices', () => {
    const oven = cleaningExtras.find(e => e.id === 'oven')!;
    expect([oven.standardPrice, oven.generalPrice]).toEqual([42, 53]);
  });

  it('chat quick estimate for an 80 m² house in Wrocław is 420 PLN', () => {
    const cleaning = SERVICES_MENU.find(s => s.key === 'cleaning')!;
    expect(computeEstimate(cleaning, 80, 'Wrocław')).toMatchObject({ min: 420, max: 420 });
  });
});

describe('chat-bot cleaning add-ons match the website', () => {
  it('chat-bot reads cabinets, microwave and balcony from the shared price list', async () => {
    const { readFileSync } = await import('node:fs');
    const src = readFileSync('supabase/functions/chat-bot/index.ts', 'utf8');
    expect(src.match(/\$\{CXP\.cabinets\.standard\} PLN/g)?.length).toBe(4);
    expect(src.match(/\$\{CXP\.microwave\.standard\} PLN/g)?.length).toBe(4);
    expect(src.match(/\$\{CXP\.balcony\.general\} PLN\/(m|м)²/g)?.length).toBe(4);
    expect([CLEANING_EXTRA_PRICES.cabinets.standard, CLEANING_EXTRA_PRICES.microwave.standard, CLEANING_EXTRA_PRICES.balcony.general]).toEqual([42, 11, 9]);
  });
});
