import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Calculator, ChevronRight, Sofa, Car, BedDouble, Home, Sparkles } from 'lucide-react';
import { CalculatorItem } from '@/types/calculator';
import { useDiscountCalculator } from '@/hooks/useDiscountCalculator';
import { cn } from '@/lib/utils';

interface QuickCalculatorProps {
  onOpenFull: () => void;
  onClose?: () => void;
}

type ServiceType = 'cleaning' | 'furniture' | 'mattress' | 'auto' | null;

const QuickCalculator = ({ onOpenFull, onClose }: QuickCalculatorProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // Step 1: Service type
  const [serviceType, setServiceType] = useState<ServiceType>(null);
  
  // Step 2: Specific options based on service type
  const [cleaningArea, setCleaningArea] = useState(50);
  const [cleaningType, setCleaningType] = useState<'standard' | 'general'>('standard');
  const [furnitureType, setFurnitureType] = useState<string>('sofa2');
  const [mattressType, setMattressType] = useState<string>('mattressDouble');
  const [autoType, setAutoType] = useState<string>('autoSeats');

  const STANDARD_PRICE_PER_M2 = 6;
  const GENERAL_PRICE_PER_M2 = 8;

  const serviceOptions = [
    { id: 'cleaning', label: t.cleaning?.service || 'Уборка', icon: Home },
    { id: 'furniture', label: t.prices.furniture, icon: Sofa },
    { id: 'mattress', label: t.prices.mattressTitle, icon: BedDouble },
    { id: 'auto', label: t.prices.autoCleaning, icon: Car },
  ];

  const furnitureOptions = [
    { id: 'armchair', name: t.prices.items.armchair, price: 70 },
    { id: 'sofa2', name: t.prices.items.sofa2, price: 140 },
    { id: 'sofa3', name: t.prices.items.sofa3, price: 170 },
    { id: 'sofaCorner', name: t.prices.items.sofaCorner, price: 200 },
  ];

  const mattressOptions = [
    { id: 'mattressSingle', name: t.prices.items.mattressSingle || 'Односпальный матрас', price: 140 },
    { id: 'mattressDouble', name: t.prices.items.mattressDouble || 'Двуспальный матрас', price: 180 },
    { id: 'mattressSingleDry2', name: t.prices.items.mattressSingleDry2, price: 220 },
    { id: 'mattressDoubleDry2', name: t.prices.items.mattressDoubleDry2, price: 280 },
  ];

  const autoOptions = [
    { id: 'autoSeats', name: t.prices.items.autoSeats, price: 300 },
    { id: 'autoComplex', name: t.prices.items.autoComplex, price: 450 },
    { id: 'autoLeatherSeats', name: t.prices.items.autoLeatherSeats, price: 350 },
    { id: 'autoComplexLeather', name: t.prices.items.autoComplexLeather, price: 550 },
  ];

  const getPrice = (): number => {
    switch (serviceType) {
      case 'cleaning':
        return cleaningArea * (cleaningType === 'standard' ? STANDARD_PRICE_PER_M2 : GENERAL_PRICE_PER_M2);
      case 'furniture':
        return furnitureOptions.find(o => o.id === furnitureType)?.price || 140;
      case 'mattress':
        return mattressOptions.find(o => o.id === mattressType)?.price || 180;
      case 'auto':
        return autoOptions.find(o => o.id === autoType)?.price || 300;
      default:
        return 0;
    }
  };

  const getSelectedItem = (): CalculatorItem | null => {
    if (!serviceType) return null;
    
    switch (serviceType) {
      case 'cleaning': {
        const typeName = cleaningType === 'standard' 
          ? (t.cleaning?.standardCleaning || 'Стандартная уборка')
          : (t.cleaning?.generalCleaning || 'Генеральная уборка');
        return {
          id: `cleaning_${cleaningType}_${cleaningArea}`,
          name: `${typeName} ${cleaningArea} м²`,
          price: getPrice(),
          quantity: 1,
        };
      }
      case 'furniture': {
        const option = furnitureOptions.find(o => o.id === furnitureType);
        return option ? { id: option.id, name: option.name, price: option.price, quantity: 1 } : null;
      }
      case 'mattress': {
        const option = mattressOptions.find(o => o.id === mattressType);
        return option ? { id: option.id, name: option.name, price: option.price, quantity: 1 } : null;
      }
      case 'auto': {
        const option = autoOptions.find(o => o.id === autoType);
        return option ? { id: option.id, name: option.name, price: option.price, quantity: 1 } : null;
      }
      default:
        return null;
    }
  };

  // Calculate discount
  const selectedItem = getSelectedItem();
  const discountInfo = useDiscountCalculator(
    selectedItem ? [{ id: selectedItem.id, price: selectedItem.price, quantity: 1 }] : []
  );

  const handleSubmit = () => {
    const item = getSelectedItem();
    if (!item) return;
    
    onClose?.();
    navigate('/contacts', { 
      state: { 
        calculatorItems: [item], 
        calculatorTotal: discountInfo.finalTotal,
        discountPercent: discountInfo.discountPercent,
        discountAmount: discountInfo.discountAmount,
      } 
    });
  };

  return (
    <div className="space-y-5">
      {/* Step 1: Choose service type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</span>
          {language === 'ru' ? 'Выберите услугу' : language === 'pl' ? 'Wybierz usługę' : language === 'uk' ? 'Оберіть послугу' : 'Choose service'}
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {serviceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setServiceType(option.id as ServiceType)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                  serviceType === option.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6",
                  serviceType === option.id ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-xs font-medium text-center",
                  serviceType === option.id ? "text-primary" : "text-foreground"
                )}>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Specific options */}
      {serviceType && (
        <div className="space-y-3 animate-fade-up">
          <Label className="text-sm font-medium flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</span>
            {language === 'ru' ? 'Уточните детали' : language === 'pl' ? 'Podaj szczegóły' : language === 'uk' ? 'Уточніть деталі' : 'Specify details'}
          </Label>
          
          {serviceType === 'cleaning' && (
            <div className="space-y-4 p-4 bg-accent/20 rounded-xl">
              <RadioGroup 
                value={cleaningType} 
                onValueChange={(v) => setCleaningType(v as 'standard' | 'general')}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="quick-standard" />
                  <Label htmlFor="quick-standard" className="text-sm cursor-pointer">
                    {t.cleaning?.standardCleaning || 'Стандартная'} ({STANDARD_PRICE_PER_M2} zł/м²)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="quick-general" />
                  <Label htmlFor="quick-general" className="text-sm cursor-pointer">
                    {t.cleaning?.generalCleaning || 'Генеральная'} ({GENERAL_PRICE_PER_M2} zł/м²)
                  </Label>
                </div>
              </RadioGroup>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{language === 'ru' ? 'Площадь' : language === 'pl' ? 'Powierzchnia' : language === 'uk' ? 'Площа' : 'Area'}</span>
                  <span className="text-sm font-bold text-primary">{cleaningArea} м²</span>
                </div>
                <Slider
                  value={[cleaningArea]}
                  onValueChange={(v) => setCleaningArea(v[0])}
                  min={20}
                  max={200}
                  step={5}
                />
              </div>
            </div>
          )}

          {serviceType === 'furniture' && (
            <RadioGroup 
              value={furnitureType} 
              onValueChange={setFurnitureType}
              className="space-y-2"
            >
              {furnitureOptions.map((opt) => (
                <div key={opt.id} className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.id} id={`quick-${opt.id}`} />
                    <Label htmlFor={`quick-${opt.id}`} className="text-sm cursor-pointer">{opt.name}</Label>
                  </div>
                  <span className="text-sm font-semibold text-primary">{opt.price} zł</span>
                </div>
              ))}
            </RadioGroup>
          )}

          {serviceType === 'mattress' && (
            <RadioGroup 
              value={mattressType} 
              onValueChange={setMattressType}
              className="space-y-2"
            >
              {mattressOptions.map((opt) => (
                <div key={opt.id} className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.id} id={`quick-${opt.id}`} />
                    <Label htmlFor={`quick-${opt.id}`} className="text-sm cursor-pointer">{opt.name}</Label>
                  </div>
                  <span className="text-sm font-semibold text-primary">{opt.price} zł</span>
                </div>
              ))}
            </RadioGroup>
          )}

          {serviceType === 'auto' && (
            <RadioGroup 
              value={autoType} 
              onValueChange={setAutoType}
              className="space-y-2"
            >
              {autoOptions.map((opt) => (
                <div key={opt.id} className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.id} id={`quick-${opt.id}`} />
                    <Label htmlFor={`quick-${opt.id}`} className="text-sm cursor-pointer">{opt.name}</Label>
                  </div>
                  <span className="text-sm font-semibold text-primary">{opt.price} zł</span>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      )}

      {/* Result & Actions */}
      {serviceType && (
        <div className="space-y-3 pt-2 border-t border-border animate-fade-up">
          {/* Price display */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {language === 'ru' ? 'Примерная стоимость' : language === 'pl' ? 'Przybliżony koszt' : language === 'uk' ? 'Орієнтовна вартість' : 'Estimated cost'}:
            </span>
            <div className="text-right">
              {discountInfo.discountPercent > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-muted-foreground">{discountInfo.originalTotal} zł</span>
                  <span className="text-xl font-bold text-primary">{discountInfo.finalTotal} zł</span>
                </div>
              ) : (
                <span className="text-xl font-bold text-primary">{getPrice()} zł</span>
              )}
            </div>
          </div>
          
          {discountInfo.discountPercent > 0 && (
            <div className="flex items-center gap-2 text-sm text-fresh">
              <Sparkles className="w-4 h-4" />
              <span>{discountInfo.discountReason}</span>
            </div>
          )}

          {/* Submit button */}
          <Button onClick={handleSubmit} className="w-full" size="lg">
            {language === 'ru' ? 'Оформить заказ' : language === 'pl' ? 'Złóż zamówienie' : language === 'uk' ? 'Оформити замовлення' : 'Place order'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>

          {/* Extended calculator button */}
          <Button 
            variant="outline" 
            onClick={onOpenFull}
            className="w-full"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {language === 'ru' ? 'Расширенный расчёт' : language === 'pl' ? 'Szczegółowa kalkulacja' : language === 'uk' ? 'Розширений розрахунок' : 'Detailed calculation'}
          </Button>
        </div>
      )}

      {/* If no service selected yet, show hint */}
      {!serviceType && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            {language === 'ru' ? 'Выберите услугу для расчёта' : language === 'pl' ? 'Wybierz usługę do kalkulacji' : language === 'uk' ? 'Оберіть послугу для розрахунку' : 'Select a service to calculate'}
          </p>
          <Button 
            variant="link" 
            onClick={onOpenFull}
            className="mt-2"
          >
            {language === 'ru' ? 'Или откройте расширенный калькулятор' : language === 'pl' ? 'Lub otwórz szczegółowy kalkulator' : language === 'uk' ? 'Або відкрийте розширений калькулятор' : 'Or open detailed calculator'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuickCalculator;
