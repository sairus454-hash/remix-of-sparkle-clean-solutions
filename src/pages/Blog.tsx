import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import BlogSplash from '@/components/BlogSplash';
import { useSplash } from '@/hooks/useSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import { ArrowLeft, Calendar, Clock, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import sofaBeforeAfter from '@/assets/sofa-before-after.jpg';
import cleaningTeamWork from '@/assets/cleaning-team-work-1.jpg';
import autoCleaning from '@/assets/auto-cleaning-1.jpg';
import mattressCleaning from '@/assets/mattress-cleaning.jpg';
import leatherSofa from '@/assets/leather-care-blog.jpg';
import autoCleaning2 from '@/assets/auto-cleaning-2.jpg';
import topExecutor2025 from '@/assets/top-executor-2025.jpg';
import sofaSeatsGuide from '@/assets/sofa-seats-guide.jpg';
import sofaSeatsGuidePl from '@/assets/sofa-seats-guide-pl.jpg';
import dryingAfterCleaning from '@/assets/drying-after-cleaning-blog.jpg';

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
    {
      id: 7,
      title: 'Топ исполнитель 2025',
      summary: '🏆 MasterClean — признанный лидер среди компаний по уборке и химчистке на Fixly.pl в 2025',
      content: 'В 2025 году компания MasterClean заслуженно выделилась среди исполнителей на Fixly.pl. Рейтинг 5.0/5 и отличные отзывы клиентов подтверждают высокое качество работы.',
      fullContent: '📍 Что делает MasterClean особенной?\n\n✔️ Высокие оценки и отзывы клиентов — рейтинг 5.0/5 на основе положительных отзывов, стопроцентное удовлетворение качеством услуг.\n\n✔️ Широкий спектр услуг — комплексные услуги по уборке квартир, домов, офисов, мойке окон и фасадов.\n\n✔️ Профессиональный подход — компания работает на территории Силезского воеводства, уделяя внимание деталям и индивидуальному подходу.\n\n🌟 Почему клиенты выбирают MasterClean?\n\n• Точность и аккуратность выполнения работ\n• Профессиональное оборудование и опытная команда\n• Дружелюбное общение и быстрая реакция на запросы\n\nБлагодаря этим сильным сторонам MasterClean стала одной из лучших фирм по уборке и химчистке на Fixly.pl в 2025 году — подтверждённый рейтинг и отличные отзывы делают её надёжным выбором для всех, кто ценит чистоту и качество.',
      image: topExecutor2025,
      date: '2025-03-01',
      readTime: '5 мин',
      tag: '🏆 Награда',
    },
    {
      id: 8,
      title: 'Как считать посадочные места на диване?',
      summary: 'Ширина одного посадочного места — примерно 50–60 см. Количество подушек подскажет число мест, а подлокотники уменьшают полезную площадь.',
      content: 'Чтобы правильно посчитать посадочные места, замерьте общую длину дивана и разделите на 55 см. Учитывайте комплекцию людей — крупным людям нужно больше пространства. Подлокотники занимают место, поэтому реальных посадочных мест может быть меньше, чем кажется. Это важно знать при заказе химчистки — стоимость часто зависит от количества мест.',
      image: sofaSeatsGuide,
      date: '2025-03-02',
      readTime: '2 мин',
      tag: '🛋️ Химчистка',
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
    {
      id: 7,
      title: 'Top Executor 2025',
      summary: '🏆 MasterClean — a recognized leader in cleaning and dry cleaning on Fixly.pl in 2025',
      content: 'In 2025, MasterClean stood out among service providers on Fixly.pl. A 5.0/5 rating and excellent customer reviews confirm the high quality of work.',
      fullContent: '📍 What makes MasterClean special?\n\n✔️ High ratings — 5.0/5 rating based on positive reviews, 100% customer satisfaction.\n\n✔️ Wide range of services — comprehensive cleaning of apartments, houses, offices, window and facade washing.\n\n✔️ Professional approach — operating in the Silesian Voivodeship with attention to detail.\n\n🌟 Why do customers choose MasterClean?\n\n• Precision and accuracy\n• Professional equipment and experienced team\n• Friendly communication and quick response\n\nMasterClean became one of the best cleaning companies on Fixly.pl in 2025 — confirmed rating and excellent reviews make it a reliable choice.',
      image: topExecutor2025,
      date: '2025-03-01',
      readTime: '5 min',
      tag: '🏆 Award',
    },
    {
      id: 8,
      title: 'How to Count Sofa Seats?',
      summary: 'One seat is approximately 50–60 cm wide. The number of cushions hints at the number of seats, and armrests reduce usable space.',
      content: 'To count seats correctly, measure the total sofa length and divide by 55 cm. Consider body size — larger people need more space. Armrests take up room, so actual seating may be less than expected. This matters when ordering upholstery cleaning — pricing often depends on the number of seats.',
      image: sofaSeatsGuide,
      date: '2025-03-02',
      readTime: '2 min',
      tag: '🛋️ Cleaning',
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
    {
      id: 7,
      title: 'Top Wykonawca 2025',
      summary: '🏆 MasterClean — uznany lider wśród firm sprzątających i czyszczących na Fixly.pl w 2025',
      content: 'W 2025 roku firma MasterClean wyróżniła się wśród wykonawców na Fixly.pl. Ocena 5.0/5 i doskonałe opinie klientów potwierdzają wysoką jakość pracy.',
      fullContent: '📍 Co wyróżnia MasterClean?\n\n✔️ Wysokie oceny klientów — ocena 5.0/5 na podstawie pozytywnych opinii, 100% satysfakcji.\n\n✔️ Szeroki zakres usług — kompleksowe sprzątanie mieszkań, domów, biur, mycie okien i elewacji.\n\n✔️ Profesjonalne podejście — firma działa na terenie województwa śląskiego, dbając o każdy szczegół.\n\n🌟 Dlaczego klienci wybierają MasterClean?\n\n• Dokładność i staranność wykonania\n• Profesjonalny sprzęt i doświadczony zespół\n• Przyjazna komunikacja i szybka reakcja\n\nMasterClean została jedną z najlepszych firm sprzątających na Fixly.pl w 2025 roku — potwierdzony rating i doskonałe opinie czynią ją niezawodnym wyborem.',
      image: topExecutor2025,
      date: '2025-03-01',
      readTime: '5 min',
      tag: '🏆 Nagroda',
    },
    {
      id: 8,
      title: 'Jak liczyć miejsca siedzące na sofie?',
      summary: 'Szerokość jednego miejsca to około 50–60 cm. Liczba poduszek podpowiada liczbę miejsc, a podłokietniki zmniejszają użyteczną przestrzeń.',
      content: 'Aby prawidłowo policzyć miejsca, zmierz całkowitą długość sofy i podziel przez 55 cm. Uwzględnij budowę ciała — większe osoby potrzebują więcej miejsca. Podłokietniki zajmują przestrzeń, więc rzeczywistych miejsc może być mniej. To ważne przy zamawianiu prania tapicerki — cena często zależy od liczby miejsc.',
      image: sofaSeatsGuidePl,
      date: '2025-03-02',
      readTime: '2 min',
      tag: '🛋️ Czyszczenie',
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
    {
      id: 7,
      title: 'Топ виконавець 2025',
      summary: '🏆 MasterClean — визнаний лідер серед компаній з прибирання та хімчистки на Fixly.pl у 2025',
      content: 'У 2025 році компанія MasterClean виділилася серед виконавців на Fixly.pl. Рейтинг 5.0/5 та відмінні відгуки клієнтів підтверджують високу якість роботи.',
      fullContent: '📍 Що робить MasterClean особливою?\n\n✔️ Високі оцінки клієнтів — рейтинг 5.0/5 на основі позитивних відгуків, 100% задоволення якістю.\n\n✔️ Широкий спектр послуг — комплексне прибирання квартир, будинків, офісів, миття вікон та фасадів.\n\n✔️ Професійний підхід — компанія працює на території Сілезького воєводства, приділяючи увагу деталям.\n\n🌟 Чому клієнти обирають MasterClean?\n\n• Точність та акуратність виконання\n• Професійне обладнання та досвідчена команда\n• Дружнє спілкування та швидка реакція\n\nMasterClean стала однією з найкращих фірм з прибирання та хімчистки на Fixly.pl у 2025 році — підтверджений рейтинг та відмінні відгуки роблять її надійним вибором.',
      image: topExecutor2025,
      date: '2025-03-01',
      readTime: '5 хв',
      tag: '🏆 Нагорода',
    },
    {
      id: 8,
      title: 'Як рахувати посадочні місця на дивані?',
      summary: 'Ширина одного місця — приблизно 50–60 см. Кількість подушок підкаже число місць, а підлокітники зменшують корисну площу.',
      content: 'Щоб правильно порахувати місця, виміряйте загальну довжину дивана і поділіть на 55 см. Враховуйте комплекцію людей — великим людям потрібно більше простору. Підлокітники займають місце, тому реальних посадочних місць може бути менше. Це важливо при замовленні хімчистки — вартість часто залежить від кількості місць.',
      image: sofaSeatsGuide,
      date: '2025-03-02',
      readTime: '2 хв',
      tag: '🛋️ Хімчистка',
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

const moreLabels = { ru: 'Ещё', en: 'More', pl: 'Więcej', uk: 'Ще' };
const lessLabels = { ru: 'Свернуть', en: 'Collapse', pl: 'Zwiń', uk: 'Згорнути' };

const Blog = () => {
  const { language } = useLanguage();
  const articles = [...(blogArticles[language] || blogArticles.ru)].reverse();
  const titles = blogTitles[language] || blogTitles.ru;
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const { showSplash, handleSplashComplete } = useSplash('blog');

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <>
      {showSplash && <BlogSplash onComplete={handleSplashComplete} />}
      <SEO
        title={`${titles.title} — MasterClean`}
        description={titles.subtitle}
        keywords="блог чистоты, советы по чистке, blog sprzątanie, porady czyszczenia, jak czyścić tapicerkę, cleaning tips blog"
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
                <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-3 text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{titles.social}:</p>
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
                        <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                          {article.content}
                        </p>
                        {(article as any).fullContent && expandedIds.has(article.id) && (
                          <p className="text-foreground text-sm leading-relaxed whitespace-pre-line mt-3">
                            {(article as any).fullContent}
                          </p>
                        )}
                      </div>
                      {(article as any).fullContent && (
                        <button
                          onClick={() => toggleExpand(article.id)}
                          className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {expandedIds.has(article.id) ? lessLabels[language] : moreLabels[language]}
                          {expandedIds.has(article.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      )}
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
