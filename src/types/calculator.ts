export interface CalculatorItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit?: string;
  category?: string;
}

export interface CalculatorData {
  items: CalculatorItem[];
  total: number;
}
