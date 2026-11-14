import { describe, it, expect } from 'vitest';
import { SERVICES_MENU, computeEstimate } from './chatbot-pricing';

const carpet = SERVICES_MENU.find((s) => s.key === 'carpetPickup')!;
const furniture = SERVICES_MENU.find((s) => s.key === 'furniture')!;

describe('chat quick estimate — carpet washing with pickup', () => {
  it('uses its own 100 PLN minimum: 2 m² = 60 PLN is below it', () => {
    const r = computeEstimate(carpet, 2, 'Wrocław');
    expect(r.max).toBe(60);
    expect(r.minOrder).toBe(100);
    expect(r.belowMin).toBe(true);
  });

  it('5 m² costs 150 PLN and meets the minimum', () => {
    const r = computeEstimate(carpet, 5, 'Wrocław');
    expect(r.max).toBe(150);
    expect(r.belowMin).toBe(false);
  });

  it('keeps the general 160 PLN minimum for other services in Wrocław', () => {
    expect(computeEstimate(furniture, 2, 'Wrocław').minOrder).toBe(160);
  });
});
