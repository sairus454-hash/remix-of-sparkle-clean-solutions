import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDiscountCalculator } from './useDiscountCalculator';

vi.mock('@/i18n/LanguageContext', () => ({ useLanguage: () => ({ language: 'pl' }) }));

describe('automatic order discounts', () => {
  it('does not discount cleaning plus a second non-furniture service', () => {
    const { result } = renderHook(() => useDiscountCalculator([
      { id: 'cleaning', category: 'cleaning', price: 350, quantity: 1 },
      { id: 'window', category: 'windows', price: 100, quantity: 1 },
    ]));
    expect(result.current.finalTotal).toBe(450);
    expect(result.current.hasDiscount).toBe(false);
    expect(result.current.discountHint).toBe('');
  });

  it('keeps the form discount only on furniture in a mixed order', () => {
    const { result } = renderHook(() => useDiscountCalculator([
      { id: 'cleaning', category: 'cleaning', price: 350, quantity: 1 },
      { id: 'sofa', category: 'furniture', price: 200, quantity: 1 },
    ]));
    expect(result.current.discountPercent).toBe(10);
    expect(result.current.discountAmount).toBe(20);
    expect(result.current.finalTotal).toBe(530);
  });

  it('supports furniture, mattresses and leather in city categories without stacking', () => {
    const { result } = renderHook(() => useDiscountCalculator([
      { id: 'sofa', category: 'city-legnica-furniture', price: 200, quantity: 2 },
      { id: 'mattress', category: 'mattress', price: 100, quantity: 1 },
      { id: 'leather', category: 'leather', price: 150, quantity: 1 },
      { id: 'promo', category: 'furniture', price: 90, originalPrice: 100, quantity: 1 },
    ]));
    expect(result.current.discountAmount).toBe(65);
    expect(result.current.finalTotal).toBe(675);
  });

  it('does not offer a promotion for an empty order', () => {
    const { result } = renderHook(() => useDiscountCalculator([]));
    expect(result.current.finalTotal).toBe(0);
    expect(result.current.discountReason).toBe('');
    expect(result.current.discountHint).toBe('');
  });
});