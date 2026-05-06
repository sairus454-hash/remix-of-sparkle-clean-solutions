import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import CircularRevealCard from '@/components/CircularRevealCard';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import ApartmentCleaningPricing from '@/components/ApartmentCleaningPricing';
import HouseCleaningPricing from '@/components/HouseCleaningPricing';
import { useLanguage } from '@/i18n/LanguageContext';
import { CalculatorItem } from '@/types/calculator';
import { img } from '@/utils/imageMap';

interface Props {
  onSendToForm: (items: CalculatorItem[], total: number) => void;
}

/**
 * Combined block: apartment cleaning price by frequency + additional cleaning extras.
 * Used at the top of Prices and Home pages.
 */
const CleaningPricingTopBlock = ({ onSendToForm }: Props) => {
  const { t, language } = useLanguage();

  const cleaningExtrasItems = useMemo(() => [
    { id: 'oven', name: language === 'pl' ? 'Mycie piekarnika' : language === 'en' ? 'Oven cleaning' : language === 'uk' ? 'Миття духовки' : 'Помоем духовку', price: 40, image: img('calc-extra-oven.jpg') },
    { id: 'hood', name: language === 'pl' ? 'Mycie okapu' : language === 'en' ? 'Hood cleaning' : language === 'uk' ? 'Миття витяжки' : 'Помоем вытяжку', price: 40, image: img('calc-extra-hood.jpg') },
    { id: 'cabinets', name: language === 'pl' ? 'Sprzątanie szafek kuchennych' : language === 'en' ? 'Kitchen cabinets' : language === 'uk' ? 'Прибирання кухонних шафок' : 'Уберем в кухонных шкафчиках', price: 40, image: img('calc-extra-cabinets.jpg') },
    { id: 'dishes', name: language === 'pl' ? 'Mycie naczyń' : language === 'en' ? 'Dishwashing' : language === 'uk' ? 'Миття посуду' : 'Помоем посуду', price: 25, image: img('calc-extra-dishes.jpg') },
    { id: 'fridge', name: language === 'pl' ? 'Czyszczenie lodówki' : language === 'en' ? 'Fridge cleaning' : language === 'uk' ? 'Чистка холодильника' : 'Почистим холодильник', price: 40, image: img('calc-extra-fridge.jpg') },
    { id: 'fridgeSmall', name: language === 'pl' ? 'Mała lodówka' : language === 'en' ? 'Small fridge' : language === 'uk' ? 'Малий холодильник' : 'Холодильник малый', price: 20, image: img('calc-extra-fridge-small.jpg') },
    { id: 'microwave', name: language === 'pl' ? 'Mycie mikrofalówki' : language === 'en' ? 'Microwave cleaning' : language === 'uk' ? 'Миття мікрохвильовки' : 'Помоем микроволновку', price: 10, image: img('calc-extra-microwave.jpg') },
    { id: 'balcony', name: language === 'pl' ? 'Sprzątanie balkonu' : language === 'en' ? 'Balcony cleaning' : language === 'uk' ? 'Прибирання балкону' : 'Уберем на балконе', price: 8, image: img('calc-extra-balcony.jpg'), unit: 'm²' },
    { id: 'ironing', name: language === 'pl' ? 'Prasowanie' : language === 'en' ? 'Ironing' : language === 'uk' ? 'Прасування' : 'Глажка', price: 50, image: img('calc-extra-ironing.jpg'), unit: 'h' },
    { id: 'petLitter', name: language === 'pl' ? 'Sprzątanie kuwety' : language === 'en' ? 'Pet litter' : language === 'uk' ? 'Прибирання лотка тварин' : 'Убрать лоток для животных', price: 10, image: img('calc-extra-pet-litter.jpg') },
    { id: 'closet', name: language === 'pl' ? 'Sprzątanie w szafie' : language === 'en' ? 'Closet cleaning' : language === 'uk' ? 'Прибирання в шафі' : 'Убрать в шкафу', price: 30, image: img('calc-extra-closet.jpg') },
  ], [language]);

  const extrasSubtitle = language === 'pl'
    ? 'Dodatkowo do sprzątania'
    : language === 'en'
      ? 'In addition to cleaning'
      : language === 'uk'
        ? 'Додатково до прибирання'
        : 'Дополнительно к уборке';

  return (
    <>
      <ApartmentCleaningPricing
        language={language}
        onOrder={(item) => onSendToForm([item as CalculatorItem], item.price)}
      />

      <HouseCleaningPricing
        language={language}
        onOrder={(item) => onSendToForm([item as CalculatorItem], item.price)}
      />

      <section className="py-10 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <CircularRevealCard index={0}>
              <Card className="shadow-card">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold">{t.cleaning?.extras?.title || 'Дополнительные услуги'}</h2>
                      <p className="text-sm text-muted-foreground">{extrasSubtitle}</p>
                    </div>
                  </div>
                  <CardServiceCalculator
                    items={cleaningExtrasItems}
                    category="cleaning-extras"
                    onSendToForm={onSendToForm}
                  />
                </CardContent>
              </Card>
            </CircularRevealCard>
          </div>
        </div>
      </section>
    </>
  );
};

export default CleaningPricingTopBlock;
