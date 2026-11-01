import type { CalculatorData } from '@/types/calculator';

export const AUTO_SEAT_PRICES = {
  autoSeats: 300,
  autoLeatherSeats: 350,
} as const;

/** The ozone gift has no charge; the order retains the full seat-cleaning price. */
export function createAutoSeatPromoOrder(seatName: string, ozoneGiftName: string): CalculatorData {
  const items = [
    { id: 'autoSeats', name: seatName, price: AUTO_SEAT_PRICES.autoSeats, quantity: 1, category: 'auto' },
    { id: 'autoOzoneGift', name: ozoneGiftName, price: 0, quantity: 1, category: 'auto' },
  ];
  return { items, total: AUTO_SEAT_PRICES.autoSeats };
}