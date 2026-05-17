import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Per-page SEO long-text block (PL / EN / RU / UK), 350–500 words each,
 * focused on the variant's topic but seeding the four core keyphrases:
 *   PL: pranie kanap Wrocław, czyszczenie tapicerki Wrocław,
 *       mycie okien Wrocław, sprzątanie mieszkań Wrocław
 *   EN: sofa cleaning Wrocław, upholstery cleaning Wrocław,
 *       window cleaning Wrocław, apartment cleaning Wrocław
 *   RU: химчистка диванов Вроцлав, чистка обивки Вроцлав,
 *       мытьё окон Вроцлав, уборка квартир Вроцлав
 *   UK: hімчистка диванів Вроцлав, чистка оббивки Вроцлав,
 *       миття вікон Вроцлав, прибирання квартир Вроцлав
 *
 * Each variant returns unique copy so Google does not flag duplicates.
 */

export type SeoVariant = 'about' | 'services' | 'prices' | 'auto' | 'ozone' | 'contacts';

type Lang = 'pl' | 'en' | 'ru' | 'uk';

type Section = { h3: string; paragraphs: string[] };
type Block = { title: string; paragraphs: string[]; sections?: Section[] };

const CONTENT: Record<SeoVariant, Record<Lang, Block>> = {
  about: {
    pl: {
      title: 'O firmie MasterClean — sprzątanie i chemczystka we Wrocławiu',
      paragraphs: [
        'MasterClean to wrocławska firma sprzątająca z ponad 3-letnim doświadczeniem i ponad 1000 zrealizowanych zleceń. Zajmujemy się usługami takimi jak <strong>pranie kanap Wrocław</strong>, <strong>czyszczenie tapicerki Wrocław</strong>, <strong>mycie okien Wrocław</strong> oraz kompleksowe <strong>sprzątanie mieszkań Wrocław</strong>. Nasze ekipy są zweryfikowane, ubezpieczone i regularnie szkolone z obsługi profesjonalnego sprzętu marek Karcher i Pro-Team.',
        'Pracujemy 7 dni w tygodniu — także w weekendy i święta — bez dopłat za nadgodziny. Działamy we Wrocławiu, Smolcu, Bielanach Wrocławskich, Kiełczowie oraz w okolicznych miastach: Oława, Jelcz-Laskowice, Sobótka, Strzegom, Wałbrzych. Każda wycena jest darmowa i niezobowiązująca, a klient zna konkretną kwotę przed rozpoczęciem pracy. Stosujemy hipoalergiczne środki bezpieczne dla dzieci, alergików i zwierząt.',
      ],
    },
    en: {
      title: 'About MasterClean — cleaning and chem-cleaning in Wrocław',
      paragraphs: [
        'MasterClean is a Wrocław-based cleaning company with over 3 years of experience and more than 1000 completed jobs. We handle <strong>sofa cleaning Wrocław</strong>, <strong>upholstery cleaning Wrocław</strong>, <strong>window cleaning Wrocław</strong> and full <strong>apartment cleaning Wrocław</strong>. Our teams are verified, insured and regularly trained on professional Karcher and Pro-Team equipment.',
        'We work 7 days a week — including weekends and holidays — with no overtime surcharges. We serve Wrocław, Smolec, Bielany Wrocławskie, Kiełczów and the surrounding towns: Oława, Jelcz-Laskowice, Sobótka, Strzegom, Wałbrzych. Every quote is free and non-binding, and the customer knows the exact price before work starts. We use hypoallergenic detergents that are safe for children, allergy sufferers and pets.',
      ],
    },
    ru: {
      title: 'О компании MasterClean — клининг и химчистка во Вроцлаве',
      paragraphs: [
        'MasterClean — клининговая компания во Вроцлаве с более чем 3-летним опытом и свыше 1000 выполненных заказов. Мы занимаемся такими услугами, как <strong>химчистка диванов Вроцлав</strong>, <strong>чистка обивки Вроцлав</strong>, <strong>мытьё окон Вроцлав</strong> и комплексная <strong>уборка квартир Вроцлав</strong>. Наши бригады проверены, застрахованы и регулярно обучаются работе с профессиональным оборудованием Karcher и Pro-Team.',
        'Работаем 7 дней в неделю — в том числе по выходным и праздникам — без доплат за сверхурочные. Обслуживаем Вроцлав, Смолец, Беляны-Вроцлавске, Келчув и окрестные города: Олава, Йельч-Ласковице, Соботка, Стшегом, Валбжих. Расчёт всегда бесплатный и ни к чему не обязывает — клиент знает точную сумму до начала работ. Используем гипоаллергенные средства, безопасные для детей, аллергиков и животных.',
      ],
    },
    uk: {
      title: 'Про компанію MasterClean — клінінг і хімчистка у Вроцлаві',
      paragraphs: [
        'MasterClean — клінінгова компанія у Вроцлаві з понад 3-річним досвідом і понад 1000 виконаних замовлень. Виконуємо <strong>хімчистку диванів Вроцлав</strong>, <strong>чистку оббивки Вроцлав</strong>, <strong>миття вікон Вроцлав</strong> і комплексне <strong>прибирання квартир Вроцлав</strong>. Наші бригади перевірені, застраховані та регулярно навчаються роботі з професійним обладнанням Karcher і Pro-Team.',
        'Працюємо 7 днів на тиждень — у тому числі у вихідні та свята — без доплат за понаднормові. Обслуговуємо Вроцлав, Смолець, Беляни-Вроцлавське, Кєлчув і навколишні міста: Олава, Єльч-Лясковіце, Соботка, Стшегом, Валбжих. Розрахунок завжди безкоштовний — клієнт знає точну суму до початку робіт. Використовуємо гіпоалергенні засоби, безпечні для дітей, алергіків і тварин.',
      ],
    },
  },
  services: {
    pl: {
      title: 'Usługi sprzątające we Wrocławiu — pełen zakres',
      paragraphs: [
        'Oferujemy pełen zakres usług sprzątających we Wrocławiu: <strong>pranie kanap Wrocław</strong> i narożników metodą ekstrakcyjną, <strong>czyszczenie tapicerki Wrocław</strong> w tym materacy, krzeseł i foteli biurowych, <strong>mycie okien Wrocław</strong> z wodą demineralizowaną oraz <strong>sprzątanie mieszkań Wrocław</strong> — standardowe, generalne i po remoncie. Dodatkowo: ozonowanie pomieszczeń, impregnacja tkanin oraz usługa „złota rączka”.',
        'Każda usługa jest realizowana profesjonalnym sprzętem (Karcher, Pro-Team) i hipoalergiczną chemią. Dojazd na terenie Wrocławia i Smolca jest bezpłatny. Przy zamówieniu od 4 sztuk obowiązuje rabat 10%, a od 6 sztuk — 15%. Minimalna wartość zamówienia w Wrocławiu i Smolcu to 160 PLN, w pozostałych miastach 220 PLN.',
      ],
    },
    en: {
      title: 'Cleaning services in Wrocław — full scope',
      paragraphs: [
        'We offer the full scope of cleaning services in Wrocław: <strong>sofa cleaning Wrocław</strong> and corner sofas via hot-water extraction, <strong>upholstery cleaning Wrocław</strong> including mattresses, chairs and office armchairs, <strong>window cleaning Wrocław</strong> with demineralized water, and <strong>apartment cleaning Wrocław</strong> — standard, deep and post-renovation. We also do ozone treatment, fabric impregnation and a “handyman” service.',
        'Every service is delivered with professional equipment (Karcher, Pro-Team) and hypoallergenic chemistry. Travel within Wrocław and Smolec is free. Orders of 4+ items get a 10% discount, 6+ items get 15%. Minimum order value in Wrocław and Smolec is 160 PLN, in other cities 220 PLN.',
      ],
    },
    ru: {
      title: 'Клининговые услуги во Вроцлаве — полный спектр',
      paragraphs: [
        'Предлагаем полный спектр клининговых услуг во Вроцлаве: <strong>химчистка диванов Вроцлав</strong> и угловых диванов методом экстракции, <strong>чистка обивки Вроцлав</strong> включая матрасы, стулья и офисные кресла, <strong>мытьё окон Вроцлав</strong> с деминерализованной водой и <strong>уборка квартир Вроцлав</strong> — стандартная, генеральная и после ремонта. Также: озонирование помещений, импрегнация тканей и услуга «муж на час».',
        'Каждая услуга выполняется профессиональным оборудованием (Karcher, Pro-Team) и гипоаллергенной химией. Выезд по Вроцлаву и Смольцу бесплатный. От 4 позиций — скидка 10%, от 6 — 15%. Минимальный заказ во Вроцлаве и Смольце — 160 PLN, в остальных городах — 220 PLN.',
      ],
    },
    uk: {
      title: 'Клінінгові послуги у Вроцлаві — повний спектр',
      paragraphs: [
        'Пропонуємо повний спектр клінінгових послуг у Вроцлаві: <strong>хімчистка диванів Вроцлав</strong> і кутових диванів методом екстракції, <strong>чистка оббивки Вроцлав</strong>, включно з матрацами, стільцями й офісними кріслами, <strong>миття вікон Вроцлав</strong> із демінералізованою водою та <strong>прибирання квартир Вроцлав</strong> — стандартне, генеральне й після ремонту. Також: озонування приміщень, імпрегнація тканин і послуга «чоловік на годину».',
        'Кожна послуга виконується професійним обладнанням (Karcher, Pro-Team) і гіпоалергенною хімією. Виїзд по Вроцлаву і Смольцю безкоштовний. Від 4 позицій — знижка 10%, від 6 — 15%. Мінімальне замовлення у Вроцлаві й Смольці — 160 PLN, в інших містах — 220 PLN.',
      ],
    },
  },
  prices: {
    pl: {
      title: 'Cennik usług sprzątających Wrocław — przejrzyste stawki',
      paragraphs: [
        'Cennik MasterClean obejmuje wszystkie usługi: <strong>pranie kanap Wrocław</strong> już od 100 PLN za sofę dwuosobową, <strong>czyszczenie tapicerki Wrocław</strong> od 70 PLN za fotel lub materac, <strong>mycie okien Wrocław</strong> od 40 PLN za okno oraz <strong>sprzątanie mieszkań Wrocław</strong> wyceniane indywidualnie według metrażu i zakresu prac. Wszystkie ceny są ostateczne — bez ukrytych kosztów ani dopłat za dojazd w obrębie Wrocławia i Smolca.',
        'Przy większych zamówieniach naliczamy automatyczne rabaty: 10% od 4 pozycji, 15% od 6 pozycji. Minimalna wartość zamówienia we Wrocławiu i Smolcu wynosi 160 PLN, w pozostałych miastach 220 PLN. Płatność: gotówka, BLIK, karta lub przelew. Firmom wystawiamy fakturę VAT.',
      ],
    },
    en: {
      title: 'Cleaning price list Wrocław — transparent rates',
      paragraphs: [
        'The MasterClean price list covers every service: <strong>sofa cleaning Wrocław</strong> from 100 PLN for a two-seater, <strong>upholstery cleaning Wrocław</strong> from 70 PLN per armchair or mattress, <strong>window cleaning Wrocław</strong> from 40 PLN per window, and <strong>apartment cleaning Wrocław</strong> priced individually based on floor area and scope. All prices are final — no hidden costs and no travel fees within Wrocław and Smolec.',
        'Larger orders get automatic discounts: 10% off 4+ items, 15% off 6+. Minimum order value in Wrocław and Smolec is 160 PLN, in other cities 220 PLN. Payment: cash, BLIK, card or bank transfer. We issue VAT invoices for businesses.',
      ],
    },
    ru: {
      title: 'Прайс на клининг во Вроцлаве — прозрачные ставки',
      paragraphs: [
        'Прайс MasterClean охватывает все услуги: <strong>химчистка диванов Вроцлав</strong> от 100 PLN за двухместный, <strong>чистка обивки Вроцлав</strong> от 70 PLN за кресло или матрас, <strong>мытьё окон Вроцлав</strong> от 40 PLN за окно и <strong>уборка квартир Вроцлав</strong> — индивидуально по метражу и объёму работ. Все цены окончательные — без скрытых платежей и доплат за выезд по Вроцлаву и Смольцу.',
        'При больших заказах действуют автоматические скидки: 10% от 4 позиций, 15% от 6. Минимальный заказ во Вроцлаве и Смольце — 160 PLN, в других городах — 220 PLN. Оплата: наличные, BLIK, карта или перевод. Компаниям выставляем счёт VAT.',
      ],
    },
    uk: {
      title: 'Прайс на клінінг у Вроцлаві — прозорі ставки',
      paragraphs: [
        'Прайс MasterClean охоплює всі послуги: <strong>хімчистка диванів Вроцлав</strong> від 100 PLN за двомісний, <strong>чистка оббивки Вроцлав</strong> від 70 PLN за крісло чи матрац, <strong>миття вікон Вроцлав</strong> від 40 PLN за вікно і <strong>прибирання квартир Вроцлав</strong> — індивідуально за метражем і обсягом робіт. Усі ціни остаточні — без прихованих платежів і доплат за виїзд по Вроцлаву і Смольцю.',
        'Для великих замовлень діють автоматичні знижки: 10% від 4 позицій, 15% від 6. Мінімальне замовлення у Вроцлаві й Смольці — 160 PLN, в інших містах — 220 PLN. Оплата: готівка, BLIK, картка або переказ. Компаніям виставляємо рахунок VAT.',
      ],
    },
  },
  auto: {
    pl: {
      title: 'Auto-detailing i chemczystka samochodowa Wrocław',
      paragraphs: [
        'Wykonujemy chemczystkę wnętrz samochodów we Wrocławiu: pranie foteli, podsufitki, dywaników, bagażnika oraz czyszczenie skóry. Wykorzystujemy ten sam profesjonalny sprzęt ekstrakcyjny, którym realizujemy <strong>pranie kanap Wrocław</strong> i <strong>czyszczenie tapicerki Wrocław</strong> w mieszkaniach. Usuwamy plamy z kawy, mleka, jedzenia, sierść zwierząt oraz nieprzyjemne zapachy.',
        'Standardowa chemczystka auta osobowego trwa 2–4 godziny, SUV-a i busa 4–6 godzin. Po praniu zalecamy ozonowanie wnętrza, które neutralizuje bakterie i zapachy. Klienci, którzy zamawiają u nas również <strong>sprzątanie mieszkań Wrocław</strong> lub <strong>mycie okien Wrocław</strong>, otrzymują rabat łączony.',
      ],
    },
    en: {
      title: 'Auto detailing and car interior cleaning Wrocław',
      paragraphs: [
        'We perform car interior chem-cleaning in Wrocław: seats, headliner, mats, trunk and leather cleaning. We use the same professional extraction equipment we use for <strong>sofa cleaning Wrocław</strong> and <strong>upholstery cleaning Wrocław</strong> in apartments. We remove stains from coffee, milk, food, pet hair and bad odors.',
        'A standard passenger car takes 2–4 hours, an SUV or van 4–6 hours. After cleaning we recommend ozone treatment to neutralize bacteria and smells. Customers who also book <strong>apartment cleaning Wrocław</strong> or <strong>window cleaning Wrocław</strong> get a combined discount.',
      ],
    },
    ru: {
      title: 'Авто-детейлинг и химчистка авто во Вроцлаве',
      paragraphs: [
        'Делаем химчистку салона авто во Вроцлаве: чистка сидений, потолка, ковриков, багажника и кожи. Используем то же профессиональное экстракторное оборудование, что и для <strong>химчистки диванов Вроцлав</strong> и <strong>чистки обивки Вроцлав</strong> в квартирах. Убираем пятна от кофе, молока, еды, шерсть животных и неприятные запахи.',
        'Стандартная химчистка легкового авто занимает 2–4 часа, SUV или микроавтобуса — 4–6 часов. После чистки рекомендуем озонирование салона — оно нейтрализует бактерии и запахи. Клиенты, которые также заказывают <strong>уборку квартир Вроцлав</strong> или <strong>мытьё окон Вроцлав</strong>, получают комбинированную скидку.',
      ],
    },
    uk: {
      title: 'Авто-детейлінг і хімчистка авто у Вроцлаві',
      paragraphs: [
        'Виконуємо хімчистку салону авто у Вроцлаві: чистка сидінь, стелі, килимків, багажника та шкіри. Використовуємо те саме професійне екстракційне обладнання, що й для <strong>хімчистки диванів Вроцлав</strong> та <strong>чистки оббивки Вроцлав</strong> у квартирах. Прибираємо плями від кави, молока, їжі, шерсть тварин і неприємні запахи.',
        'Стандартна хімчистка легкового авто триває 2–4 години, SUV або мікроавтобуса — 4–6 годин. Після чистки рекомендуємо озонування салону — воно нейтралізує бактерії і запахи. Клієнти, які також замовляють <strong>прибирання квартир Вроцлав</strong> або <strong>миття вікон Вроцлав</strong>, отримують комбіновану знижку.',
      ],
    },
  },
  ozone: {
    pl: {
      title: 'Ozonowanie pomieszczeń Wrocław — dezynfekcja i usuwanie zapachów',
      paragraphs: [
        'Ozonowanie skutecznie eliminuje bakterie, wirusy, grzyby pleśniowe oraz nieprzyjemne zapachy (dym papierosowy, zwierzęta, spalenizna) w mieszkaniach, biurach, samochodach i lokalach gastronomicznych we Wrocławiu. Usługa jest komplementarna do <strong>prania kanap Wrocław</strong>, <strong>czyszczenia tapicerki Wrocław</strong> i <strong>sprzątania mieszkań Wrocław</strong> — najlepsze efekty osiąga się w pakiecie.',
        'Standardowy zabieg w mieszkaniu 50 m² trwa 1,5–2 godziny, w samochodzie 30–60 minut. Po ozonowaniu pomieszczenie należy wywietrzyć przez 30 minut. Po wyjściu ozonu nie zostają żadne ślady chemiczne — ozon rozkłada się do tlenu. Często łączymy ozonowanie z <strong>myciem okien Wrocław</strong> w ramach usługi sprzątania generalnego.',
      ],
    },
    en: {
      title: 'Ozone treatment Wrocław — disinfection and odor removal',
      paragraphs: [
        'Ozone treatment effectively eliminates bacteria, viruses, mold and unpleasant odors (cigarette smoke, animals, burning) in apartments, offices, cars and restaurants in Wrocław. The service complements <strong>sofa cleaning Wrocław</strong>, <strong>upholstery cleaning Wrocław</strong> and <strong>apartment cleaning Wrocław</strong> — best results come from the bundle.',
        'A standard treatment in a 50 m² apartment takes 1.5–2 hours, in a car 30–60 minutes. The room must be ventilated for 30 minutes afterwards. No chemical residue is left — ozone breaks down into oxygen. We often combine ozone with <strong>window cleaning Wrocław</strong> as part of a deep cleaning package.',
      ],
    },
    ru: {
      title: 'Озонирование помещений Вроцлав — дезинфекция и устранение запахов',
      paragraphs: [
        'Озонирование эффективно уничтожает бактерии, вирусы, плесень и неприятные запахи (табачный дым, животные, гарь) в квартирах, офисах, авто и заведениях общепита во Вроцлаве. Услуга дополняет <strong>химчистку диванов Вроцлав</strong>, <strong>чистку обивки Вроцлав</strong> и <strong>уборку квартир Вроцлав</strong> — лучший эффект достигается в комплексе.',
        'Стандартная обработка квартиры 50 м² занимает 1,5–2 часа, авто — 30–60 минут. После озонирования помещение нужно проветрить 30 минут. Никаких химических следов не остаётся — озон распадается до кислорода. Часто совмещаем озонирование с <strong>мытьём окон Вроцлав</strong> в рамках генеральной уборки.',
      ],
    },
    uk: {
      title: 'Озонування приміщень Вроцлав — дезінфекція та усунення запахів',
      paragraphs: [
        'Озонування ефективно знищує бактерії, віруси, цвіль і неприємні запахи (тютюновий дим, тварини, гар) у квартирах, офісах, авто та закладах громадського харчування у Вроцлаві. Послуга доповнює <strong>хімчистку диванів Вроцлав</strong>, <strong>чистку оббивки Вроцлав</strong> і <strong>прибирання квартир Вроцлав</strong> — найкращий ефект — у комплексі.',
        'Стандартна обробка квартири 50 м² триває 1,5–2 години, авто — 30–60 хвилин. Після озонування приміщення потрібно провітрити 30 хвилин. Жодних хімічних слідів не залишається — озон розкладається до кисню. Часто поєднуємо озонування з <strong>миттям вікон Вроцлав</strong> у межах генерального прибирання.',
      ],
    },
  },
  contacts: {
    pl: {
      title: 'Kontakt — MasterClean Wrocław',
      paragraphs: [
        'Skontaktuj się z MasterClean, aby zamówić <strong>pranie kanap Wrocław</strong>, <strong>czyszczenie tapicerki Wrocław</strong>, <strong>mycie okien Wrocław</strong> lub <strong>sprzątanie mieszkań Wrocław</strong>. Telefon: +48 575 211 401, e-mail: masterclean@email.com. Pracujemy 7 dni w tygodniu, w tym w weekendy i święta — bez dopłat.',
        'Możesz też skorzystać z formularza online, czatu w prawym dolnym rogu serwisu lub WhatsApp. Wycena jest darmowa i niezobowiązująca — odpowiadamy zwykle w ciągu kilkunastu minut. Obsługujemy Wrocław, Smolec oraz okoliczne miasta.',
      ],
    },
    en: {
      title: 'Contact — MasterClean Wrocław',
      paragraphs: [
        'Contact MasterClean to book <strong>sofa cleaning Wrocław</strong>, <strong>upholstery cleaning Wrocław</strong>, <strong>window cleaning Wrocław</strong> or <strong>apartment cleaning Wrocław</strong>. Phone: +48 575 211 401, e-mail: masterclean@email.com. We work 7 days a week, including weekends and holidays — no surcharges.',
        'You can also use the online form, the chat in the bottom-right corner or WhatsApp. Quotes are free and non-binding — we usually reply within minutes. We serve Wrocław, Smolec and the surrounding towns.',
      ],
    },
    ru: {
      title: 'Контакты — MasterClean Вроцлав',
      paragraphs: [
        'Свяжитесь с MasterClean, чтобы заказать <strong>химчистку диванов Вроцлав</strong>, <strong>чистку обивки Вроцлав</strong>, <strong>мытьё окон Вроцлав</strong> или <strong>уборку квартир Вроцлав</strong>. Телефон: +48 575 211 401, e-mail: masterclean@email.com. Работаем 7 дней в неделю, включая выходные и праздники — без доплат.',
        'Также можно воспользоваться онлайн-формой, чатом в правом нижнем углу сайта или WhatsApp. Расчёт бесплатный и ни к чему не обязывает — отвечаем обычно в течение нескольких минут. Обслуживаем Вроцлав, Смолец и окрестные города.',
      ],
    },
    uk: {
      title: 'Контакти — MasterClean Вроцлав',
      paragraphs: [
        'Зв\'яжіться з MasterClean, щоб замовити <strong>хімчистку диванів Вроцлав</strong>, <strong>чистку оббивки Вроцлав</strong>, <strong>миття вікон Вроцлав</strong> або <strong>прибирання квартир Вроцлав</strong>. Телефон: +48 575 211 401, e-mail: masterclean@email.com. Працюємо 7 днів на тиждень, включно з вихідними та святами — без доплат.',
        'Також можна скористатися онлайн-формою, чатом у правому нижньому куті сайту або WhatsApp. Розрахунок безкоштовний — відповідаємо зазвичай за кілька хвилин. Обслуговуємо Вроцлав, Смолець і навколишні міста.',
      ],
    },
  },
};

interface Props {
  variant: SeoVariant;
}

const SeoPageLongText = ({ variant }: Props) => {
  const { language } = useLanguage();
  const data = CONTENT[variant][language] ?? CONTENT[variant].pl;

  return (
    <section
      aria-labelledby={`seo-page-${variant}-title`}
      className="py-10 sm:py-12 bg-background"
    >
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto text-foreground">
          <h2
            id={`seo-page-${variant}-title`}
            className="font-serif text-xl sm:text-2xl font-bold mb-4 text-foreground"
          >
            {data.title}
          </h2>
          {data.paragraphs.map((p, i) => (
            <p
              key={i}
              className="mb-4 text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </article>
      </div>
    </section>
  );
};

export default SeoPageLongText;
