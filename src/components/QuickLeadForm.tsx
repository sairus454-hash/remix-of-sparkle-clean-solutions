import { useState } from 'react';
import { z } from 'zod';
import { Send, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

type Lang = 'pl' | 'ru' | 'en' | 'uk';
export type QuickLeadService = 'auto' | 'ozone';

const COPY: Record<Lang, {
  title: Record<QuickLeadService, string>;
  subtitle: string;
  name: string;
  phone: string;
  date: string;
  submit: string;
  success: string;
  error: string;
  invalid: string;
}> = {
  pl: {
    title: { auto: 'Zamów czyszczenie auta', ozone: 'Zamów ozonowanie' },
    subtitle: 'Zostaw imię, telefon i datę — oddzwonimy, aby potwierdzić termin.',
    name: 'Imię', phone: 'Telefon', date: 'Preferowana data', submit: 'Wyślij zgłoszenie',
    success: 'Dziękujemy! Zgłoszenie wysłane — wkrótce oddzwonimy.',
    error: 'Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub zadzwoń do nas.',
    invalid: 'Podaj imię, poprawny numer telefonu i datę.',
  },
  ru: {
    title: { auto: 'Заказать химчистку авто', ozone: 'Заказать озонирование' },
    subtitle: 'Оставьте имя, телефон и дату — мы перезвоним и подтвердим время.',
    name: 'Имя', phone: 'Телефон', date: 'Желаемая дата', submit: 'Отправить заявку',
    success: 'Спасибо! Заявка отправлена — скоро перезвоним.',
    error: 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.',
    invalid: 'Укажите имя, правильный номер телефона и дату.',
  },
  en: {
    title: { auto: 'Book car interior cleaning', ozone: 'Book ozone treatment' },
    subtitle: 'Leave your name, phone and date — we will call back to confirm the time.',
    name: 'Name', phone: 'Phone', date: 'Preferred date', submit: 'Send request',
    success: 'Thank you! Your request was sent — we will call you back soon.',
    error: 'Could not send the request. Please try again or call us.',
    invalid: 'Enter your name, a valid phone number and a date.',
  },
  uk: {
    title: { auto: 'Замовити хімчистку авто', ozone: 'Замовити озонування' },
    subtitle: "Залиште ім'я, телефон і дату — ми передзвонимо та підтвердимо час.",
    name: "Ім'я", phone: 'Телефон', date: 'Бажана дата', submit: 'Надіслати заявку',
    success: 'Дякуємо! Заявку надіслано — скоро передзвонимо.',
    error: 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.',
    invalid: "Вкажіть ім'я, правильний номер телефону та дату.",
  },
};

const SERVICE_LABEL: Record<QuickLeadService, string> = {
  auto: 'Химчистка авто (/auto)',
  ozone: 'Озонирование (/ozone)',
};

const todayIso = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export const quickLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().regex(/^\+?[0-9\s\-()]{7,20}$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const QuickLeadForm = ({ service }: { service: QuickLeadService }) => {
  const { language } = useLanguage();
  const c = COPY[(language as Lang)] || COPY.pl;
  const [form, setForm] = useState({ name: '', phone: '', date: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quickLeadSchema.safeParse(form);
    if (!parsed.success || parsed.data.date < todayIso()) {
      setStatus('invalid');
      return;
    }
    setStatus('loading');
    try {
      const [y, m, d] = parsed.data.date.split('-');
      const { error } = await supabase.functions.invoke('send-telegram', {
        body: {
          source: service === 'auto' ? 'quick_auto' : 'quick_ozone',
          name: parsed.data.name,
          phone: parsed.data.phone,
          date: `${d}.${m}.${y}`,
          service: SERVICE_LABEL[service],
          website: form.website,
        },
      });
      if (error) throw error;
      (await import('@/lib/gtm')).gtmEvents.formSubmit(`quick_lead_${service}`);
      setStatus('success');
      setForm({ name: '', phone: '', date: '', website: '' });
    } catch (err) {
      console.error('Quick lead submit failed:', (err as Error)?.message);
      setStatus('error');
    }
  };

  const fieldId = (f: string) => `quick-${service}-${f}`;

  return (
    <section className="py-10 sm:py-14 bg-background relative z-10" aria-labelledby={fieldId('title')}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-card p-5 sm:p-8">
          <h2 id={fieldId('title')} className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-2">
            {c.title[service]}
          </h2>
          <p className="text-center text-muted-foreground mb-6">{c.subtitle}</p>
          <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-3">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={form.website}
              onChange={e => setForm({ ...form, website: e.target.value })}
            />
            <div className="space-y-1.5">
              <label htmlFor={fieldId('name')} className="text-sm font-medium text-foreground">{c.name} <span className="text-destructive">*</span></label>
              <Input id={fieldId('name')} autoComplete="name" maxLength={100} required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} className="h-11 text-base sm:text-sm" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={fieldId('phone')} className="text-sm font-medium text-foreground">{c.phone} <span className="text-destructive">*</span></label>
              <Input id={fieldId('phone')} type="tel" inputMode="tel" autoComplete="tel" maxLength={20} required placeholder="+48 ..." value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} className="h-11 text-base sm:text-sm" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={fieldId('date')} className="text-sm font-medium text-foreground">{c.date} <span className="text-destructive">*</span></label>
              <Input id={fieldId('date')} type="date" min={todayIso()} required value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })} className="h-11 text-base sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <Button type="submit" disabled={status === 'loading'} className="w-full h-12 bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-90 text-base">
                {status === 'loading' ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                {c.submit}
              </Button>
            </div>
          </form>
          {status === 'success' && (
            <div role="status" aria-live="polite" className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-fresh/40 bg-fresh/10">
              <CheckCircle2 className="w-5 h-5 text-fresh flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{c.success}</p>
            </div>
          )}
          {(status === 'error' || status === 'invalid') && (
            <div role="alert" className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-destructive/40 bg-destructive/10">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{status === 'invalid' ? c.invalid : c.error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickLeadForm;
