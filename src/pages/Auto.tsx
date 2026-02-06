import { useState, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AutoSplash from '@/components/AutoSplash';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Car, Armchair, Layers, Sparkles, Calculator, Plus, Minus, Trash2, Send } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import autoCleaning1 from '@/assets/auto-cleaning-1.jpg';
import autoCleaning2 from '@/assets/auto-cleaning-2.jpg';
import autoCleaning3 from '@/assets/auto-cleaning-3.jpg';
import { CalculatorItem } from '@/types/calculator';
interface AutoPriceItem {
  id: string;
  name: string;
  price: number;
}
interface SelectedAutoItem {
  item: AutoPriceItem;
  quantity: number;
}
const Auto = () => {
  const {
    t
  } = useLanguage();
  const [selectedItems, setSelectedItems] = useState<SelectedAutoItem[]>([]);
  const [showSplash, setShowSplash] = useState(true);
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  const autoPrices: AutoPriceItem[] = [{
    id: 'autoComplex',
    name: t.prices.items.autoComplex,
    price: 450
  }, {
    id: 'autoComplexLeather',
    name: t.prices.items.autoComplexLeather,
    price: 550
  }, {
    id: 'autoSeat',
    name: t.prices.items.autoSeat,
    price: 80
  }, {
    id: 'autoSeats',
    name: t.prices.items.autoSeats,
    price: 300
  }, {
    id: 'autoLeatherSeats',
    name: t.prices.items.autoLeatherSeats,
    price: 350
  }, {
    id: 'autoDoorCard',
    name: t.prices.items.autoDoorCard,
    price: 40
  }, {
    id: 'autoPlastics',
    name: t.prices.items.autoPlastics,
    price: 70
  }, {
    id: 'autoCeiling',
    name: t.prices.items.autoCeiling,
    price: 100
  }, {
    id: 'autoFloor',
    name: t.prices.items.autoFloor,
    price: 100
  }, {
    id: 'autoTrunk',
    name: t.prices.items.autoTrunk,
    price: 80
  }, {
    id: 'autoOzone',
    name: t.prices.items.autoOzone,
    price: 100
  }, {
    id: 'autoTruckCabin',
    name: t.prices.items.autoTruckCabin,
    price: 650
  }, {
    id: 'autoVanCabin',
    name: t.prices.items.autoVanCabin,
    price: 400
  }];
  const addItem = (item: AutoPriceItem) => {
    const existing = selectedItems.find(s => s.item.id === item.id);
    if (existing) {
      setSelectedItems(selectedItems.map(s => s.item.id === item.id ? {
        ...s,
        quantity: s.quantity + 1
      } : s));
    } else {
      setSelectedItems([...selectedItems, {
        item,
        quantity: 1
      }]);
    }
  };
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      setSelectedItems(selectedItems.map(s => s.item.id === itemId ? {
        ...s,
        quantity: newQuantity
      } : s));
    }
  };
  const removeItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter(s => s.item.id !== itemId));
  };
  const calculateTotal = () => {
    return selectedItems.reduce((sum, s) => sum + s.item.price * s.quantity, 0);
  };
  const clearAll = () => {
    setSelectedItems([]);
  };
  const sendToForm = () => {
    if (selectedItems.length === 0) return;
    const items: CalculatorItem[] = selectedItems.map(s => ({
      id: s.item.id,
      name: s.item.name,
      price: s.item.price,
      quantity: s.quantity
    }));
    formRef.current?.setCalculatorData(items, calculateTotal());

    // Scroll to form
    formSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const services = [{
    icon: Car,
    title: t.auto.interior,
    description: t.auto.interiorDesc
  }, {
    icon: Armchair,
    title: t.auto.leather,
    description: t.auto.leatherDesc
  }, {
    icon: Layers,
    title: t.auto.carpet,
    description: t.auto.carpetDesc
  }, {
    icon: Sparkles,
    title: t.auto.detailing,
    description: t.auto.detailingDesc
  }];
  const galleryImages = [{
    src: autoCleaning1,
    alt: 'Чистка сидений автомобиля'
  }, {
    src: autoCleaning2,
    alt: 'Паровая чистка салона'
  }, {
    src: autoCleaning3,
    alt: 'Чистка ковролина в авто'
  }];
  return <Layout>
      {showSplash && <AutoSplash onComplete={handleSplashComplete} />}
      
      {/* Hero with Fullscreen Video Background */}
      <section className="relative min-h-[calc(100vh-120px)] overflow-hidden flex items-center">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe src="https://www.youtube.com/embed/FPFpQDscE4c?autoplay=1&mute=1&loop=1&playlist=FPFpQDscE4c&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] w-[177.78vh] h-[56.25vw] border-0" style={{
          aspectRatio: '16/9'
        }} allow="autoplay; encrypted-media" title="Auto cleaning background video" />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/55" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Live Car Icon */}
            <div className="flex justify-center mb-4 sm:mb-6 animate-fade-up">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                animation: 'float 3s ease-in-out infinite'
              }}>
                  <Car className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-fresh rounded-full animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-ping" style={{
                animationDelay: '0.5s'
              }} />
              </div>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
            animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
          }}>
              {t.auto.title}
            </h1>
            <p className="text-base sm:text-lg animate-fade-up text-secondary-foreground" style={{
            animationDelay: '0.1s'
          }}>
              {t.auto.subtitle}
            </p>
          </div>
        </div>
      </section>


      {/* Services */}
      <section className="py-12 sm:py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {services.map((service, index) => <CircularRevealCard key={index} index={index}>
                <div className="group flex gap-3 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow group-hover:scale-110 transition-transform" style={{
                animation: 'float 3s ease-in-out infinite'
              }}>
                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">{service.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </CircularRevealCard>)}
          </div>
        </div>
      </section>

      {/* Price List & Calculator */}
      <section className="py-12 sm:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
            animation: 'shimmer 3s linear infinite'
          }}>
              {t.prices.autoCleaning}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Price List - Accordion */}
            <CircularRevealCard index={0}>
              <Card className="shadow-card h-full">
              <CardHeader className="border-b border-border p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0">
                    <Car className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-serif text-lg sm:text-xl">{t.prices.autoCleaning}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="standard" className="border rounded-lg px-3">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center justify-between w-full pr-2">
                        <span className="font-medium text-sm sm:text-base">{t.prices.items.autoComplex}</span>
                        <span className="text-primary font-semibold text-sm sm:text-base whitespace-nowrap ml-2">
                          {t.prices.from} 450 {t.prices.currency}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <div className="space-y-2 pt-2 border-t">
                        {autoPrices.slice(1, 8).map(item => <div key={item.id} className="flex items-center justify-between py-2 text-sm">
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className="text-primary font-medium whitespace-nowrap ml-2">
                              {t.prices.from} {item.price} {t.prices.currency}
                            </span>
                          </div>)}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="trucks" className="border rounded-lg px-3">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center justify-between w-full pr-2">
                        <span className="font-medium text-sm sm:text-base">{t.prices.items.autoTruckCabin}</span>
                        <span className="text-primary font-semibold text-sm sm:text-base whitespace-nowrap ml-2">
                          {t.prices.from} 400 {t.prices.currency}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <div className="space-y-2 pt-2 border-t">
                        {autoPrices.slice(8).map(item => <div key={item.id} className="flex items-center justify-between py-2 text-sm">
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className="text-primary font-medium whitespace-nowrap ml-2">
                              {t.prices.from} {item.price} {t.prices.currency}
                            </span>
                          </div>)}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            </CircularRevealCard>

            {/* Calculator */}
            <CircularRevealCard index={1}>
              <Card className="shadow-card h-full">
              <CardHeader className="border-b border-border p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-serif text-lg sm:text-xl">{t.calculator.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                {/* Available Items */}
                <div className="mb-4 sm:mb-6">
                  <Label className="text-sm font-medium text-muted-foreground mb-2 sm:mb-3 block">
                    {t.calculator.selectItems}
                  </Label>
                  <div className="grid grid-cols-1 gap-2">
                    {autoPrices.map(item => <Button key={item.id} variant="outline" size="sm" className="justify-start text-left h-auto py-2.5 sm:py-2 px-3 text-sm" onClick={() => addItem(item)}>
                        <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Button>)}
                  </div>
                </div>

                {/* Selected Items */}
                {selectedItems.length > 0 && <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-muted-foreground">
                        {t.calculator.selectedItems}
                      </Label>
                      <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive h-auto py-1">
                        <Trash2 className="w-4 h-4 mr-1" />
                        {t.calculator.clear}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {selectedItems.map(selected => <div key={selected.item.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 p-3 bg-accent/30 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-foreground text-sm sm:text-base truncate block">
                              {selected.item.name}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {t.prices.from} {selected.item.price} {t.prices.currency}
                            </span>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-2 sm:ml-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(selected.item.id, selected.quantity - 1)}>
                                <Minus className="w-4 h-4" />
                              </Button>
                              <Input type="number" min="1" value={selected.quantity} onChange={e => updateQuantity(selected.item.id, parseInt(e.target.value) || 0)} className="w-12 sm:w-16 h-8 text-center" />
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(selected.item.id, selected.quantity + 1)}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="w-20 sm:w-24 text-right sm:ml-4">
                              <span className="font-semibold text-primary text-sm sm:text-base">
                                {selected.item.price * selected.quantity} {t.prices.currency}
                              </span>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>}

                {/* Total */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-medium">{t.calculator.total}</span>
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      {t.prices.from} {calculateTotal()} {t.prices.currency}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    {t.calculator.note}
                  </p>
                  
                  {/* Send to Form Button */}
                  {selectedItems.length > 0 && <Button onClick={sendToForm} className="w-full mt-4 bg-fresh hover:bg-fresh/90 text-white shadow-glow transition-all h-11 touch-manipulation active:scale-[0.98]">
                      <Send className="w-4 h-4 mr-2" />
                      {t.form.sendToForm}
                    </Button>}
                </div>
              </CardContent>
            </Card>
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formSectionRef} className="py-12 sm:py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
              animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
            }}>
                {t.form.title}
              </h2>
            </div>
            <CircularRevealCard index={0}>
              <div className="bg-gradient-card p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-card border border-border">
                <ContactForm ref={formRef} />
              </div>
            </CircularRevealCard>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Auto;