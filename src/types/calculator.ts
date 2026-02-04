export interface CalculatorItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit?: string;
}

export interface CalculatorData {
  items: CalculatorItem[];
  total: number;
}
