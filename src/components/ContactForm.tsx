import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { Send, Loader2, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru, pl, uk, enUS } from 'date-fns/locale';
import SimpleCaptcha from './SimpleCaptcha';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormProps {
  selectedDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
}

const ContactForm = ({ selectedDate, onDateChange }: ContactFormProps) => {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    time: '',
    address: '',
    message: '',
  });

  // Sync with external selectedDate prop
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const locales = { ru, pl, uk, en: enUS };
  const currentLocale = locales[language] || enUS;

  const services = [
    t.services.carpets,
    t.services.furniture,
    t.services.leather,
    t.services.balcony,
    t.nav.auto,
    t.nav.ozone,
    t.nav.handyman,
  ];

  // Only disable past dates
  const isPastDate = (checkDate: Date) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return checkDate < todayStart;
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    onDateChange?.(newDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaValid) {
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: language === 'ru' ? 'Пожалуйста, решите капчу' : 'Please solve the captcha',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-telegram', {
        body: {
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          time: formData.time,
          address: formData.address,
          message: formData.message,
          date: date ? format(date, 'PPP', { locale: currentLocale }) : undefined,
        },
      });

      if (error) throw error;

      toast({
        title: t.form.success,
        description: `${formData.name}, ${t.form.success}`,
      });

      setFormData({ name: '', phone: '', service: '', time: '', address: '', message: '' });
      setDate(undefined);
      onDateChange?.(undefined);
      setIsCaptchaValid(false);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: language === 'ru' ? 'Не удалось отправить заявку. Попробуйте позже.' : 'Failed to send. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium text-foreground">{t.form.name}</label>
          <Input
            type="text"
            placeholder={t.form.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm"
          />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium text-foreground">{t.form.phone}</label>
          <Input
            type="tel"
            inputMode="tel"
            placeholder={t.form.phonePlaceholder}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium text-foreground">{t.form.service}</label>
          <Select
            value={formData.service}
            onValueChange={(value) => setFormData({ ...formData, service: value })}
          >
            <SelectTrigger className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm">
              <SelectValue placeholder={t.form.service} />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service} value={service} className="py-3 sm:py-2">
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium text-foreground">{t.form.preferredTime}</label>
          <Select
            value={formData.time}
            onValueChange={(value) => setFormData({ ...formData, time: value })}
          >
            <SelectTrigger className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm">
              <SelectValue placeholder={t.form.selectTime} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i.toString().padStart(2, '0');
                return (
                  <SelectItem key={hour} value={`${hour}:00`} className="py-3 sm:py-2">
                    {hour}:00
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">{t.form.address}</label>
        <Input
          type="text"
          placeholder={t.form.addressPlaceholder}
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
          className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm"
        />
      </div>

      {/* Date Picker */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">{t.form.preferredDate}</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal bg-card border-border h-11 sm:h-10 text-base sm:text-sm',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP', { locale: currentLocale }) : t.form.selectDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(d) => isPastDate(d)}
              initialFocus
              locale={currentLocale}
              className={cn('p-3 pointer-events-auto')}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">{t.form.message}</label>
        <Textarea
          placeholder={t.form.messagePlaceholder}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="bg-card border-border resize-none text-base sm:text-sm min-h-[100px]"
        />
      </div>

      {/* Simple Captcha */}
      <SimpleCaptcha onVerify={setIsCaptchaValid} language={language} />

      <Button
        type="submit"
        disabled={isLoading || !isCaptchaValid}
        className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow transition-all h-12 sm:h-11 text-base touch-manipulation active:scale-[0.98]"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Send className="w-5 h-5 mr-2" />
        )}
        {t.form.submit}
      </Button>
    </form>
  );
};

export default ContactForm;
