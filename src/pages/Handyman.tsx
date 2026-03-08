import { useRef, useState } from 'react';
import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import HandymanSplash from '@/components/HandymanSplash';
import HeroVideo from '@/components/HeroVideo';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wrench, Hammer, Plug, Droplet, Flower2, DoorOpen, 
  Lightbulb, Tv, Frame, ShowerHead, Lock, Fan, Leaf, Calculator
} from 'lucide-react';
import handyman1 from '@/assets/handyman-1.jpg';
import handyman2 from '@/assets/handyman-2.jpg';
import handyman3 from '@/assets/handyman-3.jpg';
import { CalculatorItem } from '@/types/calculator';

// Handyman service images
import imgFaucet from '@/assets/handyman/faucet.jpg';
import imgSiphon from '@/assets/handyman/siphon.jpg';
import imgSink from '@/assets/handyman/sink.jpg';
import imgToilet from '@/assets/handyman/toilet.jpg';
import imgSewer from '@/assets/handyman/sewer.jpg';
import imgWashingMachine from '@/assets/handyman/washing-machine.jpg';
import imgDishwasher from '@/assets/handyman/dishwasher.jpg';
import imgBathroomFan from '@/assets/handyman/bathroom-fan.jpg';
import imgBidet from '@/assets/handyman/bidet.jpg';
import imgUrinal from '@/assets/handyman/urinal.jpg';
import imgHose from '@/assets/handyman/hose.jpg';
import imgDemontage from '@/assets/handyman/demontage.jpg';
import imgSealing from '@/assets/handyman/sealing.jpg';
import imgShowerCabin from '@/assets/handyman/shower-cabin.jpg';
import imgShowerTray from '@/assets/handyman/shower-tray.jpg';
import imgBathtub from '@/assets/handyman/bathtub.jpg';
import imgBathroomAccessories from '@/assets/handyman/bathroom-accessories.jpg';
import imgWallShower from '@/assets/handyman/wall-shower.jpg';
import imgCurtainRod from '@/assets/handyman/curtain-rod.jpg';
import imgShelf from '@/assets/handyman/shelf.jpg';
import imgPictures from '@/assets/handyman/pictures.jpg';
import imgFurnitureAssembly from '@/assets/handyman/furniture-assembly.jpg';
import imgBedSofaRepair from '@/assets/handyman/bed-sofa-repair.jpg';
import imgWardrobeRepair from '@/assets/handyman/wardrobe-repair.jpg';
import imgBulb from '@/assets/handyman/bulb.jpg';
import imgSocket from '@/assets/handyman/socket.jpg';
import imgLamp from '@/assets/handyman/lamp.jpg';
import imgStove from '@/assets/handyman/stove.jpg';
import imgRepair from '@/assets/handyman/repair.jpg';
import imgDiagnostic from '@/assets/handyman/diagnostic.jpg';
import imgSwitch from '@/assets/handyman/switch.jpg';
import imgFuse from '@/assets/handyman/fuse.jpg';
import imgLampRepair from '@/assets/handyman/lamp-repair.jpg';
import imgChandelier from '@/assets/handyman/chandelier.jpg';
import imgMailboxLock from '@/assets/handyman/mailbox-lock.jpg';
import imgDoorHandle from '@/assets/handyman/door-handle.jpg';
import imgDoorCylinder from '@/assets/handyman/door-cylinder.jpg';
import imgAluminumDoor from '@/assets/handyman/aluminum-door.jpg';
import imgWindowAdjustment from '@/assets/handyman/window-adjustment.jpg';
import imgFridgeHinges from '@/assets/handyman/fridge-hinges.jpg';
import imgLawnMowing from '@/assets/handyman/lawn-mowing.jpg';
import imgTreeTrimming from '@/assets/handyman/tree-trimming.jpg';
import imgYardHelp from '@/assets/handyman/yard-help.jpg';

const Handyman = () => {
  const { t } = useLanguage();
  const { showSplash, handleSplashComplete } = useSplash('handyman');
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('plumbing');

  const handleSendToForm = (items: CalculatorItem[], total: number) => {
    formRef.current?.setCalculatorData(items, total);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const services = [
    { icon: Plug, name: t.handyman.electrical, desc: t.handyman.electricalDesc },
    { icon: Droplet, name: t.handyman.plumbing, desc: t.handyman.plumbingDesc },
    { icon: Hammer, name: t.handyman.carpentry, desc: t.handyman.carpentryDesc },
    { icon: Flower2, name: t.handyman.painting, desc: t.handyman.paintingDesc },
    { icon: DoorOpen, name: t.handyman.doors, desc: t.handyman.doorsDesc },
    { icon: Lightbulb, name: t.handyman.lighting, desc: t.handyman.lightingDesc },
    { icon: Tv, name: t.handyman.mounting, desc: t.handyman.mountingDesc },
    { icon: Frame, name: t.handyman.furniture, desc: t.handyman.furnitureDesc },
    { icon: ShowerHead, name: t.handyman.bathroom, desc: t.handyman.bathroomDesc },
    { icon: Lock, name: t.handyman.locks, desc: t.handyman.locksDesc },
    { icon: Fan, name: t.handyman.ventilation, desc: t.handyman.ventilationDesc },
    { icon: Wrench, name: t.handyman.other, desc: t.handyman.otherDesc },
  ];

  const categoryTabs = [
    { id: 'plumbing', name: t.handyman.plumbing, icon: Droplet },
    { id: 'mounting', name: t.handyman.mounting, icon: Frame },
    { id: 'electrical', name: t.handyman.electrical, icon: Lightbulb },
    { id: 'locksmith', name: t.handyman.other, icon: Wrench },
    { id: 'gardening', name: t.handyman.gardening, icon: Leaf },
  ];

  const categoryItems: Record<string, { id: string; name: string; price: number; image: string }[]> = {
    plumbing: [
      { id: 'faucet', name: t.handyman.calcItems.faucet, price: 120, image: imgFaucet },
      { id: 'siphon', name: t.handyman.calcItems.siphon, price: 120, image: imgSiphon },
      { id: 'sink', name: t.handyman.calcItems.sink, price: 180, image: imgSink },
      { id: 'toilet', name: t.handyman.calcItems.toilet, price: 220, image: imgToilet },
      { id: 'sewer', name: t.handyman.calcItems.sewer, price: 250, image: imgSewer },
      { id: 'washingMachine', name: t.handyman.calcItems.washingMachine, price: 140, image: imgWashingMachine },
      { id: 'dishwasher', name: t.handyman.calcItems.dishwasher, price: 140, image: imgDishwasher },
      { id: 'bathroomFan', name: t.handyman.calcItems.bathroomFan, price: 80, image: imgBathroomFan },
      { id: 'bidet', name: t.handyman.calcItems.bidet, price: 220, image: imgBidet },
      { id: 'urinal', name: t.handyman.calcItems.urinal, price: 200, image: imgUrinal },
      { id: 'hoseReplacement', name: t.handyman.calcItems.hoseReplacement, price: 50, image: imgHose },
      { id: 'plumbingDemontage', name: t.handyman.calcItems.plumbingDemontage, price: 80, image: imgDemontage },
      { id: 'sealingJoints', name: t.handyman.calcItems.sealingJoints, price: 40, image: imgSealing },
      { id: 'showerCabinInstall', name: t.handyman.calcItems.showerCabinInstall, price: 450, image: imgShowerCabin },
      { id: 'showerTrayInstall', name: t.handyman.calcItems.showerTrayInstall, price: 200, image: imgShowerTray },
      { id: 'bathtubInstall', name: t.handyman.calcItems.bathtubInstall, price: 300, image: imgBathtub },
      { id: 'bathroomAccessories', name: t.handyman.calcItems.bathroomAccessories, price: 30, image: imgBathroomAccessories },
      { id: 'wallMountedShower', name: t.handyman.calcItems.wallMountedShower, price: 200, image: imgWallShower },
    ],
    mounting: [
      { id: 'curtainRod', name: t.handyman.calcItems.curtainRod, price: 120, image: imgCurtainRod },
      { id: 'shelf', name: t.handyman.calcItems.shelf, price: 100, image: imgShelf },
      { id: 'pictures', name: t.handyman.calcItems.pictures, price: 80, image: imgPictures },
      { id: 'furniture', name: t.handyman.calcItems.furnitureAssembly, price: 80, image: imgFurnitureAssembly },
      { id: 'bedSofaRepair', name: t.handyman.calcItems.bedSofaRepair, price: 130, image: imgBedSofaRepair },
      { id: 'wardrobeRepair', name: t.handyman.calcItems.wardrobeRepair, price: 240, image: imgWardrobeRepair },
    ],
    electrical: [
      { id: 'bulb', name: t.handyman.calcItems.bulb, price: 50, image: imgBulb },
      { id: 'socket', name: t.handyman.calcItems.socket, price: 40, image: imgSocket },
      { id: 'lamp', name: t.handyman.calcItems.lamp, price: 100, image: imgLamp },
      { id: 'stove', name: t.handyman.calcItems.stove, price: 200, image: imgStove },
      { id: 'repair', name: t.handyman.calcItems.repair, price: 100, image: imgRepair },
      { id: 'diagnostic', name: t.handyman.calcItems.diagnostic, price: 350, image: imgDiagnostic },
      { id: 'switch', name: t.handyman.calcItems.switch, price: 50, image: imgSwitch },
      { id: 'fuseReplacement', name: t.handyman.calcItems.fuseReplacement, price: 120, image: imgFuse },
      { id: 'lampRepair', name: t.handyman.calcItems.lampRepair, price: 130, image: imgLampRepair },
      { id: 'chandelierInstall', name: t.handyman.calcItems.chandelierInstall, price: 130, image: imgChandelier },
    ],
    locksmith: [
      { id: 'mailboxLock', name: t.handyman.calcItems.mailboxLock, price: 140, image: imgMailboxLock },
      { id: 'doorHandle', name: t.handyman.calcItems.doorHandle, price: 60, image: imgDoorHandle },
      { id: 'doorCylinder', name: t.handyman.calcItems.doorCylinder, price: 100, image: imgDoorCylinder },
      { id: 'aluminumDoorRepair', name: t.handyman.calcItems.aluminumDoorRepair, price: 200, image: imgAluminumDoor },
      { id: 'windowDoorAdjustment', name: t.handyman.calcItems.windowDoorAdjustment, price: 200, image: imgWindowAdjustment },
      { id: 'fridgeHinges', name: t.handyman.calcItems.fridgeHinges, price: 200, image: imgFridgeHinges },
    ],
    gardening: [
      { id: 'lawnMowing', name: t.handyman.calcItems.lawnMowing, price: 110, image: imgLawnMowing },
      { id: 'treeTrimming', name: t.handyman.calcItems.treeTrimming, price: 110, image: imgTreeTrimming },
      { id: 'yardHelp', name: t.handyman.calcItems.yardHelp, price: 110, image: imgYardHelp },
    ],
  };

  return (
    <>
      <SEO
        title="Мастер на час — Мелкий ремонт и бытовые услуги"
        description="Мастер на час: сантехника, электрика, мебель, мелкий ремонт. Быстро, качественно, с гарантией. Вызов мастера 24/7."
        keywords="мастер на час, мелкий ремонт, złota rączka, drobne naprawy, hydraulik, elektryk, montaż mebli, usługi domowe, handyman services Poland, Opole Wrocław"
        canonical="/handyman"
        image="https://masterclean1885.pl/og-handyman.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Мастер на час — бытовые услуги',
          provider: { '@type': 'LocalBusiness', name: 'MasterClean', telephone: '+48575211401' },
          areaServed: ['Opole', 'Wrocław', 'Poznań', 'Zielona Góra'],
          offers: [
            { '@type': 'Offer', name: 'Сантехнические работы', price: '120', priceCurrency: 'PLN' },
            { '@type': 'Offer', name: 'Электромонтажные работы', price: '40', priceCurrency: 'PLN' },
            { '@type': 'Offer', name: 'Чистка канализации', price: '250', priceCurrency: 'PLN' },
          ],
        }}
      />
    <Layout>
      {showSplash && <HandymanSplash onComplete={handleSplashComplete} />}
      
      {/* Hero Section with animated title */}
      <section className="relative min-h-[calc(100vh-120px)] overflow-hidden flex items-center py-20">
        <HandymanHeroSlideshow />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-left relative z-10">
            {/* Title with icon centered above */}
            <div className="flex justify-start mb-6">
              <div className="relative inline-flex flex-col items-center">
                {/* Animated tool icon centered over title */}
                <div className="mb-4 relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow animate-float">
                    <Wrench className="w-10 h-10 text-primary-foreground animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-6 animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center shadow-lg">
                      <Hammer className="w-4 h-4 text-yellow-900" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -left-6 animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center shadow-lg">
                      <Plug className="w-4 h-4 text-yellow-900" />
                    </div>
                  </div>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-up relative inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              <span className="relative z-10">{t.handyman.title}</span>
              <span 
                className="absolute bottom-2 left-0 w-full h-4 bg-yellow-400/60 -z-0 rounded"
                style={{ 
                  animation: 'highlightExpand 1s ease-out forwards',
                  transformOrigin: 'left'
                }}
              />
                </h1>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-white animate-fade-up max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              {t.handyman.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="hidden md:block py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">{t.handyman.servicesTitle}</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
            </h2>
            <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-w-xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{t.handyman.servicesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <CircularRevealCard key={index} index={index}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400/50 h-full">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-yellow-400/20 flex items-center justify-center mb-4 group-hover:bg-yellow-400/40 transition-colors group-hover:scale-110 duration-300">
                      <service.icon className="w-7 h-7 text-yellow-600 group-hover:text-yellow-700" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-yellow-600 transition-colors">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Photos */}
      <section className="hidden md:block py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Nasi Fachowcy</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: handyman1, name: 'Marek', specialty: t.handyman.electrical },
              { img: handyman2, name: 'Piotr', specialty: t.handyman.plumbing },
              { img: handyman3, name: 'Tomek', specialty: t.handyman.carpentry },
            ].map((member, index) => (
              <CircularRevealCard key={index} index={index}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                    <AnimatedImage 
                      src={member.img} 
                      alt={member.name}
                      delay={index * 150}
                      duration={800}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
                      <h3 className="text-white font-bold text-xl">{member.name}</h3>
                      <p className="text-yellow-400">{member.specialty}</p>
                    </div>
                  </div>
                </div>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="relative z-10">{t.handyman.whyUs}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: '⚡', title: t.handyman.benefit1, desc: t.handyman.benefit1Desc },
                { icon: '🛠️', title: t.handyman.benefit2, desc: t.handyman.benefit2Desc },
                { icon: '💰', title: t.handyman.benefit3, desc: t.handyman.benefit3Desc },
                { icon: '✅', title: t.handyman.benefit4, desc: t.handyman.benefit4Desc },
              ].map((benefit, index) => (
                <CircularRevealCard key={index} index={index}>
                  <div className="flex gap-4 p-6 bg-card rounded-xl shadow-card hover:shadow-lg transition-shadow h-full">
                    <div className="text-4xl">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="relative z-10">{t.handyman.pricing}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categoryTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      activeTab === tab.id
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-700 dark:text-yellow-400 shadow-md'
                        : 'bg-card border-border text-muted-foreground hover:border-yellow-400/50 hover:bg-yellow-400/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Min order note */}
            <div className="text-sm text-yellow-600 font-semibold bg-yellow-400/20 rounded-lg p-3 mb-6 text-center">
              <span>⚠️ {t.handyman.minOrderNote}</span>
              <br />
              <span>{t.handyman.minOrderNoteOther}</span>
            </div>

            <CircularRevealCard index={0}>
              <CardServiceCalculator
                category="handyman"
                items={categoryItems[activeTab] || []}
                onSendToForm={handleSendToForm}
              />
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formSectionRef} className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="relative z-10">{t.handyman.orderNow}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
              </h2>
            </div>
            <CircularRevealCard index={0}>
              <ContactForm ref={formRef} />
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* CSS for highlight animation */}
      <style>{`
        @keyframes highlightExpand {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </Layout>
    </>
  );
};

export default Handyman;
