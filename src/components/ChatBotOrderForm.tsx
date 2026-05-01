import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, FileText, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';
import { ru, pl, uk, enUS } from 'date-fns/locale';
import { useLanguage } from '@/i18n/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

export interface ChatBotOrder {
  name: string;
  phone: string;
  contact?: string;
  serviceKey: string;
  serviceLabel: string;
  city?: string;
  address?: string;
  date?: string; // dd.MM.yyyy
  time?: string;
  details?: string;
}

interface ChatBotOrderFormProps {
  onSubmit: (order: ChatBotOrder) => void;
  onCancel: () => void;
  isLoading: boolean;
  defaultServiceKey?: string;
  defaultCity?: string;
  defaultDetails?: string;
}

const TIME_SLOTS = Array.from({ length: 25 }, (_, i) => {
  const hours = Math.floor((i * 30 + 480) / 60);
  const minutes = (i * 30 + 480) % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
});

const ChatBotOrderForm = ({ onSubmit, onCancel, isLoading, defaultServiceKey = '', defaultCity = '', defaultDetails = '' }: ChatBotOrderFormProps) => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const dateLocale = language === 'ru' ? ru : language === 'pl' ? pl : language === 'uk' ? uk : enUS;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contact, setContact] = useState('');
  const [serviceKey, setServiceKey] = useState<string>(defaultServiceKey);
  const [city, setCity] = useState(defaultCity);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [details, setDetails] = useState(defaultDetails);

  const services = (t.chatbot as any)?.services || {};
  const serviceKeys = ['cleaning','furniture','mattress','carpet','auto','ozone','windows','handyman','impregnation','gardening','other'];

  const isValid = name.trim().length > 1 && phone.trim().length > 5 && serviceKey;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      contact: contact.trim() || undefined,
      serviceKey,
      serviceLabel: services[serviceKey] || serviceKey,
      city: city.trim() || undefined,
      address: address.trim() || undefined,
      date: date ? format(date, 'dd.MM.yyyy') : undefined,
      time: time || undefined,
      details: details.trim() || undefined,
    });
  };

  const inputCls = cn('h-10', isMobile && 'text-base');

  return (
    <div className="absolute bottom-16 left-0 right-0 max-h-[70%] overflow-y-auto p-3 bg-card border-t border-border">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-foreground">{(t.chatbot as any).orderTitle}</p>
          <p className="text-[11px] text-muted-foreground">{(t.chatbot as any).orderSubtitle}</p>
        </div>
        <button
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground p-1"
          aria-label="Cancel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {/* Name */}
        <div>
          <Label className="text-[11px] text-muted-foreground">
            {t.chatbot.name} <span className="text-destructive">*</span>
          </Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.chatbot.namePlaceholder} className={inputCls} maxLength={100} />
        </div>

        {/* Phone */}
        <div>
          <Label className="text-[11px] text-muted-foreground">
            {language === 'ru' ? 'Телефон' : language === 'pl' ? 'Telefon' : language === 'uk' ? 'Телефон' : 'Phone'} <span className="text-destructive">*</span>
          </Label>
          <Input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+48 ..." className={inputCls} maxLength={30} />
        </div>

        {/* Service */}
        <div>
          <Label className="text-[11px] text-muted-foreground">
            {(t.chatbot as any).service} <span className="text-destructive">*</span>
          </Label>
          <Select value={serviceKey} onValueChange={setServiceKey}>
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder={(t.chatbot as any).servicePlaceholder} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {serviceKeys.map((key) => (
                <SelectItem key={key} value={key}>{services[key] || key}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City + Address */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-[11px] text-muted-foreground">{(t.chatbot as any).city}</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder={(t.chatbot as any).cityPlaceholder} className={inputCls} maxLength={100} />
          </div>
          <div>
            <Label className="text-[11px] text-muted-foreground">{(t.chatbot as any).address}</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder={(t.chatbot as any).addressPlaceholder} className={inputCls} maxLength={200} />
          </div>
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn('justify-start text-left font-normal', inputCls, !date && 'text-muted-foreground')}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'dd.MM.yyyy') : (t.chatbot as any).date}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[100]" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={dateLocale}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder={(t.chatbot as any).time} />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Details */}
        <div>
          <Label className="text-[11px] text-muted-foreground">{(t.chatbot as any).details}</Label>
          <Textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={(t.chatbot as any).detailsPlaceholder}
            className={cn('min-h-[60px] resize-none', isMobile && 'text-base')}
            maxLength={1000}
          />
        </div>

        {/* Alt contact */}
        <div>
          <Label className="text-[11px] text-muted-foreground">
            {t.chatbot.contact} <span className="text-muted-foreground/70">({(t.chatbot as any).optionalField})</span>
          </Label>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder={t.chatbot.contactPlaceholder} className={inputCls} maxLength={200} />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className={cn('w-full bg-gradient-to-r from-primary to-fresh hover:opacity-90 mt-1', isMobile && 'h-12 text-base')}
          size="sm"
        >
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
          {t.chatbot.sendRequest}
        </Button>
      </div>
    </div>
  );
};

export default ChatBotOrderForm;
