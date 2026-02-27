import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import CircularRevealCard from '@/components/CircularRevealCard';
import { ArrowLeft, Calendar, Clock, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import sofaBeforeAfter from '@/assets/sofa-before-after.jpg';
import cleaningTeamWork from '@/assets/cleaning-team-work-1.jpg';
import autoCleaning from '@/assets/auto-cleaning-1.jpg';
import mattressCleaning from '@/assets/mattress-cleaning.jpg';
import leatherSofa from '@/assets/leather-sofa-cleaning.jpg';
import autoCleaning2 from '@/assets/auto-cleaning-2.jpg';

// Lazy image: renders only when near viewport
const LazyBlogImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("bg-muted", className)}>
      {isVisible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
};


const blogArticles = {
  ru: [
    {
      id: 1,
      title: 'Как часто нужно делать химчистку дивана?',
      summary: 'Специалисты рекомендуют проводить профессиональную химчистку мягкой мебели минимум 1–2 раза в год. Это помогает избавиться от пылевых клещей, аллергенов и бактерий, которые накапливаются в обивке.',
      content: 'Регулярная химчистка продлевает срок службы мебели и создаёт здоровую атмосферу в доме. Особенно важна чистка для семей с маленькими детьми и домашними животными. Наша команда использует безопасные гипоаллергенные средства и профессиональное оборудование Santoemma.',
      image: sofaBeforeAfter,
      date: '2025-01-15',
      readTime: '3 мин',
      tag: '🛋️ Химчистка',
    },
    {
      id: 2,
      title: '5 секретов идеальной уборки квартиры',
      summary: 'Профессиональная уборка — это не просто наведение порядка, а целая система. Делимся секретами наших мастеров: от правильной последовательности действий до выбора средств.',
      content: 'Начинайте сверху вниз: сначала пыль с верхних полок, затем мебель, полы. Используйте микрофибру — она собирает в 4 раза больше грязи. Не забывайте про скрытые зоны: под диваном, за холодильником. Проветривайте помещение во время уборки. И главное — регулярность важнее идеальности!',
      image: cleaningTeamWork,
      date: '2025-02-01',
      readTime: '4 мин',
      tag: '🧹 Уборка',
    },
    {
      id: 3,
      title: 'Химчистка салона авто: когда и зачем?',
      summary: 'Салон автомобиля накапливает пыль, грязь и бактерии не меньше домашней мебели. Профессиональная химчистка возвращает салону первозданный вид и устраняет неприятные запахи.',
      content: 'Рекомендуем проводить химчистку салона 2–3 раза в год, особенно после зимнего сезона. Мы обрабатываем сиденья, потолок, двери, коврики и багажник. Используем паровую чистку и экстракцию для глубокого очищения. Дополнительно предлагаем озонирование для полного устранения запахов.',
      image: autoCleaning,
      date: '2025-02-10',
      readTime: '3 мин',
      tag: '🚗 Авто',
    },
    {
      id: 4,
      title: 'Почему важно чистить матрас?',
      summary: 'В матрасе за год накапливается до 2 литров пота, миллионы пылевых клещей и бактерии. Регулярная чистка матраса — залог здорового сна и хорошего самочувствия.',
      content: 'Профессиональная химчистка матраса удаляет пятна, запахи и 99% аллергенов. Мы используем горячую экстракцию, которая эффективно уничтожает клещей и бактерии. После чистки матрас быстро сохнет благодаря мощной системе сушки.',
      image: mattressCleaning,
      date: '2025-01-20',
      readTime: '3 мин',
      tag: '🛏️ Матрасы',
    },
    {
      id: 5,
      title: 'Уход за кожаной мебелью: советы экспертов',
      summary: 'Кожаная мебель требует особого ухода. Неправильная чистка может повредить материал. Рассказываем, как сохранить кожу в идеальном состоянии на долгие годы.',
      content: 'Кожу нельзя мочить обычной водой и тереть жёсткими щётками. Мы используем специализированные средства для кожи, которые очищают, увлажняют и защищают материал. После профессиональной чистки рекомендуем импрегнацию для дополнительной защиты от пятен и влаги.',
      image: leatherSofa,
      date: '2025-02-05',
      readTime: '4 мин',
      tag: '🛋️ Химчистка',
    },
    {
      id: 6,
      title: 'Детейлинг авто: что это и зачем нужно?',
      summary: 'Детейлинг — это комплексная глубокая чистка автомобиля, которая выходит за рамки обычной мойки. Узнайте, что включает профессиональный детейлинг салона.',
      content: 'Детейлинг включает химчистку всех текстильных поверхностей, чистку кожи, полировку пластика, обработку стёкол и озонирование. Результат — салон как из автосалона. Особенно рекомендуем перед продажей автомобиля или после покупки подержанного авто.',
      image: autoCleaning2,
      date: '2025-01-28',
      readTime: '5 мин',
      tag: '🚗 Авто',
    },
  ],
  en: [
    {
      id: 1,
      title: 'How Often Should You Clean Your Sofa?',
      summary: 'Experts recommend professional upholstery cleaning at least 1-2 times a year to remove dust mites, allergens, and bacteria.',
      content: 'Regular cleaning extends furniture life and creates a healthy home environment.',
      image: sofaBeforeAfter,
      date: '2025-01-15',
      readTime: '3 min',
      tag: '🛋️ Cleaning',
    },
    {
      id: 2,
      title: '5 Secrets to a Perfect Home Cleaning',
      summary: 'Professional cleaning is a system. We share our experts\' secrets for the best results.',
      content: 'Start top to bottom, use microfiber, don\'t forget hidden areas, ventilate during cleaning.',
      image: cleaningTeamWork,
      date: '2025-02-01',
      readTime: '4 min',
      tag: '🧹 Cleaning',
    },
    {
      id: 3,
      title: 'Car Interior Cleaning: When and Why?',
      summary: 'Your car interior accumulates dust and bacteria. Professional cleaning restores it to like-new condition.',
      content: 'We recommend cleaning 2-3 times a year, especially after winter season.',
      image: autoCleaning,
      date: '2025-02-10',
      readTime: '3 min',
      tag: '🚗 Auto',
    },
    {
      id: 4,
      title: 'Why Mattress Cleaning Matters',
      summary: 'A mattress accumulates sweat, dust mites and bacteria. Regular cleaning ensures healthy sleep.',
      content: 'Professional hot extraction removes 99% of allergens.',
      image: mattressCleaning,
      date: '2025-01-20',
      readTime: '3 min',
      tag: '🛏️ Mattress',
    },
    {
      id: 5,
      title: 'Leather Furniture Care Tips',
      summary: 'Leather requires special care. Improper cleaning can damage the material.',
      content: 'We use specialized leather products that clean, moisturize and protect.',
      image: leatherSofa,
      date: '2025-02-05',
      readTime: '4 min',
      tag: '🛋️ Cleaning',
    },
    {
      id: 6,
      title: 'Car Detailing: What Is It?',
      summary: 'Detailing is comprehensive deep cleaning that goes beyond regular washing.',
      content: 'Includes upholstery cleaning, leather care, plastic polishing, and ozonation.',
      image: autoCleaning2,
      date: '2025-01-28',
      readTime: '5 min',
      tag: '🚗 Auto',
    },
  ],
  pl: [
    {
      id: 1,
      title: 'Jak często czyścić sofę?',
      summary: 'Specjaliści zalecają profesjonalne czyszczenie tapicerki minimum 1-2 razy w roku, aby pozbyć się roztoczy, alergenów i bakterii.',
      content: 'Regularne czyszczenie przedłuża żywotność mebli i tworzy zdrową atmosferę w domu.',
      image: sofaBeforeAfter,
      date: '2025-01-15',
      readTime: '3 min',
      tag: '🛋️ Czyszczenie',
    },
    {
      id: 2,
      title: '5 sekretów idealnego sprzątania',
      summary: 'Profesjonalne sprzątanie to cały system. Dzielimy się sekretami naszych ekspertów.',
      content: 'Zacznij od góry do dołu, używaj mikrofibry, nie zapominaj o ukrytych miejscach.',
      image: cleaningTeamWork,
      date: '2025-02-01',
      readTime: '4 min',
      tag: '🧹 Sprzątanie',
    },
    {
      id: 3,
      title: 'Czyszczenie wnętrza samochodu',
      summary: 'Wnętrze samochodu gromadzi kurz i bakterie. Profesjonalne czyszczenie przywraca je do stanu nowego.',
      content: 'Zalecamy czyszczenie 2-3 razy w roku, szczególnie po sezonie zimowym.',
      image: autoCleaning,
      date: '2025-02-10',
      readTime: '3 min',
      tag: '🚗 Auto',
    },
    {
      id: 4,
      title: 'Dlaczego warto czyścić materac?',
      summary: 'Materac gromadzi pot, roztocza i bakterie. Regularne czyszczenie zapewnia zdrowy sen.',
      content: 'Profesjonalna ekstrakcja gorąca usuwa 99% alergenów.',
      image: mattressCleaning,
      date: '2025-01-20',
      readTime: '3 min',
      tag: '🛏️ Materace',
    },
    {
      id: 5,
      title: 'Pielęgnacja mebli skórzanych',
      summary: 'Skóra wymaga specjalnej pielęgnacji. Niewłaściwe czyszczenie może uszkodzić materiał.',
      content: 'Używamy specjalistycznych środków do skóry.',
      image: leatherSofa,
      date: '2025-02-05',
      readTime: '4 min',
      tag: '🛋️ Czyszczenie',
    },
    {
      id: 6,
      title: 'Detailing samochodowy: co to jest?',
      summary: 'Detailing to kompleksowe głębokie czyszczenie wykraczające poza zwykłe mycie.',
      content: 'Obejmuje czyszczenie tapicerki, pielęgnację skóry, polerowanie plastiku i ozonowanie.',
      image: autoCleaning2,
      date: '2025-01-28',
      readTime: '5 min',
      tag: '🚗 Auto',
    },
  ],
  uk: [
    {
      id: 1,
      title: 'Як часто потрібно чистити диван?',
      summary: 'Спеціалісти рекомендують професійну хімчистку м\'яких меблів мінімум 1–2 рази на рік для видалення кліщів та алергенів.',
      content: 'Регулярне чищення подовжує термін служби меблів та створює здорову атмосферу в домі.',
      image: sofaBeforeAfter,
      date: '2025-01-15',
      readTime: '3 хв',
      tag: '🛋️ Хімчистка',
    },
    {
      id: 2,
      title: '5 секретів ідеального прибирання',
      summary: 'Професійне прибирання — це ціла система. Ділимося секретами наших майстрів.',
      content: 'Починайте зверху вниз, використовуйте мікрофібру, не забувайте про приховані зони.',
      image: cleaningTeamWork,
      date: '2025-02-01',
      readTime: '4 хв',
      tag: '🧹 Прибирання',
    },
    {
      id: 3,
      title: 'Хімчистка салону авто: коли і навіщо?',
      summary: 'Салон авто накопичує пил та бактерії. Професійне чищення повертає йому первісний вигляд.',
      content: 'Рекомендуємо чищення 2–3 рази на рік, особливо після зимового сезону.',
      image: autoCleaning,
      date: '2025-02-10',
      readTime: '3 хв',
      tag: '🚗 Авто',
    },
    {
      id: 4,
      title: 'Чому важливо чистити матрац?',
      summary: 'Матрац накопичує піт, кліщів і бактерії. Регулярне чищення — запорука здорового сну.',
      content: 'Професійна гаряча екстракція видаляє 99% алергенів.',
      image: mattressCleaning,
      date: '2025-01-20',
      readTime: '3 хв',
      tag: '🛏️ Матраци',
    },
    {
      id: 5,
      title: 'Догляд за шкіряними меблями',
      summary: 'Шкіра потребує особливого догляду. Неправильне чищення може пошкодити матеріал.',
      content: 'Ми використовуємо спеціалізовані засоби для шкіри.',
      image: leatherSofa,
      date: '2025-02-05',
      readTime: '4 хв',
      tag: '🛋️ Хімчистка',
    },
    {
      id: 6,
      title: 'Детейлінг авто: що це і навіщо?',
      summary: 'Детейлінг — це комплексне глибоке чищення, що виходить за рамки звичайної мийки.',
      content: 'Включає хімчистку оббивки, догляд за шкірою, полірування пластику та озонування.',
      image: autoCleaning2,
      date: '2025-01-28',
      readTime: '5 хв',
      tag: '🚗 Авто',
    },
  ],
};

const blogTitles = {
  ru: { title: 'Блог чистоты', subtitle: 'Полезные статьи о химчистке, уборке и уходе за вещами', back: 'На главную', social: 'Мы в соцсетях' },
  en: { title: 'Cleanliness Blog', subtitle: 'Useful articles about cleaning and care', back: 'Back to Home', social: 'Follow Us' },
  pl: { title: 'Blog czystości', subtitle: 'Przydatne artykuły o czyszczeniu i pielęgnacji', back: 'Strona główna', social: 'Nasze media' },
  uk: { title: 'Блог чистоти', subtitle: 'Корисні статті про хімчистку, прибирання та догляд', back: 'На головну', social: 'Ми в соцмережах' },
};

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Blog = () => {
  const { language } = useLanguage();
  const articles = blogArticles[language] || blogArticles.ru;
  const titles = blogTitles[language] || blogTitles.ru;

  return (
    <>
      <SEO
        title={`${titles.title} — MasterClean`}
        description={titles.subtitle}
        keywords="блог чистоты, химчистка, уборка, советы по чистке"
        canonical="/blog"
        image="https://masterclean1885.pl/og-blog.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: titles.title,
          description: titles.subtitle,
          publisher: { '@type': 'Organization', name: 'MasterClean', url: 'https://masterclean1885.pl' },
          url: 'https://masterclean1885.pl/blog',
        }}
      />
      <Layout>
        {/* Hero */}
        <section className="py-12 sm:py-16 bg-gradient-section relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Link to="/">
              <Button variant="ghost" className="mb-6 text-fresh hover:text-fresh/80 animate-pulse-slow font-semibold">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {titles.back}
              </Button>
            </Link>

            <div className="text-center mb-10 sm:mb-14">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow animate-pulse-slow">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh opacity-75" />
                </div>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                📝 {titles.title}
              </h1>
              <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-base sm:text-lg max-w-2xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                {titles.subtitle}
              </p>

              {/* Social Media Links */}
              <div className="mt-6">
                <p className="text-muted-foreground mb-3 text-sm">{titles.social}:</p>
                <div className="flex justify-center flex-wrap gap-3">
                  <CircularRevealCard index={0}>
                    <a href="https://www.tiktok.com/@oleksii764" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <TikTokIcon className="w-5 h-5" />
                      <span className="font-medium text-sm">TikTok</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={1}>
                    <a href="https://youtube.com/@alexlokteks2072?si=SNXrRysVMvjc971H" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                      <span className="font-medium text-sm">YouTube</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={2}>
                    <a href="https://www.instagram.com/masterclean1885?igsh=MTN2amx2cmRka2hwMg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                      <span className="font-medium text-sm">Instagram</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={3}>
                    <a href="https://www.facebook.com/profile.php?id=100057002733751" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                      <span className="font-medium text-sm">Facebook</span>
                    </a>
                  </CircularRevealCard>
                </div>
              </div>
            </div>

            {/* Floating book animation decorations */}
            <div className="absolute top-20 left-10 opacity-10 pointer-events-none hidden lg:block">
              <BookOpen className="w-16 h-16 text-primary" style={{ animation: 'float 5s ease-in-out infinite' }} />
            </div>
            <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none hidden lg:block">
              <Sparkles className="w-12 h-12 text-fresh" style={{ animation: 'float 4s ease-in-out infinite, pulse 2s ease-in-out infinite' }} />
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article, index) => (
                <CircularRevealCard key={article.id} index={index} slow className="h-full">
                  <Card className="overflow-hidden h-full bg-gradient-card border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
                    <div className="relative overflow-hidden aspect-video">
                      <LazyBlogImage
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 aspect-video"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-card/90 backdrop-blur-sm text-foreground shadow-sm">
                          {article.tag}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </span>
                      </div>
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-3 leading-snug">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {article.summary}
                      </p>
                      <div className="bg-accent/50 rounded-lg p-4 border border-border/50">
                        <p className="text-foreground text-sm leading-relaxed">
                          {article.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
