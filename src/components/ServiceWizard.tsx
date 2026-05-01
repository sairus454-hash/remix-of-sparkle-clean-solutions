import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SERVICES_MENU,
  ESTIMATE_COPY,
  computeEstimate,
  readStoredCity,
  writeStoredCity,
  type ServiceMenuItem,
  type ChatLang,
} from '@/lib/chatbot-pricing';

type Step = 'menu' | 'city' | 'qty' | 'result';

export interface WizardPrefill {
  serviceKey: string;
  serviceLabel: string;
  city: string;
  qty: number;
  unit: string;
  estimate: string;
}

interface ServiceWizardProps {
  language: string;
  isMobile: boolean;
  onClose: () => void;
  /** Push a markdown summary into the chat history when result is shown */
  onPushSummary: (markdown: string) => void;
  /** Open the booking form prefilled with the latest estimate */
  onBookNow?: (prefill: WizardPrefill) => void;
}

// ChatBotOrderForm uses these service keys; map our wizard keys to them.
const FORM_SERVICE_KEY: Record<string, string> = {
  cleaning: 'cleaning',
  furniture: 'furniture',
  mattress: 'mattress',
  auto: 'auto',
  windows: 'windows',
  ozone: 'ozone',
  floor: 'carpet',
  handyman: 'handyman',
  gardening: 'gardening',
};

/**
 * In-chat interactive service menu + quick price estimator.
 * Step 1: pick service → Step 2: city → Step 3: quantity → Step 4: result.
 * All logic is client-side (no edge function call) for instant feedback.
 */
export const ServiceWizard = ({
  language,
  isMobile,
  onClose,
  onPushSummary,
  onBookNow,
}: ServiceWizardProps) => {
  const lang: ChatLang = (['ru', 'en', 'pl', 'uk'].includes(language) ? language : 'ru') as ChatLang;
  const copy = ESTIMATE_COPY[lang];

  // Pre-fill city from previous chat session OR the global useCity store
  // (same localStorage key — so a city picked in the calculator also lands here).
  const stored = readStoredCity();
  const [step, setStep] = useState<Step>('menu');
  const [service, setService] = useState<ServiceMenuItem | null>(null);
  const [city, setCity] = useState(stored?.name ?? '');
  const [rememberedCity, setRememberedCity] = useState(stored?.name ?? '');
  const [qty, setQty] = useState<number | ''>('');

  const pickService = (s: ServiceMenuItem) => {
    setService(s);
    // If we already remember a city — skip city step, go straight to quantity.
    setStep(rememberedCity ? 'qty' : 'city');
  };

  const confirmCity = (chosen: string) => {
    const trimmed = chosen.trim();
    if (!trimmed) return;
    setCity(trimmed);
    writeStoredCity(trimmed);
    setRememberedCity(trimmed);
    setStep('qty');
  };

  const changeCity = () => {
    setRememberedCity('');
    setCity('');
    setStep('city');
  };

  const back = () => {
    if (step === 'city') setStep('menu');
    else if (step === 'qty') setStep(rememberedCity ? 'menu' : 'city');
    else if (step === 'result') setStep('qty');
  };

  const finish = (chosenQty: number) => {
    if (!service) return;
    const result = computeEstimate(service, chosenQty, city);
    const range = copy.estimateRange(result.min, result.max);
    const summary = [
      `${service.emoji} **${service.label[lang]}** — ${chosenQty} ${service.unit[lang]} · 🏙 ${city || '—'}`,
      `${copy.estimateTitle}: **${range}**`,
      copy.cityNote(result.isBase),
      copy.minOrderNote(result.minOrder) + (result.belowMin ? '\n' + copy.belowMin : ''),
      `🔗 [${copy.seePage}](${service.url})`,
      '',
      copy.disclaimer,
    ].join('\n\n');
    onPushSummary(summary);
    setStep('result');
  };

  return (
    <div
      className={cn(
        'absolute bottom-16 left-0 right-0 bg-card border-t border-border shadow-lg',
        'p-3 max-h-[55vh] overflow-y-auto',
      )}
      role="dialog"
      aria-label={copy.quickEstimate}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {step !== 'menu' && (
            <button
              onClick={back}
              className="p-1 rounded hover:bg-muted"
              aria-label="Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <p className="text-sm font-semibold text-foreground">
            {step === 'menu' && copy.menuTitle}
            {step === 'city' && copy.cityPrompt}
            {step === 'qty' && service?.quantityPrompt[lang]}
            {step === 'result' && copy.estimateTitle}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>

      {/* Step: service menu */}
      {step === 'menu' && (
        <div className="space-y-2">
          {rememberedCity && (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-xs text-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="flex-1 truncate">
                {copy.rememberedCity(rememberedCity).replace(/\*\*/g, '')}
              </span>
              <button
                onClick={changeCity}
                className="text-primary hover:underline whitespace-nowrap"
              >
                {copy.changeCity}
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {SERVICES_MENU.map((s) => (
              <button
                key={s.key}
                onClick={() => pickService(s)}
                className={cn(
                  'flex items-center gap-2 px-2 py-2 rounded-lg border border-primary/20',
                  'bg-primary/5 hover:bg-primary/10 active:scale-95 transition',
                  'text-left text-foreground',
                  isMobile ? 'min-h-[48px] text-xs' : 'text-xs',
                )}
              >
                <span className="text-base">{s.emoji}</span>
                <span className="flex-1 leading-tight">{s.label[lang]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: city */}
      {step === 'city' && service && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {copy.citySuggestions.map((c) => (
              <button
                key={c}
                onClick={() => confirmCity(c)}
                className="px-3 py-1.5 text-xs rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
              >
                🏙 {c}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={copy.cityPrompt}
              className={cn('flex-1', isMobile ? 'h-10 text-base' : 'h-9 text-sm')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && city.trim()) confirmCity(city);
              }}
            />
            <Button
              size="sm"
              disabled={!city.trim()}
              onClick={() => confirmCity(city)}
            >
              →
            </Button>
          </div>
        </div>
      )}

      {/* Step: quantity */}
      {step === 'qty' && service && (
        <div className="space-y-2">
          {city && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="flex-1 truncate">{city}</span>
              <button
                onClick={changeCity}
                className="text-primary hover:underline"
              >
                {copy.changeCity}
              </button>
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {service.suggestions.map((q) => (
              <button
                key={q}
                onClick={() => finish(q)}
                className="px-3 py-1.5 text-xs rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
              >
                {q} {service.unit[lang]}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              value={qty}
              onChange={(e) =>
                setQty(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))
              }
              placeholder={service.unit[lang]}
              className={cn('flex-1', isMobile ? 'h-10 text-base' : 'h-9 text-sm')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && typeof qty === 'number' && qty > 0) finish(qty);
              }}
            />
            <Button
              size="sm"
              disabled={typeof qty !== 'number' || qty <= 0}
              onClick={() => typeof qty === 'number' && qty > 0 && finish(qty)}
            >
              →
            </Button>
          </div>
        </div>
      )}

      {/* Step: result */}
      {step === 'result' && service && (
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground text-xs">{copy.disclaimer.replace(/_/g, '')}</p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-fresh">
              <Link to={service.url} onClick={onClose}>
                🔗 {copy.seePage}
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setStep('menu');
                setService(null);
                setQty('');
              }}
            >
              {copy.pickAnother}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceWizard;
