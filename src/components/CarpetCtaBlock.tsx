import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Loader2, Phone, User, CalendarIcon, Ruler, Sparkles, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru, pl, uk, enUS } from 'date-fns/locale';
import SuccessAnimation from './SuccessAnimation';

const PRICE_MIN = 7;
const PRICE_MAX = 10;
const PRICE_LABEL = `${PRICE_MIN}–${PRICE_MAX} zł/m²`;

const timeSlots = Array.from({ length: 25 }, (_, i) => {
  const h = Math.floor((i * 30 + 480) / 60);
  const m = (i * 30 + 480) % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
});

const areaOptions = ['10', '20', '30', '50', '75', '100', '150', '200'];

type Lang = 'pl' | 'ru' | 'uk' | 'en';

const T: Record<Lang, {
  badge: string; title: string; subtitle: string; area: string; areaPh: string;
  date: string; time: string; name: string; phone: string; submit: string;
  estimate: string; honeypotErr: string; ok: string; okDesc: string; err: string; errDesc: string;
  summaryTitle: string; notSpecified: string; newRequest: string;
}> = {
  pl: {
    badge: 'Pranie wykładziny dywanowej',
    title: 'Zamów ekspresowe pranie wykładziny',
    subtitle: 'Suchnie 1–2 h. Wybierz powierzchnię i wygodną godzinę — oddzwaniamy w kilka minut.',
    area: 'Powierzchnia, m²', areaPh: 'wybierz lub wpisz',
    date: 'Data', time: 'Godzina',
    name: 'Imię', phone: 'Telefon',
    submit: 'Złóż zamówienie',
    estimate: 'Szacunkowy koszt',
    honeypotErr: 'Wypełnij imię i telefon',
    ok: 'Wysłano!', okDesc: 'Skontaktujemy się w ciągu kilku minut.',
    err: 'Błąd', errDesc: 'Nie udało się wysłać. Spróbuj później.',
    summaryTitle: 'Twoje zgłoszenie', notSpecified: 'nie podano', newRequest: 'Nowe zgłoszenie',
  },
  ru: {
    badge: 'Химчистка ковролина',
    title: 'Оформите заявку на экспресс-химчистку ковролина',
    subtitle: 'Сохнет 1–2 ч. Выберите площадь и удобное время — перезвоним за пару минут.',
    area: 'Площадь, м²', areaPh: 'выберите или введите',
    date: 'Дата', time: 'Время',
    name: 'Имя', phone: 'Телефон',
    submit: 'Оформить заявку',
    estimate: 'Ориентировочно',
    honeypotErr: 'Заполните имя и телефон',
    ok: 'Заявка отправлена!', okDesc: 'Свяжемся с вами в течение нескольких минут.',
    err: 'Ошибка', errDesc: 'Не удалось отправить. Попробуйте позже.',
    summaryTitle: 'Ваша заявка', notSpecified: 'не указано', newRequest: 'Новая заявка',
  },
  uk: {
    badge: 'Хімчистка килимового покриття',
    title: 'Оформіть заявку на експрес-хімчистку килимового покриття',
    subtitle: 'Сохне 1–2 год. Оберіть площу та зручний час — передзвонимо за кілька хвилин.',
    area: 'Площа, м²', areaPh: 'оберіть або введіть',
    date: 'Дата', time: 'Час',
    name: 'Ім\'я', phone: 'Телефон',
    submit: 'Оформити заявку',
    estimate: 'Орієнтовно',
    honeypotErr: 'Заповніть ім\'я та телефон',
    ok: 'Заявку надіслано!', okDesc: 'Зв\'яжемося з вами протягом кількох хвилин.',
    err: 'Помилка', errDesc: 'Не вдалося надіслати. Спробуйте пізніше.',
    summaryTitle: 'Ваша заявка', notSpecified: 'не вказано', newRequest: 'Нова заявка',
  },
  en: {
    badge: 'Carpet cleaning',
    title: 'Book express carpet cleaning',
    subtitle: 'Dries in 1–2 h. Pick the area and a convenient time — we call back within minutes.',
    area: 'Area, m²', areaPh: 'select or type',
    date: 'Date', time: 'Time',
    name: 'Name', phone: 'Phone',
    submit: 'Submit request',
    estimate: 'Estimated cost',
    honeypotErr: 'Fill in name and phone',
    ok: 'Request sent!', okDesc: 'We will contact you within minutes.',
    err: 'Error', errDesc: 'Failed to send. Please try again later.',
    summaryTitle: 'Your request', notSpecified: 'not specified', newRequest: 'New request',
  },
};

const CarpetCtaBlock = () => {
  const { language } = useLanguage();
  const lang = (['pl', 'ru', 'uk', 'en'].includes(language) ? language : 'pl') as Lang;
  const tt = T[lang];
  const dateLocale = lang === 'ru' ? ru : lang === 'pl' ? pl : lang === 'uk' ? uk : enUS;

  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitted, setSubmitted] = useState<null | {
    area: string; date?: string; time?: string; estimateLabel?: string; name: string;
  }>(null);

  const areaNum = parseInt(area, 10);
  const hasArea = !isNaN(areaNum) && areaNum > 0;
  const estimateMin = hasArea ? Math.max(160, areaNum * PRICE_MIN) : 0;
  const estimateMax = hasArea ? Math.max(160, areaNum * PRICE_MAX) : 0;
  const estimateLabel = hasArea ? `~${estimateMin}–${estimateMax} zł` : '';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // bot
    if (!name.trim() || !phone.trim()) {
      toast({ title: tt.err, description: tt.honeypotErr, variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const lines = [
        `🧼 ${tt.badge}`,
        area ? `${tt.area}: ${area}` : null,
        hasArea ? `${tt.estimate}: ${estimateLabel}` : null,
      ].filter(Boolean).join('\n');

      const { error } = await supabase.functions.invoke('send-telegram', {
        body: {
          name: name.trim(),
          phone: phone.trim(),
          message: lines,
          date: date ? format(date, 'dd.MM.yyyy') : undefined,
          time: time || undefined,
        },
      });
      if (error) throw error;

      try {
        (await import('@/lib/gtm')).gtmEvents.formSubmit('about_carpet_cta', { area: areaNum || 0, estimate_min: estimateMin, estimate_max: estimateMax });
      } catch {}

      setShowSuccess(true);
      toast({ title: tt.ok, description: tt.okDesc });
      setSubmitted({
        area: hasArea ? `${areaNum} m²` : tt.notSpecified,
        date: date ? format(date, 'dd.MM.yyyy') : undefined,
        time: time || undefined,
        estimateLabel: hasArea ? estimateLabel : undefined,
        name: name.trim(),
      });
      setName(''); setPhone(''); setArea(''); setDate(undefined); setTime('');
    } catch {
      toast({ title: tt.err, description: tt.errDesc, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessAnimation isVisible={showSuccess} onComplete={() => setShowSuccess(false)} />
      <section aria-labelledby="carpet-cta-heading" className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-fresh/10 to-primary/5 shadow-glow p-6 md:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {tt.badge}
              </span>
            </div>
            <h2 id="carpet-cta-heading" className="font-serif text-2xl md:text-3xl font-bold mb-2 text-foreground">
              {tt.title}
            </h2>
            <p className="text-muted-foreground mb-6">{tt.subtitle}</p>

            {submitted ? (
              <div className="rounded-2xl bg-background/80 border-2 border-fresh/40 p-5 md:p-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-fresh/15 flex items-center justify-center">
                    <Check className="w-6 h-6 text-fresh" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-foreground">{tt.ok}</p>
                    <p className="text-sm text-muted-foreground">{tt.okDesc}</p>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                  {tt.summaryTitle}
                </p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary flex-shrink-0" />
                    <dt className="text-muted-foreground">{tt.area}:</dt>
                    <dd className="font-semibold text-foreground">{submitted.area}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary flex-shrink-0" />
                    <dt className="text-muted-foreground">{tt.date}:</dt>
                    <dd className="font-semibold text-foreground">{submitted.date || tt.notSpecified}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <dt className="text-muted-foreground">{tt.time}:</dt>
                    <dd className="font-semibold text-foreground">{submitted.time || tt.notSpecified}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                    <dt className="text-muted-foreground">{tt.estimate}:</dt>
                    <dd className="font-bold text-primary">{submitted.estimateLabel || tt.notSpecified}</dd>
                  </div>
                </dl>
                <div className="mt-5 flex justify-end">
                  <Button type="button" variant="outline" onClick={() => setSubmitted(null)}>
                    {tt.newRequest}
                  </Button>
                </div>
              </div>
            ) : (
            <form onSubmit={onSubmit} className="space-y-3">
              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="absolute -left-[9999px] w-px h-px opacity-0"
                aria-hidden="true"
              />

              {/* Area + Date + Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Area: select preset OR custom input */}
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  <Select value={areaOptions.includes(area) ? area : ''} onValueChange={setArea}>
                    <SelectTrigger className="pl-10 h-11 bg-background">
                      <SelectValue placeholder={tt.area} />
                    </SelectTrigger>
                    <SelectContent>
                      {areaOptions.map((v) => (
                        <SelectItem key={v} value={v}>{v} m²</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal h-11 bg-background",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'dd.MM.yyyy') : tt.date}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={dateLocale}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>

                {/* Time */}
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="pl-10 h-11 bg-background">
                      <SelectValue placeholder={tt.time} />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {timeSlots.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Custom area + Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={2000}
                  placeholder={tt.areaPh}
                  value={areaOptions.includes(area) ? '' : area}
                  onChange={(e) => setArea(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                  className="h-11 bg-background"
                  aria-label={tt.area}
                />
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={tt.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                    className="pl-10 h-11 bg-background"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder={tt.phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={30}
                    required
                    className="pl-10 h-11 bg-background"
                  />
                </div>
              </div>

              {/* Estimate + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <p className="text-sm text-muted-foreground">
                  {hasArea ? (
                    <>
                      {tt.estimate}: <span className="font-bold text-primary text-base">{estimateLabel}</span>
                      <span className="text-xs"> ({PRICE_LABEL})</span>
                    </>
                  ) : (
                    <span className="text-xs">{PRICE_LABEL}</span>
                  )}
                </p>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-8 bg-fresh hover:bg-fresh/90 text-white shadow-glow font-semibold"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                  {tt.submit}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarpetCtaBlock;
