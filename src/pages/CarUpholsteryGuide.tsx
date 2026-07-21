import { useRef } from 'react';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AnimatedImage from '@/components/AnimatedImage';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSeoSelfCheck } from '@/hooks/useSeoSelfCheck';
import { CheckCircle2, AlertTriangle, Sparkles, Droplets, ShieldCheck, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@/assets/auto-cleaning-1.jpg';
import stepImage from '@/assets/auto-ba-new-1.jpg';

type Lang = 'pl' | 'ru' | 'en' | 'uk';

const COPY: Record<Lang, {
  h1: string;
  subtitle: string;
  chip: string;
  introTitle: string;
  intro: string[];
  whenTitle: string;
  whenItems: string[];
  methodsTitle: string;
  methods: { title: string; pros: string; cons: string }[];
  stepsTitle: string;
  steps: { n: string; t: string; d: string }[];
  mistakesTitle: string;
  mistakes: string[];
  proTitle: string;
  proText: string;
  ctaTitle: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDesc: string;
  seoKw: string;
}> = {
  pl: {
    h1: 'Poradnik prania tapicerki samochodowej — techniki, bezpieczeństwo i ekstrakcja',
    subtitle: 'Kompletny przewodnik krok po kroku: kiedy prać samodzielnie, jakich środków użyć, jakich błędów unikać i kiedy oddać auto do profesjonalnego prania ekstrakcyjnego.',
    chip: 'Poradnik · Auto detailing',
    introTitle: 'Dlaczego pranie tapicerki samochodowej jest ważne',
    intro: [
      'Tapicerka samochodowa gromadzi kurz, sierść, resztki jedzenia, pot i wilgoć. Po roku eksploatacji w foteliach kierowcy potrafi się zebrać do 200 g brudu, którego nie widać gołym okiem — ale doskonale go czuć w postaci charakterystycznego, „starego" zapachu wnętrza.',
      'Regularne odkurzanie usuwa tylko wierzchnią warstwę. Prawdziwe zabrudzenia — plamy z kawy, tłuszczu, kremu do rąk czy zapach papierosów — są zaklinowane głęboko w piance foteli. Do ich usunięcia potrzebna jest kombinacja odpowiedniej chemii, ciepłej wody i profesjonalnej ekstrakcji.',
    ],
    whenTitle: 'Kiedy prać tapicerkę samochodową',
    whenItems: [
      'Przed sprzedażą auta — czyste wnętrze podnosi cenę o 1500–4000 zł',
      'Po zalaniu napojami, plamach z jedzenia lub kremu',
      'Gdy pojawia się nieprzyjemny zapach (pot, dym, pleśń, mocz zwierząt)',
      'Po przewozie zwierząt — sierść i alergeny wchodzą głęboko w tkaninę',
      'Minimum raz w roku dla higieny i przedłużenia żywotności tapicerki',
    ],
    methodsTitle: 'Metody prania tapicerki — porównanie',
    methods: [
      {
        title: 'Pianka do tapicerki z drogerii (DIY)',
        pros: 'Tania (15–40 zł), dostępna wszędzie, prosta w użyciu na drobne plamy.',
        cons: 'Nie usuwa brudu z głębi pianki, może pozostawić zacieki, przy zbyt mocnym namoczeniu tapicerka wysycha nawet 3–4 dni, ryzyko pleśni.',
      },
      {
        title: 'Odkurzacz piorący domowy',
        pros: 'Lepszy niż pianka, wypłukuje część brudu i odsysa wodę.',
        cons: 'Słabe ciśnienie i temperatura wody, ryzyko przemoczenia pianki foteli i rdzy sprężyn, nie usuwa uporczywych plam i zapachów.',
      },
      {
        title: 'Profesjonalne pranie ekstrakcyjne (Santoemma / Kärcher Puzzi)',
        pros: 'Woda 60–70°C wypłukuje brud z głębi pianki, moc ssania 2500 mm H₂O odsysa niemal całą wilgoć. Tapicerka wysycha w 2–4 godziny, znika zapach, plamy z kawy i tłuszczu.',
        cons: 'Wymaga profesjonalnego sprzętu — realny efekt tylko przy wizycie specjalisty.',
      },
    ],
    stepsTitle: 'Jak wyprać tapicerkę samochodową krok po kroku',
    steps: [
      { n: '1', t: 'Wyjmij i odkurz', d: 'Zdejmij dywaniki, odkurz fotele, tylną kanapę, boczki drzwi i schowki. Użyj wąskiej ssawki do szczelin między siedziskami.' },
      { n: '2', t: 'Odczep plamy', d: 'Zeskrob zaschnięte resztki plastikową szpatułką. Nigdy nie używaj metalowych narzędzi — mogą uszkodzić włókna.' },
      { n: '3', t: 'Wybierz odpowiedni środek', d: 'Do tapicerki tekstylnej — środek z enzymami lub aktywnym tlenem. Do skóry — wyłącznie dedykowany cleaner + kondycjoner. Nigdy nie mieszaj środków.' },
      { n: '4', t: 'Testuj w niewidocznym miejscu', d: 'Nanieś środek na fragment pod fotelem lub w bagażniku. Odczekaj 10 minut — sprawdź, czy nie zmienia koloru materiału.' },
      { n: '5', t: 'Pierz sekcjami', d: 'Nakładaj środek na powierzchnię nie większą niż 40×40 cm, szczotkuj miękką szczotką kolistymi ruchami, natychmiast wybieraj brud odkurzaczem piorącym.' },
      { n: '6', t: 'Wysusz dokładnie', d: 'Zostaw auto z otwartymi drzwiami na 4–8 godzin w suchy dzień. W chłodne dni użyj dmuchawy lub oddaj do profesjonalisty — mokre fotele = pleśń.' },
    ],
    mistakesTitle: 'Najczęstsze błędy przy praniu tapicerki',
    mistakes: [
      'Zbyt duża ilość wody — pianka foteli chłonie wilgoć i schnie tygodniami',
      'Użycie zwykłego proszku do prania — pozostawia zacieki i twarde plamy detergentu',
      'Szczotkowanie tapicerki skórzanej — zdziera powłokę ochronną',
      'Wysoka temperatura na skórze — powoduje pękanie i wysychanie',
      'Suszenie na słońcu zaraz po praniu — powoduje żółte przebarwienia',
      'Amoniak lub wybielacz — trwale uszkadza włókna i tkaniny',
    ],
    proTitle: 'Kiedy oddać auto profesjonalistom',
    proText: 'Głęboko wchłonięte plamy z tłuszczu, kremu, wina, moczu zwierząt oraz utrzymujący się zapach dymu czy pleśni — to sytuacje, w których tylko ekstrakcyjne pranie z gorącą wodą i profesjonalna chemia dają efekt. MasterClean używa maszyn Santoemma i Kärcher Puzzi 10/1, dzięki którym tapicerka wysycha w 2–4 godziny, a zapach znika u źródła. Wybielamy fotele, pierzemy tylną kanapę, boczki drzwi, dywaniki, sufit i bagażnik — kompleksowe pranie od 350 zł.',
    ctaTitle: 'Zamów profesjonalne pranie tapicerki samochodowej',
    faqTitle: 'Najczęściej zadawane pytania',
    faqs: [
      { q: 'Ile kosztuje pranie tapicerki samochodowej?', a: 'Pranie samych foteli — od 200 zł. Kompleksowe pranie wnętrza (fotele, kanapa, sufit, dywaniki, boczki, bagażnik) — od 350 zł. Cena zależy od stopnia zabrudzenia i rodzaju tapicerki.' },
      { q: 'Ile schnie tapicerka po praniu ekstrakcyjnym?', a: 'Przy profesjonalnej ekstrakcji Santoemma — 2–4 godziny latem, do 8 godzin zimą. Przy praniu domowym pianką lub odkurzaczem piorącym — nawet 24–72 godziny.' },
      { q: 'Czy pranie usuwa zapach papierosów z auta?', a: 'Częściowo — ekstrakcja usuwa nikotynę zaklinowaną w tkaninach. Dla pełnego efektu łączymy pranie z ozonowaniem, które neutralizuje molekuły zapachu w powietrzu i wentylacji.' },
      { q: 'Czy można wyprać tapicerkę samochodową w domu?', a: 'Można, jeśli plamy są świeże i powierzchowne. Do głęboko wchłoniętego brudu, plam po napojach, moczu zwierząt lub zapachu dymu potrzebne jest profesjonalne pranie ekstrakcyjne.' },
      { q: 'Czym różni się pranie tapicerki tekstylnej od skórzanej?', a: 'Tekstylną pierze się metodą ekstrakcyjną z detergentem enzymatycznym. Skórę czyści się dedykowanym cleanerem i zabezpiecza kondycjonerem — pranie ekstrakcyjne uszkadza powłokę skóry.' },
      { q: 'Czy pranie zniszczy pianki foteli?', a: 'Profesjonalne pranie z natychmiastową ekstrakcją nie moczy pianki. Domowe pranie zbyt dużą ilością wody może powodować pleśń wewnątrz siedzisk.' },
    ],
    seoTitle: 'Pranie tapicerki samochodowej — kompletny poradnik | MasterClean',
    seoDesc: 'Jak wyprać tapicerkę samochodową — techniki, chemia, błędy do uniknięcia i kiedy warto oddać auto do profesjonalnego prania ekstrakcyjnego. Praktyczny poradnik.',
    seoKw: 'pranie tapicerki samochodowej, jak wyprać tapicerkę auta, pranie foteli samochodowych, czyszczenie tapicerki samochodowej, poradnik prania tapicerki, ekstrakcyjne pranie tapicerki, chemia do prania tapicerki auta, pranie skórzanej tapicerki',
  },
  ru: {
    h1: 'Химчистка автомобильной обивки — техники, безопасность и экстракция',
    subtitle: 'Полное пошаговое руководство: когда чистить самому, какие средства использовать, каких ошибок избегать и когда стоит отдать авто на профессиональную экстракторную химчистку.',
    chip: 'Гайд · Авто-детейлинг',
    introTitle: 'Зачем чистить тапицерку в автомобиле',
    intro: [
      'Обивка автомобиля накапливает пыль, шерсть, остатки еды, пот и влагу. За год эксплуатации в водительском сиденье может собраться до 200 г грязи, невидимой глазу — но отлично ощущаемой в виде характерного «старого» запаха салона.',
      'Обычный пылесос убирает только верхний слой. Настоящие загрязнения — пятна от кофе, жира, крема или запах сигарет — застревают глубоко в поролоне сидений. Для их удаления нужны специальная химия, тёплая вода и профессиональная экстракция.',
    ],
    whenTitle: 'Когда чистить обивку салона',
    whenItems: [
      'Перед продажей авто — чистый салон повышает цену на 1500–4000 zł',
      'После пролитых напитков, пятен от еды или крема',
      'Когда появляется неприятный запах (пот, дым, плесень, моча животных)',
      'После перевозки животных — шерсть и аллергены проникают глубоко в ткань',
      'Минимум раз в год для гигиены и продления срока службы обивки',
    ],
    methodsTitle: 'Методы химчистки обивки — сравнение',
    methods: [
      {
        title: 'Пена для обивки из магазина (DIY)',
        pros: 'Дешёвая (15–40 zł), доступна везде, проста в использовании для мелких пятен.',
        cons: 'Не удаляет грязь из глубины поролона, может оставить разводы, при чрезмерном намокании обивка сохнет 3–4 дня, риск плесени.',
      },
      {
        title: 'Домашний моющий пылесос',
        pros: 'Лучше пены, вымывает часть грязи и вытягивает воду.',
        cons: 'Слабое давление и температура, риск промокания поролона и ржавчины пружин, не удаляет стойкие пятна и запахи.',
      },
      {
        title: 'Профессиональная экстракторная стирка (Santoemma / Kärcher Puzzi)',
        pros: 'Вода 60–70°C вымывает грязь из глубины, сила всасывания 2500 мм H₂O вытягивает почти всю влагу. Обивка сохнет 2–4 часа, уходит запах, пятна от кофе и жира.',
        cons: 'Требует профессионального оборудования — реальный эффект только при выезде специалиста.',
      },
    ],
    stepsTitle: 'Как почистить обивку авто пошагово',
    steps: [
      { n: '1', t: 'Достаньте и пропылесосьте', d: 'Снимите коврики, пропылесосьте сиденья, задний диван, обшивку дверей и бардачки. Используйте узкую насадку для щелей.' },
      { n: '2', t: 'Отделите пятна', d: 'Соскребите засохшие остатки пластиковой лопаткой. Никогда не используйте металлические инструменты — они повреждают волокна.' },
      { n: '3', t: 'Подберите средство', d: 'Для текстиля — энзимный или кислородный очиститель. Для кожи — только специальный cleaner + кондиционер. Никогда не смешивайте средства.' },
      { n: '4', t: 'Проверьте на незаметном участке', d: 'Нанесите средство на фрагмент под сиденьем или в багажнике. Подождите 10 минут — убедитесь, что цвет не меняется.' },
      { n: '5', t: 'Чистите секциями', d: 'Наносите средство на участок не больше 40×40 см, растирайте мягкой щёткой круговыми движениями, сразу вытягивайте грязь моющим пылесосом.' },
      { n: '6', t: 'Тщательно высушите', d: 'Оставьте авто с открытыми дверями на 4–8 часов в сухой день. В прохладные дни используйте фен-вентилятор или обратитесь к профи — мокрые сиденья = плесень.' },
    ],
    mistakesTitle: 'Частые ошибки при чистке обивки',
    mistakes: [
      'Слишком много воды — поролон впитывает влагу и сохнет неделями',
      'Использование обычного стирального порошка — оставляет разводы и твёрдые пятна',
      'Щётка для кожаной обивки — стирает защитное покрытие',
      'Высокая температура на коже — вызывает трещины и пересыхание',
      'Сушка на солнце сразу после чистки — вызывает жёлтые пятна',
      'Аммиак или отбеливатель — необратимо повреждает волокна',
    ],
    proTitle: 'Когда стоит отдать авто профессионалам',
    proText: 'Глубоко въевшиеся пятна от жира, крема, вина, мочи животных и стойкий запах дыма или плесени — именно те случаи, когда только экстракторная стирка с горячей водой и профессиональной химией даёт результат. MasterClean работает машинами Santoemma и Kärcher Puzzi 10/1 — обивка сохнет за 2–4 часа, а запах уходит у источника. Отбеливаем сиденья, чистим задний диван, обшивку дверей, коврики, потолок и багажник — комплексная химчистка от 350 zł.',
    ctaTitle: 'Заказать профессиональную химчистку обивки авто',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько стоит химчистка обивки автомобиля?', a: 'Химчистка только сидений — от 200 zł. Комплексная химчистка салона (сиденья, диван, потолок, коврики, обшивка, багажник) — от 350 zł. Цена зависит от степени загрязнения и типа обивки.' },
      { q: 'Сколько сохнет обивка после экстракторной чистки?', a: 'При профессиональной экстракции Santoemma — 2–4 часа летом, до 8 часов зимой. При домашней чистке пеной или моющим пылесосом — до 24–72 часов.' },
      { q: 'Убирает ли химчистка запах сигарет из авто?', a: 'Частично — экстракция удаляет никотин из тканей. Для полного эффекта совмещаем химчистку с озонированием, которое нейтрализует запах в воздухе и вентиляции.' },
      { q: 'Можно ли почистить обивку авто самому?', a: 'Можно, если пятна свежие и поверхностные. Для глубоко въевшейся грязи, пятен от напитков, мочи животных или запаха дыма нужна профессиональная экстракторная чистка.' },
      { q: 'Чем отличается чистка тканевой обивки от кожаной?', a: 'Тканевая — экстракторный метод с энзимным детергентом. Кожа — специальный cleaner и кондиционер; экстракторная стирка повреждает покрытие кожи.' },
      { q: 'Не испортит ли чистка поролон сидений?', a: 'Профессиональная чистка с моментальной экстракцией не мочит поролон. Домашняя чистка с избытком воды может привести к плесени внутри сидений.' },
    ],
    seoTitle: 'Химчистка обивки автомобиля — полный гайд | MasterClean',
    seoDesc: 'Как почистить обивку салона автомобиля — техники, химия, ошибки и когда стоит отдать авто на профессиональную экстракторную химчистку. Практический гайд.',
    seoKw: 'химчистка обивки авто, как почистить обивку салона, чистка сидений автомобиля, гайд по химчистке салона, экстракторная чистка авто, химия для чистки салона, чистка кожаной обивки',
  },
  en: {
    h1: 'Car upholstery cleaning guide — techniques, safety and extraction',
    subtitle: 'A complete step-by-step guide: when to DIY, what products to use, mistakes to avoid, and when to take the car for professional hot-water extraction.',
    chip: 'Guide · Auto detailing',
    introTitle: 'Why cleaning car upholstery matters',
    intro: [
      'Car upholstery accumulates dust, pet hair, food debris, sweat and moisture. After a year of use, the driver seat alone can hold up to 200 g of dirt invisible to the eye — but very noticeable as a characteristic "old car" smell inside.',
      'Regular vacuuming removes only the top layer. Real stains — coffee, grease, hand cream, tobacco smell — are trapped deep in the seat foam. Removing them requires the right chemistry, warm water and professional extraction.',
    ],
    whenTitle: 'When to clean car upholstery',
    whenItems: [
      'Before selling the car — a clean interior adds 1500–4000 PLN to the price',
      'After spilled drinks, food or cream stains',
      'When an unpleasant smell appears (sweat, smoke, mould, pet urine)',
      'After transporting animals — hair and allergens embed deep into fabric',
      'At least once a year for hygiene and to extend upholstery life',
    ],
    methodsTitle: 'Upholstery cleaning methods — comparison',
    methods: [
      {
        title: 'Retail upholstery foam (DIY)',
        pros: 'Cheap (15–40 PLN), available anywhere, easy for small stains.',
        cons: 'Does not reach deep dirt in the foam, can leave streaks, over-wetting means 3–4 day drying and mould risk.',
      },
      {
        title: 'Home wet vacuum',
        pros: 'Better than foam, flushes some dirt and extracts water.',
        cons: 'Low pressure and cold water, risk of soaking seat foam and rusting springs, does not remove stubborn stains or smells.',
      },
      {
        title: 'Professional hot-water extraction (Santoemma / Kärcher Puzzi)',
        pros: 'Water at 60–70°C flushes deep dirt, 2500 mm H₂O suction recovers nearly all moisture. Upholstery dries in 2–4 hours, smells and coffee/grease stains disappear.',
        cons: 'Requires professional equipment — real results only with a specialist visit.',
      },
    ],
    stepsTitle: 'How to clean car upholstery step by step',
    steps: [
      { n: '1', t: 'Remove and vacuum', d: 'Take out mats, vacuum seats, rear bench, door panels and storage compartments. Use a narrow nozzle for the gaps between seats.' },
      { n: '2', t: 'Detach stains', d: 'Scrape dried residue with a plastic spatula. Never use metal tools — they damage fibres.' },
      { n: '3', t: 'Pick the right product', d: 'For fabric — an enzymatic or oxygen-based cleaner. For leather — only a dedicated leather cleaner + conditioner. Never mix products.' },
      { n: '4', t: 'Spot-test in a hidden area', d: 'Apply the product under a seat or in the boot. Wait 10 minutes — check that the material colour does not change.' },
      { n: '5', t: 'Work in sections', d: 'Apply to sections no larger than 40×40 cm, brush gently with a soft brush in circular motions, immediately extract with a wet vacuum.' },
      { n: '6', t: 'Dry thoroughly', d: 'Leave doors open for 4–8 hours on a dry day. In cool weather use a blower or hand it to a pro — wet seats = mould.' },
    ],
    mistakesTitle: 'Most common cleaning mistakes',
    mistakes: [
      'Too much water — seat foam absorbs moisture and dries for weeks',
      'Regular laundry powder — leaves streaks and hard detergent spots',
      'Brushing leather — wears off the protective coating',
      'High temperature on leather — causes cracking and drying',
      'Sun drying right after cleaning — creates yellow discolouration',
      'Ammonia or bleach — permanently damages fabric fibres',
    ],
    proTitle: 'When to hand the car to professionals',
    proText: 'Deeply absorbed grease, cream, wine or pet-urine stains, and persistent smoke or mould smell — these are the cases where only hot-water extraction with professional chemistry works. MasterClean uses Santoemma and Kärcher Puzzi 10/1 machines, so upholstery dries in 2–4 hours and smell is neutralised at the source. We whiten seats, clean the rear bench, door panels, mats, headliner and boot — full interior cleaning from 350 PLN.',
    ctaTitle: 'Book professional car upholstery cleaning',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'How much does car upholstery cleaning cost?', a: 'Seats only — from 200 PLN. Full interior cleaning (seats, rear bench, headliner, mats, door panels, boot) — from 350 PLN. Price depends on the soiling level and upholstery type.' },
      { q: 'How long does upholstery dry after extraction?', a: 'Professional Santoemma extraction — 2–4 hours in summer, up to 8 hours in winter. Home foam or wet-vacuum cleaning — up to 24–72 hours.' },
      { q: 'Does cleaning remove cigarette smell from a car?', a: 'Partly — extraction removes nicotine trapped in fabrics. For full effect we combine cleaning with ozone treatment that neutralises odour molecules in the air and ventilation.' },
      { q: 'Can I clean car upholstery at home?', a: 'Yes, if stains are fresh and surface-level. Deeply embedded dirt, drink stains, pet urine or smoke smell require professional extraction cleaning.' },
      { q: 'How does cleaning fabric differ from leather?', a: 'Fabric — extraction method with enzymatic detergent. Leather — dedicated cleaner and conditioner; extraction damages the leather coating.' },
      { q: 'Will cleaning damage the seat foam?', a: 'Professional cleaning with instant extraction does not soak the foam. Home cleaning with too much water can cause mould inside the seats.' },
    ],
    seoTitle: 'Car upholstery cleaning — complete guide | MasterClean',
    seoDesc: 'How to clean car upholstery — techniques, chemistry, mistakes to avoid, and when to book professional hot-water extraction. Practical guide by MasterClean.',
    seoKw: 'car upholstery cleaning, how to clean car seats, car interior cleaning guide, car seat cleaning, hot water extraction car, professional car upholstery cleaning, leather car seat cleaning',
  },
  uk: {
    h1: 'Хімчистка оббивки автомобіля — техніки, безпека та екстракція',
    subtitle: 'Повний покроковий гайд: коли чистити самостійно, які засоби використовувати, яких помилок уникати та коли варто віддати авто на професійну екстракторну хімчистку.',
    chip: 'Гайд · Авто-детейлінг',
    introTitle: 'Навіщо чистити оббивку салону авто',
    intro: [
      'Оббивка автомобіля накопичує пил, шерсть, залишки їжі, піт і вологу. За рік експлуатації у водійському сидінні може зібратися до 200 г бруду, невидимого оку — але добре відчутного у вигляді характерного «старого» запаху салону.',
      'Звичайний пилосос прибирає лише верхній шар. Справжні забруднення — плями від кави, жиру, крему чи запах сигарет — застрягли глибоко в поролоні сидінь. Для їх видалення потрібні спеціальна хімія, тепла вода та професійна екстракція.',
    ],
    whenTitle: 'Коли чистити оббивку салону',
    whenItems: [
      'Перед продажем авто — чистий салон підвищує ціну на 1500–4000 zł',
      'Після пролитих напоїв, плям від їжі чи крему',
      'Коли з’являється неприємний запах (піт, дим, пліснява, сеча тварин)',
      'Після перевезення тварин — шерсть та алергени проникають глибоко в тканину',
      'Мінімум раз на рік для гігієни та подовження терміну служби оббивки',
    ],
    methodsTitle: 'Методи хімчистки оббивки — порівняння',
    methods: [
      {
        title: 'Піна для оббивки з магазину (DIY)',
        pros: 'Дешева (15–40 zł), доступна всюди, проста для дрібних плям.',
        cons: 'Не видаляє бруд з глибини поролону, може залишити розводи, при надмірному намоканні оббивка сохне 3–4 дні, ризик плісняви.',
      },
      {
        title: 'Домашній миючий пилосос',
        pros: 'Кращий за піну, вимиває частину бруду та витягує воду.',
        cons: 'Слабкий тиск і температура, ризик промокання поролону та іржі пружин, не видаляє стійкі плями та запахи.',
      },
      {
        title: 'Професійна екстракторна чистка (Santoemma / Kärcher Puzzi)',
        pros: 'Вода 60–70°C вимиває бруд з глибини, сила всмоктування 2500 мм H₂O витягує майже всю вологу. Оббивка сохне за 2–4 години, зникає запах, плями від кави та жиру.',
        cons: 'Потрібне професійне обладнання — реальний ефект лише при виїзді спеціаліста.',
      },
    ],
    stepsTitle: 'Як почистити оббивку авто крок за кроком',
    steps: [
      { n: '1', t: 'Дістаньте та пропилососьте', d: 'Зніміть килимки, пропилососьте сидіння, задній диван, обшивку дверей і бардачки. Використовуйте вузьку насадку для щілин.' },
      { n: '2', t: 'Відділіть плями', d: 'Зіскребіть засохлі залишки пластиковою лопаткою. Ніколи не використовуйте металеві інструменти — вони пошкоджують волокна.' },
      { n: '3', t: 'Оберіть засіб', d: 'Для текстилю — ензимний або кисневий очищувач. Для шкіри — лише спеціальний cleaner + кондиціонер. Ніколи не змішуйте засоби.' },
      { n: '4', t: 'Перевірте на непомітній ділянці', d: 'Нанесіть засіб під сидіння або в багажник. Зачекайте 10 хвилин — переконайтесь, що колір не змінюється.' },
      { n: '5', t: 'Чистіть секціями', d: 'Наносьте засіб на ділянку не більше 40×40 см, розтирайте м’якою щіткою коловими рухами, одразу витягуйте бруд миючим пилососом.' },
      { n: '6', t: 'Ретельно висушіть', d: 'Залиште авто з відкритими дверима на 4–8 годин у сухий день. У прохолодні дні використайте вентилятор або зверніться до професіоналів — мокрі сидіння = пліснява.' },
    ],
    mistakesTitle: 'Найпоширеніші помилки при чистці оббивки',
    mistakes: [
      'Забагато води — поролон вбирає вологу та сохне тижнями',
      'Використання звичайного прального порошку — залишає розводи та тверді плями',
      'Щітка для шкіряної оббивки — стирає захисне покриття',
      'Висока температура на шкірі — спричиняє тріщини та пересихання',
      'Сушіння на сонці одразу після чистки — викликає жовті плями',
      'Аміак або відбілювач — незворотно пошкоджує волокна',
    ],
    proTitle: 'Коли варто віддати авто професіоналам',
    proText: 'Глибоко в’їдені плями від жиру, крему, вина, сечі тварин і стійкий запах диму чи плісняви — саме ті випадки, коли лише екстракторна чистка з гарячою водою та професійною хімією дає результат. MasterClean працює машинами Santoemma та Kärcher Puzzi 10/1 — оббивка сохне за 2–4 години, а запах зникає біля джерела. Відбілюємо сидіння, чистимо задній диван, обшивку дверей, килимки, стелю та багажник — комплексна хімчистка від 350 zł.',
    ctaTitle: 'Замовити професійну хімчистку оббивки авто',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки коштує хімчистка оббивки авто?', a: 'Хімчистка лише сидінь — від 200 zł. Комплексна хімчистка салону (сидіння, диван, стеля, килимки, обшивка, багажник) — від 350 zł. Ціна залежить від ступеня забруднення та типу оббивки.' },
      { q: 'Скільки сохне оббивка після екстракторної чистки?', a: 'При професійній екстракції Santoemma — 2–4 години влітку, до 8 годин узимку. При домашній чистці піною чи миючим пилососом — до 24–72 годин.' },
      { q: 'Чи прибирає хімчистка запах сигарет з авто?', a: 'Частково — екстракція видаляє нікотин з тканин. Для повного ефекту поєднуємо чистку з озонуванням, що нейтралізує запах у повітрі та вентиляції.' },
      { q: 'Чи можна почистити оббивку авто вдома?', a: 'Можна, якщо плями свіжі та поверхневі. Для глибоко в’їденого бруду, плям від напоїв, сечі тварин чи запаху диму потрібна професійна екстракторна чистка.' },
      { q: 'Чим відрізняється чистка тканини від шкіри?', a: 'Тканина — екстракторний метод з ензимним детергентом. Шкіра — спеціальний cleaner і кондиціонер; екстракція пошкоджує покриття шкіри.' },
      { q: 'Чи не зіпсує чистка поролон сидінь?', a: 'Професійна чистка з миттєвою екстракцією не мочить поролон. Домашня чистка з надлишком води може призвести до плісняви всередині сидінь.' },
    ],
    seoTitle: 'Хімчистка оббивки авто — повний гайд | MasterClean',
    seoDesc: 'Як почистити оббивку салону авто — техніки, хімія, помилки та коли варто замовити професійну екстракторну хімчистку. Практичний гайд від MasterClean.',
    seoKw: 'хімчистка оббивки авто, як почистити сидіння авто, чистка салону авто, гайд з хімчистки салону, екстракторна чистка авто, хімія для чистки салону',
  },
};

const CarUpholsteryGuide = () => {
  const { language } = useLanguage();
  const lang = (language as Lang) || 'pl';
  const t = COPY[lang] || COPY.pl;
  const formRef = useRef<ContactFormRef>(null);

  useSeoSelfCheck('CarUpholsteryGuide');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t.h1,
      description: t.seoDesc,
      inLanguage: lang,
      author: { '@type': 'Organization', name: 'MasterClean' },
      publisher: { '@type': 'Organization', name: 'MasterClean' },
      mainEntityOfPage: 'https://masterclean1885.com/poradnik-prania-tapicerki-samochodowej',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: t.stepsTitle,
      step: t.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.t,
        text: s.d,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  const scrollToForm = () => {
    document.getElementById('contact-form-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        keywords={t.seoKw}
        canonical="/poradnik-prania-tapicerki-samochodowej"
        type="article"
        jsonLd={jsonLd}
      />

      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {t.chip}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{t.h1}</h1>
              <p className="text-lg text-foreground/85">{t.subtitle}</p>
              <button
                type="button"
                onClick={scrollToForm}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:opacity-95"
              >
                <Sparkles className="w-5 h-5" />
                {t.ctaTitle}
              </button>
            </div>
            <AnimatedImage
              src={heroImage}
              alt={t.h1}
              className="w-full h-auto rounded-2xl shadow-lg"
              width={1200}
              height={800}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.introTitle}</h2>
          {t.intro.map((p, i) => (
            <p key={i} className="text-foreground/85 mb-4 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.whenTitle}</h2>
          <ul className="space-y-3">
            {t.whenItems.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.methodsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.methods.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                <h3 className="font-semibold text-lg mb-3">{m.title}</h3>
                <p className="text-sm mb-2"><strong className="text-primary">+ </strong>{m.pros}</p>
                <p className="text-sm text-foreground/80"><strong className="text-destructive">− </strong>{m.cons}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.stepsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedImage
              src={stepImage}
              alt={t.stepsTitle}
              className="w-full h-auto rounded-2xl shadow"
              width={800}
              height={600}
            />
            <ol className="space-y-4">
              {t.steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-semibold">{s.t}</h3>
                    <p className="text-sm text-foreground/80">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            {t.mistakesTitle}
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {t.mistakes.map((m, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="text-destructive font-bold">×</span>
                <span className="text-foreground/90">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            {t.proTitle}
          </h2>
          <p className="text-foreground/85 leading-relaxed mb-6">{t.proText}</p>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow"
          >
            <Droplets className="w-5 h-5" />
            {t.ctaTitle}
          </button>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            {t.faqTitle}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {t.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/85">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact-form-anchor" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.ctaTitle}</h2>
          <ContactForm ref={formRef} />
        </div>
      </section>
    </Layout>
  );
};

export default CarUpholsteryGuide;
