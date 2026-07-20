import { useRef } from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import BackToOrderButton from '@/components/BackToOrderButton';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import { useLanguage } from '@/i18n/LanguageContext';
import { CalculatorItem } from '@/types/calculator';
import { Bed, ShieldCheck, Sparkles, Truck, CheckCircle2, Wind, Droplets, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useSeoSelfCheck } from '@/hooks/useSeoSelfCheck';

import heroImage from '@/assets/mattress-cleaning-service.jpg';
import mattressBa from '@/assets/mattress-before-after.jpg';
import calcSingle from '@/assets/calc-mattress-single.jpg';
import calcDouble from '@/assets/calc-mattress-double.jpg';

type Lang = 'pl' | 'ru' | 'en' | 'uk';

const COPY: Record<Lang, {
  h1: string;
  subtitle: string;
  chip: string;
  introTitle: string;
  intro: string[];
  whyTitle: string;
  benefits: string[];
  typesTitle: string;
  types: { title: string; text: string }[];
  processTitle: string;
  steps: { n: string; t: string; d: string }[];
  calcTitle: string;
  calcSubtitle: string;
  gallery: string;
  formTitle: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDesc: string;
  seoKw: string;
}> = {
  pl: {
    h1: 'Pranie materacy Wrocław — profesjonalna chemia i suszenie',
    subtitle: 'Głębokie pranie materacy metodą ekstrakcyjną z usuwaniem roztoczy, plam i zapachów. Dojeżdżamy z profesjonalnym sprzętem Santoemma i Kärcher — cała Dolnośląskie.',
    chip: 'Wrocław · Smolec · Dolny Śląsk',
    introTitle: 'Pranie materacy z dojazdem — dlaczego warto?',
    intro: [
      'W materacu przespanym przez 5 lat może żyć nawet 2 miliony roztoczy — to główne źródło alergii dróg oddechowych, kataru i podrażnień skóry u dzieci. Regularne odkurzanie nie usuwa ich odchodów, które są zaklinowane głęboko w piance. Tylko pranie ekstrakcyjne z gorącą wodą i profesjonalnym detergentem hipoalergicznym daje realny efekt.',
      'Nasza firma MasterClean specjalizuje się w praniu materacy sprężynowych, piankowych, lateksowych oraz hybrydowych. Używamy maszyn Santoemma o mocy ssania 2500 mm H₂O, które wypłukują brud z głębi materaca i od razu odsysają wilgoć — po naszej wizycie materac jest tylko lekko wilgotny i suszy się do wieczora.',
    ],
    whyTitle: 'Co otrzymujesz zamawiając pranie materaca u nas',
    benefits: [
      'Usuwanie roztoczy, ich odchodów i alergenów u źródła',
      'Skuteczne usuwanie plam z moczu, potu, krwi i wina',
      'Neutralizacja zapachów — mocz zwierząt, pleśń, wilgoć',
      'Profesjonalne suszenie mebli i materacy — GRATIS',
      'Bezpieczne, hipoalergiczne preparaty (norma EU)',
      'Zamówienie przez formularz — automatyczny rabat −10%',
    ],
    typesTitle: 'Jakie materace pierzemy',
    types: [
      { title: 'Materace sprężynowe (bonell, kieszeniowe)', text: 'Głębokie pranie ekstrakcyjne obu stron. Usuwamy plamy, roztocza i zapachy z warstwy tapicerskiej nad sprężynami bez naruszania konstrukcji.' },
      { title: 'Materace piankowe i termoelastyczne', text: 'Delikatna chemia niepowodująca degradacji pianki. Krótki cykl pracy chroni materiał przed odkształceniem.' },
      { title: 'Materace lateksowe i hybrydowe', text: 'Metoda niskotemperaturowa z profesjonalnym odsysaniem — lateks nie chłonie nadmiaru wody, więc schnie szybciej niż piana.' },
      { title: 'Materace dziecięce i niemowlęce', text: 'Wyłącznie certyfikowane preparaty hipoalergiczne, bez zapachów i barwników. Bezpieczne dla noworodków po pełnym wyschnięciu.' },
    ],
    processTitle: 'Jak przebiega pranie materaca w domu',
    steps: [
      { n: '1', t: 'Odkurzanie na sucho', d: 'HEPA-odkurzacz zbiera kurz, sierść i naskórek z powierzchni i szwów.' },
      { n: '2', t: 'Aplikacja preparatu', d: 'Rozpylamy detergent enzymatyczny — rozkłada plamy organiczne i neutralizuje zapachy.' },
      { n: '3', t: 'Ekstrakcja gorącą wodą', d: 'Santoemma wypłukuje brud z głębi pianki i natychmiast odsysa wilgoć.' },
      { n: '4', t: 'Suszenie i przewietrzenie', d: 'Dmuchawa turbo skraca czas schnięcia do 2-4 godzin. Suszenie GRATIS.' },
    ],
    calcTitle: 'Cennik prania materacy',
    calcSubtitle: 'Kliknij „Zamów", aby dodać pozycję. Zamówienie przez formularz = rabat −10% na materace i tapicerkę.',
    gallery: 'Efekt przed i po',
    formTitle: 'Zamów pranie materaca — automatyczny rabat −10%',
    faqTitle: 'Najczęściej zadawane pytania',
    faqs: [
      { q: 'Ile kosztuje pranie materaca?', a: 'Materac jednoosobowy — 130 zł (jedna strona) lub 200 zł (dwie strony). Materac dwuosobowy — 200 zł (jedna strona) lub 300 zł (dwie strony). Zamówienie przez formularz — automatyczny rabat −10%.' },
      { q: 'Ile schnie materac po praniu ekstrakcyjnym?', a: 'Zazwyczaj 2-4 godziny przy dobrej wentylacji. Maszyna Santoemma odsysa większość wilgoci w trakcie prania, więc materac jest jedynie lekko wilgotny. W chłodne dni schnięcie może potrwać 6-8 godzin.' },
      { q: 'Czy pranie usuwa roztocza z materaca?', a: 'Tak. Kombinacja gorącej wody (60–70°C), enzymatycznej chemii i głębokiej ekstrakcji usuwa roztocza i ich odchody z warstwy tapicerskiej. Efekt widoczny jest już po jednym zabiegu.' },
      { q: 'Czy usuwacie plamy z moczu i krwi?', a: 'Tak — specjalizujemy się w usuwaniu plam organicznych metodą enzymatyczną. Preparaty rozkładają białka i neutralizują zapach u źródła, nie tylko maskują go.' },
      { q: 'Czy pranie materaca jest bezpieczne dla dzieci i alergików?', a: 'Tak. Używamy wyłącznie hipoalergicznych preparatów certyfikowanych normą UE. Po całkowitym wyschnięciu materac jest bezpieczny dla noworodków, dzieci i osób z alergią.' },
      { q: 'Jak często prać materac?', a: 'Zalecamy pranie materaca minimum raz w roku — a dla alergików i rodzin z dziećmi lub zwierzętami co 6 miesięcy. Regularne pranie znacząco wydłuża żywotność materaca.' },
      { q: 'Czy usuwacie materac przed praniem?', a: 'Nie ma takiej potrzeby — pierzemy materac na miejscu, w Twojej sypialni. Wystarczy zdjąć pościel i zapewnić dostęp do gniazdka elektrycznego.' },
    ],
    seoTitle: 'Pranie materacy Wrocław — usuwanie roztoczy | MasterClean',
    seoDesc: 'Profesjonalne pranie materacy we Wrocławiu i na Dolnym Śląsku. Ekstrakcyjne usuwanie roztoczy, plam i zapachów. Suszenie GRATIS. Rabat −10% przez formularz.',
    seoKw: 'pranie materacy wrocław, pranie materaca, czyszczenie materaca, usuwanie roztoczy z materaca, pranie materacy dolnośląskie, pranie materaca z dojazdem, hipoalergiczne pranie materacy, pranie materaca dziecięcego, ekstrakcyjne pranie materaca, cena prania materaca wrocław',
  },
  ru: {
    h1: 'Химчистка матрасов во Вроцлаве — удаление клещей и запахов',
    subtitle: 'Глубокая экстракторная химчистка матрасов с удалением пылевых клещей, пятен и запахов. Выезжаем с профессиональным оборудованием Santoemma и Kärcher по всему Дольнёшлёнскому воеводству.',
    chip: 'Вроцлав · Смолец · Нижняя Силезия',
    introTitle: 'Химчистка матрасов с выездом — зачем это нужно?',
    intro: [
      'В матрасе, на котором спали 5 лет, может обитать до 2 миллионов пылевых клещей — главный источник аллергии дыхательных путей, насморка и раздражений кожи у детей. Обычный пылесос не удаляет их продукты жизнедеятельности, застрявшие в глубине поролона. Только экстракторная стирка горячей водой с профессиональным гипоаллергенным детергентом даёт реальный эффект.',
      'MasterClean специализируется на химчистке пружинных, поролоновых, латексных и гибридных матрасов. Работаем машинами Santoemma с силой всасывания 2500 мм H₂O, которые вымывают грязь из глубины матраса и сразу вытягивают влагу — после нашей работы матрас остаётся лишь слегка влажным и полностью высыхает к вечеру.',
    ],
    whyTitle: 'Что вы получаете, заказывая химчистку матраса у нас',
    benefits: [
      'Удаление клещей, их продуктов жизнедеятельности и аллергенов',
      'Эффективное удаление пятен от мочи, пота, крови и вина',
      'Нейтрализация запахов — моча животных, плесень, сырость',
      'Профессиональная сушка мебели и матрасов — БЕСПЛАТНО',
      'Безопасные гипоаллергенные препараты (норма ЕС)',
      'Заказ через форму — автоматическая скидка −10%',
    ],
    typesTitle: 'Какие матрасы мы чистим',
    types: [
      { title: 'Пружинные матрасы (боннель, независимый блок)', text: 'Глубокая экстракторная стирка с двух сторон. Удаляем пятна, клещей и запахи из тапицерского слоя над пружинами без повреждения конструкции.' },
      { title: 'Поролоновые и мемори-фом', text: 'Деликатная химия, не разрушающая поролон. Короткий цикл работы защищает материал от деформации.' },
      { title: 'Латексные и гибридные', text: 'Низкотемпературный метод с профессиональным вытягиванием влаги — латекс не впитывает лишнюю воду и сохнет быстрее поролона.' },
      { title: 'Детские и младенческие матрасы', text: 'Только сертифицированные гипоаллергенные препараты без запахов и красителей. Безопасно для новорождённых после полного высыхания.' },
    ],
    processTitle: 'Как проходит чистка матраса на дому',
    steps: [
      { n: '1', t: 'Сухая уборка', d: 'HEPA-пылесос собирает пыль, шерсть и частицы кожи с поверхности и швов.' },
      { n: '2', t: 'Нанесение препарата', d: 'Распыляем энзимный детергент — расщепляет органические пятна и нейтрализует запахи.' },
      { n: '3', t: 'Экстракция горячей водой', d: 'Santoemma вымывает грязь из глубины поролона и сразу вытягивает влагу.' },
      { n: '4', t: 'Сушка и проветривание', d: 'Турбо-вентилятор сокращает сушку до 2-4 часов. Сушка БЕСПЛАТНО.' },
    ],
    calcTitle: 'Прайс на химчистку матрасов',
    calcSubtitle: 'Нажмите «Заказать», чтобы добавить позицию. Заказ через форму = скидка −10% на матрасы и мебель.',
    gallery: 'Результат до и после',
    formTitle: 'Заказать химчистку матраса — автоматическая скидка −10%',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько стоит химчистка матраса?', a: 'Односпальный матрас — 130 zł (одна сторона) или 200 zł (две стороны). Двуспальный — 200 zł (одна сторона) или 300 zł (две стороны). Заказ через форму — автоматическая скидка −10%.' },
      { q: 'Сколько сохнет матрас после экстракторной чистки?', a: 'Обычно 2-4 часа при хорошей вентиляции. Машина Santoemma вытягивает большую часть влаги в процессе стирки, поэтому матрас остаётся лишь слегка влажным. В прохладные дни сушка может занять 6-8 часов.' },
      { q: 'Удаляет ли чистка клещей из матраса?', a: 'Да. Сочетание горячей воды (60–70°C), энзимной химии и глубокой экстракции удаляет клещей и их продукты жизнедеятельности из тапицерского слоя. Эффект заметен уже после одной процедуры.' },
      { q: 'Удаляете ли пятна от мочи и крови?', a: 'Да — мы специализируемся на органических пятнах, используя энзимный метод. Препараты расщепляют белки и нейтрализуют запах у источника, а не маскируют его.' },
      { q: 'Безопасна ли чистка матраса для детей и аллергиков?', a: 'Да. Используем только гипоаллергенные препараты, сертифицированные по нормам ЕС. После полного высыхания матрас безопасен для новорождённых, детей и людей с аллергией.' },
      { q: 'Как часто чистить матрас?', a: 'Рекомендуем чистить матрас минимум раз в год, а для аллергиков и семей с детьми или животными — каждые 6 месяцев. Регулярная чистка значительно продлевает срок службы матраса.' },
      { q: 'Нужно ли выносить матрас перед чисткой?', a: 'Нет — чистим матрас на месте, в вашей спальне. Достаточно снять постельное бельё и обеспечить доступ к розетке.' },
    ],
    seoTitle: 'Химчистка матрасов Вроцлав — удаление клещей | MasterClean',
    seoDesc: 'Профессиональная химчистка матрасов во Вроцлаве и Нижней Силезии. Экстракторное удаление клещей, пятен и запахов. Сушка БЕСПЛАТНО. Скидка −10% через форму.',
    seoKw: 'химчистка матрасов вроцлав, чистка матраса, удаление клещей из матраса, чистка матраса на дому, стирка матрасов вроцлав, экстракторная чистка матраса, гипоаллергенная чистка матраса, цена химчистки матраса вроцлав, чистка детского матраса',
  },
  en: {
    h1: 'Mattress cleaning Wrocław — dust mite removal and drying',
    subtitle: 'Deep extraction mattress cleaning with mite, stain and odor removal. We come with professional Santoemma and Kärcher equipment across Lower Silesia.',
    chip: 'Wrocław · Smolec · Lower Silesia',
    introTitle: 'Mattress cleaning with home visit — why it matters',
    intro: [
      'A mattress slept on for 5 years can host up to 2 million dust mites — the main cause of respiratory allergies, rhinitis and skin irritation in children. Regular vacuuming does not remove their droppings trapped deep in the foam. Only extraction cleaning with hot water and professional hypoallergenic detergent gives a real result.',
      'MasterClean specializes in cleaning spring, foam, latex and hybrid mattresses. We use Santoemma machines with 2500 mm H₂O suction that flush dirt from deep inside the mattress and immediately recover moisture — after our visit the mattress is only slightly damp and fully dry by evening.',
    ],
    whyTitle: 'What you get when you order mattress cleaning with us',
    benefits: [
      'Removes dust mites, their droppings and allergens at the source',
      'Effective removal of urine, sweat, blood and wine stains',
      'Odor neutralisation — pet urine, mould, damp',
      'Professional mattress and furniture drying — FREE',
      'Safe, hypoallergenic detergents (EU standard)',
      'Order via the form — automatic 10% discount',
    ],
    typesTitle: 'Which mattresses we clean',
    types: [
      { title: 'Spring mattresses (Bonnell, pocket)', text: 'Deep extraction cleaning of both sides. We remove stains, mites and odors from the upholstery layer above the springs without touching the construction.' },
      { title: 'Foam and memory foam mattresses', text: 'Gentle chemistry that does not degrade the foam. Short work cycle protects the material from deformation.' },
      { title: 'Latex and hybrid mattresses', text: 'Low-temperature method with professional suction — latex does not absorb excess water, so it dries faster than foam.' },
      { title: 'Children and baby mattresses', text: 'Only certified hypoallergenic products, free of fragrances and dyes. Safe for newborns once fully dry.' },
    ],
    processTitle: 'How the home mattress cleaning process works',
    steps: [
      { n: '1', t: 'Dry vacuum', d: 'HEPA vacuum collects dust, hair and skin flakes from the surface and seams.' },
      { n: '2', t: 'Detergent application', d: 'We spray an enzymatic detergent — breaks down organic stains and neutralises odors.' },
      { n: '3', t: 'Hot water extraction', d: 'Santoemma flushes dirt from deep in the foam and instantly recovers moisture.' },
      { n: '4', t: 'Drying and ventilation', d: 'Turbo blower shortens drying to 2-4 hours. Drying is FREE.' },
    ],
    calcTitle: 'Mattress cleaning price list',
    calcSubtitle: 'Click "Order" to add an item. Order via the form = −10% discount on mattresses and upholstery.',
    gallery: 'Before and after',
    formTitle: 'Order mattress cleaning — automatic 10% discount',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'How much does mattress cleaning cost?', a: 'Single mattress — 130 zł (one side) or 200 zł (both sides). Double mattress — 200 zł (one side) or 300 zł (both sides). Order via the form — automatic 10% discount.' },
      { q: 'How long does a mattress dry after extraction cleaning?', a: 'Usually 2-4 hours with good ventilation. The Santoemma machine recovers most moisture during cleaning so the mattress is only slightly damp. On cool days drying can take 6-8 hours.' },
      { q: 'Does cleaning remove dust mites?', a: 'Yes. The combination of hot water (60–70°C), enzymatic chemistry and deep extraction removes mites and their droppings from the upholstery layer. Result visible after a single treatment.' },
      { q: 'Do you remove urine and blood stains?', a: 'Yes — we specialise in organic stains using the enzymatic method. Products break down proteins and neutralise the odor at the source, not merely masking it.' },
      { q: 'Is mattress cleaning safe for children and allergy sufferers?', a: 'Yes. We use only hypoallergenic products certified to EU standards. Once fully dry, the mattress is safe for newborns, children and allergy sufferers.' },
      { q: 'How often should a mattress be cleaned?', a: 'We recommend cleaning at least once a year — and every 6 months for allergy sufferers and families with children or pets. Regular cleaning significantly extends mattress life.' },
      { q: 'Do you need to move the mattress out for cleaning?', a: 'No — we clean the mattress on-site in your bedroom. Just remove the bedding and provide access to a power socket.' },
    ],
    seoTitle: 'Mattress cleaning Wrocław — mite removal | MasterClean',
    seoDesc: 'Professional mattress cleaning in Wrocław and Lower Silesia. Extraction removal of mites, stains and odors. Drying FREE. 10% discount via the form.',
    seoKw: 'mattress cleaning wroclaw, mattress washing, dust mite removal mattress, home mattress cleaning, extraction mattress cleaning, hypoallergenic mattress cleaning, baby mattress cleaning wroclaw, mattress cleaning price wroclaw',
  },
  uk: {
    h1: 'Хімчистка матраців у Вроцлаві — усунення кліщів і запахів',
    subtitle: 'Глибока екстракторна хімчистка матраців з усуненням пилових кліщів, плям і запахів. Виїжджаємо з професійним обладнанням Santoemma і Kärcher по всьому Нижньосілезькому воєводству.',
    chip: 'Вроцлав · Смолець · Нижня Сілезія',
    introTitle: 'Хімчистка матраців із виїздом — навіщо це потрібно?',
    intro: [
      'У матраці, на якому спали 5 років, може мешкати до 2 мільйонів пилових кліщів — головне джерело алергії дихальних шляхів, нежитю та подразнень шкіри в дітей. Звичайний пилосос не видаляє їхні продукти життєдіяльності, що застрягли в глибині поролону. Тільки екстракторне прання гарячою водою з професійним гіпоалергенним детергентом дає реальний ефект.',
      'MasterClean спеціалізується на хімчистці пружинних, поролонових, латексних та гібридних матраців. Працюємо машинами Santoemma із силою всмоктування 2500 мм H₂O, які вимивають бруд із глибини матраца й одразу витягують вологу — після нашої роботи матрац лише злегка вологий і повністю висихає до вечора.',
    ],
    whyTitle: 'Що ви отримуєте, замовляючи хімчистку матраца в нас',
    benefits: [
      'Усунення кліщів, їхніх продуктів життєдіяльності та алергенів',
      'Ефективне видалення плям сечі, поту, крові та вина',
      'Нейтралізація запахів — сеча тварин, пліснява, вогкість',
      'Професійне сушіння меблів і матраців — БЕЗКОШТОВНО',
      'Безпечні гіпоалергенні препарати (норма ЄС)',
      'Замовлення через форму — автоматична знижка −10%',
    ],
    typesTitle: 'Які матраци ми чистимо',
    types: [
      { title: 'Пружинні матраци (боннель, незалежний блок)', text: 'Глибоке екстракторне прання з двох боків. Видаляємо плями, кліщів і запахи з оббивного шару над пружинами без пошкодження конструкції.' },
      { title: 'Поролонові та мемори-фом', text: 'Делікатна хімія, що не руйнує поролон. Короткий цикл роботи захищає матеріал від деформації.' },
      { title: 'Латексні та гібридні', text: 'Низькотемпературний метод із професійним витягуванням вологи — латекс не вбирає зайву воду й сохне швидше за поролон.' },
      { title: 'Дитячі та немовлячі матраци', text: 'Тільки сертифіковані гіпоалергенні препарати без запахів і барвників. Безпечно для новонароджених після повного висихання.' },
    ],
    processTitle: 'Як проходить чистка матраца вдома',
    steps: [
      { n: '1', t: 'Суха уборка', d: 'HEPA-пилосос збирає пил, шерсть і частинки шкіри з поверхні та швів.' },
      { n: '2', t: 'Нанесення препарату', d: 'Розпилюємо ензимний детергент — розщеплює органічні плями та нейтралізує запахи.' },
      { n: '3', t: 'Екстракція гарячою водою', d: 'Santoemma вимиває бруд із глибини поролону та одразу витягує вологу.' },
      { n: '4', t: 'Сушіння та провітрювання', d: 'Турбо-вентилятор скорочує сушіння до 2-4 годин. Сушіння БЕЗКОШТОВНО.' },
    ],
    calcTitle: 'Прайс на хімчистку матраців',
    calcSubtitle: 'Натисніть «Замовити», щоб додати позицію. Замовлення через форму = знижка −10% на матраци та меблі.',
    gallery: 'Результат до і після',
    formTitle: 'Замовити хімчистку матраца — автоматична знижка −10%',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки коштує хімчистка матраца?', a: 'Односпальний матрац — 130 zł (одна сторона) або 200 zł (дві сторони). Двоспальний — 200 zł (одна сторона) або 300 zł (дві сторони). Замовлення через форму — автоматична знижка −10%.' },
      { q: 'Скільки сохне матрац після екстракторної чистки?', a: 'Зазвичай 2-4 години при добрій вентиляції. Машина Santoemma витягує більшу частину вологи в процесі прання, тож матрац лише злегка вологий. У прохолодні дні сушіння може зайняти 6-8 годин.' },
      { q: 'Чи видаляє чистка кліщів із матраца?', a: 'Так. Поєднання гарячої води (60–70°C), ензимної хімії та глибокої екстракції видаляє кліщів та їхні продукти життєдіяльності з оббивного шару. Ефект помітний уже після однієї процедури.' },
      { q: 'Чи видаляєте плями від сечі та крові?', a: 'Так — ми спеціалізуємося на органічних плямах, використовуючи ензимний метод. Препарати розщеплюють білки й нейтралізують запах біля джерела, а не маскують його.' },
      { q: 'Чи безпечна чистка матраца для дітей і алергіків?', a: 'Так. Використовуємо лише гіпоалергенні препарати, сертифіковані за нормами ЄС. Після повного висихання матрац безпечний для новонароджених, дітей і людей з алергією.' },
      { q: 'Як часто чистити матрац?', a: 'Рекомендуємо чистити матрац щонайменше раз на рік, а для алергіків і сімей з дітьми чи тваринами — кожні 6 місяців. Регулярна чистка значно продовжує термін служби матраца.' },
      { q: 'Чи треба виносити матрац перед чисткою?', a: 'Ні — чистимо матрац на місці, у вашій спальні. Достатньо зняти постільну білизну та забезпечити доступ до розетки.' },
    ],
    seoTitle: 'Хімчистка матраців Вроцлав — усунення кліщів | MasterClean',
    seoDesc: 'Професійна хімчистка матраців у Вроцлаві та Нижній Сілезії. Екстракторне усунення кліщів, плям і запахів. Сушіння БЕЗКОШТОВНО. Знижка −10% через форму.',
    seoKw: 'хімчистка матраців вроцлав, чистка матраца, усунення кліщів з матраца, чистка матраца вдома, прання матраців вроцлав, екстракторна чистка матраца, гіпоалергенна чистка матраца, ціна хімчистки матраца вроцлав, чистка дитячого матраца',
  },
};

const MattressCleaning = () => {
  const { t, language } = useLanguage();
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  useSeoSelfCheck('MattressCleaning (/pranie-materacy)');

  const lang = (['pl', 'ru', 'en', 'uk'].includes(language) ? language : 'pl') as Lang;
  const c = COPY[lang];

  const items = [
    { id: 'mattressSingle', name: t.prices?.items?.mattressSingleDry || 'Materac jednoosobowy', price: 130, image: calcSingle },
    { id: 'mattressSingleDry2', name: t.prices?.items?.mattressSingleDry2 || 'Materac jednoosobowy (2 strony)', price: 200, image: calcSingle },
    { id: 'mattressDouble', name: t.prices?.items?.mattressDoubleDry || 'Materac dwuosobowy', price: 200, image: calcDouble },
    { id: 'mattressDoubleDry2', name: t.prices?.items?.mattressDoubleDry2 || 'Materac dwuosobowy (2 strony)', price: 300, image: calcDouble },
  ];

  const handleSendToForm = (calcItems: CalculatorItem[], total: number) => {
    formRef.current?.setCalculatorData(calcItems, total);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDesc}
        keywords={c.seoKw}
        canonical="/pranie-materacy"
        image="/og-image.jpg"
        breadcrumbs={[{ name: c.h1.split('—')[0].trim(), path: '/pranie-materacy' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Mattress cleaning',
            name: c.h1,
            description: c.seoDesc,
            url: 'https://masterclean1885.com/pranie-materacy',
            areaServed: [
              { '@type': 'City', name: 'Wrocław' },
              { '@type': 'AdministrativeArea', name: 'Dolnośląskie' },
            ],
            provider: {
              '@type': 'LocalBusiness',
              name: 'MasterClean',
              telephone: '+48575211401',
              address: { '@type': 'PostalAddress', addressCountry: 'PL', addressRegion: 'dolnośląskie', addressLocality: 'Wrocław' },
            },
            offers: [
              { '@type': 'Offer', name: 'Single mattress (1 side)', price: '130', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Single mattress (2 sides)', price: '200', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Double mattress (1 side)', price: '200', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Double mattress (2 sides)', price: '300', priceCurrency: 'PLN' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: c.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      <Layout>
        <BackToOrderButton />

        {/* Hero */}
        <section className="py-20 bg-gradient-section relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow"
                    style={{ animation: 'float 3s ease-in-out infinite' }}
                  >
                    <Bed
                      className="w-8 h-8 text-primary-foreground"
                      style={{ animation: 'pulse 2s ease-in-out infinite' }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {lang === 'pl' ? 'Pranie materacy' : lang === 'ru' ? 'Химчистка матрасов' : lang === 'uk' ? 'Хімчистка матраців' : 'Mattress cleaning'}
                  </span>
                </div>
                <h1
                  className="font-serif text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
                  style={{ animation: 'shimmer 3s linear infinite' }}
                >
                  {c.h1}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{c.subtitle}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Truck className="w-4 h-4" /> {c.chip}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fresh/10 text-fresh text-sm font-medium">
                    <ShieldCheck className="w-4 h-4" /> Santoemma · Kärcher
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Sparkles className="w-4 h-4" /> −10%
                  </span>
                </div>
              </div>
              <div className="relative">
                <CircularRevealCard index={0}>
                  <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-gradient-hero p-1">
                    <AnimatedImage
                      src={heroImage}
                      alt={c.h1}
                      className="w-full h-[24rem] md:h-[30rem] object-cover object-center rounded-xl bg-card"
                      duration={800}
                    />
                  </div>
                </CircularRevealCard>
              </div>
            </div>
          </div>
        </section>

        {/* Intro copy */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2
                className="font-serif text-2xl md:text-3xl font-bold mb-5 text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
                style={{ animation: 'shimmer 3s linear infinite' }}
              >
                {c.introTitle}
              </h2>
              <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                {c.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
                {c.whyTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {c.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border shadow-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 text-fresh shrink-0 mt-0.5" />
                    <p className="text-foreground/85 leading-snug">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mattress types */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
                {c.typesTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {c.types.map((typ, i) => (
                  <article
                    key={i}
                    className="bg-card rounded-2xl border border-border shadow-card p-6"
                  >
                    <h3 className="font-serif text-xl font-bold mb-3 text-primary">{typ.title}</h3>
                    <p className="text-foreground/80 leading-relaxed">{typ.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
                {c.processTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {c.steps.map((step) => (
                  <div
                    key={step.n}
                    className="bg-card rounded-2xl border border-border p-6 text-center shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-hero text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {step.n}
                    </div>
                    <h3 className="font-serif text-lg font-bold mb-2">{step.t}</h3>
                    <p className="text-sm text-foreground/75 leading-snug">{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="py-14 bg-card">
          <div className="container mx-auto px-4">
            <h2
              className="font-serif text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
              style={{ animation: 'shimmer 3s linear infinite' }}
            >
              {c.gallery}
            </h2>
            <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-elegant border border-border bg-muted">
              <img
                src={mattressBa}
                alt={c.gallery}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Droplets className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-primary">
                  {c.calcTitle}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{c.calcSubtitle}</p>
              </div>
              <CircularRevealCard index={0}>
                <div className="bg-card p-6 rounded-2xl shadow-card border border-border">
                  <CardServiceCalculator
                    items={items}
                    category="furniture"
                    largeCards
                    onSendToForm={handleSendToForm}
                  />
                </div>
              </CircularRevealCard>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <HelpCircle className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{c.faqTitle}</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {c.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-foreground/80 leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section ref={formSectionRef} className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Wind className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{c.formTitle}</h2>
              </div>
              <ContactForm ref={formRef} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default MattressCleaning;
