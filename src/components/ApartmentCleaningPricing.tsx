import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Sparkles } from 'lucide-react';
import CircularRevealCard from '@/components/CircularRevealCard';
import ManagerEstimateDialog from '@/components/ManagerEstimateDialog';
import { toast } from '@/hooks/use-toast';
import { MIN_ORDER_FOR_DISCOUNT } from '@/hooks/useDiscountCalculator';

type Lang = 'pl' | 'en' | 'ru' | 'uk';

interface Props {
  language: Lang | string;
  onOrder: (item: { id: string; name: string; price: number; quantity: number; category?: string }) => void;
}

const T: Record<string, any> = {
  pl: {
    title: 'Cennik sprzątania mieszkania',
    subtitle: 'Sprawdź cenę w zależności od częstotliwości sprzątania',
    weekly: 'Raz w tygodniu',
    biweekly: 'Raz na dwa tygodnie',
    monthly: 'Raz na miesiąc',
    once: 'Jednorazowo',
    apartment: 'Mieszkanie',
    desc: 'Utrzymanie czystości w całym mieszkaniu: odkurzanie, mycie podłóg, łazienka, kuchnia i ścieranie kurzu.',
    order: 'Zamów sprzątanie',
    generalNote: 'Sprzątanie generalne zależy od stopnia zabrudzenia i wymaga przyjazdu menedżera w celu wyceny.',
    requestEstimate: 'Poproś o wycenę menedżera',
    generalItemName: 'Sprzątanie generalne — wycena menedżera',
    addedTitle: 'Dodano do zamówienia ✓',
    discountApplied: 'Rabat 22% naliczony — dodaj drugą usługę z innej kategorii.',
    discountReady: 'Świetnie! Rabat 22% już aktywny.',
    needMore: (zl: number) => `Dodaj jeszcze ${zl} zł i drugą usługę, aby otrzymać −22%.`,
  },
  en: {
    title: 'Apartment cleaning price list',
    subtitle: 'Check the price depending on cleaning frequency',
    weekly: 'Once a week',
    biweekly: 'Every two weeks',
    monthly: 'Once a month',
    once: 'One-time',
    apartment: 'Apartment',
    desc: 'Maintaining cleanliness throughout the apartment: vacuuming, mopping floors, bathroom, kitchen and dusting.',
    order: 'Order cleaning',
    generalNote: 'General cleaning depends on the level of dirt and requires a manager visit to assess the cost.',
    requestEstimate: 'Request manager estimate',
    generalItemName: 'General cleaning — manager estimate',
    addedTitle: 'Added to order ✓',
    discountApplied: '22% discount calculated — add a second service from another category.',
    discountReady: 'Great! 22% discount is active.',
    needMore: (zl: number) => `Add ${zl} zł more and a second service to get −22%.`,
  },
  ru: {
    title: 'Прайс-лист уборки квартиры',
    subtitle: 'Узнайте цену в зависимости от частоты уборки',
    weekly: 'Раз в неделю',
    biweekly: 'Раз в две недели',
    monthly: 'Раз в месяц',
    once: 'Разовая',
    apartment: 'Квартира',
    desc: 'Поддержание чистоты во всей квартире: пылесос, мытьё полов, ванная, кухня и удаление пыли.',
    order: 'Заказать уборку',
    generalNote: 'Генеральная уборка зависит от степени загрязнённости и требует приезда менеджера для оценки стоимости.',
    requestEstimate: 'Запросить оценку менеджера',
    generalItemName: 'Генеральная уборка — оценка менеджера',
    addedTitle: 'Добавлено в заявку ✓',
    discountApplied: 'Скидка 22% рассчитана — добавьте вторую услугу из другой категории.',
    discountReady: 'Отлично! Скидка 22% уже активна.',
    needMore: (zl: number) => `Добавьте ещё на ${zl} zł и вторую услугу, чтобы получить −22%.`,
  },
  uk: {
    title: 'Прайс прибирання квартири',
    subtitle: 'Дізнайтесь ціну залежно від частоти прибирання',
    weekly: 'Раз на тиждень',
    biweekly: 'Раз на два тижні',
    monthly: 'Раз на місяць',
    once: 'Разово',
    apartment: 'Квартира',
    desc: 'Підтримка чистоти у всій квартирі: пилосос, миття підлоги, ванна, кухня та витирання пилу.',
    order: 'Замовити прибирання',
    generalNote: 'Генеральне прибирання залежить від ступеня забруднення і потребує приїзду менеджера для оцінки вартості.',
    requestEstimate: 'Запросити оцінку менеджера',
    generalItemName: 'Генеральне прибирання — оцінка менеджера',
    addedTitle: 'Додано до замовлення ✓',
    discountApplied: 'Знижка 22% розрахована — додайте другу послугу з іншої категорії.',
    discountReady: 'Чудово! Знижка 22% вже активна.',
    needMore: (zl: number) => `Додайте ще на ${zl} zł і другу послугу, щоб отримати −22%.`,
  },
};

const frequencies = [
  { id: 'weekly', discount: 0.20 },
  { id: 'biweekly', discount: 0.15 },
  { id: 'monthly', discount: 0.10 },
  { id: 'once', discount: 0 },
] as const;

const apartments = [
  { id: 'a40', label: '<40m²', basePrice: 199 },
  { id: 'a60', label: '<60m²', basePrice: 239 },
  { id: 'a80', label: '<80m²', basePrice: 279 },
];

const ApartmentCleaningPricing = ({ language, onOrder }: Props) => {
  const t = T[language as Lang] || T.pl;
  const [freq, setFreq] = useState<typeof frequencies[number]['id']>('once');
  const [estimateOpen, setEstimateOpen] = useState(false);
  const activeFreq = frequencies.find(f => f.id === freq)!;

  return (
    <section className="py-10 bg-card">
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

                {/* Frequency tabs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                  {frequencies.map((f) => {
                    const active = freq === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFreq(f.id)}
                        className={`relative rounded-lg border-2 px-3 py-3 text-sm font-medium transition-all ${
                          active
                            ? 'border-primary bg-primary/5 text-foreground shadow-md'
                            : 'border-border bg-background text-muted-foreground hover:border-primary/40'
                        }`}
                      >
                        {f.discount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                            -{Math.round(f.discount * 100)}%
                          </span>
                        )}
                        {t[f.id]}
                      </button>
                    );
                  })}
                </div>

                {/* Apartment cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 [perspective:1200px]">
                  {apartments.map((apt, aptIndex) => {
                    const price = Math.round(apt.basePrice * (1 - activeFreq.discount));
                    const priceLabel = String(price);
                    const oldLabel = activeFreq.discount > 0 ? String(apt.basePrice) : null;
                    const name = `${t.apartment} ${apt.label} — ${t[activeFreq.id]}`;
                    return (
                      <div
                        key={apt.id}
                        className="relative rounded-xl border border-border bg-background p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow animate-spin-reveal"
                        style={{ animationDelay: `${aptIndex * 180}ms` }}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-lg">{t.apartment} {apt.label}</h3>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary">{priceLabel} zł</span>
                          {oldLabel && (
                            <span className="text-sm text-muted-foreground line-through">{oldLabel} zł</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground flex-1">{t.desc}</p>
                        <Button
                          onClick={() => {
                            onOrder({
                              id: `cleaning-${apt.id}-${freq}`,
                              name,
                              price,
                              quantity: 1,
                              category: 'cleaning',
                            });
                            // Compute discount status across saved cart + this item
                            try {
                              const existing = JSON.parse(sessionStorage.getItem('mc_calculator_items') || '[]');
                              const merged = [...existing];
                              const idx = merged.findIndex((e: any) => e.id === `cleaning-${apt.id}-${freq}`);
                              if (idx >= 0) merged[idx].quantity = (merged[idx].quantity || 1) + 1;
                              else merged.push({ id: `cleaning-${apt.id}-${freq}`, name, price, quantity: 1, category: 'cleaning' });
                              const total = merged.reduce((s: number, i: any) => s + i.price * (i.quantity || 1), 0);
                              const hasOther = merged.some((i: any) => {
                                const c = i.category || i.id;
                                return !(c === 'cleaning' || c.startsWith('cleaning-') || c.startsWith('cleaning_') || c.startsWith('extra-') || c === 'extras');
                              });
                              let description = `${name} · ${price} zł`;
                              if (hasOther && total >= MIN_ORDER_FOR_DISCOUNT) {
                                description += ` · ${t.discountReady}`;
                              } else if (hasOther && total < MIN_ORDER_FOR_DISCOUNT) {
                                description += ` · ${t.needMore(MIN_ORDER_FOR_DISCOUNT - total)}`;
                              } else {
                                description += ` · ${t.discountApplied}`;
                              }
                              toast({ title: t.addedTitle, description, duration: 5000 });
                            } catch {
                              toast({ title: t.addedTitle, description: `${name} · ${price} zł · ${t.discountApplied}`, duration: 5000 });
                            }
                          }}
                          className="w-full"
                        >
                          {t.order}
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {/* General cleaning note */}
                <div className="mt-6 rounded-lg border border-yellow-400/40 bg-yellow-400/10 p-4 flex items-start gap-2">
                  <span className="flex-shrink-0">⚠️</span>
                  <p className="text-sm font-medium text-yellow-700">{t.generalNote}</p>
                </div>
                <div className="mt-3 flex justify-center">
                  <Button
                    variant="default"
                    onClick={() => setEstimateOpen(true)}
                  >
                    {t.requestEstimate}
                  </Button>
                </div>
                <ManagerEstimateDialog
                  open={estimateOpen}
                  onOpenChange={setEstimateOpen}
                  language={language}
                  service={t.generalItemName}
                />
              </CardContent>
            </Card>
          </CircularRevealCard>
        </div>
      </div>
    </section>
  );
};

export default ApartmentCleaningPricing;
