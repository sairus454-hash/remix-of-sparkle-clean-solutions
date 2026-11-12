import { describe, it, expect } from 'vitest';
import { CARPET_PICKUP_MIN_ORDER, carpetPickupShortfall, carpetPickupFormNote } from './carpetPickupMinimum';

describe('carpet pickup minimum order', () => {
  it('is 100 zł', () => {
    expect(CARPET_PICKUP_MIN_ORDER).toBe(100);
  });

  it('reports the shortfall when the carpet pickup part is below 100 zł', () => {
    // 3 m² × 30 zł = 90 zł → 10 zł short
    expect(carpetPickupShortfall([{ id: 'carpetPickup', price: 30, quantity: 3 }])).toBe(10);
  });

  it('has no shortfall at or above 100 zł, or without carpet pickup', () => {
    expect(carpetPickupShortfall([{ id: 'carpetPickup', price: 30, quantity: 4 }])).toBe(0);
    expect(carpetPickupShortfall([{ id: 'sofa2', price: 165, quantity: 1 }])).toBe(0);
    expect(carpetPickupFormNote([{ id: 'sofa2', price: 165, quantity: 1 }], 'pl')).toBeNull();
  });
});

describe('carpet pickup order form note', () => {
  it('tells the customer the 100 zł minimum and how much is missing', () => {
    const note = carpetPickupFormNote([{ id: 'carpetPickup', price: 30, quantity: 2 }], 'pl');
    expect(note).toContain('100 zł');
    expect(note).toContain('40 zł');
  });
});
