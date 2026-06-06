// Centralised localised SEO metadata + FAQs for the main marketing pages.
// Each page reads `SEO_META[page][language]` for <title>/<description>/keywords
// and `FAQS[page][language]` for both the FAQPage JSON-LD entry and the
// rendered FAQ accordion at the bottom of the page.

export type PageKey = 'services' | 'auto' | 'ozone' | 'prices' | 'contacts';
export type Lang = 'pl' | 'ru' | 'uk' | 'en';

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
}

export interface Faq {
  q: string;
  a: string;
}

export const FAQ_TITLE: Record<Lang, string> = {
  pl: 'Najczęściej zadawane pytania',
  ru: 'Часто задаваемые вопросы',
  uk: 'Часті запитання',
  en: 'Frequently Asked Questions',
};

export const SEO_META: Record<PageKey, Record<Lang, SeoMeta>> = {
  services: {
    pl: {
      title: 'Pranie tapicerki i mebli | MasterClean',
      description: 'Pranie kanapy, narożnika, materaca i fotela u klienta. Ekstrakcja, eko chemia, gwarancja 7 dni. Dolny Śląsk i inne regiony Polski.',
      keywords: 'pranie tapicerki, pranie kanapy, pranie narożnika, czyszczenie mebli, chemczystka mebli, pranie sofy, czyszczenie tapicerki Dolny Śląsk, Polska',
    },
    ru: {
      title: 'Химчистка мебели и диванов | MasterClean',
      description: 'Химчистка диванов, угловых, матрасов и кресел у клиента. Экстракция, эко-химия, гарантия 7 дней. Долносленское воеводство и регионы Польши.',
      keywords: 'химчистка мебели, чистка диванов, чистка угловых диванов, чистка матрасов, химчистка кресел, химчистка на дому, Польша',
    },
    uk: {
      title: 'Хімчистка меблів та диванів | MasterClean',
      description: 'Хімчистка диванів, кутових, матраців та крісел у клієнта. Екстракція, еко-хімія, гарантія 7 днів. Долносленське воєводство та регіони Польщі.',
      keywords: 'хімчистка меблів, чистка диванів, чистка кутових диванів, чистка матраців, хімчистка крісел, хімчистка вдома, Польща',
    },
    en: {
      title: 'Upholstery & Furniture Cleaning | MasterClean',
      description: 'On-site sofa, corner, mattress and armchair cleaning. Hot-water extraction, eco chemistry, 7-day guarantee. Lower Silesia and other Polish regions.',
      keywords: 'upholstery cleaning, sofa cleaning, corner sofa cleaning, mattress cleaning, armchair cleaning, on-site cleaning Poland',
    },
  },
  auto: {
    pl: {
      title: 'Pranie tapicerki samochodowej z dojazdem — MasterClean',
      description: 'Mobilne pranie tapicerki aut osobowych, busów i kabin TIR. Czyszczenie foteli, podsufitki, dywaników, ozonowanie. Dojazd: Dolny Śląsk i inne regiony.',
      keywords: 'pranie tapicerki samochodowej, czyszczenie wnętrza auta, kabina TIR, pranie tapicerki busa, ozonowanie auta, detailing Polska',
    },
    ru: {
      title: 'Химчистка авто с выездом — салон, TIR, бус | MasterClean',
      description: 'Мобильная химчистка салона легковых авто, бусов и кабин TIR. Чистка сидений, потолка, ковриков, озонирование. Выезд по Польше.',
      keywords: 'химчистка авто, химчистка салона, химчистка кабины TIR, химчистка буса, чистка сидений, озонирование авто Польша',
    },
    uk: {
      title: 'Хімчистка авто з виїздом — салон, TIR, бус | MasterClean',
      description: 'Мобільна хімчистка салону легкових авто, бусів і кабін TIR. Чистка сидінь, стелі, килимків, озонування. Виїзд по Польщі.',
      keywords: 'хімчистка авто, хімчистка салону, хімчистка кабіни TIR, хімчистка буса, чистка сидінь, озонування авто Польща',
    },
    en: {
      title: 'Mobile Car Interior Cleaning — TIR, Vans | MasterClean',
      description: 'Mobile car interior cleaning for cars, vans and TIR cabins. Seat, ceiling, floor mats and ozone treatment. On-site service across Poland.',
      keywords: 'car interior cleaning, mobile car detailing, TIR cabin cleaning, van interior cleaning, car ozone treatment Poland',
    },
  },
  ozone: {
    pl: {
      title: 'Ozonowanie mieszkań, biur i aut — MasterClean',
      description: 'Profesjonalne ozonowanie pomieszczeń i samochodów. Usuwanie zapachów dymu, pleśni, zwierząt po zalaniu i remoncie. Dolny Śląsk i inne regiony.',
      keywords: 'ozonowanie, ozonowanie mieszkania, ozonowanie biura, ozonowanie auta, usuwanie zapachów ozonem, dezynfekcja ozonem Polska',
    },
    ru: {
      title: 'Озонирование квартир, офисов и авто — MasterClean',
      description: 'Профессиональное озонирование помещений и автомобилей. Удаление запахов дыма, плесени, животных, после потопа и ремонта. По всей Польше.',
      keywords: 'озонирование, озонирование квартиры, озонирование офиса, озонирование авто, удаление запахов озоном, дезинфекция Польша',
    },
    uk: {
      title: 'Озонування квартир, офісів та авто — MasterClean',
      description: 'Професійне озонування приміщень та автомобілів. Усунення запахів диму, плісняви, тварин, після затоплення та ремонту. По всій Польщі.',
      keywords: 'озонування, озонування квартири, озонування офісу, озонування авто, усунення запахів озоном, дезінфекція Польща',
    },
    en: {
      title: 'Ozone Treatment for Homes, Offices & Cars | MasterClean',
      description: 'Professional ozone treatment for rooms and cars. Removes smoke, mould, pet and post-flood odours after renovation. Across Poland.',
      keywords: 'ozone treatment, ozone for apartments, ozone for offices, car ozone, odour removal, ozone disinfection Poland',
    },
  },
  prices: {
    pl: {
      title: 'Cennik MasterClean — pranie tapicerki, sprzątanie, okna',
      description: 'Aktualny cennik prania tapicerki, czyszczenia dywanów, materacy, ozonowania, sprzątania i mycia okien. Kalkulator kosztów. Cała Polska.',
      keywords: 'cennik prania tapicerki, cennik czyszczenia mebli, cennik ozonowania, cennik sprzątania, cennik mycia okien, ile kosztuje pranie kanapy Polska',
    },
    ru: {
      title: 'Цены MasterClean — химчистка, уборка, мойка окон',
      description: 'Актуальные цены на химчистку мебели, ковров, матрасов, озонирование, уборку и мойку окон. Калькулятор стоимости. По всей Польше.',
      keywords: 'цены химчистка мебели, цена чистки дивана, цена озонирования, цена уборки, цена мойки окон, сколько стоит химчистка дивана Польша',
    },
    uk: {
      title: 'Ціни MasterClean — хімчистка, прибирання, миття вікон',
      description: 'Актуальні ціни на хімчистку меблів, килимів, матраців, озонування, прибирання та миття вікон. Калькулятор вартості. По всій Польщі.',
      keywords: 'ціни хімчистка меблів, ціна чистки дивана, ціна озонування, ціна прибирання, ціна миття вікон, скільки коштує хімчистка дивана Польща',
    },
    en: {
      title: 'MasterClean Pricing — Upholstery, Cleaning, Windows',
      description: 'Up-to-date prices for upholstery, carpet and mattress cleaning, ozone treatment, housekeeping and window washing. Online calculator. Across Poland.',
      keywords: 'upholstery cleaning prices, sofa cleaning cost, ozone treatment cost, cleaning prices Poland, window washing prices Poland',
    },
  },
  contacts: {
    pl: {
      title: 'Kontakt MasterClean — telefon i e-mail',
      description: 'Skontaktuj się z MasterClean: tel. +48 575 211 401, czat 24/7, e-mail sairus454@gmail.com. Zamów pranie tapicerki, ozonowanie lub sprzątanie.',
      keywords: 'kontakt MasterClean, telefon firma sprzątająca, zamów pranie tapicerki, e-mail MasterClean, kontakt czyszczenie mebli',
    },
    ru: {
      title: 'Контакты MasterClean — телефон и e-mail',
      description: 'Свяжитесь с MasterClean: тел. +48 575 211 401, чат 24/7, e-mail sairus454@gmail.com. Закажите химчистку мебели, озонирование или уборку.',
      keywords: 'контакты MasterClean, телефон химчистка, заказать химчистку мебели, e-mail MasterClean, контакты уборка',
    },
    uk: {
      title: 'Контакти MasterClean — телефон і e-mail',
      description: 'Зв’яжіться з MasterClean: тел. +48 575 211 401, чат 24/7, e-mail sairus454@gmail.com. Замовте хімчистку меблів, озонування чи прибирання.',
      keywords: 'контакти MasterClean, телефон хімчистка, замовити хімчистку меблів, e-mail MasterClean, контакти прибирання',
    },
    en: {
      title: 'Contact MasterClean — Phone and Email',
      description: 'Get in touch with MasterClean: phone +48 575 211 401, 24/7 chat, e-mail sairus454@gmail.com. Book upholstery cleaning, ozone treatment or housekeeping.',
      keywords: 'contact MasterClean, cleaning company phone, book upholstery cleaning, MasterClean email, cleaning contact Poland',
    },
  },
};


export const FAQS: Record<PageKey, Record<Lang, Faq[]>> = {
  services: {
    pl: [
      { q: 'Ile kosztuje pranie kanapy?', a: 'Pranie kanapy 2-osobowej od 140 zł, 3-osobowej od 170 zł, narożnika od 200 zł. Cena zależy od stanu i tkaniny.' },
      { q: 'Czy pierzecie meble u klienta w domu?', a: 'Tak, pranie tapicerki wykonujemy bezpośrednio u klienta — nie trzeba nigdzie wozić mebli.' },
      { q: 'Ile schnie tapicerka po praniu?', a: 'Średnio 4–8 godzin. Używamy ekstraktora, który odciąga większość wilgoci od razu.' },
      { q: 'Czy chemia jest bezpieczna dla dzieci i alergików?', a: 'Tak, używamy profesjonalnej chemii eko, certyfikowanej, bezpiecznej dla dzieci, alergików i zwierząt.' },
      { q: 'Czy dajecie gwarancję na pranie tapicerki?', a: 'Tak, udzielamy 7-dniowej gwarancji jakości. W razie zastrzeżeń przyjeżdżamy bezpłatnie ponownie.' },
    ],
    ru: [
      { q: 'Сколько стоит химчистка дивана?', a: 'Химчистка 2-местного дивана от 140 zł, 3-местного от 170 zł, углового от 200 zł. Цена зависит от состояния и ткани.' },
      { q: 'Вы чистите мебель у клиента дома?', a: 'Да, химчистку выполняем непосредственно у клиента — никуда вывозить мебель не нужно.' },
      { q: 'Сколько сохнет мебель после чистки?', a: 'В среднем 4–8 часов. Экстрактор сразу вытягивает большую часть влаги.' },
      { q: 'Безопасна ли химия для детей и аллергиков?', a: 'Да, используем профессиональную эко-химию с сертификатами, безопасную для детей, аллергиков и животных.' },
      { q: 'Даёте ли гарантию на услугу?', a: 'Да, 7 дней гарантии качества. При замечаниях бесплатно приедем повторно.' },
    ],
    uk: [
      { q: 'Скільки коштує хімчистка дивана?', a: 'Хімчистка 2-місного дивана від 140 zł, 3-місного від 170 zł, кутового від 200 zł. Ціна залежить від стану й тканини.' },
      { q: 'Ви чистите меблі у клієнта вдома?', a: 'Так, хімчистку виконуємо безпосередньо у клієнта — нікуди вивозити меблі не потрібно.' },
      { q: 'Скільки сохнуть меблі після чистки?', a: 'У середньому 4–8 годин. Екстрактор одразу витягує більшість вологи.' },
      { q: 'Чи безпечна хімія для дітей та алергіків?', a: 'Так, використовуємо професійну еко-хімію з сертифікатами, безпечну для дітей, алергіків і тварин.' },
      { q: 'Чи даєте гарантію на послугу?', a: 'Так, 7 днів гарантії якості. У разі зауважень безкоштовно приїдемо повторно.' },
    ],
    en: [
      { q: 'How much does sofa cleaning cost?', a: '2-seat sofa from 140 PLN, 3-seat from 170 PLN, corner sofa from 200 PLN. Final price depends on condition and fabric.' },
      { q: 'Do you clean furniture at the client’s home?', a: 'Yes, we clean upholstery on-site — no need to transport the furniture anywhere.' },
      { q: 'How long does upholstery take to dry?', a: 'On average 4–8 hours. Our extractor pulls most of the moisture out immediately.' },
      { q: 'Are the products safe for children and allergy sufferers?', a: 'Yes, we use certified eco-friendly professional chemistry, safe for children, allergy sufferers and pets.' },
      { q: 'Do you offer a guarantee?', a: 'Yes, a 7-day quality guarantee. If anything is wrong we return free of charge.' },
    ],
  },
  auto: {
    pl: [
      { q: 'Czy pierzecie tapicerkę auta z dojazdem?', a: 'Tak, dojeżdżamy do klienta z własnym sprzętem i prądem. Wystarczy miejsce parkingowe.' },
      { q: 'Ile trwa pranie tapicerki samochodu?', a: 'Kompleksowe pranie wnętrza zajmuje 2–4 godziny w zależności od stanu auta i wybranego pakietu.' },
      { q: 'Czy czyścicie kabiny TIR i busy?', a: 'Tak, mamy doświadczenie z kabinami ciężarówek (TIR) oraz busów dostawczych i pasażerskich.' },
      { q: 'Czy usuwacie nieprzyjemne zapachy z auta?', a: 'Tak, łączymy pranie tapicerki z ozonowaniem, co skutecznie usuwa zapachy dymu, jedzenia i zwierząt.' },
      { q: 'Czy czyścicie gumowe dywaniki?', a: 'Nie, specjalizujemy się tylko w tapicerce i dywanikach materiałowych. Gumowe można umyć samodzielnie.' },
    ],
    ru: [
      { q: 'Делаете химчистку авто с выездом?', a: 'Да, выезжаем к клиенту со своим оборудованием и электропитанием. Нужно лишь место для парковки.' },
      { q: 'Сколько длится химчистка салона?', a: 'Комплексная химчистка занимает 2–4 часа в зависимости от состояния авто и пакета.' },
      { q: 'Чистите ли кабины TIR и бусы?', a: 'Да, у нас есть опыт с кабинами грузовиков (TIR), грузовыми и пассажирскими бусами.' },
      { q: 'Удаляете ли неприятные запахи из салона?', a: 'Да, сочетаем химчистку с озонированием — это эффективно убирает запахи дыма, еды и животных.' },
      { q: 'Чистите ли резиновые коврики?', a: 'Нет, мы специализируемся только на тканевых ковриках и тапицерии. Резиновые можно вымыть самостоятельно.' },
    ],
    uk: [
      { q: 'Робите хімчистку авто з виїздом?', a: 'Так, виїжджаємо до клієнта зі своїм обладнанням і живленням. Потрібне лише місце для паркування.' },
      { q: 'Скільки триває хімчистка салону?', a: 'Комплексна хімчистка триває 2–4 години залежно від стану авто й пакету.' },
      { q: 'Чи чистите кабіни TIR та буси?', a: 'Так, маємо досвід із кабінами вантажівок (TIR), вантажними й пасажирськими бусами.' },
      { q: 'Чи прибираєте неприємні запахи з авто?', a: 'Так, поєднуємо хімчистку з озонуванням — це ефективно усуває запахи диму, їжі й тварин.' },
      { q: 'Чи чистите гумові килимки?', a: 'Ні, ми спеціалізуємось лише на тканинних килимках і оббивці. Гумові можна вимити самостійно.' },
    ],
    en: [
      { q: 'Do you offer mobile car interior cleaning?', a: 'Yes, we come to the client with our own equipment and power source. We only need a parking spot.' },
      { q: 'How long does interior cleaning take?', a: 'A complete interior detail takes 2–4 hours depending on the condition of the car and the chosen package.' },
      { q: 'Do you clean TIR cabins and vans?', a: 'Yes, we have experience with truck (TIR) cabins as well as cargo and passenger vans.' },
      { q: 'Can you remove bad odours from the car?', a: 'Yes, we combine upholstery cleaning with ozone treatment, which effectively removes smoke, food and pet odours.' },
      { q: 'Do you clean rubber floor mats?', a: 'No, we specialise in fabric mats and upholstery only. Rubber mats can be washed at home.' },
    ],
  },
  ozone: {
    pl: [
      { q: 'Czy ozonowanie jest bezpieczne?', a: 'Tak, jeśli jest wykonywane przez profesjonalistów. Po zabiegu pomieszczenie wietrzymy 30–60 minut, a ozon szybko zamienia się w tlen.' },
      { q: 'Ile trwa ozonowanie mieszkania?', a: 'Ozonowanie mieszkania trwa 1–3 godziny w zależności od metrażu i intensywności zapachu.' },
      { q: 'Czy ozonowanie usuwa zapach dymu i zwierząt?', a: 'Tak, ozon skutecznie usuwa zapachy dymu papierosowego, spalenizny, pleśni oraz zwierząt domowych.' },
      { q: 'Czy trzeba wyjść z domu na czas zabiegu?', a: 'Tak, na czas ozonowania ludzie, zwierzęta i rośliny muszą opuścić pomieszczenie.' },
      { q: 'Ile kosztuje ozonowanie samochodu?', a: 'Ozonowanie samochodu osobowego od 120 zł. Ozonowanie 1-pokojowego mieszkania od 200 zł.' },
    ],
    ru: [
      { q: 'Безопасно ли озонирование?', a: 'Да, если выполняется профессионалами. После процедуры помещение проветриваем 30–60 минут, и озон быстро превращается в кислород.' },
      { q: 'Сколько длится озонирование квартиры?', a: 'Озонирование квартиры занимает 1–3 часа в зависимости от площади и интенсивности запаха.' },
      { q: 'Удаляет ли озонирование запах дыма и животных?', a: 'Да, озон эффективно убирает запахи табачного дыма, гари, плесени и домашних животных.' },
      { q: 'Нужно ли покидать помещение на время процедуры?', a: 'Да, на время озонирования люди, животные и растения должны покинуть помещение.' },
      { q: 'Сколько стоит озонирование авто?', a: 'Озонирование легкового авто от 120 zł. Озонирование 1-комнатной квартиры от 200 zł.' },
    ],
    uk: [
      { q: 'Чи безпечне озонування?', a: 'Так, якщо виконується професіоналами. Після процедури приміщення провітрюємо 30–60 хвилин, і озон швидко перетворюється на кисень.' },
      { q: 'Скільки триває озонування квартири?', a: 'Озонування квартири триває 1–3 години залежно від площі та інтенсивності запаху.' },
      { q: 'Чи усуває озонування запах диму та тварин?', a: 'Так, озон ефективно усуває запахи тютюнового диму, гару, плісняви та домашніх тварин.' },
      { q: 'Чи потрібно залишати приміщення на час процедури?', a: 'Так, на час озонування люди, тварини й рослини повинні залишити приміщення.' },
      { q: 'Скільки коштує озонування авто?', a: 'Озонування легкового авто від 120 zł. Озонування 1-кімнатної квартири від 200 zł.' },
    ],
    en: [
      { q: 'Is ozone treatment safe?', a: 'Yes, when performed by professionals. After the treatment we ventilate the room for 30–60 minutes and ozone quickly turns back into oxygen.' },
      { q: 'How long does apartment ozonation take?', a: 'Apartment ozonation takes 1–3 hours depending on size and odour intensity.' },
      { q: 'Does ozone remove smoke and pet odours?', a: 'Yes, ozone effectively eliminates cigarette smoke, burnt smell, mould and pet odours.' },
      { q: 'Do I need to leave the room during treatment?', a: 'Yes, people, animals and plants must leave the room during ozonation.' },
      { q: 'How much does car ozonation cost?', a: 'Car ozonation from 120 PLN. 1-room apartment ozonation from 200 PLN.' },
    ],
  },
  prices: {
    pl: [
      { q: 'Czy ceny w cenniku są ostateczne?', a: 'Ceny w cenniku to ceny startowe. Ostateczna kwota zależy od stanu i metrażu — wycenę potwierdzamy przed rozpoczęciem.' },
      { q: 'Czy wystawiacie fakturę VAT?', a: 'Tak, na życzenie wystawiamy fakturę VAT zarówno klientom prywatnym, jak i firmom.' },
      { q: 'Jakie są formy płatności?', a: 'Akceptujemy gotówkę, BLIK, przelew, kartę i przelew na konto firmowe.' },
      { q: 'Czy są dopłaty za dojazd?', a: 'W regionie bazowym (Dolny Śląsk, okolice siedziby) — bez dopłat. Inne miasta: dopłata 10% (ogród 5%) i minimum zamówienia 220 zł.' },
      { q: 'Czy są rabaty na większe zamówienia?', a: 'Tak. 4+ pozycje: 10% rabatu. 6+ pozycji: 15% rabatu. Promocje sezonowe — patrz sekcja Promocje.' },
    ],
    ru: [
      { q: 'Цены в прайсе окончательные?', a: 'Цены в прайсе — стартовые. Итоговая сумма зависит от состояния и площади — окончательную цену подтверждаем перед началом работ.' },
      { q: 'Выставляете ли счёт-фактуру (VAT)?', a: 'Да, по запросу выставляем фактуру VAT как частным клиентам, так и компаниям.' },
      { q: 'Какие способы оплаты?', a: 'Принимаем наличные, BLIK, перевод, карту и перевод на счёт фирмы.' },
      { q: 'Есть ли доплата за выезд?', a: 'В базовом регионе (Долносленское воеводство, окрестности офиса) — без доплат. Другие города: доплата 10% (сад 5%) и минимум заказа 220 zł.' },
      { q: 'Есть ли скидки на большие заказы?', a: 'Да. 4+ позиции: −10%. 6+ позиций: −15%. Сезонные акции — см. раздел «Акции».' },
    ],
    uk: [
      { q: 'Чи остаточні ціни у прайсі?', a: 'Ціни у прайсі — стартові. Остаточна сума залежить від стану й площі — підтверджуємо її перед початком робіт.' },
      { q: 'Чи виставляєте рахунок-фактуру (VAT)?', a: 'Так, на запит виставляємо фактуру VAT як приватним клієнтам, так і компаніям.' },
      { q: 'Які способи оплати?', a: 'Приймаємо готівку, BLIK, переказ, картку та переказ на рахунок фірми.' },
      { q: 'Чи є доплата за виїзд?', a: 'У базовому регіоні (Долносленське воєводство, околиці офісу) — без доплат. Інші міста: доплата 10% (сад 5%) і мінімум замовлення 220 zł.' },
      { q: 'Чи є знижки на великі замовлення?', a: 'Так. 4+ позиції: −10%. 6+ позицій: −15%. Сезонні акції — див. розділ «Акції».' },
    ],
    en: [
      { q: 'Are the listed prices final?', a: 'Listed prices are starting prices. The final amount depends on the condition and size — we confirm the quote before starting.' },
      { q: 'Do you issue VAT invoices?', a: 'Yes, on request we issue VAT invoices for both private clients and companies.' },
      { q: 'What payment methods do you accept?', a: 'Cash, BLIK, bank transfer, card and company transfer.' },
      { q: 'Are there travel surcharges?', a: 'In our base region (Lower Silesia, near the office) — no surcharge. Other cities: +10% surcharge (gardening +5%) and 220 PLN minimum order.' },
      { q: 'Do you offer discounts on larger orders?', a: 'Yes. 4+ items: −10%. 6+ items: −15%. Seasonal promos — see the Promotions section.' },
    ],
  },
  contacts: {
    pl: [
      { q: 'Jak szybko odpowiadacie na zapytanie?', a: 'Średni czas odpowiedzi to kilka minut w godzinach 8–22, maksymalnie do 1 godziny.' },
      { q: 'Czy pracujecie w weekendy i święta?', a: 'Tak, pracujemy 7 dni w tygodniu, również w weekendy i święta — bez dopłat.' },
      { q: 'W jakich miastach świadczycie usługi?', a: 'Działamy na terenie całej Polski — Opole, Poznań, Zielona Góra, Legnica, Kalisz, Dolny Śląsk i 30+ innych miast.' },
      { q: 'Jak najszybciej zarezerwować termin?', a: 'Najszybciej przez WhatsApp lub telefon +48 575 211 401. Termin potwierdzamy w ciągu kilku minut.' },
      { q: 'Czy mogę zamówić wycenę online?', a: 'Tak, użyj kalkulatora na stronie cennika lub wyślij zdjęcia mebli przez WhatsApp — wycenę otrzymasz tego samego dnia.' },
    ],
    ru: [
      { q: 'Как быстро вы отвечаете на заявку?', a: 'В среднем отвечаем в течение нескольких минут с 8 до 22, максимум — в течение 1 часа.' },
      { q: 'Работаете ли в выходные и праздники?', a: 'Да, работаем 7 дней в неделю, в том числе в выходные и праздники — без доплат.' },
      { q: 'В каких городах оказываете услуги?', a: 'Работаем по всей Польше — Ополе, Познань, Зелёна Гура, Легница, Калиш, Долносленское воеводство и более 30 городов.' },
      { q: 'Как быстрее всего забронировать время?', a: 'Быстрее всего через WhatsApp или по телефону +48 575 211 401. Подтверждаем в течение нескольких минут.' },
      { q: 'Можно ли получить расчёт онлайн?', a: 'Да, используйте калькулятор на странице цен или пришлите фото мебели через WhatsApp — расчёт пришлём в тот же день.' },
    ],
    uk: [
      { q: 'Як швидко ви відповідаєте на заявку?', a: 'У середньому відповідаємо протягом кількох хвилин з 8 до 22, максимум — протягом 1 години.' },
      { q: 'Чи працюєте у вихідні та свята?', a: 'Так, працюємо 7 днів на тиждень, у тому числі у вихідні та свята — без доплат.' },
      { q: 'У яких містах ви надаєте послуги?', a: 'Вроцлав і Смолец без доплат, а також Ополе, Познань, Зелена Гура, Легниця, Каліш і понад 30 міст.' },
      { q: 'Як найшвидше забронювати час?', a: 'Найшвидше — через WhatsApp або телефоном +48 575 211 401. Підтверджуємо протягом кількох хвилин.' },
      { q: 'Чи можна отримати розрахунок онлайн?', a: 'Так, скористайтеся калькулятором на сторінці цін або надішліть фото меблів через WhatsApp — розрахунок надішлемо того ж дня.' },
    ],
    en: [
      { q: 'How fast do you reply to enquiries?', a: 'On average within a few minutes between 8 a.m. and 10 p.m., at most within 1 hour.' },
      { q: 'Do you work on weekends and holidays?', a: 'Yes, we work 7 days a week, including weekends and holidays — no surcharge.' },
      { q: 'Which cities do you serve?', a: 'Wrocław and Smolec with no surcharge, plus Opole, Poznań, Zielona Góra, Legnica, Kalisz and 30+ more cities.' },
      { q: 'What is the fastest way to book?', a: 'The fastest way is via WhatsApp or phone +48 575 211 401. We confirm within minutes.' },
      { q: 'Can I get a quote online?', a: 'Yes, use the calculator on the pricing page or send photos via WhatsApp — we send the quote the same day.' },
    ],
  },
};

export const getSeoMeta = (page: PageKey, language: string): SeoMeta =>
  SEO_META[page][(language as Lang)] || SEO_META[page].pl;

export const getFaqs = (page: PageKey, language: string): Faq[] =>
  FAQS[page][(language as Lang)] || FAQS[page].pl;

export const getFaqTitle = (language: string): string =>
  FAQ_TITLE[(language as Lang)] || FAQ_TITLE.pl;

export const buildFaqJsonLd = (page: PageKey, language: string) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: getFaqs(page, language).map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
