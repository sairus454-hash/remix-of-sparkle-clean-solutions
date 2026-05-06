const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = 'https://masterclean1885.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const PHONE = '+48 575 211 401';

// Bot user-agent patterns
const BOT_AGENTS = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|whatsapp|telegrambot|applebot|duckduckbot|semrushbot|ahrefsbot|mj12bot|petalbot|saitreport|screaming|sitebulb|seranking|serpstat/i;

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const staticPages: Record<string, PageMeta> = {
  '/': {
    title: 'MasterClean — Pranie tapicerki, czyszczenie i sprzątanie 24/7',
    description: 'Profesjonalne pranie tapicerki meblowej i samochodowej, czyszczenie dywanów, materacy, ozonowanie. Sprzątanie, mycie okien, złota rączka. Wrocław i okolice.',
    keywords: 'pranie tapicerki, chemczystka mebli, czyszczenie dywanów, materacy, ozonowanie, sprzątanie, mycie okien, Wrocław',
    image: `${SITE_URL}/og-image.jpg`,
  },
  '/about': {
    title: 'O firmie MasterClean — Profesjonalny zespół Wrocław',
    description: 'Poznaj MasterClean: doświadczony zespół, nowoczesny sprzęt Kärcher i SantoEmma, ekologiczne środki. Profesjonalne usługi czyszczenia od 2021 roku.',
    keywords: 'o nas MasterClean, zespół, doświadczenie, profesjonalne czyszczenie Wrocław',
    image: `${SITE_URL}/og-about.jpg`,
  },
  '/services': {
    title: 'Chemczystka mebli — Pranie tapicerki meblowej',
    description: 'Profesjonalna chemczystka mebli z dojazdem: pranie tapicerki meblowej i skórzanej, czyszczenie kanap, foteli, materacy. Kalkulator online. Wrocław, Opole.',
    keywords: 'chemczystka mebli, pranie tapicerki meblowej, pranie kanapy, czyszczenie fotela, pranie materaca',
    image: `${SITE_URL}/og-services.jpg`,
  },
  '/prices': {
    title: 'Cennik prania tapicerki i sprzątania — MasterClean',
    description: 'Aktualny cennik prania tapicerki, czyszczenia dywanów, materacy, ozonowania i sprzątania. Kalkulator kosztów online. Dojazd gratis od 180 PLN.',
    keywords: 'cennik prania tapicerki, ile kosztuje czyszczenie dywanu, cena ozonowania',
    image: `${SITE_URL}/og-prices.jpg`,
  },
  '/equipment': {
    title: 'Sprzęt do prania tapicerki — Kärcher, SantoEmma',
    description: 'Profesjonalny sprzęt do prania tapicerki: ekstraktory Santoemma, Kärcher Puzzi, generatory pary, ozonatory. Ekologiczne środki czyszczące.',
    keywords: 'sprzęt Kärcher, SantoEmma, ekstrakcja, profesjonalne czyszczenie, ekstraktor',
    image: `${SITE_URL}/og-equipment.jpg`,
  },
  '/impregnation': {
    title: 'Impregnacja mebli i tkanin — Ochrona tapicerki',
    description: 'Profesjonalna impregnacja mebli, dywanów i tkanin. Ochrona przed wodą, brudem i plamami. Powłoka hydrofobowa. Wrocław, Opole.',
    keywords: 'impregnacja tkanin, impregnacja mebli, ochrona przed plamami, powłoka hydrofobowa',
    image: `${SITE_URL}/og-impregnation.jpg`,
  },
  '/auto': {
    title: 'Pranie tapicerki samochodowej — Czyszczenie auta',
    description: 'Profesjonalne pranie tapicerki samochodowej z dojazdem. Czyszczenie foteli, podsufitki, dywaników, bagażnika. Usuwanie plam i zapachów. Wrocław, Opole.',
    keywords: 'pranie tapicerki samochodowej, czyszczenie foteli, ozonowanie auta, detailing',
    image: `${SITE_URL}/og-auto.jpg`,
  },
  '/ozone': {
    title: 'Ozonowanie pomieszczeń i samochodów — MasterClean',
    description: 'Profesjonalne ozonowanie mieszkań, biur i samochodów. Usuwanie nieprzyjemnych zapachów, bakterii, grzybów i alergenów. Wrocław i okolice.',
    keywords: 'ozonowanie mieszkania, ozonowanie samochodu, usuwanie zapachów, dezynfekcja',
    image: `${SITE_URL}/og-ozone.jpg`,
  },
  '/windows': {
    title: 'Mycie okien Wrocław — Profesjonalne czyszczenie szyb',
    description: 'Profesjonalne mycie okien w domach, mieszkaniach i biurach. Bezsmugowe czyszczenie szyb, ram i parapetów. Wrocław i okolice.',
    keywords: 'mycie okien Wrocław, czyszczenie szyb, mycie okien cena',
    image: `${SITE_URL}/og-windows.jpg`,
  },
  '/cleaning': {
    title: 'Sprzątanie mieszkań i domów — Usługi porządkowe',
    description: 'Profesjonalne sprzątanie mieszkań, domów i biur z dojazdem. Sprzątanie generalne, standardowe i po remoncie. Ekologiczne środki. Wrocław.',
    keywords: 'sprzątanie mieszkań, sprzątanie domów, sprzątanie biur, sprzątanie generalne',
    image: `${SITE_URL}/og-cleaning.jpg`,
  },
  '/handyman': {
    title: 'Złota rączka Wrocław — Drobne naprawy i montaż',
    description: 'Złota rączka Wrocław: hydraulika, elektryka, montaż mebli, drobne naprawy domowe. Fachowiec z dojazdem 24/7. Uczciwe ceny z gwarancją.',
    keywords: 'złota rączka Wrocław, montaż mebli, naprawy domowe, hydraulik, elektryk',
    image: `${SITE_URL}/og-handyman.jpg`,
  },
  '/reviews': {
    title: 'Opinie klientów — MasterClean | 5-gwiazdkowe recenzje',
    description: 'Sprawdź opinie klientów o usługach MasterClean. Pranie tapicerki, czyszczenie dywanów, ozonowanie — setki 5-gwiazdkowych recenzji.',
    keywords: 'opinie MasterClean, recenzje, pranie tapicerki opinie, Fixly opinie',
    image: `${SITE_URL}/og-reviews.jpg`,
  },
  '/contacts': {
    title: 'Kontakt — MasterClean | Zadzwoń 24/7',
    description: 'Skontaktuj się z MasterClean. Telefon: +48 575 211 401. Pracujemy 24/7. Wrocław, Opole, Legnica i inne miasta.',
    keywords: 'kontakt MasterClean, telefon, adres, formularz kontaktowy, Wrocław',
    image: `${SITE_URL}/og-contacts.jpg`,
  },
  '/blog': {
    title: 'Blog o czyszczeniu i pielęgnacji mebli — MasterClean',
    description: 'Porady ekspertów: jak czyścić tapicerkę, pielęgnować meble skórzane, usuwać plamy. Profesjonalne wskazówki od MasterClean.',
    keywords: 'blog czyszczenie, porady pranie tapicerki, usuwanie plam, pielęgnacja mebli',
    image: `${SITE_URL}/og-blog.jpg`,
  },
  '/sitemap': {
    title: 'Mapa strony — MasterClean',
    description: 'Mapa strony MasterClean — pełna lista podstron serwisu: usługi, cennik, kontakt, blog i więcej. Nawigacja po stronie.',
  },
  '/privacy-policy': {
    title: 'Polityka prywatności — MasterClean',
    description: 'Polityka prywatności MasterClean. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
  },
  '/terms': {
    title: 'Regulamin — MasterClean',
    description: 'Regulamin świadczenia usług MasterClean. Warunki zamówienia, płatności i reklamacji.',
  },
  '/cookies': {
    title: 'Polityka cookies — MasterClean',
    description: 'Informacje o plikach cookies używanych na stronie MasterClean. Zgodność z RODO.',
  },
};

// ALL city pages with unique titles and descriptions
const cityPages: Record<string, PageMeta> = {
  wroclaw: {
    title: 'Pranie tapicerki Wrocław — Dojazd gratis | MasterClean',
    description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy, ozonowanie i sprzątanie we Wrocławiu. Pełen zakres usług. Dojazd gratis od 180 PLN.',
    keywords: 'pranie tapicerki Wrocław, czyszczenie dywanów Wrocław, sprzątanie Wrocław, ozonowanie Wrocław',
    image: `${SITE_URL}/og-wroclaw.jpg`,
  },
  opole: {
    title: 'Czyszczenie tapicerki Opole — Dojazd z Wrocławia',
    description: 'Pranie tapicerki meblowej, czyszczenie dywanów, materacy i ozonowanie w Opolu. Regularne wyjazdy z Wrocławia. Sprzęt Kärcher.',
    keywords: 'czyszczenie tapicerki Opole, pranie dywanów Opole, ozonowanie Opole',
    image: `${SITE_URL}/og-opole.jpg`,
  },
  legnica: {
    title: 'Pranie tapicerki Legnica — Profesjonalny sprzęt Kärcher',
    description: 'Kompleksowe czyszczenie tapicerki, materacy i dywanów w Legnicy. Sprzęt Kärcher i SantoEmma. Obsługujemy Lubin, Chojnów, Złotoryję.',
    keywords: 'pranie tapicerki Legnica, czyszczenie dywanów Legnica, czyszczenie Legnica',
    image: `${SITE_URL}/og-legnica.jpg`,
  },
  olawa: {
    title: 'Czyszczenie tapicerki Oława — 30 km od Wrocławia',
    description: 'Pranie tapicerki i czyszczenie dywanów w Oławie. Bliskość Wrocławia gwarantuje szybki dojazd. Obsługujemy Jelcz-Laskowice.',
    keywords: 'czyszczenie tapicerki Oława, pranie dywanów Oława, sprzątanie Oława',
    image: `${SITE_URL}/og-olawa.jpg`,
  },
  kalisz: {
    title: 'Pranie tapicerki Kalisz — Regularne dojazdy z Wrocławia',
    description: 'Profesjonalna chemczystka mebli, czyszczenie dywanów i ozonowanie w Kaliszu. Obsługujemy też Ostrów Wielkopolski i Pleszew.',
    keywords: 'pranie tapicerki Kalisz, czyszczenie dywanów Kalisz, ozonowanie Kalisz',
    image: `${SITE_URL}/og-kalisz.jpg`,
  },
  leszno: {
    title: 'Czyszczenie tapicerki Leszno — Na trasie Wrocław–Poznań',
    description: 'Pranie tapicerki meblowej i samochodowej w Lesznie. Regularne dojazdy na trasie Wrocław–Poznań. Ekologiczne środki.',
    keywords: 'czyszczenie tapicerki Leszno, pranie dywanów Leszno, czyszczenie Leszno',
    image: `${SITE_URL}/og-leszno.jpg`,
  },
  swidnica: {
    title: 'Pranie tapicerki Świdnica — Dolny Śląsk | MasterClean',
    description: 'Czyszczenie tapicerki, materacy i dywanów w Świdnicy. Miasto z Kościołem Pokoju UNESCO. Obsługujemy Dzierżoniów i Żarów.',
    keywords: 'pranie tapicerki Świdnica, czyszczenie dywanów Świdnica, ozonowanie Świdnica',
    image: `${SITE_URL}/og-swidnica.jpg`,
  },
  walbrzych: {
    title: 'Czyszczenie tapicerki Wałbrzych — Zamów online',
    description: 'Pranie tapicerki meblowej, czyszczenie materacy i ozonowanie w Wałbrzychu. Drugie miasto Dolnego Śląska. Sprzęt Kärcher.',
    keywords: 'czyszczenie tapicerki Wałbrzych, pranie dywanów Wałbrzych, ozonowanie Wałbrzych',
    image: `${SITE_URL}/og-walbrzych.jpg`,
  },
  'ostrow-wielkopolski': {
    title: 'Pranie tapicerki Ostrów Wielkopolski — Wielkopolska',
    description: 'Chemczystka mebli i czyszczenie dywanów w Ostrowie Wielkopolskim. Realizacja wspólnie z Kaliszem. Minimalne zamówienie 300 PLN.',
    keywords: 'pranie tapicerki Ostrów Wielkopolski, czyszczenie dywanów Ostrów',
    image: `${SITE_URL}/og-ostrow.jpg`,
  },
  'jelenia-gora': {
    title: 'Czyszczenie tapicerki Jelenia Góra — Karkonosze',
    description: 'Pranie tapicerki i ozonowanie w Jeleniej Górze. Idealne dla pensjonatów i apartamentów w Karkonoszach. Dojazd z Wrocławia.',
    keywords: 'czyszczenie tapicerki Jelenia Góra, pranie dywanów Jelenia Góra, ozonowanie Jelenia Góra',
    image: `${SITE_URL}/og-jelenia-gora.jpg`,
  },
  brzeg: {
    title: 'Pranie tapicerki Brzeg — Na trasie Wrocław–Opole',
    description: 'Czyszczenie tapicerki, materacy i dywanów w Brzegu. Położony na trasie Wrocław–Opole. Obsługujemy Namysłów i Grodków.',
    keywords: 'pranie tapicerki Brzeg, czyszczenie dywanów Brzeg, sprzątanie Brzeg',
    image: `${SITE_URL}/og-brzeg.jpg`,
  },
  lubin: {
    title: 'Czyszczenie tapicerki Lubin — Zagłębie Miedziowe',
    description: 'Pranie tapicerki meblowej, czyszczenie materacy i ozonowanie w Lubinie. Obsługujemy Polkowice, Głogów i okolice.',
    keywords: 'czyszczenie tapicerki Lubin, pranie dywanów Lubin, ozonowanie Lubin',
    image: `${SITE_URL}/og-lubin.jpg`,
  },
  'jelcz-laskowice': {
    title: 'Pranie tapicerki Jelcz-Laskowice — Blisko Wrocławia',
    description: 'Czyszczenie tapicerki i dywanów w Jelczu-Laskowicach. Zaledwie 25 km od Wrocławia — szybki dojazd. Sprzęt Kärcher.',
    keywords: 'pranie tapicerki Jelcz-Laskowice, czyszczenie dywanów Jelcz-Laskowice',
    image: `${SITE_URL}/og-jelcz-laskowice.jpg`,
  },
  strzegom: {
    title: 'Czyszczenie tapicerki Strzegom — Granit i czystość',
    description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Strzegomiu. Stolica polskiego granitu. Dojazd z Wrocławia.',
    keywords: 'czyszczenie tapicerki Strzegom, pranie dywanów Strzegom, ozonowanie Strzegom',
    image: `${SITE_URL}/og-strzegom.jpg`,
  },
  sobotka: {
    title: 'Pranie tapicerki Sobótka — U podnóża Ślęży',
    description: 'Czyszczenie tapicerki i ozonowanie w Sobótce. Miasto u podnóża góry Ślęży. Szybki dojazd z Wrocławia.',
    keywords: 'pranie tapicerki Sobótka, czyszczenie dywanów Sobótka, ozonowanie Sobótka',
    image: `${SITE_URL}/og-sobotka.jpg`,
  },
  klodzko: {
    title: 'Czyszczenie tapicerki Kłodzko — Kotlina Kłodzka',
    description: 'Pranie tapicerki i ozonowanie w Kłodzku. Idealne dla pensjonatów w Kotlinie Kłodzkiej. Obsługujemy Polanicę i Kudowę-Zdrój.',
    keywords: 'czyszczenie tapicerki Kłodzko, pranie dywanów Kłodzko, ozonowanie Kłodzko',
    image: `${SITE_URL}/og-klodzko.jpg`,
  },
  kielczow: {
    title: 'Pranie tapicerki Kiełczów — Tuż przy Wrocławiu',
    description: 'Czyszczenie tapicerki i dywanów w Kiełczowie. Dynamiczna miejscowość obok Wrocławia. Dojazd w 15 minut.',
    keywords: 'pranie tapicerki Kiełczów, czyszczenie dywanów Kiełczów',
    image: `${SITE_URL}/og-kielczow.jpg`,
  },
  dzierzoniow: {
    title: 'Czyszczenie tapicerki Dzierżoniów — Góry Sowie',
    description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Dzierżoniowie. Miasto u podnóża Gór Sowich. Obsługujemy Bielawę.',
    keywords: 'czyszczenie tapicerki Dzierżoniów, pranie dywanów Dzierżoniów',
    image: `${SITE_URL}/og-dzierzoniow.jpg`,
  },
  nysa: {
    title: 'Pranie tapicerki Nysa — Śląski Rzym | MasterClean',
    description: 'Czyszczenie tapicerki i ozonowanie w Nysie. Perła Opolszczyzny nad Nysą Kłodzką. Profesjonalny sprzęt Kärcher.',
    keywords: 'pranie tapicerki Nysa, czyszczenie dywanów Nysa, ozonowanie Nysa',
    image: `${SITE_URL}/og-nysa.jpg`,
  },
  'brzeg-dolny': {
    title: 'Czyszczenie tapicerki Brzeg Dolny — Nad Odrą',
    description: 'Pranie tapicerki i czyszczenie dywanów w Brzegu Dolnym. Malownicze miasto nad Odrą, 40 km od Wrocławia.',
    keywords: 'czyszczenie tapicerki Brzeg Dolny, pranie dywanów Brzeg Dolny',
    image: `${SITE_URL}/og-brzeg-dolny.jpg`,
  },
  'sroda-slaska': {
    title: 'Pranie tapicerki Środa Śląska — Skarb Średzki',
    description: 'Czyszczenie tapicerki i ozonowanie w Środzie Śląskiej. Historyczne miasto ze słynnym skarbem średzkim.',
    keywords: 'pranie tapicerki Środa Śląska, czyszczenie dywanów Środa Śląska',
    image: `${SITE_URL}/og-sroda-slaska.jpg`,
  },
  glogow: {
    title: 'Czyszczenie tapicerki Głogów — Dolny Śląsk',
    description: 'Pranie tapicerki i czyszczenie dywanów w Głogowie. Jedno z najstarszych miast Dolnego Śląska. Obsługujemy Polkowice.',
    keywords: 'czyszczenie tapicerki Głogów, pranie dywanów Głogów, ozonowanie Głogów',
    image: `${SITE_URL}/og-glogow.jpg`,
  },
  olesnica: {
    title: 'Pranie tapicerki Oleśnica — 30 km od Wrocławia',
    description: 'Czyszczenie tapicerki i dywanów w Oleśnicy. Urokliwe miasto z zamkiem, zaledwie 30 km od Wrocławia.',
    keywords: 'pranie tapicerki Oleśnica, czyszczenie dywanów Oleśnica',
    image: `${SITE_URL}/og-olesnica.jpg`,
  },
  namyslow: {
    title: 'Czyszczenie tapicerki Namysłów — Opolszczyzna',
    description: 'Pranie tapicerki i ozonowanie w Namysłowie. Historyczne miasto z browarem i średniowiecznymi murami obronnymi.',
    keywords: 'czyszczenie tapicerki Namysłów, pranie dywanów Namysłów',
    image: `${SITE_URL}/og-namyslow.jpg`,
  },
  polkowice: {
    title: 'Pranie tapicerki Polkowice — Zagłębie Miedziowe',
    description: 'Czyszczenie tapicerki i dywanów w Polkowicach. Nowoczesne miasto w sercu Zagłębia Miedziowego. Obsługujemy Lubin i Głogów.',
    keywords: 'pranie tapicerki Polkowice, czyszczenie dywanów Polkowice',
    image: `${SITE_URL}/og-polkowice.jpg`,
  },
  smolec: {
    title: 'Czyszczenie tapicerki Smolec — Ceny jak we Wrocławiu',
    description: 'Pranie tapicerki w Smolcu w cenach wrocławskich. Pełen zakres usług: meble, dywany, ozonowanie, sprzątanie. Dojazd gratis.',
    keywords: 'czyszczenie tapicerki Smolec, pranie dywanów Smolec, sprzątanie Smolec',
    image: `${SITE_URL}/og-smolec.jpg`,
  },
  'katy-wroclawskie': {
    title: 'Pranie tapicerki Kąty Wrocławskie — Blisko Wrocławia',
    description: 'Czyszczenie tapicerki i dywanów w Kątach Wrocławskich. Atrakcyjne ceny i profesjonalny sprzęt Kärcher.',
    keywords: 'pranie tapicerki Kąty Wrocławskie, czyszczenie dywanów Kąty Wrocławskie',
    image: `${SITE_URL}/og-katy-wroclawskie.jpg`,
  },
  siechnice: {
    title: 'Czyszczenie tapicerki Siechnice — Szybki dojazd',
    description: 'Pranie tapicerki i czyszczenie dywanów w Siechnicach. Dynamiczna gmina na obrzeżach Wrocławia. Profesjonalna obsługa.',
    keywords: 'czyszczenie tapicerki Siechnice, pranie dywanów Siechnice',
    image: `${SITE_URL}/og-siechnice.jpg`,
  },
  'tyniec-maly': {
    title: 'Pranie tapicerki Tyniec Mały — Okolice Wrocławia',
    description: 'Czyszczenie tapicerki i ozonowanie w Tyńcu Małym. Spokojna okolica w sąsiedztwie Wrocławia. Ekologiczne środki.',
    keywords: 'pranie tapicerki Tyniec Mały, czyszczenie dywanów Tyniec Mały',
    image: `${SITE_URL}/og-tyniec-maly.jpg`,
  },
  zmigrod: {
    title: 'Czyszczenie tapicerki Żmigród — Dolina Baryczy',
    description: 'Pranie tapicerki i czyszczenie dywanów w Żmigrodzie. Miasto w malowniczej Dolinie Baryczy. Profesjonalny sprzęt.',
    keywords: 'czyszczenie tapicerki Żmigród, pranie dywanów Żmigród',
    image: `${SITE_URL}/og-zmigrod.jpg`,
  },
  'bielany-wroclawskie': {
    title: 'Pranie tapicerki Bielany Wrocławskie — Ceny miejskie',
    description: 'Czyszczenie tapicerki w Bielanach Wrocławskich w cenach wrocławskich. Pełen zakres usług: meble, dywany, ozonowanie, sprzątanie.',
    keywords: 'pranie tapicerki Bielany Wrocławskie, czyszczenie dywanów Bielany',
    image: `${SITE_URL}/og-bielany-wroclawskie.jpg`,
  },
};

// Blog articles with unique meta per article
const blogPages: Record<string, PageMeta> = {
  '1': {
    title: 'Jak często czyścić sofę? Porady ekspertów — MasterClean',
    description: 'Specjaliści zalecają profesjonalne czyszczenie tapicerki minimum 1-2 razy w roku. Dowiedz się dlaczego i jak zadbać o sofę.',
    keywords: 'czyszczenie sofy, jak często czyścić tapicerkę, pranie kanapy porady',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '2': {
    title: '5 sekretów idealnego sprzątania — Blog MasterClean',
    description: 'Profesjonalne sprzątanie to cały system. Poznaj sekrety ekspertów: od kolejności działań po wybór środków czyszczących.',
    keywords: 'sekrety sprzątania, porady sprzątanie, profesjonalne sprzątanie dom',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '3': {
    title: 'Czyszczenie wnętrza samochodu — Kiedy i jak? — MasterClean',
    description: 'Wnętrze samochodu gromadzi kurz i bakterie. Dowiedz się, kiedy warto zlecić profesjonalne czyszczenie tapicerki samochodowej.',
    keywords: 'czyszczenie wnętrza samochodu, pranie foteli samochodowych, detailing porady',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '4': {
    title: 'Dlaczego warto czyścić materac? — Blog MasterClean',
    description: 'Materac gromadzi pot, roztocza i bakterie. Regularne czyszczenie zapewnia zdrowy sen i przedłuża żywotność materaca.',
    keywords: 'czyszczenie materaca, dlaczego czyścić materac, higiena snu, roztocza',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '5': {
    title: 'Pielęgnacja mebli skórzanych — Poradnik MasterClean',
    description: 'Skóra wymaga specjalnej pielęgnacji. Dowiedz się, jak prawidłowo czyścić i konserwować meble skórzane bez ryzyka uszkodzenia.',
    keywords: 'pielęgnacja mebli skórzanych, czyszczenie skóry, konserwacja skóry',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '6': {
    title: 'Detailing samochodowy — Co to jest? — MasterClean',
    description: 'Detailing to kompleksowe głębokie czyszczenie samochodu, wykraczające poza zwykłe mycie. Poznaj różnicę i korzyści.',
    keywords: 'detailing samochodowy, co to detailing, głębokie czyszczenie auta',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '7': {
    title: 'MasterClean — Top Wykonawca 2025 na Fixly.pl',
    description: 'MasterClean uznany za Top Wykonawcę 2025 na platformie Fixly.pl. Lider wśród firm czyszczących w Polsce.',
    keywords: 'Top Wykonawca 2025, Fixly MasterClean, najlepsza firma czyszcząca',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '8': {
    title: 'Jak liczyć miejsca siedzące na sofie? — MasterClean',
    description: 'Szerokość jednego miejsca to ok. 50–60 cm. Dowiedz się jak prawidłowo określić rozmiar sofy do wyceny czyszczenia.',
    keywords: 'miejsca siedzące sofa, rozmiar sofy, wycena czyszczenia sofy',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '9': {
    title: 'Dlaczego warto suszyć meble po czyszczeniu? — MasterClean',
    description: 'Po czyszczeniu w tapicerce pozostaje wilgoć, która może prowadzić do pleśni. Profesjonalne suszenie to niezbędny etap.',
    keywords: 'suszenie mebli, suszenie po praniu tapicerki, pleśń tapicerka',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '10': {
    title: 'Jak prawidłowo myć okna w mieszkaniu? — MasterClean',
    description: 'Czyste okna sprawiają, że mieszkanie jest jaśniejsze. Poznaj prostą kolejność i odpowiednie środki do mycia okien.',
    keywords: 'mycie okien porady, jak myć okna, środki do mycia okien',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '11': {
    title: 'Profesjonalne czyszczenie materacy w domu — MasterClean',
    description: 'Materac codziennie wchłania wilgoć i kurz. Profesjonalne czyszczenie eliminuje zanieczyszczenia na głębokim poziomie.',
    keywords: 'czyszczenie materacy w domu, usuwanie plam materac, alergeny materac',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '12': {
    title: 'Dlaczego ceny prania tapicerki się różnią? — MasterClean',
    description: 'Nie każda usługa oznacza to samo. Różnica w sprzęcie i środkach decyduje o jakości i trwałości efektu czyszczenia.',
    keywords: 'cena prania tapicerki, porównanie firm czyszczących, jakość czyszczenia',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
};

function getPageMeta(path: string): PageMeta | null {
  if (staticPages[path]) return staticPages[path];

  const cityMatch = path.match(/^\/city\/([a-z-]+)$/);
  if (cityMatch && cityPages[cityMatch[1]]) return cityPages[cityMatch[1]];

  const blogMatch = path.match(/^\/blog\/(\d+)$/);
  if (blogMatch && blogPages[blogMatch[1]]) return blogPages[blogMatch[1]];

  return null;
}

function buildHtml(path: string, meta: PageMeta, lang: string = 'pl'): string {
  // `path` is the LOGICAL path (already stripped of any /ru, /en, /uk prefix
  // by the caller). We rebuild the canonical URL by re-adding the prefix
  // for the active language (PL stays at root).
  const cleanPath = path === '' ? '/' : path;
  const buildLangUrl = (l: string) =>
    l === 'pl'
      ? `${SITE_URL}${cleanPath}`
      : `${SITE_URL}/${l}${cleanPath === '/' ? '' : cleanPath}`;

  const canonicalUrl = buildLangUrl(lang);
  const basePath = buildLangUrl('pl'); // x-default = PL
  const image = meta.image || DEFAULT_IMAGE;
  const type = meta.type || 'website';
  const ogLocaleMap: Record<string, string> = {
    pl: 'pl_PL', ru: 'ru_RU', en: 'en_US', uk: 'uk_UA',
  };
  const htmlLang = ['pl', 'ru', 'en', 'uk'].includes(lang) ? lang : 'pl';
  const ogLocale = ogLocaleMap[htmlLang] || 'pl_PL';

  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  ${meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}">` : ''}
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${image}">
  <meta property="og:locale" content="${ogLocale}">
  ${Object.entries(ogLocaleMap)
    .filter(([l]) => l !== htmlLang)
    .map(([, loc]) => `<meta property="og:locale:alternate" content="${loc}">`)
    .join('\n  ')}
  <meta property="og:site_name" content="MasterClean">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="${image}">

  <!-- Hreflang — each language lives at its own URL prefix (PL = root) -->
  <link rel="alternate" hreflang="pl" href="${buildLangUrl('pl')}">
  <link rel="alternate" hreflang="ru" href="${buildLangUrl('ru')}">
  <link rel="alternate" hreflang="en" href="${buildLangUrl('en')}">
  <link rel="alternate" hreflang="uk" href="${buildLangUrl('uk')}">
  <link rel="alternate" hreflang="x-default" href="${buildLangUrl('pl')}">

  <!-- Structured Data -->
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MasterClean',
    description: meta.description,
    url: SITE_URL,
    telephone: PHONE,
    image: DEFAULT_IMAGE,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PL',
      addressRegion: 'dolnośląskie',
      addressLocality: 'Wrocław',
    },
    areaServed: [
      { '@type': 'City', name: 'Wrocław' },
      { '@type': 'City', name: 'Opole' },
      { '@type': 'City', name: 'Legnica' },
      { '@type': 'City', name: 'Lubin' },
      { '@type': 'City', name: 'Oława' },
      { '@type': 'City', name: 'Kalisz' },
      { '@type': 'City', name: 'Leszno' },
      { '@type': 'City', name: 'Świdnica' },
      { '@type': 'City', name: 'Wałbrzych' },
      { '@type': 'City', name: 'Ostrów Wielkopolski' },
      { '@type': 'City', name: 'Jelenia Góra' },
      { '@type': 'City', name: 'Brzeg' },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  })}
  </script>

  <!-- Redirect real users to SPA -->
  <noscript>
    <meta http-equiv="refresh" content="0;url=${canonicalUrl}">
  </noscript>
</head>
<body>
  <h1>${escapeHtml(meta.title)}</h1>
  <p>${escapeHtml(meta.description)}</p>

  <section>
    <h2>O firmie MasterClean</h2>
    <p>MasterClean to profesjonalna firma czyszcząca działająca od 2021 roku we Wrocławiu i okolicach. Specjalizujemy się w praniu tapicerki meblowej i samochodowej, czyszczeniu dywanów, materacy, foteli, kanap oraz narożników. Wykonujemy również ozonowanie pomieszczeń i samochodów, mycie okien, sprzątanie mieszkań, domów i biur, a także drobne naprawy domowe (złota rączka).</p>
    <p>Pracujemy 24 godziny na dobę, 7 dni w tygodniu, w tym w weekendy i święta. Stosujemy nowoczesny sprzęt marek Kärcher Puzzi i SantoEmma oraz ekologiczne, bezpieczne dla dzieci i zwierząt środki czyszczące. Każde zlecenie wykonujemy z dojazdem do klienta, a dla zamówień powyżej 180 PLN dojazd jest bezpłatny.</p>
  </section>

  <section>
    <h2>Nasze usługi</h2>
    <ul>
      <li><strong>Pranie tapicerki meblowej</strong> — kanapy, fotele, narożniki, krzesła, pufy, sofy. Głębokie czyszczenie ekstrakcyjne usuwające kurz, roztocza, alergeny, plamy i zapachy.</li>
      <li><strong>Pranie tapicerki skórzanej</strong> — czyszczenie i pielęgnacja mebli skórzanych, odżywianie i impregnacja skóry.</li>
      <li><strong>Pranie materacy</strong> — głębokie czyszczenie materacy jedno- i dwuosobowych, usuwanie roztoczy, bakterii i alergenów.</li>
      <li><strong>Czyszczenie dywanów i wykładzin</strong> — pranie dywanów u klienta lub z odbiorem do warsztatu, czyszczenie wykładzin dywanowych, impregnacja.</li>
      <li><strong>Czyszczenie samochodów</strong> — pranie tapicerki samochodowej, foteli, podsufitki, dywaników, bagażnika; ozonowanie wnętrza auta.</li>
      <li><strong>Ozonowanie</strong> — usuwanie nieprzyjemnych zapachów (papierosy, zwierzęta, pleśń), dezynfekcja powietrza, eliminacja bakterii i wirusów.</li>
      <li><strong>Mycie okien</strong> — bezsmugowe czyszczenie szyb, ram, parapetów i balustrad w mieszkaniach, domach i biurach.</li>
      <li><strong>Sprzątanie</strong> — sprzątanie standardowe, generalne i po remoncie mieszkań, domów oraz biur.</li>
      <li><strong>Złota rączka</strong> — drobne naprawy domowe, hydraulika, elektryka, montaż mebli, prace porządkowe.</li>
      <li><strong>Impregnacja</strong> — ochrona mebli, dywanów i tapicerki przed wodą, brudem i plamami.</li>
    </ul>
  </section>

  <section>
    <h2>Cennik</h2>
    <ul>
      <li>Pranie kanapy 2-osobowej — od 130 PLN</li>
      <li>Pranie kanapy 3-osobowej — od 150 PLN</li>
      <li>Pranie narożnika — od 180 PLN</li>
      <li>Pranie materaca jednoosobowego — od 115 PLN</li>
      <li>Pranie materaca dwuosobowego — od 175 PLN</li>
      <li>Pranie fotela — od 65 PLN</li>
      <li>Pranie krzesła — od 25 PLN</li>
      <li>Czyszczenie dywanu u klienta — 15 PLN/m²</li>
      <li>Pranie dywanów z odbiorem i dostawą — 30 PLN/m²</li>
      <li>Czyszczenie wykładziny dywanowej (20–50 m²) — 10 PLN/m²</li>
      <li>Czyszczenie wykładziny dywanowej (50+ m²) — 7–10 PLN/m²</li>
      <li>Czyszczenie płytek — 20 PLN/m²</li>
      <li>Impregnacja dywanu — 5 PLN/m²</li>
      <li>Ozonowanie samochodu — od 100 PLN</li>
      <li>Ozonowanie mieszkania — od 200 PLN</li>
      <li>Mycie okien — od 12 PLN/m²</li>
    </ul>
    <p>Minimalna wartość zamówienia: 160 PLN we Wrocławiu i Smolcu, 220 PLN w pozostałych miastach. Dojazd gratis od 180 PLN.</p>
  </section>

  <section>
    <h2>Obszar działania</h2>
    <p>Świadczymy usługi we Wrocławiu, Smolcu, Opolu, Legnicy, Lubinie, Oławie, Kaliszu, Lesznie, Świdnicy, Wałbrzychu, Ostrowie Wielkopolskim, Jeleniej Górze, Brzegu oraz w wielu innych miastach Dolnego Śląska, Wielkopolski i Opolszczyzny. Dojeżdżamy również do mniejszych miejscowości i wsi w promieniu do 100 km od Wrocławia.</p>
  </section>

  <section>
    <h2>Dlaczego warto wybrać MasterClean</h2>
    <ul>
      <li>Ponad 1500 zadowolonych klientów i średnia ocena 4.9/5 na podstawie opinii w Google, Fixly i na naszej stronie.</li>
      <li>Profesjonalny sprzęt ekstrakcyjny Kärcher Puzzi 10/1 i SantoEmma SW15 — głębokie czyszczenie tapicerki niemożliwe w warunkach domowych.</li>
      <li>Ekologiczne środki czyszczące, bezpieczne dla dzieci, alergików i zwierząt domowych.</li>
      <li>Praca 24/7, w tym w weekendy i święta — dopasujemy się do Twojego harmonogramu.</li>
      <li>Przejrzysty cennik bez ukrytych opłat — ostateczna cena ustalana przed rozpoczęciem pracy.</li>
      <li>Gwarancja jakości — jeśli efekt nie spełni oczekiwań, ponownie wykonamy pracę bez dodatkowych kosztów.</li>
      <li>Krótkie terminy realizacji — często możemy przyjechać już tego samego dnia.</li>
    </ul>
  </section>

  <section>
    <h2>Opinie klientów</h2>
    <p>„Świetna obsługa, kanapa wygląda jak nowa po praniu. Ekipa profesjonalna, punktualna, w pełni polecam!" — Anna, Wrocław</p>
    <p>„Bardzo dobra firma. Wyczyścili nam dywan i materace — efekt rewelacyjny. Cena adekwatna do jakości." — Marcin, Opole</p>
    <p>„Zamówiłam ozonowanie samochodu po poprzednim właścicielu palącym papierosy — zapach całkowicie zniknął. Polecam!" — Katarzyna, Legnica</p>
  </section>

  <section>
    <h2>Najczęściej zadawane pytania</h2>
    <h3>Ile czasu zajmuje pranie kanapy?</h3>
    <p>Pranie kanapy 3-osobowej trwa zazwyczaj 60–90 minut. Mebel po praniu wymaga 4–8 godzin schnięcia w temperaturze pokojowej.</p>
    <h3>Czy stosowane środki są bezpieczne dla dzieci i zwierząt?</h3>
    <p>Tak, używamy wyłącznie ekologicznych, hipoalergicznych preparatów certyfikowanych do stosowania w obecności dzieci, alergików i zwierząt.</p>
    <h3>Czy dojeżdżacie do klienta?</h3>
    <p>Tak, wszystkie usługi prania tapicerki, dywanów i materacy wykonujemy z dojazdem do klienta. Dojazd jest bezpłatny dla zamówień powyżej 180 PLN.</p>
    <h3>Jakie formy płatności akceptujecie?</h3>
    <p>Akceptujemy płatność gotówką, kartą, BLIK-iem, przelewem oraz fakturą VAT dla firm.</p>
  </section>

  <section>
    <h2>Kontakt</h2>
    <p>Telefon: <a href="tel:${PHONE}">${PHONE}</a> — pracujemy 24/7</p>
    <p>Adres: Wrocław, Dolnośląskie</p>
    <p><a href="${SITE_URL}">MasterClean — strona główna</a></p>
    <nav>
      <a href="${SITE_URL}/services">Usługi</a> |
      <a href="${SITE_URL}/prices">Cennik</a> |
      <a href="${SITE_URL}/about">O firmie</a> |
      <a href="${SITE_URL}/equipment">Sprzęt</a> |
      <a href="${SITE_URL}/reviews">Opinie</a> |
      <a href="${SITE_URL}/contacts">Kontakt</a> |
      <a href="${SITE_URL}/blog">Blog</a>
    </nav>
  </section>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isBot(userAgent: string): boolean {
  return BOT_AGENTS.test(userAgent);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let path = url.searchParams.get('path') || '/';

    // New: language prefix lives IN the path (/ru/..., /en/..., /uk/...).
    // Strip it to look up the page meta, but remember the language so we can
    // build the correct canonical/hreflang.
    const prefixMatch = path.match(/^\/(ru|en|uk)(\/|$)/);
    const langFromPath = prefixMatch ? prefixMatch[1] : null;
    if (prefixMatch) {
      path = path.replace(/^\/(ru|en|uk)/, '') || '/';
    }

    // Backward-compat: still accept ?lang=xx for old links and 301-style hints.
    const langQuery = (url.searchParams.get('lang') || '').toLowerCase();
    const lang = langFromPath || langQuery || 'pl';
    const validLang = ['pl', 'ru', 'en', 'uk'].includes(lang) ? lang : 'pl';
    const userAgent = req.headers.get('user-agent') || '';
    const forcePrerender = url.searchParams.get('_prerender') === '1';

    // Only serve to bots or when explicitly requested
    if (!isBot(userAgent) && !forcePrerender) {
      const target = validLang === 'pl'
        ? `${SITE_URL}${path}`
        : `${SITE_URL}/${validLang}${path === '/' ? '' : path}`;
      return new Response(null, {
        status: 302,
        headers: { ...corsHeaders, 'Location': target },
      });
    }

    const meta = getPageMeta(path);
    if (!meta) {
      return new Response('Not found', {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
      });
    }

    const html = buildHtml(path, meta, validLang);

    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Robots-Tag': 'index, follow',
      },
    });
  } catch (error) {
    console.error('Prerender error:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  }
});
