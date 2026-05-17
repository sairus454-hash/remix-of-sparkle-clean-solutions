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
        'Skontaktuj się z MasterClean, aby zamówić <strong>pranie kanap Wrocław</strong>, <strong>czyszczenie tapicerki Wrocław</strong>, <strong>mycie okien Wrocław</strong> lub <strong>sprzątanie mieszkań Wrocław</strong>. Telefon: <a href="tel:+48575211401">+48 575 211 401</a>, e-mail: <a href="mailto:sairus454@gmail.com">sairus454@gmail.com</a>. Pracujemy 7 dni w tygodniu, w tym w weekendy i święta — bez dopłat. Adres siedziby: ul. Trawowa 14, 54-614 Wrocław (dolnośląskie), NIP 8943280388, REGON 544066160.',
        'Możesz też skorzystać z formularza online na tej stronie, czatu w prawym dolnym rogu serwisu lub WhatsApp. Wycena jest darmowa i niezobowiązująca — odpowiadamy zwykle w ciągu kilkunastu minut. Obsługujemy Wrocław, Smolec, Bielany Wrocławskie, Kiełczów oraz okoliczne miasta: Oława, Jelcz-Laskowice, Sobótka, Strzegom, Wałbrzych, Opole, Legnica, Lubin, Brzeg, Kłodzko, Dzierżoniów, Świdnica i Jelenia Góra.',
      ],
      sections: [
        {
          h3: 'Jak szybko się kontaktujemy',
          paragraphs: [
            'Na zgłoszenia z formularza i WhatsApp odpowiadamy zwykle w ciągu 5–15 minut w godzinach 8:00–22:00. W nocy i wcześnie rano (22:00–8:00) najszybszą drogą jest telefon — odbieramy 24/7, ponieważ wiele zleceń (np. <strong>czyszczenie tapicerki Wrocław</strong> po imprezie albo ozonowanie auta) wymaga natychmiastowej reakcji.',
            'Termin realizacji ustalamy podczas pierwszej rozmowy. Standardowo jesteśmy u klienta tego samego lub następnego dnia roboczego, a dla stałych klientów rezerwujemy preferowane okna czasowe.',
          ],
        },
        {
          h3: 'Sposoby płatności i dokumenty',
          paragraphs: [
            'Akceptujemy gotówkę, BLIK, przelew na konto firmowe oraz płatność kartą u technika. Dla firm wystawiamy fakturę VAT z 7- lub 14-dniowym terminem płatności. Po każdej usłudze klient otrzymuje paragon lub fakturę oraz krótki raport z wykonanych prac.',
            'Dla wspólnot, biur i restauracji oferujemy stałą obsługę z miesięcznym rozliczeniem zbiorczym, co ułatwia księgowość i pozwala obniżyć koszt jednostkowy każdej wizyty.',
          ],
        },
        {
          h3: 'Obszar działania i dojazd',
          paragraphs: [
            'Baza techniczna znajduje się we Wrocławiu (ul. Trawowa 14, 54-614). Dojazd na terenie Wrocławia i Smolca jest bezpłatny. W innych miastach doliczamy niewielką opłatę paliwową lub łączymy zlecenia, aby koszt dojazdu rozłożyć między klientów — wystarczy zapytać przy ustalaniu terminu.',
            'Jeśli Twojego miasta nie ma na liście, i tak zadzwoń — bardzo często udaje się dojechać w ramach tras serwisowych po Dolnym Śląsku i Wielkopolsce.',
          ],
        },
        {
          h3: 'Reklamacje i gwarancja jakości',
          paragraphs: [
            'Jeśli efekt pracy nie spełnia Twoich oczekiwań, w ciągu 48 godzin od zakończenia usługi wracamy i poprawiamy nieodpłatnie. Reklamacje przyjmujemy telefonicznie, mailowo lub przez formularz kontaktowy — staramy się rozpatrzyć je tego samego dnia.',
          ],
        },
      ],
    },
    en: {
      title: 'Contact — MasterClean Wrocław',
      paragraphs: [
        'Contact MasterClean to book <strong>sofa cleaning Wrocław</strong>, <strong>upholstery cleaning Wrocław</strong>, <strong>window cleaning Wrocław</strong> or <strong>apartment cleaning Wrocław</strong>. Phone: <a href="tel:+48575211401">+48 575 211 401</a>, e-mail: <a href="mailto:sairus454@gmail.com">sairus454@gmail.com</a>. We work 7 days a week, including weekends and public holidays — no surcharges. Registered office: ul. Trawowa 14, 54-614 Wrocław (dolnośląskie region), Polish tax ID (NIP) 8943280388, REGON 544066160.',
        'You can also use the online form on this page, the chat widget in the bottom-right corner or WhatsApp. Quotes are free and non-binding — we usually reply within a few minutes. We serve Wrocław, Smolec, Bielany Wrocławskie, Kiełczów and the surrounding cities: Oława, Jelcz-Laskowice, Sobótka, Strzegom, Wałbrzych, Opole, Legnica, Lubin, Brzeg, Kłodzko, Dzierżoniów, Świdnica and Jelenia Góra.',
      ],
      sections: [
        {
          h3: 'How fast we respond',
          paragraphs: [
            'Form and WhatsApp messages are answered within 5–15 minutes between 8:00 and 22:00. At night the fastest channel is a phone call — we pick up 24/7 because many jobs (e.g. <strong>upholstery cleaning Wrocław</strong> after a party or urgent car ozone treatment) cannot wait until morning.',
            'The exact appointment time is agreed during the first call. By default we visit the same day or the next working day; regular clients can reserve fixed time slots.',
          ],
        },
        {
          h3: 'Payments and invoicing',
          paragraphs: [
            'We accept cash, BLIK, bank transfer and card payments at the technician. Companies receive a VAT invoice with a 7- or 14-day payment term. Every job ends with a receipt or invoice and a short report of the work performed.',
            'For housing communities, offices and restaurants we offer monthly contracts with a single consolidated invoice, which simplifies accounting and lowers the per-visit price.',
          ],
        },
        {
          h3: 'Service area and travel costs',
          paragraphs: [
            'Our equipment base is in Wrocław (ul. Trawowa 14, 54-614). Travel within Wrocław and Smolec is free. In other cities we add a small fuel fee or combine several jobs to share the trip cost — just ask when booking.',
            'If your city is not listed, please call anyway — we very often manage to fit you into our service routes across Lower Silesia and Greater Poland.',
          ],
        },
        {
          h3: 'Complaints and quality guarantee',
          paragraphs: [
            'If the result does not meet your expectations, within 48 hours from the end of the service we return and re-do the affected area free of charge. Complaints can be submitted by phone, e-mail or contact form — we try to handle them the same day.',
          ],
        },
      ],
    },
    ru: {
      title: 'Контакты — MasterClean Вроцлав',
      paragraphs: [
        'Свяжитесь с MasterClean, чтобы заказать <strong>химчистку диванов Вроцлав</strong>, <strong>чистку обивки Вроцлав</strong>, <strong>мытьё окон Вроцлав</strong> или <strong>уборку квартир Вроцлав</strong>. Телефон: <a href="tel:+48575211401">+48 575 211 401</a>, e-mail: <a href="mailto:sairus454@gmail.com">sairus454@gmail.com</a>. Работаем 7 дней в неделю, включая выходные и праздники — без доплат. Юридический адрес: ul. Trawowa 14, 54-614 Wrocław (Нижнесилезское воеводство), NIP 8943280388, REGON 544066160.',
        'Также можно воспользоваться онлайн-формой на этой странице, чатом в правом нижнем углу сайта или WhatsApp. Расчёт бесплатный и ни к чему не обязывает — отвечаем обычно в течение нескольких минут. Обслуживаем Вроцлав, Смолец, Беляны Вроцлавске, Кельчув и соседние города: Олава, Йельч-Лясковице, Соботка, Стшегом, Валбжих, Ополе, Легница, Любин, Бжег, Клодзко, Дзержонюв, Свидница, Еленя-Гура.',
      ],
      sections: [
        {
          h3: 'Как быстро мы отвечаем',
          paragraphs: [
            'На сообщения из формы и WhatsApp отвечаем за 5–15 минут с 8:00 до 22:00. Ночью и рано утром (22:00–8:00) быстрее всего позвонить — телефон доступен 24/7, потому что многие заказы (например, <strong>чистка обивки Вроцлав</strong> после вечеринки или срочное озонирование авто) не могут ждать до утра.',
            'Точное время визита согласуем при первом разговоре. Обычно приезжаем в тот же или на следующий рабочий день, а постоянным клиентам резервируем удобные окна.',
          ],
        },
        {
          h3: 'Способы оплаты и документы',
          paragraphs: [
            'Принимаем наличные, BLIK, перевод на счёт фирмы и оплату картой у мастера. Юридическим лицам выставляем VAT-фактуру с отсрочкой 7 или 14 дней. После каждой услуги клиент получает чек или фактуру и краткий отчёт о выполненных работах.',
            'Для жилых сообществ, офисов и ресторанов предлагаем постоянное обслуживание с единым ежемесячным счётом — это упрощает бухгалтерию и снижает стоимость каждого визита.',
          ],
        },
        {
          h3: 'География и стоимость выезда',
          paragraphs: [
            'База находится во Вроцлаве (ul. Trawowa 14, 54-614). Выезд в пределах Вроцлава и Смолца бесплатный. В другие города добавляем небольшую плату за топливо или объединяем несколько заказов в один маршрут, чтобы разделить стоимость дороги — уточняйте при бронировании.',
            'Если вашего города нет в списке — всё равно позвоните: чаще всего удаётся подстроиться под текущие маршруты по Нижней Силезии и Великопольскому воеводству.',
          ],
        },
        {
          h3: 'Гарантия качества и рекламации',
          paragraphs: [
            'Если результат вас не устраивает, в течение 48 часов после окончания услуги бесплатно возвращаемся и переделываем проблемный участок. Рекламации принимаем по телефону, e-mail или через форму — стараемся решить вопрос в тот же день.',
          ],
        },
      ],
    },
    uk: {
      title: 'Контакти — MasterClean Вроцлав',
      paragraphs: [
        'Зв\'яжіться з MasterClean, щоб замовити <strong>хімчистку диванів Вроцлав</strong>, <strong>чистку оббивки Вроцлав</strong>, <strong>миття вікон Вроцлав</strong> або <strong>прибирання квартир Вроцлав</strong>. Телефон: <a href="tel:+48575211401">+48 575 211 401</a>, e-mail: <a href="mailto:sairus454@gmail.com">sairus454@gmail.com</a>. Працюємо 7 днів на тиждень, включно з вихідними та святами — без доплат. Юридична адреса: ul. Trawowa 14, 54-614 Wrocław (Нижньосілезьке воєводство), NIP 8943280388, REGON 544066160.',
        'Також можна скористатися онлайн-формою на цій сторінці, чатом у правому нижньому куті сайту або WhatsApp. Розрахунок безкоштовний і ні до чого не зобов\'язує — відповідаємо зазвичай за кілька хвилин. Обслуговуємо Вроцлав, Смолець, Беляни Вроцлавське, Кельчув та сусідні міста: Олава, Йельч-Лясковіце, Соботка, Стшегом, Валбжих, Ополе, Легниця, Любін, Бжег, Клодзко, Дзержонюв, Свідниця, Єленя-Ґура.',
      ],
      sections: [
        {
          h3: 'Як швидко ми відповідаємо',
          paragraphs: [
            'На повідомлення з форми та WhatsApp відповідаємо за 5–15 хвилин з 8:00 до 22:00. Уночі та рано вранці (22:00–8:00) швидше зателефонувати — телефон доступний 24/7, бо багато замовлень (наприклад, <strong>чистка оббивки Вроцлав</strong> після вечірки чи термінове озонування авто) не можуть чекати до ранку.',
            'Точний час візиту узгоджуємо під час першої розмови. Зазвичай приїжджаємо того ж або наступного робочого дня, а постійним клієнтам резервуємо зручні вікна.',
          ],
        },
        {
          h3: 'Способи оплати та документи',
          paragraphs: [
            'Приймаємо готівку, BLIK, переказ на рахунок фірми та оплату карткою у майстра. Юридичним особам виставляємо VAT-фактуру з відстрочкою 7 або 14 днів. Після кожної послуги клієнт отримує чек або фактуру та короткий звіт про виконані роботи.',
            'Для житлових спільнот, офісів і ресторанів пропонуємо постійне обслуговування з єдиним щомісячним рахунком — це спрощує бухгалтерію та знижує вартість кожного візиту.',
          ],
        },
        {
          h3: 'Географія та вартість виїзду',
          paragraphs: [
            'База знаходиться у Вроцлаві (ul. Trawowa 14, 54-614). Виїзд у межах Вроцлава та Смольця безкоштовний. В інші міста додаємо невелику плату за пальне або об\'єднуємо кілька замовлень в один маршрут, щоб поділити вартість дороги — уточнюйте під час бронювання.',
            'Якщо вашого міста немає у списку — все одно зателефонуйте: найчастіше вдається підлаштуватися під поточні маршрути Нижньою Сілезією та Великопольським воєводством.',
          ],
        },
        {
          h3: 'Гарантія якості та рекламації',
          paragraphs: [
            'Якщо результат вас не влаштовує, протягом 48 годин після закінчення послуги безкоштовно повертаємось і переробляємо проблемну ділянку. Рекламації приймаємо телефоном, e-mail або через форму — намагаємось вирішити питання того ж дня.',
          ],
        },
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
          {data.sections?.map((section, si) => (
            <div key={`s-${si}`} className="mt-6">
              <h3 className="font-serif text-lg sm:text-xl font-semibold mb-3 text-foreground">
                {section.h3}
              </h3>
              {section.paragraphs.map((p, pi) => (
                <p
                  key={`s-${si}-p-${pi}`}
                  className="mb-4 text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};

export default SeoPageLongText;
