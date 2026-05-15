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
  '13': {
    title: 'Dlaczego specjalista od czyszczenia musi wydać paragon | MasterClean',
    description: 'Paragon fiskalny to nie formalność — gwarancja Twojego bezpieczeństwa, jakości usługi i uczciwego rynku usług czyszczących.',
    keywords: 'paragon fiskalny, uczciwa firma czyszcząca, faktura za pranie tapicerki, prawa konsumenta',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '14': {
    title: 'Ozonowanie materaca na zapachy | MasterClean',
    description: 'Ozonowanie materaca usuwa zapachy, alergeny, bakterie i pozostałości roztoczy bez agresywnej chemii. Sprawdź, kiedy warto wykonać zabieg.',
    keywords: 'ozonowanie materaca, usuwanie zapachów z materaca, alergeny w materacu, roztocza, dezynfekcja materaca',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '15': {
    title: 'Jak często prać tapicerkę meblową | MasterClean',
    description: 'Sprawdź, jak często prać tapicerkę meblową: optymalne odstępy dla rodzin z dziećmi, zwierzętami i alergikami.',
    keywords: 'jak często prać tapicerkę, pranie kanapy, częstotliwość prania mebli, czyszczenie sofy',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '16': {
    title: 'Ile kosztuje pranie kanapy? Cennik 2026 | MasterClean',
    description: 'Ile kosztuje pranie kanapy? Sprawdź widełki cenowe, od czego zależy cena i jak ocenić ofertę bez przepłaty.',
    keywords: 'ile kosztuje pranie kanapy, cena prania kanapy, pranie sofy cennik, pranie narożnika cena',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '17': {
    title: 'Jak usunąć zapach z materaca: skuteczne metody | MasterClean',
    description: 'Jak usunąć zapach z materaca — pot, mocz, wilgoć, zwierzęta. Domowe sposoby, błędy i kiedy zamówić profesjonalne pranie.',
    keywords: 'jak usunąć zapach z materaca, zapach moczu z materaca, czyszczenie materaca z zapachu, pranie materaca',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '18': {
    title: 'Czyszczenie materaca z roztoczy — co działa | MasterClean',
    description: 'Czyszczenie materaca z roztoczy: domowe metody, profesjonalne pranie ekstrakcyjne, częstotliwość zabiegu i pielęgnacja.',
    keywords: 'czyszczenie materaca z roztoczy, roztocza materac, pranie materaca, alergia materac, ekstrakcja materaca',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '19': {
    title: 'Jak wyprać tapicerkę samochodową skutecznie | MasterClean',
    description: 'Jak wyprać tapicerkę samochodową bez zacieków i zapachu wilgoci: etapy, błędy, porady i kiedy lepiej zlecić usługę profesjonalistom.',
    keywords: 'pranie tapicerki samochodowej, jak wyprać tapicerkę auta, czyszczenie tapicerki samochodu, ekstraktor samochodowy',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '20': {
    title: 'Pranie foteli samochodowych: cena i zakres | MasterClean',
    description: 'Pranie foteli samochodowych: od czego zależy cena, co obejmuje usługa, kiedy koszt rośnie i komu opłaca się zamówić czyszczenie.',
    keywords: 'pranie foteli samochodowych cena, pranie tapicerki samochodowej, czyszczenie foteli auta, ekstrakcja foteli',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '21': {
    title: 'Ozonowanie samochodu po zapachu — kiedy działa | MasterClean',
    description: 'Ozonowanie samochodu po zapachu: kiedy naprawdę pomaga, jak przygotować auto i dlaczego ozon nie zastąpi prania tapicerki.',
    keywords: 'ozonowanie samochodu, ozon zapach w aucie, usuwanie zapachu papierosów z auta, ozonowanie wnętrza',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '22': {
    title: 'Na czym polega ozonowanie mieszkania? | MasterClean',
    description: 'Na czym polega ozonowanie mieszkania: kiedy działa, jak przygotować lokal, czy jest bezpieczne i dlaczego nie zastąpi sprzątania.',
    keywords: 'ozonowanie mieszkania, na czym polega ozonowanie, ozon zapach w mieszkaniu, ozonowanie po zalaniu, ozon na pleśń',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '23': {
    title: 'Czyszczenie dywanu z sierści — co działa | MasterClean',
    description: 'Czyszczenie dywanu z sierści psa i kota: domowe sposoby, które działają, oraz kiedy potrzebne jest profesjonalne pranie z ekstrakcją.',
    keywords: 'czyszczenie dywanu z sierści, sierść w dywanie, jak usunąć sierść z dywanu, pranie dywanu, czyszczenie dywanu pies',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '24': {
    title: 'Jak usunąć plamy z dywanu bez szkód | MasterClean',
    description: 'Jak usunąć plamy z dywanu bez szkód dla włókien: pierwsze kroki, błędy, domowe sposoby i kiedy potrzebne jest profesjonalne czyszczenie.',
    keywords: 'jak usunąć plamy z dywanu, usuwanie plam z dywanu, czyszczenie dywanu z plam, stara plama na dywanie',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  '25': {
    title: 'Sprzątanie mieszkania po remoncie krok po kroku | MasterClean',
    description: 'Sprzątanie mieszkania po remoncie: właściwa kolejność prac, usuwanie pyłu budowlanego bez smug i kiedy zlecić sprzątanie profesjonalistom.',
    keywords: 'sprzątanie mieszkania po remoncie, sprzątanie po remoncie, pył budowlany, mycie okien po remoncie, generalne sprzątanie',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
};

// =====================================================================
// Localized metadata (RU / EN / UK). PL lives in the maps above and acts
// as the fallback when a localized override is missing.
// =====================================================================

type Lang = 'pl' | 'ru' | 'en' | 'uk';

const staticPagesI18n: Record<Exclude<Lang, 'pl'>, Record<string, PageMeta>> = {
  ru: {
    '/': {
      title: 'MasterClean — Химчистка мебли, чистка и уборка 24/7',
      description: 'Профессиональная химчистка мягкой мебели и автомобилей, чистка ковров, матрасов, озонирование. Уборка, мытьё окон, муж на час. Вроцлав и окрестности.',
      keywords: 'химчистка мебели, чистка дивана, чистка ковров, матрасов, озонирование, уборка, мытьё окон, Вроцлав',
      image: `${SITE_URL}/og-image.jpg`,
    },
    '/about': {
      title: 'О компании MasterClean — Профессиональная команда Вроцлав',
      description: 'MasterClean: опытная команда, современное оборудование Kärcher и SantoEmma, экологичные средства. Профессиональная чистка с 2021 года.',
      keywords: 'о нас MasterClean, команда, опыт, профессиональная чистка Вроцлав',
      image: `${SITE_URL}/og-about.jpg`,
    },
    '/services': {
      title: 'Химчистка мебели — Чистка диванов и кресел',
      description: 'Профессиональная химчистка мебели с выездом: чистка тканевой и кожаной обивки, диванов, кресел, матрасов. Онлайн-калькулятор. Вроцлав, Ополе.',
      keywords: 'химчистка мебели, чистка дивана, чистка кресла, чистка матраса',
      image: `${SITE_URL}/og-services.jpg`,
    },
    '/prices': {
      title: 'Цены на химчистку мебели и уборку — MasterClean',
      description: 'Актуальные цены на химчистку мебели, чистку ковров, матрасов, озонирование и уборку. Онлайн-калькулятор. Бесплатный выезд от 180 PLN.',
      keywords: 'цены химчистка мебели, сколько стоит чистка дивана, цена озонирования',
      image: `${SITE_URL}/og-prices.jpg`,
    },
    '/equipment': {
      title: 'Оборудование для химчистки — Kärcher, SantoEmma',
      description: 'Профессиональное оборудование для химчистки: экстракторы Santoemma, Kärcher Puzzi, парогенераторы, озонаторы. Экологичные средства.',
      keywords: 'оборудование Kärcher, SantoEmma, экстракция, профессиональная чистка',
      image: `${SITE_URL}/og-equipment.jpg`,
    },
    '/impregnation': {
      title: 'Импрегнация мебели и тканей — Защита обивки',
      description: 'Профессиональная импрегнация мебели, ковров и тканей. Защита от воды, грязи и пятен. Гидрофобное покрытие. Вроцлав, Ополе.',
      keywords: 'импрегнация тканей, импрегнация мебели, защита от пятен, гидрофобное покрытие',
      image: `${SITE_URL}/og-impregnation.jpg`,
    },
    '/auto': {
      title: 'Химчистка салона авто — Чистка автомобиля',
      description: 'Профессиональная химчистка салона автомобиля с выездом. Чистка сидений, потолка, ковриков, багажника. Удаление пятен и запахов.',
      keywords: 'химчистка авто, чистка сидений, озонирование авто, детейлинг',
      image: `${SITE_URL}/og-auto.jpg`,
    },
    '/ozone': {
      title: 'Озонирование помещений и автомобилей — MasterClean',
      description: 'Профессиональное озонирование квартир, офисов и автомобилей. Удаление неприятных запахов, бактерий, грибков и аллергенов. Вроцлав.',
      keywords: 'озонирование квартиры, озонирование автомобиля, удаление запахов, дезинфекция',
      image: `${SITE_URL}/og-ozone.jpg`,
    },
    '/windows': {
      title: 'Мытьё окон Вроцлав — Профессиональная чистка стёкол',
      description: 'Профессиональное мытьё окон в домах, квартирах и офисах. Без разводов, чистка рам и подоконников. Вроцлав и окрестности.',
      keywords: 'мытьё окон Вроцлав, чистка стёкол, мытьё окон цена',
      image: `${SITE_URL}/og-windows.jpg`,
    },
    '/cleaning': {
      title: 'Уборка квартир и домов — Клининговые услуги',
      description: 'Профессиональная уборка квартир, домов и офисов с выездом. Генеральная, поддерживающая и после ремонта. Экосредства. Вроцлав.',
      keywords: 'уборка квартир, уборка домов, уборка офисов, генеральная уборка',
      image: `${SITE_URL}/og-cleaning.jpg`,
    },
    '/handyman': {
      title: 'Муж на час Вроцлав — Мелкий ремонт и монтаж',
      description: 'Муж на час Вроцлав: сантехника, электрика, сборка мебели, мелкий ремонт. Мастер с выездом 24/7. Честные цены с гарантией.',
      keywords: 'муж на час Вроцлав, сборка мебели, мелкий ремонт, сантехник, электрик',
      image: `${SITE_URL}/og-handyman.jpg`,
    },
    '/reviews': {
      title: 'Отзывы клиентов — MasterClean | 5-звёздочные отзывы',
      description: 'Отзывы клиентов о MasterClean. Химчистка мебели, чистка ковров, озонирование — сотни 5-звёздочных отзывов.',
      keywords: 'отзывы MasterClean, отзывы химчистка, отзывы Fixly',
      image: `${SITE_URL}/og-reviews.jpg`,
    },
    '/contacts': {
      title: 'Контакты — MasterClean | Звоните 24/7',
      description: 'Свяжитесь с MasterClean. Телефон: +48 575 211 401. Работаем 24/7. Вроцлав, Ополе, Легница и другие города.',
      keywords: 'контакты MasterClean, телефон, адрес, форма связи, Вроцлав',
      image: `${SITE_URL}/og-contacts.jpg`,
    },
    '/blog': {
      title: 'Блог о чистке и уходе за мебелью — MasterClean',
      description: 'Советы экспертов: как чистить обивку, ухаживать за кожаной мебелью, удалять пятна. Профессиональные подсказки от MasterClean.',
      keywords: 'блог чистка, советы химчистка, удаление пятен, уход за мебелью',
      image: `${SITE_URL}/og-blog.jpg`,
    },
    '/sitemap': { title: 'Карта сайта — MasterClean', description: 'Карта сайта MasterClean — полный список разделов: услуги, цены, контакты, блог.' },
    '/privacy-policy': { title: 'Политика конфиденциальности — MasterClean', description: 'Политика конфиденциальности MasterClean. Обработка персональных данных согласно GDPR.' },
    '/terms': { title: 'Условия использования — MasterClean', description: 'Условия предоставления услуг MasterClean. Условия заказа, оплаты и претензий.' },
    '/cookies': { title: 'Политика cookies — MasterClean', description: 'Информация о файлах cookies на сайте MasterClean. Соответствие GDPR.' },
  },
  en: {
    '/': {
      title: 'MasterClean — Upholstery, carpet cleaning & home cleaning 24/7',
      description: 'Professional upholstery and car interior cleaning, carpets, mattresses, ozone treatment. House cleaning, window washing, handyman. Wroclaw and surroundings.',
      keywords: 'upholstery cleaning, sofa cleaning, carpet cleaning, mattress cleaning, ozone, cleaning service, window washing, Wroclaw',
      image: `${SITE_URL}/og-image.jpg`,
    },
    '/about': {
      title: 'About MasterClean — Professional cleaning team in Wroclaw',
      description: 'Meet MasterClean: experienced team, modern Kärcher and SantoEmma equipment, eco-friendly products. Professional cleaning since 2021.',
      keywords: 'about MasterClean, team, experience, professional cleaning Wroclaw',
      image: `${SITE_URL}/og-about.jpg`,
    },
    '/services': {
      title: 'Upholstery cleaning — Sofa & furniture deep clean',
      description: 'Professional on-site upholstery cleaning: fabric and leather sofas, armchairs, mattresses. Online price calculator. Wroclaw, Opole.',
      keywords: 'upholstery cleaning, sofa cleaning, armchair cleaning, mattress cleaning',
      image: `${SITE_URL}/og-services.jpg`,
    },
    '/prices': {
      title: 'Cleaning prices — Upholstery, carpets, ozone | MasterClean',
      description: 'Up-to-date prices for upholstery cleaning, carpets, mattresses, ozone and home cleaning. Online calculator. Free travel from 180 PLN.',
      keywords: 'upholstery cleaning price, carpet cleaning cost, ozone treatment price',
      image: `${SITE_URL}/og-prices.jpg`,
    },
    '/equipment': {
      title: 'Cleaning equipment — Kärcher, SantoEmma | MasterClean',
      description: 'Professional cleaning equipment: Santoemma extractors, Kärcher Puzzi, steam generators, ozone units. Eco-friendly chemistry.',
      keywords: 'Kärcher equipment, SantoEmma, extraction, professional cleaning',
      image: `${SITE_URL}/og-equipment.jpg`,
    },
    '/impregnation': {
      title: 'Fabric & furniture impregnation — Stain protection',
      description: 'Professional impregnation of furniture, carpets and fabrics. Protection from water, dirt and stains. Hydrophobic coating. Wroclaw, Opole.',
      keywords: 'fabric impregnation, furniture protection, stain protection, hydrophobic coating',
      image: `${SITE_URL}/og-impregnation.jpg`,
    },
    '/auto': {
      title: 'Car interior cleaning — Auto detailing | MasterClean',
      description: 'Professional car interior cleaning on-site. Seats, headliner, mats, trunk. Stain and odour removal. Wroclaw, Opole.',
      keywords: 'car interior cleaning, seat cleaning, car ozone, auto detailing',
      image: `${SITE_URL}/og-auto.jpg`,
    },
    '/ozone': {
      title: 'Ozone treatment for homes and cars — MasterClean',
      description: 'Professional ozone treatment for apartments, offices and cars. Removes odours, bacteria, mould and allergens. Wroclaw and surroundings.',
      keywords: 'apartment ozone, car ozone, odour removal, disinfection',
      image: `${SITE_URL}/og-ozone.jpg`,
    },
    '/windows': {
      title: 'Window cleaning Wroclaw — Streak-free service',
      description: 'Professional window cleaning for homes, apartments and offices. Streak-free glass, frames and sills. Wroclaw and surroundings.',
      keywords: 'window cleaning Wroclaw, streak-free windows, window washing price',
      image: `${SITE_URL}/og-windows.jpg`,
    },
    '/cleaning': {
      title: 'Apartment & house cleaning — Cleaning services',
      description: 'Professional cleaning of apartments, houses and offices on-site. Standard, deep and post-renovation. Eco-friendly products. Wroclaw.',
      keywords: 'apartment cleaning, house cleaning, office cleaning, deep cleaning',
      image: `${SITE_URL}/og-cleaning.jpg`,
    },
    '/handyman': {
      title: 'Handyman Wroclaw — Repairs & furniture assembly',
      description: 'Handyman in Wroclaw: plumbing, electrics, furniture assembly, small home repairs. On-site service 24/7. Fair prices with warranty.',
      keywords: 'handyman Wroclaw, furniture assembly, home repairs, plumber, electrician',
      image: `${SITE_URL}/og-handyman.jpg`,
    },
    '/reviews': {
      title: 'Customer reviews — MasterClean | 5-star ratings',
      description: 'Read MasterClean customer reviews. Upholstery, carpets, ozone treatment — hundreds of 5-star reviews.',
      keywords: 'MasterClean reviews, upholstery cleaning reviews, Fixly reviews',
      image: `${SITE_URL}/og-reviews.jpg`,
    },
    '/contacts': {
      title: 'Contact MasterClean — Call 24/7',
      description: 'Get in touch with MasterClean. Phone: +48 575 211 401. We work 24/7. Wroclaw, Opole, Legnica and more.',
      keywords: 'MasterClean contact, phone, address, contact form, Wroclaw',
      image: `${SITE_URL}/og-contacts.jpg`,
    },
    '/blog': {
      title: 'Cleaning & furniture care blog — MasterClean',
      description: 'Expert advice: how to clean upholstery, care for leather furniture, remove stains. Professional tips from MasterClean.',
      keywords: 'cleaning blog, upholstery tips, stain removal, furniture care',
      image: `${SITE_URL}/og-blog.jpg`,
    },
    '/sitemap': { title: 'Sitemap — MasterClean', description: 'MasterClean sitemap — full list of pages: services, prices, contact, blog.' },
    '/privacy-policy': { title: 'Privacy policy — MasterClean', description: 'MasterClean privacy policy. Personal data processing in compliance with GDPR.' },
    '/terms': { title: 'Terms of service — MasterClean', description: 'MasterClean terms of service. Order, payment and complaint conditions.' },
    '/cookies': { title: 'Cookie policy — MasterClean', description: 'Information on cookies used on MasterClean website. GDPR compliant.' },
  },
  uk: {
    '/': {
      title: 'MasterClean — Хімчистка меблів, чищення та прибирання 24/7',
      description: 'Професійна хімчистка м\'яких меблів і авто, чищення килимів, матраців, озонування. Прибирання, миття вікон, майстер на годину. Вроцлав і околиці.',
      keywords: 'хімчистка меблів, чищення дивана, чищення килимів, матраців, озонування, прибирання, миття вікон, Вроцлав',
      image: `${SITE_URL}/og-image.jpg`,
    },
    '/about': {
      title: 'Про компанію MasterClean — Професійна команда Вроцлав',
      description: 'MasterClean: досвідчена команда, сучасне обладнання Kärcher і SantoEmma, екологічні засоби. Професійне чищення з 2021 року.',
      keywords: 'про нас MasterClean, команда, досвід, професійне чищення Вроцлав',
      image: `${SITE_URL}/og-about.jpg`,
    },
    '/services': {
      title: 'Хімчистка меблів — Чищення диванів і крісел',
      description: 'Професійна хімчистка меблів з виїздом: чищення тканинної і шкіряної оббивки, диванів, крісел, матраців. Онлайн-калькулятор. Вроцлав, Ополе.',
      keywords: 'хімчистка меблів, чищення дивана, чищення крісла, чищення матраца',
      image: `${SITE_URL}/og-services.jpg`,
    },
    '/prices': {
      title: 'Ціни на хімчистку меблів і прибирання — MasterClean',
      description: 'Актуальні ціни на хімчистку меблів, чищення килимів, матраців, озонування та прибирання. Онлайн-калькулятор. Безкоштовний виїзд від 180 PLN.',
      keywords: 'ціни хімчистка меблів, скільки коштує чищення дивана, ціна озонування',
      image: `${SITE_URL}/og-prices.jpg`,
    },
    '/equipment': {
      title: 'Обладнання для хімчистки — Kärcher, SantoEmma',
      description: 'Професійне обладнання для хімчистки: екстрактори Santoemma, Kärcher Puzzi, парогенератори, озонатори. Екологічні засоби.',
      keywords: 'обладнання Kärcher, SantoEmma, екстракція, професійне чищення',
      image: `${SITE_URL}/og-equipment.jpg`,
    },
    '/impregnation': {
      title: 'Імпрегнація меблів і тканин — Захист оббивки',
      description: 'Професійна імпрегнація меблів, килимів і тканин. Захист від води, бруду і плям. Гідрофобне покриття. Вроцлав, Ополе.',
      keywords: 'імпрегнація тканин, імпрегнація меблів, захист від плям, гідрофобне покриття',
      image: `${SITE_URL}/og-impregnation.jpg`,
    },
    '/auto': {
      title: 'Хімчистка салону авто — Чищення автомобіля',
      description: 'Професійна хімчистка салону автомобіля з виїздом. Чищення сидінь, стелі, килимків, багажника. Видалення плям і запахів.',
      keywords: 'хімчистка авто, чищення сидінь, озонування авто, детейлінг',
      image: `${SITE_URL}/og-auto.jpg`,
    },
    '/ozone': {
      title: 'Озонування приміщень і автомобілів — MasterClean',
      description: 'Професійне озонування квартир, офісів і автомобілів. Видалення неприємних запахів, бактерій, грибків і алергенів. Вроцлав.',
      keywords: 'озонування квартири, озонування автомобіля, видалення запахів, дезінфекція',
      image: `${SITE_URL}/og-ozone.jpg`,
    },
    '/windows': {
      title: 'Миття вікон Вроцлав — Професійне чищення скла',
      description: 'Професійне миття вікон у будинках, квартирах і офісах. Без розводів, чищення рам і підвіконь. Вроцлав і околиці.',
      keywords: 'миття вікон Вроцлав, чищення скла, миття вікон ціна',
      image: `${SITE_URL}/og-windows.jpg`,
    },
    '/cleaning': {
      title: 'Прибирання квартир і будинків — Клінінгові послуги',
      description: 'Професійне прибирання квартир, будинків і офісів з виїздом. Генеральне, підтримуюче і після ремонту. Еко-засоби. Вроцлав.',
      keywords: 'прибирання квартир, прибирання будинків, прибирання офісів, генеральне прибирання',
      image: `${SITE_URL}/og-cleaning.jpg`,
    },
    '/handyman': {
      title: 'Майстер на годину Вроцлав — Дрібний ремонт',
      description: 'Майстер на годину Вроцлав: сантехніка, електрика, збірка меблів, дрібний ремонт. Виїзд 24/7. Чесні ціни з гарантією.',
      keywords: 'майстер на годину Вроцлав, збірка меблів, дрібний ремонт, сантехнік, електрик',
      image: `${SITE_URL}/og-handyman.jpg`,
    },
    '/reviews': {
      title: 'Відгуки клієнтів — MasterClean | 5-зіркові оцінки',
      description: 'Відгуки клієнтів про MasterClean. Хімчистка меблів, чищення килимів, озонування — сотні 5-зіркових відгуків.',
      keywords: 'відгуки MasterClean, відгуки хімчистка, відгуки Fixly',
      image: `${SITE_URL}/og-reviews.jpg`,
    },
    '/contacts': {
      title: 'Контакти — MasterClean | Телефонуйте 24/7',
      description: 'Зв\'яжіться з MasterClean. Телефон: +48 575 211 401. Працюємо 24/7. Вроцлав, Ополе, Легниця та інші міста.',
      keywords: 'контакти MasterClean, телефон, адреса, форма зв\'язку, Вроцлав',
      image: `${SITE_URL}/og-contacts.jpg`,
    },
    '/blog': {
      title: 'Блог про чищення та догляд за меблями — MasterClean',
      description: 'Поради експертів: як чистити оббивку, доглядати за шкіряними меблями, видаляти плями. Професійні поради від MasterClean.',
      keywords: 'блог чищення, поради хімчистка, видалення плям, догляд за меблями',
      image: `${SITE_URL}/og-blog.jpg`,
    },
    '/sitemap': { title: 'Карта сайту — MasterClean', description: 'Карта сайту MasterClean — повний список розділів: послуги, ціни, контакти, блог.' },
    '/privacy-policy': { title: 'Політика конфіденційності — MasterClean', description: 'Політика конфіденційності MasterClean. Обробка персональних даних відповідно до GDPR.' },
    '/terms': { title: 'Умови використання — MasterClean', description: 'Умови надання послуг MasterClean. Умови замовлення, оплати і претензій.' },
    '/cookies': { title: 'Політика cookies — MasterClean', description: 'Інформація про файли cookies на сайті MasterClean. Відповідність GDPR.' },
  },
};

// City display names (used for localized city page templates)
const cityDisplayNames: Record<string, string> = {
  wroclaw: 'Wrocław', opole: 'Opole', legnica: 'Legnica', olawa: 'Oława',
  kalisz: 'Kalisz', leszno: 'Leszno', swidnica: 'Świdnica', walbrzych: 'Wałbrzych',
  'ostrow-wielkopolski': 'Ostrów Wielkopolski', 'jelenia-gora': 'Jelenia Góra',
  brzeg: 'Brzeg', lubin: 'Lubin', 'jelcz-laskowice': 'Jelcz-Laskowice',
  strzegom: 'Strzegom', sobotka: 'Sobótka', klodzko: 'Kłodzko',
  kielczow: 'Kiełczów', dzierzoniow: 'Dzierżoniów', nysa: 'Nysa',
  'brzeg-dolny': 'Brzeg Dolny', 'sroda-slaska': 'Środa Śląska', glogow: 'Głogów',
  olesnica: 'Oleśnica', namyslow: 'Namysłów', polkowice: 'Polkowice',
  smolec: 'Smolec', 'katy-wroclawskie': 'Kąty Wrocławskie', siechnice: 'Siechnice',
  'tyniec-maly': 'Tyniec Mały', zmigrod: 'Żmigród', 'bielany-wroclawskie': 'Bielany Wrocławskie',
};

function buildCityMeta(slug: string, lang: Lang): PageMeta {
  const name = cityDisplayNames[slug] || slug;
  const image = `${SITE_URL}/og-${slug}.jpg`;
  switch (lang) {
    case 'ru':
      return {
        title: `Химчистка мебели ${name} — MasterClean`,
        description: `Профессиональная химчистка мебели, чистка ковров, матрасов, озонирование и уборка в городе ${name}. Современное оборудование Kärcher и SantoEmma.`,
        keywords: `химчистка мебели ${name}, чистка ковров ${name}, озонирование ${name}, уборка ${name}`,
        image,
      };
    case 'en':
      return {
        title: `Upholstery cleaning in ${name} — MasterClean`,
        description: `Professional upholstery cleaning, carpets, mattresses, ozone treatment and home cleaning in ${name}. Kärcher and SantoEmma equipment.`,
        keywords: `upholstery cleaning ${name}, carpet cleaning ${name}, ozone ${name}, cleaning service ${name}`,
        image,
      };
    case 'uk':
      return {
        title: `Хімчистка меблів ${name} — MasterClean`,
        description: `Професійна хімчистка меблів, чищення килимів, матраців, озонування та прибирання у місті ${name}. Сучасне обладнання Kärcher і SantoEmma.`,
        keywords: `хімчистка меблів ${name}, чищення килимів ${name}, озонування ${name}, прибирання ${name}`,
        image,
      };
    default:
      return cityPages[slug] || {
        title: `Pranie tapicerki ${name} — MasterClean`,
        description: `Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w mieście ${name}.`,
        keywords: `pranie tapicerki ${name}, czyszczenie dywanów ${name}`,
        image,
      };
  }
}

const blogFallbackByLang: Record<Lang, PageMeta> = {
  pl: {
    title: 'Blog MasterClean — porady czyszczenia, prania tapicerki i pielęgnacji',
    description: 'Artykuł z bloga MasterClean: praktyczne porady o czyszczeniu tapicerki, materacy, dywanów, samochodu i więcej.',
    keywords: 'blog czyszczenie, porady pranie tapicerki, czyszczenie sofy, czyszczenie materaca, ozonowanie',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  ru: {
    title: 'Блог MasterClean — советы по чистке мебели, ковров и уходу',
    description: 'Статья из блога MasterClean: практические советы по чистке мебели, матрасов, ковров, авто и многое другое.',
    keywords: 'блог чистка, советы химчистка, чистка дивана, чистка матраса, озонирование',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  en: {
    title: 'MasterClean blog — cleaning tips for upholstery, carpets and care',
    description: 'A MasterClean blog article: practical advice on cleaning upholstery, mattresses, carpets, car interiors and more.',
    keywords: 'cleaning blog, upholstery tips, sofa cleaning, mattress cleaning, ozone',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
  uk: {
    title: 'Блог MasterClean — поради з чищення меблів, килимів та догляду',
    description: 'Стаття з блогу MasterClean: практичні поради з чищення меблів, матраців, килимів, авто і не тільки.',
    keywords: 'блог чищення, поради хімчистка, чищення дивана, чищення матраца, озонування',
    image: `${SITE_URL}/og-blog.jpg`,
    type: 'article',
  },
};

function getPageMeta(path: string, lang: Lang = 'pl'): PageMeta | null {
  // Static pages: try localized override, fallback to PL
  if (lang !== 'pl' && staticPagesI18n[lang]?.[path]) {
    return { ...staticPages[path], ...staticPagesI18n[lang][path] };
  }
  if (staticPages[path]) return staticPages[path];

  const cityMatch = path.match(/^\/city\/([a-z-]+)$/);
  if (cityMatch && cityDisplayNames[cityMatch[1]]) {
    return buildCityMeta(cityMatch[1], lang);
  }

  const blogMatch = path.match(/^\/blog\/(\d+)$/);
  if (blogMatch) {
    // Per-article PL meta exists; for non-PL we currently serve a generic
    // localized blog fallback (per-article translations live in the SPA).
    if (lang === 'pl' && blogPages[blogMatch[1]]) return blogPages[blogMatch[1]];
    return blogFallbackByLang[lang] || blogFallbackByLang.pl;
  }

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

    // Validate path to prevent open redirect via userinfo (e.g. "@evil.com"),
    // protocol-relative URLs ("//evil.com"), or backslash tricks.
    if (
      !path.startsWith('/') ||
      path.startsWith('//') ||
      path.startsWith('/\\') ||
      /[@\\]/.test(path)
    ) {
      path = '/';
    }

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
