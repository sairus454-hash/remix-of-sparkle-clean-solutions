// Single source of apartment/house cleaning prices (base Wrocław, PLN).
// Shared by the website calculators/price lists and the chat-bot prompt so
// every place shows the same numbers. City markup is applied on top elsewhere.

/** Price per m² for standard and general (deep) cleaning. */
export const CLEANING_PER_M2 = { standard: 9, general: 12 } as const;

/** Flat one-time apartment cleaning prices (before frequency discounts). */
export const APARTMENT_CLEANING_PRICES = { a40: 239, a60: 287, a80: 335 } as const;

/** Flat one-time standard house cleaning prices by area tier. */
export const HOUSE_CLEANING_PRICES = { h100: 420, h150: 480, h150plus: 600 } as const;

/** Add-on services to cleaning: price with standard / general cleaning. */
export const CLEANING_EXTRA_PRICES = {
  oven: { standard: 42, general: 53 },
  hood: { standard: 42, general: 53 },
  cabinets: { standard: 42, general: 42 },
  dishes: { standard: 27, general: 32 },
  fridge: { standard: 42, general: 53 },
  fridgeSmall: { standard: 21, general: 21 },
  microwave: { standard: 11, general: 11 },
  balcony: { standard: 9, general: 9 }, // per m²
  ironing: { standard: 53, general: 63 }, // per hour
  petLitter: { standard: 11, general: 16 },
  closet: { standard: 32, general: 37 },
  windowInside: { standard: 32, general: 32 }, // per window
  extraHours: { standard: 53, general: 53 }, // per hour
  moldRemoval: { standard: 84, general: 84 },
} as const;

export type CleaningExtraId = keyof typeof CLEANING_EXTRA_PRICES;

export const extraPrice = (id: CleaningExtraId, type: 'standard' | 'general' = 'standard'): number =>
  CLEANING_EXTRA_PRICES[id][type];
