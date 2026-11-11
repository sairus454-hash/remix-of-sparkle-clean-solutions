/**
 * Carpet washing with pickup ("Pranie dywanów z odbiorem") has its own minimum order.
 * Single source for the amount and its localized notes (price cards, order form, tests).
 */
export const CARPET_PICKUP_ID = 'carpetPickup';
export const CARPET_PICKUP_MIN_ORDER = 100;

type Lang = 'pl' | 'ru' | 'en' | 'uk';

const NOTE: Record<Lang, string> = {
  pl: `Minimalne zamówienie: ${CARPET_PICKUP_MIN_ORDER} zł`,
  ru: `Минимальный заказ: ${CARPET_PICKUP_MIN_ORDER} zł`,
  en: `Minimum order: ${CARPET_PICKUP_MIN_ORDER} zł`,
  uk: `Мінімальне замовлення: ${CARPET_PICKUP_MIN_ORDER} zł`,
};

const FORM_NOTE: Record<Lang, (shortfall: number) => string> = {
  pl: (s) => s > 0
    ? `Pranie dywanów z odbiorem: minimalne zamówienie ${CARPET_PICKUP_MIN_ORDER} zł. Przy mniejszym metrażu zapłacisz ${CARPET_PICKUP_MIN_ORDER} zł (brakuje ${s} zł).`
    : `Pranie dywanów z odbiorem: minimalne zamówienie ${CARPET_PICKUP_MIN_ORDER} zł.`,
  ru: (s) => s > 0
    ? `Стирка ковров с забором: минимальный заказ ${CARPET_PICKUP_MIN_ORDER} zł. При меньшей площади стоимость составит ${CARPET_PICKUP_MIN_ORDER} zł (не хватает ${s} zł).`
    : `Стирка ковров с забором: минимальный заказ ${CARPET_PICKUP_MIN_ORDER} zł.`,
  en: (s) => s > 0
    ? `Carpet washing with pickup: minimum order ${CARPET_PICKUP_MIN_ORDER} zł. For a smaller area you pay ${CARPET_PICKUP_MIN_ORDER} zł (${s} zł short).`
    : `Carpet washing with pickup: minimum order ${CARPET_PICKUP_MIN_ORDER} zł.`,
  uk: (s) => s > 0
    ? `Прання килимів із забором: мінімальне замовлення ${CARPET_PICKUP_MIN_ORDER} zł. За меншої площі вартість становитиме ${CARPET_PICKUP_MIN_ORDER} zł (бракує ${s} zł).`
    : `Прання килимів із забором: мінімальне замовлення ${CARPET_PICKUP_MIN_ORDER} zł.`,
};

const asLang = (lang: string): Lang => (lang === 'ru' || lang === 'en' || lang === 'uk' ? lang : 'pl');

export const isCarpetPickup = (id: string) => id === CARPET_PICKUP_ID;

export const carpetPickupMinNote = (lang: string) => NOTE[asLang(lang)];

/** How much the carpet-pickup part of an order is below the minimum (0 if not ordered or already enough). */
export function carpetPickupShortfall(items: { id: string; price: number; quantity: number }[]): number {
  const pickup = items.filter((i) => isCarpetPickup(i.id));
  if (pickup.length === 0) return 0;
  const subtotal = pickup.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return Math.max(0, CARPET_PICKUP_MIN_ORDER - subtotal);
}

/** Notice for the order form; null when carpet pickup is not in the order. */
export function carpetPickupFormNote(items: { id: string; price: number; quantity: number }[], lang: string): string | null {
  if (!items.some((i) => isCarpetPickup(i.id))) return null;
  return FORM_NOTE[asLang(lang)](carpetPickupShortfall(items));
}
