import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type Lang = 'pl' | 'en' | 'ru' | 'uk';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Lang | string;
  service?: string;
}

const T: Record<Lang, Record<string, string>> = {
  pl: {
    title: 'Poproś o wycenę menedżera',
    desc: 'Zostaw imię i numer telefonu — menedżer oddzwoni i wyceni usługę.',
    name: 'Imię',
    phone: 'Numer telefonu',
    submit: 'Wyślij zgłoszenie',
    sending: 'Wysyłanie…',
    success: 'Zgłoszenie wysłane! Skontaktujemy się wkrótce.',
    error: 'Nie udało się wysłać. Spróbuj ponownie.',
    required: 'Wpisz imię i telefon',
    defaultService: 'Wycena menedżera',
  },
  en: {
    title: 'Request manager estimate',
    desc: 'Leave your name and phone — our manager will call back and provide a quote.',
    name: 'Name',
    phone: 'Phone number',
    submit: 'Send request',
    sending: 'Sending…',
    success: 'Request sent! We will contact you soon.',
    error: 'Failed to send. Please try again.',
    required: 'Enter name and phone',
    defaultService: 'Manager estimate',
  },
  ru: {
    title: 'Запросить оценку менеджера',
    desc: 'Оставьте имя и номер телефона — менеджер перезвонит и оценит услугу.',
    name: 'Имя',
    phone: 'Номер телефона',
    submit: 'Отправить заявку',
    sending: 'Отправка…',
    success: 'Заявка отправлена! Мы скоро свяжемся с вами.',
    error: 'Не удалось отправить. Попробуйте ещё раз.',
    required: 'Введите имя и телефон',
    defaultService: 'Оценка менеджера',
  },
  uk: {
    title: 'Запросити оцінку менеджера',
    desc: 'Залиште імʼя та номер телефону — менеджер передзвонить і оцінить послугу.',
    name: 'Імʼя',
    phone: 'Номер телефону',
    submit: 'Надіслати заявку',
    sending: 'Надсилання…',
    success: 'Заявку надіслано! Ми скоро звʼяжемось.',
    error: 'Не вдалося надіслати. Спробуйте ще раз.',
    required: 'Введіть імʼя та телефон',
    defaultService: 'Оцінка менеджера',
  },
};

const ManagerEstimateDialog = ({ open, onOpenChange, language, service }: Props) => {
  const t = T[(language as Lang)] || T.pl;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: t.required, variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-telegram', {
        body: {
          name: name.trim(),
          phone: phone.trim(),
          service: service || t.defaultService,
          message: t.title,
          website,
        },
      });
      if (error) throw error;
      toast({ title: t.success });
      setName('');
      setPhone('');
      onOpenChange(false);
    } catch (err) {
      toast({ title: t.error, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.desc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] w-px h-px opacity-0"
            aria-hidden="true"
          />
          <div className="space-y-2">
            <Label htmlFor="me-name">{t.name}</Label>
            <Input
              id="me-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="me-phone">{t.phone}</Label>
            <Input
              id="me-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={30}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t.sending : t.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManagerEstimateDialog;
