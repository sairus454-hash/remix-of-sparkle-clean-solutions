import { useState, useCallback } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Loader2, Phone, User, CalendarIcon, MapPin, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru, pl, uk, enUS } from 'date-fns/locale';

import SuccessAnimation from './SuccessAnimation';
import { CalculatorItem } from '@/types/calculator';

interface QuickOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CalculatorItem[];
  total: number;
}

const timeSlots = Array.from({ length: 25 }, (_, i) => {
  const hours = Math.floor((i * 30 + 480) / 60);
  const minutes = (i * 30 + 480) % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
});

const QuickOrderDialog = ({ open, onOpenChange, items, total }: QuickOrderDialogProps) => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const dateLocale = language === 'ru' ? ru : language === 'pl' ? pl : language === 'uk' ? uk : enUS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({
        title: language === 'ru' ? 'Ошибка' : language === 'pl' ? 'Błąd' : language === 'uk' ? 'Помилка' : 'Error',
        description: language === 'ru' ? 'Заполните имя и телефон' : language === 'pl' ? 'Wypełnij imię i telefon' : language === 'uk' ? 'Заповніть ім\'я та телефон' : 'Fill in name and phone',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const orderLines = items.map(item => `• ${item.name} × ${item.quantity} = ${item.price * item.quantity} zł`);
      const totalLabel = language === 'ru' ? 'Итого' : language === 'pl' ? 'Razem' : language === 'uk' ? 'Разом' : 'Total';
      const message = `⚡ ${t.form.quickOrderTitle || 'Быстрый заказ'}:\n${orderLines.join('\n')}\n\n${totalLabel}: ${total} zł`;

      const { error } = await supabase.functions.invoke('send-telegram', {
        body: {
          name: name.trim(),
          phone: phone.trim(),
          message,
          address: address.trim() || undefined,
          postalCode: postalCode.trim() || undefined,
          date: date ? format(date, 'dd.MM.yyyy') : undefined,
          time: time || undefined,
        },
      });
      if (error) throw error;

      (await import('@/lib/gtm')).gtmEvents.formSubmit('quick_order', {
        items_count: items.length,
        total,
      });

      setShowSuccess(true);

      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const playTone = (freq: number, start: number, dur: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.3, start + 0.05);
          gain.gain.linearRampToValueAtTime(0, start + dur);
          osc.start(start);
          osc.stop(start + dur);
        };
        const now = ctx.currentTime;
        playTone(523.25, now, 0.15);
        playTone(659.25, now + 0.15, 0.15);
        playTone(783.99, now + 0.3, 0.25);
      } catch {}

      toast({ title: t.form.success, description: `${name}, ${t.form.success}` });
      setName('');
      setPhone('');
      setAddress('');
      setPostalCode('');
      setDate(undefined);
      setTime('');
      setTimeout(() => onOpenChange(false), 2000);
    } catch {
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: language === 'ru' ? 'Не удалось отправить. Попробуйте позже.' : 'Failed to send. Try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimationComplete = useCallback(() => setShowSuccess(false), []);

  return (
    <>
      <SuccessAnimation isVisible={showSuccess} onComplete={handleAnimationComplete} />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              {t.form.quickOrderTitle || 'Быстрый заказ'}
            </DialogTitle>
            <DialogDescription>
              {t.form.quickOrderDesc || 'Оставьте имя и телефон — мы перезвоним'}
            </DialogDescription>
          </DialogHeader>

          {/* Order summary */}
          <div className="bg-accent/30 rounded-xl p-3 space-y-1 max-h-40 overflow-y-auto">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                <span className="font-medium">{item.price * item.quantity} zł</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-border font-bold">
              <span>{t.calculator?.total || 'Итого'}</span>
              <span className="text-primary">{total} zł</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.form.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                maxLength={100}
                required
              />
            </div>
            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.form.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                type="tel"
                maxLength={30}
                required
              />
            </div>
            {/* Address + Postal Code */}
            <div className="grid grid-cols-3 gap-2">
              <div className="relative col-span-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t.form.addressPlaceholder}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10"
                  maxLength={200}
                />
              </div>
              <Input
                placeholder={t.form.postalCode}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                maxLength={10}
              />
            </div>
            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal h-10",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'dd.MM.yyyy') : (t.form.selectDate || 'Дата')}
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
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder={t.form.selectTime || 'Время'} />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-fresh hover:bg-fresh/90 text-white shadow-glow h-12">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {t.form.submit}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickOrderDialog;
