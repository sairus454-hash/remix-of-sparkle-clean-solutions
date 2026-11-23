import { describe, it, expect } from 'vitest';
import { BASE_SERVICE_PRICES, cityBasePrice } from '@/data/servicePrices';
import { computeEstimate, SERVICES_MENU } from './chatbot-pricing';

// Mirrors useCity.applyPrice for cities outside the Wrocław group.
const markup = (p: number) => Math.ceil(Math.round(p * 1.1 * 100) / 100 / 5) * 5;
const SOFAS = ['sofa2', 'sofa3', 'sofaCorner', 'sofaCornerLarge'] as const;

describe('sofa prices +15% only in Wrocław and Smolec', () => {
  it('Wrocław/Smolec fabric sofas cost 190 / 220 / 280 / 340 zł', () => {
    expect(SOFAS.map((id) => cityBasePrice(id, BASE_SERVICE_PRICES[id], true))).toEqual([190, 220, 280, 340]);
  });

  it('furniture-base cities (e.g. Legnica) keep 165 / 190 / 240 / 295 zł', () => {
    expect(SOFAS.map((id) => cityBasePrice(id, BASE_SERVICE_PRICES[id], false))).toEqual([165, 190, 240, 295]);
  });

  it('other cities (e.g. Opole) keep 185 / 210 / 265 / 325 zł', () => {
    expect(SOFAS.map((id) => markup(cityBasePrice(id, BASE_SERVICE_PRICES[id], false)))).toEqual([185, 210, 265, 325]);
  });

  it('leather sofas stay 185 / 230 / 290 zł', () => {
    expect([BASE_SERVICE_PRICES.leatherSofa2, BASE_SERVICE_PRICES.leatherSofa3, BASE_SERVICE_PRICES.leatherSofaCorner]).toEqual([185, 230, 290]);
  });

  it('chat quick estimate: 2-seat sofa is 190 zł in Wrocław and unchanged in Opole', () => {
    const furniture = SERVICES_MENU.find((s) => s.key === 'furniture')!;
    expect(computeEstimate(furniture, 2, 'Wrocław').max).toBe(190);
    expect(computeEstimate(furniture, 2, 'Opole').max).toBe(markup(170));
  });
});
