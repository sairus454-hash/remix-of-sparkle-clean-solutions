import { useRef, useState, lazy, Suspense } from 'react';
import LazySection from '@/components/LazySection';
import MobilePromotionsCard from '@/components/MobilePromotionsCard';
import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import HandymanSplash from '@/components/HandymanSplash';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';
import AnimatedImage from '@/components/AnimatedImage';
import handyman1 from '@/assets/handyman-1.jpg';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wrench, Hammer, Plug, Droplet, Flower2, DoorOpen, 
  Lightbulb, Tv, Frame, ShowerHead, Lock, Fan, Leaf, Calculator, Sparkles
} from 'lucide-react';
import PromotionsSection from '@/components/PromotionsSection';
import { img } from '@/utils/imageMap';
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

  const categoryItems: Record<string, { id: string; name: string; price: number; image: string; unit?: string; priceText?: string }[]> = {
    plumbing: [
      { id: 'faucet', name: t.handyman.calcItems.faucet, price: 120, image: img('handyman/faucet.jpg') },
      { id: 'siphon', name: t.handyman.calcItems.siphon, price: 120, image: img('handyman/siphon.jpg') },
      { id: 'sink', name: t.handyman.calcItems.sink, price: 180, image: img('handyman/sink.jpg') },
      { id: 'toilet', name: t.handyman.calcItems.toilet, price: 220, image: img('handyman/toilet.jpg') },
      { id: 'sewer', name: t.handyman.calcItems.sewer, price: 250, image: img('handyman/sewer.jpg') },
      { id: 'washingMachine', name: t.handyman.calcItems.washingMachine, price: 140, image: img('handyman/washing-machine.jpg') },
      { id: 'dishwasher', name: t.handyman.calcItems.dishwasher, price: 140, image: img('handyman/dishwasher.jpg') },
      { id: 'bathroomFan', name: t.handyman.calcItems.bathroomFan, price: 80, image: img('handyman/bathroom-fan.jpg') },
      { id: 'bidet', name: t.handyman.calcItems.bidet, price: 220, image: img('handyman/bidet.jpg') },
      { id: 'urinal', name: t.handyman.calcItems.urinal, price: 200, image: img('handyman/urinal.jpg') },
      { id: 'hoseReplacement', name: t.handyman.calcItems.hoseReplacement, price: 50, image: img('handyman/hose.jpg') },
      { id: 'plumbingDemontage', name: t.handyman.calcItems.plumbingDemontage, price: 80, image: img('handyman/demontage.jpg') },
      { id: 'sealingJoints', name: t.handyman.calcItems.sealingJoints, price: 40, image: img('handyman/sealing.jpg') },
      { id: 'showerCabinInstall', name: t.handyman.calcItems.showerCabinInstall, price: 450, image: img('handyman/shower-cabin.jpg') },
      { id: 'showerTrayInstall', name: t.handyman.calcItems.showerTrayInstall, price: 200, image: img('handyman/shower-tray.jpg') },
      { id: 'bathtubInstall', name: t.handyman.calcItems.bathtubInstall, price: 300, image: img('handyman/bathtub.jpg') },
      { id: 'bathroomAccessories', name: t.handyman.calcItems.bathroomAccessories, price: 30, image: img('handyman/bathroom-accessories.jpg') },
      { id: 'wallMountedShower', name: t.handyman.calcItems.wallMountedShower, price: 200, image: img('handyman/wall-shower.jpg') },
    ],
    mounting: [
      { id: 'curtainRod', name: t.handyman.calcItems.curtainRod, price: 120, image: img('handyman/curtain-rod.jpg') },
      { id: 'shelf', name: t.handyman.calcItems.shelf, price: 100, image: img('handyman/shelf.jpg') },
      { id: 'pictures', name: t.handyman.calcItems.pictures, price: 80, image: img('handyman/pictures.jpg') },
      { id: 'furniture', name: t.handyman.calcItems.furnitureAssembly, price: 80, image: img('handyman/furniture-assembly.jpg') },
      { id: 'bedSofaRepair', name: t.handyman.calcItems.bedSofaRepair, price: 130, image: img('handyman/bed-sofa-repair.jpg') },
      { id: 'wardrobeRepair', name: t.handyman.calcItems.wardrobeRepair, price: 240, image: img('handyman/wardrobe-repair.jpg') },
    ],
    electrical: [
      { id: 'bulb', name: t.handyman.calcItems.bulb, price: 50, image: img('handyman/bulb.jpg') },
      { id: 'socket', name: t.handyman.calcItems.socket, price: 40, image: img('handyman/socket.jpg') },
      { id: 'lamp', name: t.handyman.calcItems.lamp, price: 100, image: img('handyman/lamp.jpg') },
      { id: 'stove', name: t.handyman.calcItems.stove, price: 200, image: img('handyman/stove.jpg') },
      { id: 'repair', name: t.handyman.calcItems.repair, price: 100, image: img('handyman/repair.jpg') },
      { id: 'diagnostic', name: t.handyman.calcItems.diagnostic, price: 350, image: img('handyman/diagnostic.jpg') },
      { id: 'switch', name: t.handyman.calcItems.switch, price: 50, image: img('handyman/switch.jpg') },
      { id: 'fuseReplacement', name: t.handyman.calcItems.fuseReplacement, price: 120, image: img('handyman/fuse.jpg') },
      { id: 'lampRepair', name: t.handyman.calcItems.lampRepair, price: 130, image: img('handyman/lamp-repair.jpg') },
      { id: 'chandelierInstall', name: t.handyman.calcItems.chandelierInstall, price: 130, image: img('handyman/chandelier.jpg') },
    ],
    locksmith: [
      { id: 'mailboxLock', name: t.handyman.calcItems.mailboxLock, price: 140, image: img('handyman/mailbox-lock.jpg') },
      { id: 'doorHandle', name: t.handyman.calcItems.doorHandle, price: 60, image: img('handyman/door-handle.jpg') },
      { id: 'doorCylinder', name: t.handyman.calcItems.doorCylinder, price: 100, image: img('handyman/door-cylinder.jpg') },
      { id: 'aluminumDoorRepair', name: t.handyman.calcItems.aluminumDoorRepair, price: 200, image: img('handyman/aluminum-door.jpg') },
      { id: 'windowDoorAdjustment', name: t.handyman.calcItems.windowDoorAdjustment, price: 200, image: img('handyman/window-adjustment.jpg') },
      { id: 'fridgeHinges', name: t.handyman.calcItems.fridgeHinges, price: 200, image: img('handyman/fridge-hinges.jpg') },
    ],
    gardening: [
      { id: 'lawnMowing', name: t.handyman.calcItems.lawnMowing, price: 1, image: img('handyman/lawn-mowing.jpg'), unit: 'm²', priceText: '1.00 - 1.20 zł' },
      { id: 'lawnMowingHard', name: t.handyman.calcItems.lawnMowingHard, price: 1.3, image: img('handyman/lawn-mowing-hard.jpg'), unit: 'm²', priceText: '1.30 - 1.50 zł' },
      { id: 'grassCleanup', name: t.handyman.calcItems.grassCleanup, price: 1, image: img('handyman/grass-cleanup.jpg'), unit: 'm²', priceText: '1.00 - 1.50 zł' },
      { id: 'treeTrimming', name: t.handyman.calcItems.treeTrimming, price: 100, image: img('handyman/tree-trimming.jpg') },
      { id: 'yardHelp', name: t.handyman.calcItems.yardHelp, price: 100, image: img('handyman/yard-help.jpg') },
    ],
  };

  return (
    <>
      <SEO
        title="Złota rączka Wrocław — Drobne naprawy i montaż"
        description="Złota rączka Wrocław: hydraulika, elektryka, montaż mebli, drobne naprawy domowe. Fachowiec z dojazdem 24/7. Uczciwe ceny z gwarancją. Wrocław, Opole, Poznań."
        keywords="złota rączka, złota rączka Wrocław, drobne naprawy, hydraulik Wrocław, elektryk Wrocław, montaż mebli, usługi domowe, fachowiec z dojazdem, handyman, naprawa Wrocław, Opole, Poznań, usługi naprawcze, montaż karniszy, wieszanie obrazów"
        canonical="/handyman"
        image="https://masterclean1885.com/og-handyman.png"
        breadcrumbs={[{ name: t.nav.handyman, path: '/handyman' }]}
         jsonLd={{
           '@context': 'https://schema.org',
           '@type': 'Service',
           serviceType: 'Złota rączka — usługi domowe',
           name: 'Złota rączka — drobne naprawy i montaż',
           description: 'Złota rączka Wrocław: hydraulika, elektryka, montaż mebli, drobne naprawy domowe z dojazdem.',
           url: 'https://masterclean1885.com/handyman',
           provider: {
             '@type': 'LocalBusiness',
             name: 'MasterClean',
             telephone: '+48575211401',
             address: { '@type': 'PostalAddress', addressCountry: 'PL', addressRegion: 'dolnośląskie', addressLocality: 'Wrocław' },
           },
           areaServed: [
             { '@type': 'City', name: 'Wrocław' },
             { '@type': 'City', name: 'Opole' },
             { '@type': 'City', name: 'Legnica' },
             { '@type': 'City', name: 'Kalisz' },
           ],
           offers: [
             { '@type': 'Offer', name: 'Usługi hydrauliczne', price: '120', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Usługi elektryczne', price: '40', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Udrażnianie kanalizacji', price: '250', priceCurrency: 'PLN' },
           ],
         }}
      />
    <Layout>
      {showSplash && <HandymanSplash onComplete={handleSplashComplete} />}
      
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-120px)] overflow-hidden">
        <div className="absolute inset-0">
          <HeroVideo src="/hero-handyman-video.mp4" fallbackImage={handyman1} />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-fresh flex items-center justify-center shadow-2xl animate-pulse">
                <Wrench className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-up text-yellow-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {t.handyman.title}
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto animate-fade-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              {t.handyman.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 1. Promotions */}
      <MobilePromotionsCard />
      <div className="hidden sm:block">
        <PromotionsSection />
      </div>

      {/* 2. Pricing */}
      <LazySection minHeight="400px">
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
              <div className="p-4 text-center text-muted-foreground">
                {/* Calculator removed - see pricing in Prices page */}
              </div>
            </CircularRevealCard>
          </div>
        </div>
      </section>
      </LazySection>

      {/* 3. Contact Form */}
      <LazySection minHeight="300px">
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
      </LazySection>

      {/* 4. Services Grid */}
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

      {/* 5. Our Team Photos */}
      <section className="hidden md:block py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">{t.handyman.ourTeam}</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: img('handyman-1.jpg'), name: 'Marek', specialty: t.handyman.electrical },
              { img: img('handyman-2.jpg'), name: 'Piotr', specialty: t.handyman.plumbing },
              { img: img('handyman-3.jpg'), name: 'Tomek', specialty: t.handyman.carpentry },
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

      {/* 6. Why Choose Us */}
      <section className="hidden sm:block py-20 bg-gradient-section">
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
