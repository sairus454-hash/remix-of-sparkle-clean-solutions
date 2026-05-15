import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Sparkles } from 'lucide-react';
import CircularRevealCard from '@/components/CircularRevealCard';
import { toast } from '@/hooks/use-toast';

type Lang = 'pl' | 'en' | 'ru' | 'uk';

interface Props {
  language: Lang | string;
  onOrder: (item: { id: string; name: string; price: number; quantity: number; category?: string }) => void;
}

const T: Record<string, any> = {
  pl: {
    title: 'Sprzątanie standardowe domu',
    subtitle: 'Cena ryczałtowa za jednorazowe sprzątanie domu prywatnego',
    house: 'Dom',
    desc: 'Pełne sprzątanie domu: odkurzanie, mycie podłóg, łazienki, kuchnia, ścieranie kurzu.',
    order: 'Zamów sprzątanie',
    addedTitle: 'Dodano do zamówienia ✓',
  },
  en: {
    title: 'Standard house cleaning',
    subtitle: 'Flat price for a one-time private house cleaning',
    house: 'House',
    desc: 'Full house cleaning: vacuuming, mopping, bathrooms, kitchen, dusting.',
    order: 'Order cleaning',
    addedTitle: 'Added to order ✓',
  },
  ru: {
    title: 'Стандартная уборка дома',
    subtitle: 'Фиксированная цена за разовую уборку частного дома',
    house: 'Дом',
    desc: 'Полная уборка дома: пылесос, мытьё полов, ванные, кухня, удаление пыли.',
    order: 'Заказать уборку',
    addedTitle: 'Добавлено в заявку ✓',
  },
  uk: {
    title: 'Стандартне прибирання будинку',
    subtitle: 'Фіксована ціна за разове прибирання приватного будинку',
    house: 'Будинок',
    desc: 'Повне прибирання будинку: пилосос, миття підлоги, ванні, кухня, витирання пилу.',
    order: 'Замовити прибирання',
    addedTitle: 'Додано до замовлення ✓',
  },
};

const tiers = [
  { id: 'h100', label: 'до 100 m²', labels: { pl: 'do 100 m²', en: 'up to 100 m²', ru: 'до 100 m²', uk: 'до 100 m²' }, price: 350 },
  { id: 'h150', label: '100–150 m²', labels: { pl: '100–150 m²', en: '100–150 m²', ru: '100–150 m²', uk: '100–150 m²' }, price: 400 },
  { id: 'h150plus', label: '>150 m²', labels: { pl: 'powyżej 150 m²', en: 'over 150 m²', ru: 'свыше 150 m²', uk: 'понад 150 m²' }, price: 500 },
];

const HouseCleaningPricing = ({ language, onOrder }: Props) => {
  const lang = (language as Lang) in T ? (language as Lang) : 'pl';
  const t = T[lang];

  return (
    <section className="py-10 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <CircularRevealCard index={0}>
            <Card className="shadow-card">
              <CardContent className="py-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Home className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl md:text-2xl font-semibold">{t.title}</h2>
                    <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 [perspective:1200px]">
                  {tiers.map((tier, tierIndex) => {
                    const tierLabel = tier.labels[lang];
                    const name = `${t.house} ${tierLabel}`;
                    return (
                      <div
                        key={tier.id}
                        className="relative rounded-xl border border-border bg-background p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow animate-spin-reveal"
                        style={{ animationDelay: `${tierIndex * 180}ms` }}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-lg">{tierLabel}</h3>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary">{tier.price} zł</span>
                        </div>
                        <p className="text-sm text-muted-foreground flex-1">{t.desc}</p>
                        <Button
                          onClick={() => {
                            onOrder({
                              id: `house-cleaning-${tier.id}`,
                              name,
                              price: tier.price,
                              quantity: 1,
                              category: 'cleaning',
                            });
                            toast({ title: t.addedTitle, description: `${name} · ${tier.price} zł`, duration: 4000 });
                          }}
                          className="w-full"
                        >
                          {t.order}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </CircularRevealCard>
        </div>
      </div>
    </section>
  );
};

export default HouseCleaningPricing;
