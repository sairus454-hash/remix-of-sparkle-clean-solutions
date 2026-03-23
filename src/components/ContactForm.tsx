import { useState, useEffect, forwardRef, useImperativeHandle, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { Send, Loader2, CalendarIcon, ShoppingCart, X, Gift, Percent, Info, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru, pl, uk, enUS } from 'date-fns/locale';

import SuccessAnimation from './SuccessAnimation';
import { supabase } from '@/integrations/supabase/client';
import { CalculatorItem } from '@/types/calculator';
import { useDiscountCalculator, getDiscountTiers } from '@/hooks/useDiscountCalculator';
export interface ContactFormRef {
  setCalculatorData: (items: CalculatorItem[], total: number) => void;
}
interface ContactFormProps {
  selectedDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
}
const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(({
  selectedDate,
  onDateChange
}, ref) => {
  const {
    t,
    language
  } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [calculatorItems, setCalculatorItems] = useState<CalculatorItem[]>(() => {
    try {
      const saved = sessionStorage.getItem('mc_calculator_items');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [calculatorTotal, setCalculatorTotal] = useState(() => {
    try {
      const saved = sessionStorage.getItem('mc_calculator_total');
      return saved ? Number(saved) : 0;
    } catch { return 0; }
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cityAddress: '',
    postalCode: '',
    time: '',
    paymentMethod: '',
    message: ''
  });



  // Expose setCalculatorData method - now ADDS to existing items instead of replacing
  useImperativeHandle(ref, () => ({
    setCalculatorData: (newItems: CalculatorItem[], newTotal: number) => {
      setCalculatorItems(prevItems => {
        // Merge new items with existing ones
        const mergedItems = [...prevItems];
        
        newItems.forEach(newItem => {
          const existingIndex = mergedItems.findIndex(item => item.id === newItem.id);
          if (existingIndex >= 0) {
            // Update quantity if item already exists
            mergedItems[existingIndex] = {
              ...mergedItems[existingIndex],
              quantity: mergedItems[existingIndex].quantity + newItem.quantity
            };
          } else {
            // Add new item
            mergedItems.push(newItem);
          }
        });
        
        return mergedItems;
      });
      
      // Recalculate total based on merged items
      setCalculatorTotal(prevTotal => prevTotal + newTotal);
    }
  }));

  // Persist calculator data to localStorage
  useEffect(() => {
    try {
      if (calculatorItems.length > 0) {
        sessionStorage.setItem('mc_calculator_items', JSON.stringify(calculatorItems));
        sessionStorage.setItem('mc_calculator_total', String(calculatorTotal));
      } else {
        sessionStorage.removeItem('mc_calculator_items');
        sessionStorage.removeItem('mc_calculator_total');
      }
    } catch {}
  }, [calculatorItems, calculatorTotal]);

  // Sync with external selectedDate prop
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  // Convert calculator items to format for discount calculator
  const discountItems = useMemo(() => 
    calculatorItems.map(item => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
    })), [calculatorItems]);

  // Use the discount calculator hook
  const discountInfo = useDiscountCalculator(discountItems);

  // Get discount tiers for display
  const discountTiers = getDiscountTiers(language);

  // Auto-generate message from calculator data with discount info
  useEffect(() => {
    if (calculatorItems.length > 0) {
      const orderLabel = t.form.orderFromCalculator || 'Заказ из калькулятора';
      const totalLabel = language === 'ru' ? 'Итого:' : language === 'pl' ? 'Razem:' : language === 'uk' ? 'Разом:' : 'Total:';
      const discountLabel = language === 'ru' ? 'Скидка:' : language === 'pl' ? 'Rabat:' : language === 'uk' ? 'Знижка:' : 'Discount:';
      
      const lines = calculatorItems.map(item => {
        const unitPart = item.unit ? ` (${item.unit})` : '';
        return `• ${item.name}${unitPart} × ${item.quantity} = ${item.price * item.quantity} ${t.prices.currency}`;
      });
      
      let message = `${orderLabel}:\n${lines.join('\n')}`;
      
      if (discountInfo.hasDiscount) {
        message += `\n\n${discountLabel} -${discountInfo.discountPercent}% (-${discountInfo.discountAmount} ${t.prices.currency})`;
      }
      
      message += `\n\n${totalLabel} ${discountInfo.finalTotal} ${t.prices.currency}`;
      
      setFormData(prev => ({
        ...prev,
        message
      }));
    }
  }, [calculatorItems, discountInfo, t, language]);
  const locales = {
    ru,
    pl,
    uk,
    en: enUS
  };
  const currentLocale = locales[language] || enUS;

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
  const clearCalculatorData = () => {
    setCalculatorItems([]);
    setCalculatorTotal(0);
    setFormData(prev => ({
      ...prev,
      message: ''
    }));
    try {
      sessionStorage.removeItem('mc_calculator_items');
      sessionStorage.removeItem('mc_calculator_total');
    } catch {}
  };
  const removeCalculatorItem = (itemId: string) => {
    setCalculatorItems(prev => {
      const updated = prev.filter(item => item.id !== itemId);
      if (updated.length === 0) {
        setCalculatorTotal(0);
        setFormData(prevForm => ({
          ...prevForm,
          message: ''
        }));
      } else {
        const newTotal = updated.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setCalculatorTotal(newTotal);
      }
      return updated;
    });
  };

  // Sound notification function - plays a pleasant success beep
  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a pleasant two-tone success sound
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      const now = audioContext.currentTime;
      playTone(523.25, now, 0.15); // C5
      playTone(659.25, now + 0.15, 0.15); // E5
      playTone(783.99, now + 0.3, 0.25); // G5
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  // Voice notification function with language support
  const speakSuccess = () => {
    if ('speechSynthesis' in window) {
      // Messages and language codes for each supported language
      const voiceConfig: Record<string, {
        text: string;
        lang: string;
        langPrefix: string;
      }> = {
        ru: {
          text: 'Заявка отправлена!',
          lang: 'ru-RU',
          langPrefix: 'ru'
        },
        en: {
          text: 'Request sent successfully!',
          lang: 'en-US',
          langPrefix: 'en'
        },
        pl: {
          text: 'Zgłoszenie zostało wysłane!',
          lang: 'pl-PL',
          langPrefix: 'pl'
        },
        uk: {
          text: 'Заявку успішно надіслано!',
          lang: 'uk-UA',
          langPrefix: 'uk'
        }
      };
      const config = voiceConfig[language] || voiceConfig.ru;
      const utterance = new SpeechSynthesisUtterance(config.text);
      utterance.lang = config.lang;
      utterance.rate = 1.0;
      utterance.pitch = 1.1;

      // Try to find a female voice for the current language
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.lang.includes(config.langPrefix) && (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman') || voice.name.includes('Milena') || voice.name.includes('Irina') || voice.name.includes('Anna') || voice.name.includes('Zosia') || voice.name.includes('Ewa') || voice.name.includes('Lesya'))) || voices.find(voice => voice.lang.includes(config.langPrefix));
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      speechSynthesis.speak(utterance);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.cityAddress || !formData.postalCode || (!formData.time && !date)) {
      toast({
        title: language === 'ru' ? 'Ошибка' : language === 'pl' ? 'Błąd' : language === 'uk' ? 'Помилка' : 'Error',
        description: language === 'ru' ? 'Пожалуйста, заполните все обязательные поля' : language === 'pl' ? 'Proszę wypełnić wszystkie wymagane pola' : language === 'uk' ? 'Будь ласка, заповніть всі обов\'язкові поля' : 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const paymentLabel = formData.paymentMethod ? `\n💳 ${t.form.paymentType}: ${formData.paymentMethod}` : '';
      const { data, error } = await supabase.functions.invoke('send-telegram', {
        body: {
          name: formData.name,
          phone: formData.phone,
          time: formData.time,
          message: `📍 ${formData.cityAddress}, ${formData.postalCode}${paymentLabel}\n\n${formData.message}`,
          date: date ? format(date, 'PPP', { locale: currentLocale }) : undefined
        }
      });
      if (error) throw error;

      (await import('@/lib/gtm')).gtmEvents.formSubmit('contact_form', {
        has_calculator: calculatorItems.length > 0,
      });

      setShowSuccessAnimation(true);
      playSuccessSound();
      speakSuccess();
      toast({
        title: t.form.success,
        description: `${formData.name}, ${t.form.success}`
      });
      setFormData({
        name: '',
        phone: '',
        cityAddress: '',
        postalCode: '',
        time: '',
        paymentMethod: '',
        message: ''
      });
      setDate(undefined);
      onDateChange?.(undefined);
      clearCalculatorData();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: language === 'ru' ? 'Не удалось отправить заявку. Попробуйте позже.' : 'Failed to send. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimationComplete = useCallback(() => {
    setShowSuccessAnimation(false);
  }, []);

  return <>
    {/* Success Animation Overlay */}
    <SuccessAnimation 
      isVisible={showSuccessAnimation} 
      onComplete={handleAnimationComplete} 
    />
    
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Calculator Data Preview with Discount System */}
      {calculatorItems.length > 0 && <div className="bg-fresh/10 border border-fresh/30 rounded-xl p-4 animate-fade-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-fresh" />
              <span className="font-semibold text-foreground">{t.form.orderFromCalculator}</span>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={clearCalculatorData} className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {calculatorItems.map((item, index) => <div key={index} className="flex justify-between items-center text-sm group">
                <span className="text-muted-foreground flex-1">
                  {item.name} {item.unit && `(${item.unit})`} × {item.quantity}
                </span>
                <span className="font-medium text-foreground mr-2">
                  {item.price * item.quantity} {t.prices.currency}
                </span>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeCalculatorItem(item.id)} className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive opacity-60 hover:opacity-100 transition-opacity">
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>)}
          </div>
          
          {/* Discount Tiers Info */}
          <div className="mt-3 pt-3 border-t border-fresh/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">{t.calculator.discountSystem}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(() => {
                // Count unique categories for tier highlighting
                const uniqueCats = new Set(calculatorItems.map(item => {
                  const cat = item.category || item.id;
                  if (cat === 'cleaning' || cat.startsWith('cleaning_') || cat.startsWith('extra-')) return 'cleaning';
                  return cat;
                }));
                const catCount = uniqueCats.size;
                return discountTiers.map((tier, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-xs border transition-all",
                      catCount >= (index === 0 ? 2 : index === 1 ? 4 : 6)
                        ? "bg-fresh/20 border-fresh/50 text-fresh font-semibold"
                        : "bg-muted/50 border-border text-muted-foreground"
                    )}
                  >
                    <span>{tier.services}</span>
                    <span className="font-bold">{tier.discount}</span>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Discount Applied */}
          {discountInfo.hasDiscount && (
            <div className="mt-3 p-2 bg-fresh/20 rounded-lg border border-fresh/40">
              <div className="flex items-center gap-1.5 mb-1">
                <Percent className="w-4 h-4 text-fresh" />
                <span className="text-sm font-semibold text-fresh">{discountInfo.discountReason}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground line-through">{discountInfo.originalTotal} {t.prices.currency}</span>
                <span className="text-fresh font-medium">-{discountInfo.discountAmount} {t.prices.currency}</span>
              </div>
            </div>
          )}

          {/* Smart recommendations to increase discount */}
          <AnimatePresence mode="wait">
          {(() => {
            const existingCats = new Set(calculatorItems.map(item => {
              const cat = item.category || item.id;
              if (cat === 'cleaning' || cat.startsWith('cleaning_') || cat.startsWith('extra-')) return 'cleaning';
              if (cat === 'other') return 'furniture';
              return cat;
            }));
            const catCount = existingCats.size;
            
            // Define all possible categories with suggestions
            const allCategories: { key: string; label: Record<string, string>; page: string }[] = [
              { key: 'cleaning', label: { ru: '🏠 Уборку квартиры', pl: '🏠 Sprzątanie mieszkania', uk: '🏠 Прибирання квартири', en: '🏠 House cleaning' }, page: '/cleaning' },
              { key: 'furniture', label: { ru: '🛋️ Химчистку мебели', pl: '🛋️ Czyszczenie mebli', uk: '🛋️ Хімчистку меблів', en: '🛋️ Furniture cleaning' }, page: '/prices' },
              { key: 'mattress', label: { ru: '🛏️ Химчистку матраса', pl: '🛏️ Czyszczenie materaca', uk: '🛏️ Хімчистку матраца', en: '🛏️ Mattress cleaning' }, page: '/prices' },
              { key: 'auto', label: { ru: '🚗 Химчистку авто', pl: '🚗 Czyszczenie auta', uk: '🚗 Хімчистку авто', en: '🚗 Auto cleaning' }, page: '/auto' },
              { key: 'leather', label: { ru: '💼 Чистку кожи', pl: '💼 Czyszczenie skóry', uk: '💼 Чистку шкіри', en: '💼 Leather cleaning' }, page: '/prices' },
              { key: 'ozone', label: { ru: '🌬️ Озонирование', pl: '🌬️ Ozonowanie', uk: '🌬️ Озонування', en: '🌬️ Ozone treatment' }, page: '/ozone' },
              { key: 'impregnation', label: { ru: '🛡️ Импрегнацию', pl: '🛡️ Impregnację', uk: '🛡️ Імпрегнацію', en: '🛡️ Impregnation' }, page: '/impregnation' },
              { key: 'windows', label: { ru: '🪟 Мытьё окон', pl: '🪟 Mycie okien', uk: '🪟 Миття вікон', en: '🪟 Window cleaning' }, page: '/windows' },
            ];
            
            const missing = allCategories.filter(c => !existingCats.has(c.key));
            
            // Determine next discount tier
            let nextTier = 0;
            let nextDiscount = '';
            if (catCount < 2) { nextTier = 2 - catCount; nextDiscount = '5%'; }
            else if (catCount < 4) { nextTier = 4 - catCount; nextDiscount = '10%'; }
            else if (catCount < 6) { nextTier = 6 - catCount; nextDiscount = '15%'; }
            
            if (missing.length === 0 || !nextDiscount) return null;
            
            const headerText = {
              ru: `Добавьте ещё ${nextTier} ${nextTier === 1 ? 'категорию' : 'категории'} для скидки ${nextDiscount}:`,
              pl: `Dodaj jeszcze ${nextTier} ${nextTier === 1 ? 'kategorię' : 'kategorie'} dla rabatu ${nextDiscount}:`,
              uk: `Додайте ще ${nextTier} ${nextTier === 1 ? 'категорію' : 'категорії'} для знижки ${nextDiscount}:`,
              en: `Add ${nextTier} more ${nextTier === 1 ? 'category' : 'categories'} for ${nextDiscount} off:`,
            };
            
            // Show up to 4 recommendations
            const recommendations = missing.slice(0, 4);
            
            return (
              <motion.div
                key={`rec-${catCount}-${nextDiscount}`}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-2 p-2.5 bg-primary/10 rounded-lg border border-primary/20"
              >
                <div className="flex items-start gap-1.5 mb-2">
                  <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-xs font-semibold text-primary">
                    {headerText[language as keyof typeof headerText] || headerText.ru}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recommendations.map((rec, i) => (
                    <motion.button
                      key={rec.key}
                      type="button"
                      onClick={() => navigate(rec.page, { state: { openCategory: rec.key } })}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.25, ease: 'easeOut' }}
                      whileHover={{ scale: 1.08 }}
                      className="text-xs px-2 py-1 rounded-full bg-primary/15 hover:bg-primary/25 text-primary border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer no-underline"
                    >
                      {rec.label[language] || rec.label.ru}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            );
          })()}
          </AnimatePresence>
          
          {/* Total */}
          <div className="mt-3 pt-3 border-t border-fresh/30 flex justify-between items-center">
            <span className="font-semibold text-foreground">{t.calculator.total}</span>
            <span className="text-lg font-bold text-primary">{discountInfo.finalTotal} {t.prices.currency}</span>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">{t.form.checkOrder}</p>
        </div>}

      {/* Name */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">
          {language === 'uk' ? 'Ваше ім\'я' : t.form.name} <span className="text-destructive">*</span>
        </label>
        <Input type="text" placeholder={t.form.namePlaceholder} value={formData.name} onChange={e => setFormData({
          ...formData,
          name: e.target.value
        })} required className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm" maxLength={100} />
      </div>

      {/* Phone */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">
          {language === 'uk' ? 'Телефон' : t.form.phone} <span className="text-destructive">*</span>
        </label>
        <Input type="tel" inputMode="tel" placeholder={t.form.phonePlaceholder} value={formData.phone} onChange={e => setFormData({
          ...formData,
          phone: e.target.value
        })} required className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm" maxLength={30} />
      </div>

      {/* City & Address */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">
          {language === 'ru' ? 'Город и адрес' : language === 'pl' ? 'Miasto i adres' : language === 'uk' ? 'Місто та адреса' : 'City and address'} <span className="text-destructive">*</span>
        </label>
        <Input type="text" placeholder={language === 'ru' ? 'Напр. Wrocław, ul. Przykładowa 10/5' : language === 'pl' ? 'Np. Wrocław, ul. Przykładowa 10/5' : language === 'uk' ? 'Напр. Wrocław, ul. Przykładowa 10/5' : 'E.g. Wrocław, ul. Przykładowa 10/5'} value={formData.cityAddress} onChange={e => setFormData({
          ...formData,
          cityAddress: e.target.value
        })} required className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm" maxLength={200} />
      </div>

      {/* Postal Code */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">
          {language === 'ru' ? 'Почтовый код' : language === 'pl' ? 'Kod pocztowy' : language === 'uk' ? 'Поштовий код' : 'Postal code'} <span className="text-destructive">*</span>
        </label>
        <Input type="text" inputMode="numeric" placeholder={language === 'ru' ? 'Напр. 50-123' : language === 'pl' ? 'Np. 50-123' : language === 'uk' ? 'Напр. 50-123' : 'E.g. 50-123'} value={formData.postalCode} onChange={e => setFormData({
          ...formData,
          postalCode: e.target.value
        })} required className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm w-40" maxLength={10} />
      </div>

      {/* Payment Method */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">
          {t.form.paymentType}
        </label>
        <Select value={formData.paymentMethod} onValueChange={value => setFormData({
          ...formData,
          paymentMethod: value
        })}>
          <SelectTrigger className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm">
            <SelectValue placeholder={t.form.selectPaymentType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={t.form.paymentCash}>{t.form.paymentCash}</SelectItem>
            <SelectItem value="BLIK">BLIK</SelectItem>
            <SelectItem value={t.form.paymentInvoice}>{t.form.paymentInvoice}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">
          {language === 'ru' ? 'Желаемое время и дата' : language === 'pl' ? 'Preferowany czas i data' : language === 'uk' ? 'Бажаний час та дата' : 'Preferred time & date'} <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Select value={formData.time} onValueChange={value => setFormData({
            ...formData,
            time: value
          })}>
            <SelectTrigger className="bg-card border-border h-11 sm:h-10 text-base sm:text-sm">
              <SelectValue placeholder={t.form.selectTime} />
            </SelectTrigger>
            <SelectContent className="select-slow-scroll">
              {Array.from({ length: 48 }, (_, i) => {
                const hour = Math.floor(i / 2).toString().padStart(2, '0');
                const min = i % 2 === 0 ? '00' : '30';
                return <SelectItem key={`${hour}:${min}`} value={`${hour}:${min}`} className="py-3 sm:py-2">{hour}:{min}</SelectItem>;
              })}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn('w-full justify-start text-left font-normal bg-card border-border h-11 sm:h-10 text-base sm:text-sm', !date && 'text-muted-foreground')}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'dd.MM', { locale: currentLocale }) : t.form.selectDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={handleDateSelect} disabled={d => isPastDate(d)} initialFocus locale={currentLocale} className={cn('p-3 pointer-events-auto')} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Comment / Message (optional) */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-sm font-medium text-foreground">
          {language === 'ru' ? 'Комментарий' : language === 'pl' ? 'Komentarz' : language === 'uk' ? 'Коментар' : 'Comment'}
        </label>
        <textarea
          placeholder={language === 'ru' ? 'Дополнительная информация (необязательно)' : language === 'pl' ? 'Dodatkowe informacje (opcjonalnie)' : language === 'uk' ? 'Додаткова інформація (необов\'язково)' : 'Additional info (optional)'}
          value={calculatorItems.length > 0 ? formData.message : (formData.message || '')}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-card px-3 py-2 text-base sm:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          maxLength={2000}
          readOnly={calculatorItems.length > 0}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow transition-all h-12 sm:h-11 text-base touch-manipulation active:scale-[0.98]">
        {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
        {t.form.submit}
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground mt-2">
        <Phone className="w-4 h-4" />
        {language === 'ru' ? 'Мы свяжемся с Вами в ближайшее время' : language === 'pl' ? 'Skontaktujemy się z Tobą wkrótce' : language === 'uk' ? 'Ми зв\'яжемося з Вами найближчим часом' : 'We will contact you shortly'}
      </p>
    </form>
  </>;
});
ContactForm.displayName = 'ContactForm';
export default ContactForm;