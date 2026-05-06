import { useSplash } from '@/hooks/useSplash';
import aboutHeroPhoto from '@/assets/about-hero-photo.jpg';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import CleanSplash from '@/components/CleanSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import { CheckCircle2, Award, Users, Clock, Shield, ThumbsUp, Sparkles } from 'lucide-react';
import About3DCarousel from '@/components/About3DCarousel';
import PolandRegionsMap from '@/components/PolandRegionsMap';



// TikTok icon component
const TikTokIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>;
const FAQS: Record<string, { q: string; a: string }[]> = {
  pl: [
    { q: 'Jak długo MasterClean działa na rynku?', a: 'Działamy od 2022 roku, mamy ponad 1000 zadowolonych klientów we Wrocławiu, Opolu, Poznaniu i Zielonej Górze.' },
    { q: 'Czy świadczycie usługi u klienta w domu?', a: 'Tak, większość usług — pranie kanap, dywanów, materacy, foteli i czyszczenie samochodów — wykonujemy bezpośrednio u klienta.' },
    { q: 'Jakich środków używacie do czyszczenia?', a: 'Stosujemy profesjonalną chemię ekologiczną, bezpieczną dla dzieci, alergików i zwierząt. Posiadamy atesty producentów.' },
    { q: 'Ile trwa schnięcie kanapy lub dywanu po praniu?', a: 'Średnio 4–8 godzin. Dzięki ekstrakcji i mocnej turbinie wilgoć jest odciągana, więc materiał szybko wraca do użytku.' },
    { q: 'Czy dajecie gwarancję na wykonaną usługę?', a: 'Tak, udzielamy 7-dniowej gwarancji jakości — w razie zastrzeżeń wracamy i poprawiamy bezpłatnie.' },
    { q: 'W jakich miastach pracujecie?', a: 'Wrocław i Smolec — bez dopłat. Obsługujemy też Opole, Poznań, Zieloną Górę i 30+ miejscowości w okolicy.' },
    { q: 'Jak mogę zamówić usługę?', a: 'Przez formularz na stronie, czat na żywo, telefonicznie pod +48 575 211 401 lub WhatsApp. Termin potwierdzamy w ciągu kilku minut.' },
  ],
  ru: [
    { q: 'Как давно работает MasterClean?', a: 'Мы работаем с 2022 года, выполнили более 1000 заказов во Вроцлаве, Ополе, Познани и Зелёной Гуре.' },
    { q: 'Вы выезжаете на дом к клиенту?', a: 'Да, большинство услуг — чистку диванов, ковров, матрасов, кресел и автомобилей — выполняем прямо у клиента.' },
    { q: 'Какие средства используете для чистки?', a: 'Профессиональную экологичную химию, безопасную для детей, аллергиков и животных. Все средства сертифицированы.' },
    { q: 'Сколько сохнет диван или ковёр после чистки?', a: 'В среднем 4–8 часов. Экстрактор с мощной турбиной вытягивает влагу, и мебель быстро возвращается в эксплуатацию.' },
    { q: 'Даёте ли гарантию на услугу?', a: 'Да, 7 дней гарантии качества — если что-то не устроит, бесплатно приедем и переделаем.' },
    { q: 'В каких городах вы работаете?', a: 'Вроцлав и Смолец — без доплат. Также Ополе, Познань, Зелёная Гура и более 30 населённых пунктов рядом.' },
    { q: 'Как заказать услугу?', a: 'Через форму на сайте, онлайн-чат, по телефону +48 575 211 401 или WhatsApp. Подтверждаем заявку в течение нескольких минут.' },
  ],
  uk: [
    { q: 'Як давно працює MasterClean?', a: 'Ми працюємо з 2022 року, виконали понад 1000 замовлень у Вроцлаві, Ополе, Познані та Зеленій Гурі.' },
    { q: 'Ви виїжджаєте до клієнта додому?', a: 'Так, більшість послуг — чистку диванів, килимів, матраців, крісел та авто — виконуємо безпосередньо у клієнта.' },
    { q: 'Які засоби ви використовуєте?', a: 'Професійну екологічну хімію, безпечну для дітей, алергіків і тварин. Усі засоби сертифіковані.' },
    { q: 'Скільки сохне диван або килим після чистки?', a: 'У середньому 4–8 годин. Екстрактор з потужною турбіною витягує вологу, і меблі швидко повертаються в експлуатацію.' },
    { q: 'Чи даєте гарантію на послугу?', a: 'Так, 7 днів гарантії якості — якщо щось не влаштує, безкоштовно приїдемо і переробимо.' },
    { q: 'У яких містах ви працюєте?', a: 'Вроцлав і Смолец — без доплат. Також Ополе, Познань, Зелена Гура і понад 30 населених пунктів поруч.' },
    { q: 'Як замовити послугу?', a: 'Через форму на сайті, онлайн-чат, телефоном +48 575 211 401 або WhatsApp. Підтверджуємо замовлення за кілька хвилин.' },
  ],
  en: [
    { q: 'How long has MasterClean been operating?', a: 'We have been operating since 2022 and completed over 1000 orders in Wrocław, Opole, Poznań and Zielona Góra.' },
    { q: 'Do you provide on-site cleaning?', a: 'Yes, most services — sofa, carpet, mattress, armchair and car interior cleaning — are performed at the client\'s location.' },
    { q: 'What products do you use?', a: 'Professional eco-friendly chemistry, safe for children, allergy sufferers and pets. All products are certified.' },
    { q: 'How long does a sofa or carpet take to dry?', a: 'On average 4–8 hours. A powerful extractor pulls out moisture, so the furniture is quickly ready for use again.' },
    { q: 'Do you offer a service guarantee?', a: 'Yes, a 7-day quality guarantee — if anything is not right, we come back and redo the work for free.' },
    { q: 'Which cities do you cover?', a: 'Wrocław and Smolec with no extra charge. We also serve Opole, Poznań, Zielona Góra and 30+ nearby locations.' },
    { q: 'How can I book a service?', a: 'Via the website form, live chat, phone +48 575 211 401 or WhatsApp. We confirm bookings within minutes.' },
  ],
};

const FAQ_TITLE: Record<string, string> = {
  pl: 'Najczęściej zadawane pytania',
  ru: 'Часто задаваемые вопросы',
  uk: 'Часті запитання',
  en: 'Frequently Asked Questions',
};

const About = () => {
  const {
    t, language
  } = useLanguage();
  const { showSplash, handleSplashComplete } = useSplash('about');
  const faqs = FAQS[language] || FAQS.pl;
  const faqTitle = FAQ_TITLE[language] || FAQ_TITLE.pl;
  const values = [{
    icon: Award,
    title: t.equipment.quality,
    description: t.equipment.qualityDesc
  }, {
    icon: Shield,
    title: t.equipment.eco,
    description: t.equipment.ecoDesc
  }, {
    icon: Clock,
    title: t.equipment.modern,
    description: t.equipment.modernDesc
  }];
  return <>
      <SEO
        title="O firmie MasterClean — Firma czyszcząca Wrocław"
        description="MasterClean — profesjonalna firma czyszcząca we Wrocławiu. Pranie tapicerki meblowej i samochodowej, czyszczenie dywanów, materacy, ozonowanie, mycie okien."
        keywords="o nas MasterClean, firma czyszcząca Wrocław, profesjonalne pranie tapicerki, firma sprzątająca Wrocław, czyszczenie mebli Wrocław, pranie tapicerki Opole, czyszczenie dywanów, chemczystka mebli, cleaning company Poland, usługi czyszczenia Wrocław"
        canonical="/about"
        image="https://masterclean1885.com/og-about.jpg"
        breadcrumbs={[{ name: t.nav.about, path: '/about' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          mainEntity: {
            '@type': 'LocalBusiness',
            name: 'MasterClean',
            description: 'Profesjonalna firma sprzątająca w Polsce. Nowoczesny sprzęt, ekologiczne środki.',
            telephone: '+48575211401',
            address: { '@type': 'PostalAddress', addressCountry: 'PL', addressRegion: 'dolnośląskie', addressLocality: 'Wrocław' },
            areaServed: [
              { '@type': 'City', name: 'Opole' },
              { '@type': 'City', name: 'Wrocław' },
              { '@type': 'City', name: 'Poznań' },
              { '@type': 'City', name: 'Zielona Góra' },
            ],
            foundingDate: '2022',
          },
        }}
      />
      {showSplash && <CleanSplash onComplete={handleSplashComplete} />}
      <Layout>
        {/* Hero */}
        <section aria-labelledby="about-heading" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                {/* Live Sparkles Icon */}
                <div className="flex justify-start mb-6 animate-fade-up">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                      <Sparkles className="w-10 h-10 text-primary-foreground" style={{
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full opacity-75" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full opacity-60" />
                  </div>
                </div>
                <h1 id="about-heading" className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                  {t.about.title}
                </h1>
                <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  <span className="hidden sm:inline">{t.about.subtitle}</span>
                  <span className="sm:hidden">{(t.about as any).subtitleShort || t.about.subtitle}</span>
                </p>
                <p className="text-base font-bold text-primary mt-4 animate-fade-up" style={{ animationDelay: '0.15s' }}>
                  {language === 'ru'
                    ? 'Гарантия на качество выполненных услуг — 7 дней'
                    : language === 'uk'
                    ? 'Гарантія на якість виконаних послуг — 7 днів'
                    : language === 'en'
                    ? '7-day quality guarantee on all services'
                    : 'Gwarancja jakości wykonanych usług — 7 dni'}
                </p>

                {/* Fixly Top Performer Badge */}
                <div className="mt-5 animate-fade-up" style={{ animationDelay: '0.18s' }}>
                  <CircularRevealCard index={0}>
                    <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-primary/10 via-fresh/10 to-primary/10 border-2 border-primary/30 shadow-glow">
                      <div className="w-11 h-11 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                        <Award className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          Fixly 2025
                        </span>
                        <span className="font-serif text-base sm:text-lg font-bold bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                          {language === 'ru'
                            ? 'Топ исполнитель Fixly 2025'
                            : language === 'uk'
                            ? 'Топ виконавець Fixly 2025'
                            : language === 'en'
                            ? 'Top Performer on Fixly 2025'
                            : 'Top Wykonawca Fixly 2025'}
                        </span>
                      </div>
                    </div>
                  </CircularRevealCard>
                </div>

                {/* Social Media Links */}
                <div className="mt-8">
                  <p className="text-foreground mb-4">{t.about.socialMedia}:</p>
                  <div className="flex flex-wrap gap-4">
                    <CircularRevealCard index={0}>
                      <a href="https://www.tiktok.com/@oleksii764" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                        <TikTokIcon className="w-5 h-5" />
                        <span className="font-medium">TikTok</span>
                      </a>
                    </CircularRevealCard>
                    <CircularRevealCard index={1}>
                      <a href="https://youtube.com/@alexlokteks2072?si=SNXrRysVMvjc971H" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="font-medium">YouTube</span>
                      </a>
                    </CircularRevealCard>
                    <CircularRevealCard index={2}>
                      <a href="https://www.instagram.com/masterclean1885?igsh=MTN2amx2cmRka2hwMg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span className="font-medium">Instagram</span>
                      </a>
                    </CircularRevealCard>
                    <CircularRevealCard index={3}>
                      <a href="https://www.facebook.com/profile.php?id=100057002733751" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="font-medium">Facebook</span>
                      </a>
                    </CircularRevealCard>
                  </div>
                </div>
              </div>

              {/* Photo on the right */}
              <div className="flex justify-center lg:justify-end animate-fade-up relative" style={{ animationDelay: '0.2s' }}>
                {/* Decorative border glow */}
                <div className="absolute -inset-3 bg-gradient-to-br from-primary via-fresh to-primary rounded-3xl opacity-30 blur-sm" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
                <div className="relative p-1 bg-gradient-to-br from-primary via-fresh to-primary rounded-2xl shadow-glow">
                  <img
                    src={aboutHeroPhoto}
                    alt="MasterClean — profesjonalne czyszczenie i opinie w Google 5.0"
                    className="rounded-xl max-h-[600px] w-auto object-cover bg-background"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section aria-label="O firmie MasterClean" className="py-20 bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                  MasterClean
                </h2>
                <p className="text-xl md:text-2xl text-foreground mb-4 leading-relaxed font-medium">
                  {t.about.description}
                </p>
                <CircularRevealCard index={4}>
                  <p className="mb-6 leading-relaxed font-medium text-2xl font-mono text-fresh">
                    {t.about.regions}
                  </p>
                </CircularRevealCard>
                <ul className="space-y-4">
                  {[t.equipment.modern, t.equipment.eco, t.equipment.quality].map((item, index) => <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-fresh flex-shrink-0" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                      <span className="text-foreground">{item}</span>
                    </li>)}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <CircularRevealCard index={0}>
                  <div className="bg-gradient-hero rounded-2xl p-8 text-center shadow-glow h-full">
                    <Users className="w-12 h-12 text-primary-foreground mx-auto mb-4" style={{
                    animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite'
                  }} />
                    <p className="font-serif text-4xl font-bold text-primary-foreground mb-2">1000+</p>
                    <p className="text-primary-foreground/80 text-sm">{t.about.clients}</p>
                  </div>
                </CircularRevealCard>
                <CircularRevealCard index={1}>
                  <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-card h-full">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" style={{
                    animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite',
                    animationDelay: '0.5s'
                  }} />
                    <p className="font-serif text-4xl font-bold text-foreground mb-2">3+</p>
                    <p className="text-muted-foreground text-sm">{t.about.experience}</p>
                  </div>
                </CircularRevealCard>
                <CircularRevealCard index={2}>
                  <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-card h-full">
                    <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" style={{
                    animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite',
                    animationDelay: '1s'
                  }} />
                    <p className="font-serif text-4xl font-bold text-foreground mb-2">100%</p>
                    <p className="text-muted-foreground text-sm">{t.about.quality}</p>
                  </div>
                </CircularRevealCard>
                <CircularRevealCard index={3}>
                  <div className="bg-fresh rounded-2xl p-8 text-center shadow-glow h-full">
                    <Shield className="w-12 h-12 text-fresh-foreground mx-auto mb-4" style={{
                    animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite',
                    animationDelay: '1.5s'
                  }} />
                    <p className="font-serif text-4xl font-bold text-fresh-foreground mb-2">ECO</p>
                    <p className="text-fresh-foreground/80 text-sm">{t.equipment.eco}</p>
                  </div>
                </CircularRevealCard>
              </div>
            </div>
          </div>
        </section>

        {/* Poland Regions Map */}
        <PolandRegionsMap />

        {/* Before/After 3D Carousel */}
        <About3DCarousel />

        {/* Values */}
        <section aria-label="Nasze wartości" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <CircularRevealCard key={index} index={index}>
                  <div className="bg-card p-8 rounded-2xl shadow-card text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow" style={{
                  animation: 'float 3s ease-in-out infinite'
                }}>
                      <value.icon className="w-8 h-8 text-primary-foreground" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>;
};
export default About;