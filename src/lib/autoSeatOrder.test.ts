import { describe, expect, it } from 'vitest';
import { AUTO_SEAT_PRICES, createAutoSeatPromoOrder } from './autoSeatOrder';

describe('car seat prices', () => {
  it('charges 350 PLN for leather seats', () => {
    expect(AUTO_SEAT_PRICES.autoLeatherSeats).toBe(350);
  });

  it('charges 300 PLN for front and rear seats, including quick orders', () => {
    const order = createAutoSeatPromoOrder('Front and rear seats', 'Ozone gift');
    expect(order.items.find(item => item.id === 'autoSeats')?.price).toBe(300);
    expect(order.total).toBe(300);
    expect(order.total).toBe(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  });
});