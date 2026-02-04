import { useState, useCallback } from 'react';
import { CalculatorData, CalculatorItem } from '@/types/calculator';

export const useCalculatorToForm = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);

  const sendToForm = useCallback((items: CalculatorItem[], total: number, currency: string, formRef?: HTMLElement | null) => {
    setCalculatorData({ items, total });
    
    // Scroll to form
    if (formRef) {
      formRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const clearCalculatorData = useCallback(() => {
    setCalculatorData(null);
  }, []);

  const formatCalculatorMessage = useCallback((
    data: CalculatorData | null,
    currency: string,
    language: string
  ): string => {
    if (!data || data.items.length === 0) return '';

    const orderLabel = language === 'ru' ? 'Заказ из калькулятора:' :
                       language === 'pl' ? 'Zamówienie z kalkulatora:' :
                       language === 'uk' ? 'Замовлення з калькулятора:' :
                       'Order from calculator:';
    
    const totalLabel = language === 'ru' ? 'Итого:' :
                       language === 'pl' ? 'Razem:' :
                       language === 'uk' ? 'Разом:' :
                       'Total:';

    const lines = data.items.map(item => {
      const unitPart = item.unit ? ` (${item.unit})` : '';
      return `• ${item.name}${unitPart} × ${item.quantity} = ${item.price * item.quantity} ${currency}`;
    });

    return `${orderLabel}\n${lines.join('\n')}\n\n${totalLabel} ${data.total} ${currency}`;
  }, []);

  return {
    calculatorData,
    sendToForm,
    clearCalculatorData,
    formatCalculatorMessage,
  };
};
