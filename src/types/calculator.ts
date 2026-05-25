export interface CalculatorItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit?: string;
  category?: string;
  /** If set, this item already has a per-item promo applied (was discounted from originalPrice).
   *  Used to exclude such items from the "−10% via form" furniture promo (no stacking). */
  originalPrice?: number;
}

export interface CalculatorData {
  items: CalculatorItem[];
  total: number;
}
