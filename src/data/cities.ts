export interface CityData {
  slug: string;
  name: string;
  region: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  content: {
    pl: { heading: string; subtitle: string; description: string };
    ru: { heading: string; subtitle: string; description: string };
    en: { heading: string; subtitle: string; description: string };
    uk: { heading: string; subtitle: string; description: string };
  };
}

export const cities: CityData[] = [
  {
    slug: 'wroclaw',
    name: 'Wrocław',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Wrocław — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy, ozonowanie i sprzątanie we Wrocławiu. Dojazd gratis. Cennik online.',
      keywords: 'czyszczenie tapicerki Wrocław, pranie dywanów Wrocław, sprzątanie Wrocław, ozonowanie Wrocław',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia we Wrocławiu',
        subtitle: 'Stolica Dolnego Śląska — obsługujemy cały Wrocław i okolice',
        description: 'Wrocław to nasze główne miasto operacyjne. Oferujemy pełen zakres usług czyszczenia tapicerki meblowej, prania dywanów, czyszczenia materacy, ozonowania pomieszczeń i samochodów oraz profesjonalnego sprzątania. Dojazd na terenie Wrocławia gratis przy zamówieniu od 180 PLN. Obsługujemy wszystkie dzielnice: Krzyki, Fabryczna, Psie Pole, Śródmieście i Stare Miasto.',
      },
      ru: {
        heading: 'Услуги химчистки во Вроцлаве',
        subtitle: 'Столица Нижней Силезии — обслуживаем весь Вроцлав и окрестности',
        description: 'Вроцлав — наш основной город. Предлагаем полный спектр услуг: химчистка мягкой мебели, чистка ковров, матрасов, озонирование помещений и авто, профессиональная уборка. Бесплатный выезд по Вроцлаву при заказе от 180 PLN. Работаем во всех районах города.',
      },
      en: {
        heading: 'Cleaning Services in Wrocław',
        subtitle: 'Capital of Lower Silesia — we serve all of Wrocław and surroundings',
        description: 'Wrocław is our main operational city. We offer a full range of upholstery cleaning, carpet cleaning, mattress cleaning, ozone treatment and professional house cleaning. Free travel within Wrocław for orders from 180 PLN. We cover all districts.',
      },
      uk: {
        heading: 'Послуги хімчистки у Вроцлаві',
        subtitle: 'Столиця Нижньої Сілезії — обслуговуємо весь Вроцлав та околиці',
        description: 'Вроцлав — наше основне місто. Пропонуємо повний спектр послуг: хімчистка м\'яких меблів, чистка килимів, матраців, озонування приміщень та авто, професійне прибирання. Безкоштовний виїзд по Вроцлаву при замовленні від 180 PLN.',
      },
    },
  },
  {
    slug: 'opole',
    name: 'Opole',
    region: 'opolskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Opole — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Opolu. Szybki dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Opole, pranie dywanów Opole, sprzątanie Opole, ozonowanie Opole',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Opolu',
        subtitle: 'Stolica województwa opolskiego — regularne wyjazdy z Wrocławia',
        description: 'Opole to jedno z kluczowych miast naszej działalności. Regularnie realizujemy zlecenia w Opolu i powiecie opolskim. Oferujemy pranie tapicerki meblowej, czyszczenie dywanów i wykładzin, ozonowanie mieszkań i biur. Minimalny koszt zamówienia: 300 PLN. Czas dojazdu z Wrocławia — ok. 1 godziny.',
      },
      ru: {
        heading: 'Услуги химчистки в Ополе',
        subtitle: 'Столица Опольского воеводства — регулярные выезды из Вроцлава',
        description: 'Ополе — одно из ключевых направлений нашей работы. Регулярно выполняем заказы в Ополе и районе. Химчистка мебели, чистка ковров, озонирование квартир и офисов. Минимальный заказ: 300 PLN. Время в пути из Вроцлава — около 1 часа.',
      },
      en: {
        heading: 'Cleaning Services in Opole',
        subtitle: 'Capital of Opole Voivodeship — regular trips from Wrocław',
        description: 'Opole is one of our key service cities. We regularly handle orders in Opole and the surrounding area. We offer upholstery cleaning, carpet cleaning, ozone treatment for homes and offices. Minimum order: 300 PLN. Travel time from Wrocław — about 1 hour.',
      },
      uk: {
        heading: 'Послуги хімчистки в Ополе',
        subtitle: 'Столиця Опольського воєводства — регулярні виїзди з Вроцлава',
        description: 'Ополе — один із ключових напрямків нашої роботи. Регулярно виконуємо замовлення в Ополе та районі. Хімчистка меблів, чистка килимів, озонування квартир та офісів. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'legnica',
    name: 'Legnica',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Legnica — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Legnicy. Profesjonalny sprzęt Kärcher.',
      keywords: 'czyszczenie tapicerki Legnica, pranie dywanów Legnica, sprzątanie Legnica',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Legnicy',
        subtitle: 'Trzecie co do wielkości miasto Dolnego Śląska',
        description: 'Legnica to ważny punkt na mapie naszych usług. Świadczymy kompleksowe usługi czyszczenia tapicerki, prania materacy, dywanów oraz ozonowania. Korzystamy z profesjonalnego sprzętu Kärcher i SantoEmma. Obsługujemy również pobliskie miejscowości: Lubin, Chojnów, Złotoryja.',
      },
      ru: {
        heading: 'Услуги химчистки в Легнице',
        subtitle: 'Третий по величине город Нижней Силезии',
        description: 'Легница — важный пункт на карте наших услуг. Предлагаем комплексную химчистку мебели, матрасов, ковров и озонирование. Используем профессиональное оборудование Kärcher и SantoEmma. Обслуживаем также ближайшие города: Любин, Хойнув, Злоторыя.',
      },
      en: {
        heading: 'Cleaning Services in Legnica',
        subtitle: 'Third largest city in Lower Silesia',
        description: 'Legnica is an important point on our service map. We provide comprehensive upholstery cleaning, mattress and carpet cleaning, and ozone treatment. We use professional Kärcher and SantoEmma equipment. We also serve nearby cities.',
      },
      uk: {
        heading: 'Послуги хімчистки в Легниці',
        subtitle: 'Третє за величиною місто Нижньої Сілезії',
        description: 'Легниця — важливий пункт на карті наших послуг. Пропонуємо комплексну хімчистку меблів, матраців, килимів та озонування. Використовуємо професійне обладнання Kärcher і SantoEmma.',
      },
    },
  },
  {
    slug: 'olawa',
    name: 'Oława',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Oława — MasterClean',
      description: 'Pranie tapicerki meblowej, czyszczenie dywanów i ozonowanie w Oławie. Blisko Wrocławia — szybki dojazd.',
      keywords: 'czyszczenie tapicerki Oława, pranie dywanów Oława, sprzątanie Oława',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Oławie',
        subtitle: 'Zaledwie 30 km od Wrocławia — błyskawiczny dojazd',
        description: 'Oława znajduje się w bezpośrednim sąsiedztwie Wrocławia, co pozwala nam realizować zlecenia szybko i wygodnie. Oferujemy pranie tapicerki, czyszczenie materacy, dywanów, ozonowanie oraz sprzątanie mieszkań i domów. Obsługujemy również Jelcz-Laskowice i okolice.',
      },
      ru: {
        heading: 'Услуги химчистки в Олаве',
        subtitle: 'Всего 30 км от Вроцлава — быстрый выезд',
        description: 'Олава расположена в непосредственной близости от Вроцлава, что позволяет нам быстро выполнять заказы. Химчистка мебели, матрасов, ковров, озонирование и уборка квартир и домов. Обслуживаем также Елч-Ласковице и окрестности.',
      },
      en: {
        heading: 'Cleaning Services in Oława',
        subtitle: 'Just 30 km from Wrocław — fast arrival',
        description: 'Oława is located near Wrocław, allowing us to handle orders quickly. We offer upholstery cleaning, mattress and carpet cleaning, ozone treatment and house cleaning. We also serve Jelcz-Laskowice and surrounding areas.',
      },
      uk: {
        heading: 'Послуги хімчистки в Олаві',
        subtitle: 'Лише 30 км від Вроцлава — швидкий виїзд',
        description: 'Олава розташована поруч із Вроцлавом, що дозволяє нам швидко виконувати замовлення. Хімчистка меблів, матраців, килимів, озонування та прибирання квартир і будинків.',
      },
    },
  },
  {
    slug: 'kalisz',
    name: 'Kalisz',
    region: 'wielkopolskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Kalisz — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Kaliszu. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Kalisz, pranie dywanów Kalisz, ozonowanie Kalisz',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Kaliszu',
        subtitle: 'Najstarsze miasto w Polsce — obsługujemy Wielkopolskę',
        description: 'Kalisz to jedno z najstarszych miast w Polsce, a my docieramy tu regularnie. Oferujemy profesjonalne pranie tapicerki meblowej, czyszczenie materacy i dywanów, ozonowanie pomieszczeń. Minimalny koszt zamówienia: 300 PLN. Obsługujemy również Ostrów Wielkopolski i Pleszew.',
      },
      ru: {
        heading: 'Услуги химчистки в Калише',
        subtitle: 'Старейший город Польши — обслуживаем Великопольшу',
        description: 'Калиш — один из старейших городов Польши, и мы регулярно работаем здесь. Химчистка мебели, матрасов, ковров, озонирование помещений. Минимальный заказ: 300 PLN. Обслуживаем также Острув-Великопольский и Плешев.',
      },
      en: {
        heading: 'Cleaning Services in Kalisz',
        subtitle: 'The oldest city in Poland — we serve Greater Poland',
        description: 'Kalisz is one of the oldest cities in Poland, and we regularly work here. Professional upholstery cleaning, mattress and carpet cleaning, ozone treatment. Minimum order: 300 PLN. We also serve Ostrów Wielkopolski and Pleszew.',
      },
      uk: {
        heading: 'Послуги хімчистки в Каліші',
        subtitle: 'Найстаріше місто Польщі — обслуговуємо Великопольщу',
        description: 'Каліш — одне з найстаріших міст Польщі, і ми регулярно працюємо тут. Хімчистка меблів, матраців, килимів, озонування приміщень. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'leszno',
    name: 'Leszno',
    region: 'wielkopolskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Leszno — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i materacy w Lesznie. Profesjonalny sprzęt i środki ekologiczne.',
      keywords: 'czyszczenie tapicerki Leszno, pranie dywanów Leszno, sprzątanie Leszno',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Lesznie',
        subtitle: 'Wielkopolska — regularne dojazdy z Wrocławia',
        description: 'Leszno leży na trasie Wrocław–Poznań, co umożliwia nam regularne realizowanie zleceń. Oferujemy pranie tapicerki meblowej i samochodowej, czyszczenie materacy, dywanów, wykładzin, ozonowanie. Korzystamy z ekologicznych środków bezpiecznych dla dzieci i zwierząt.',
      },
      ru: {
        heading: 'Услуги химчистки в Лешно',
        subtitle: 'Великопольша — регулярные выезды из Вроцлава',
        description: 'Лешно расположено на трассе Вроцлав–Познань, что позволяет нам регулярно выполнять заказы. Химчистка мебели и авто, чистка матрасов, ковров, озонирование. Используем экологичные средства, безопасные для детей и животных.',
      },
      en: {
        heading: 'Cleaning Services in Leszno',
        subtitle: 'Greater Poland — regular trips from Wrocław',
        description: 'Leszno is located on the Wrocław–Poznań route, allowing us to regularly handle orders. Upholstery and car cleaning, mattress and carpet cleaning, ozone treatment. We use eco-friendly products safe for children and pets.',
      },
      uk: {
        heading: 'Послуги хімчистки в Лешні',
        subtitle: 'Великопольща — регулярні виїзди з Вроцлава',
        description: 'Лешно розташоване на трасі Вроцлав–Познань, що дозволяє нам регулярно виконувати замовлення. Хімчистка меблів та авто, чистка матраців, килимів, озонування. Використовуємо екологічні засоби.',
      },
    },
  },
  {
    slug: 'swidnica',
    name: 'Świdnica',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Świdnica — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Świdnicy. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Świdnica, pranie dywanów Świdnica, ozonowanie Świdnica',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Świdnicy',
        subtitle: 'Dolny Śląsk — miasto z Kościołem Pokoju na liście UNESCO',
        description: 'Świdnica to piękne miasto z bogatą historią. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Profesjonalny sprzęt pozwala nam osiągać doskonałe rezultaty nawet przy trudnych zabrudzeniach. Obsługujemy także Dzierżoniów i Żarów.',
      },
      ru: {
        heading: 'Услуги химчистки в Швиднице',
        subtitle: 'Нижняя Силезия — город с Храмом Мира из списка ЮНЕСКО',
        description: 'Швидница — красивый город с богатой историей. Регулярно выполняем заказы на химчистку мебели, матрасов, ковров и озонирование. Профессиональное оборудование позволяет достигать отличных результатов даже при сложных загрязнениях.',
      },
      en: {
        heading: 'Cleaning Services in Świdnica',
        subtitle: 'Lower Silesia — city with the UNESCO Church of Peace',
        description: 'Świdnica is a beautiful city with rich history. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Professional equipment allows us to achieve excellent results even with tough stains.',
      },
      uk: {
        heading: 'Послуги хімчистки у Швидниці',
        subtitle: 'Нижня Сілезія — місто з Храмом Миру зі списку ЮНЕСКО',
        description: 'Швидниця — красиве місто з багатою історією. Регулярно виконуємо замовлення на хімчистку меблів, матраців, килимів та озонування.',
      },
    },
  },
  {
    slug: 'walbrzych',
    name: 'Wałbrzych',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Wałbrzych — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Wałbrzychu. Profesjonalny dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Wałbrzych, pranie dywanów Wałbrzych, ozonowanie Wałbrzych',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Wałbrzychu',
        subtitle: 'Dolnośląskie — miasto Zamku Książ i Tajemniczego Tunelu',
        description: 'Wałbrzych to drugie co do wielkości miasto na Dolnym Śląsku. Oferujemy pranie tapicerki meblowej, czyszczenie materacy, dywanów, ozonowanie mieszkań i samochodów. Obsługujemy także Szczawno-Zdrój, Boguszów-Gorce i Jedlinę-Zdrój. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Валбжихе',
        subtitle: 'Нижняя Силезия — город замка Ксёнж и Таинственного тоннеля',
        description: 'Валбжих — второй по величине город Нижней Силезии. Химчистка мебели, матрасов, ковров, озонирование квартир и автомобилей. Обслуживаем Щавно-Здруй, Богушув-Горце и окрестности. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Wałbrzych',
        subtitle: 'Lower Silesia — city of Książ Castle and the Mystery Tunnel',
        description: 'Wałbrzych is the second largest city in Lower Silesia. We offer upholstery cleaning, mattress and carpet cleaning, ozone treatment for apartments and cars. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки у Валбжиху',
        subtitle: 'Нижня Сілезія — місто замку Ксьонж та Таємничого тунелю',
        description: 'Валбжих — друге за величиною місто Нижньої Сілезії. Хімчистка меблів, матраців, килимів, озонування квартир та автомобілів. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'ostrow-wielkopolski',
    name: 'Ostrów Wielkopolski',
    region: 'wielkopolskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Ostrów Wielkopolski — MasterClean',
      description: 'Profesjonalne pranie tapicerki i ozonowanie w Ostrowie Wielkopolskim. Regularne dojazdy.',
      keywords: 'czyszczenie tapicerki Ostrów Wielkopolski, pranie dywanów Ostrów Wielkopolski',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Ostrowie Wielkopolskim',
        subtitle: 'Wielkopolska — obsługujemy wspólnie z Kaliszem',
        description: 'Ostrów Wielkopolski to ważny punkt na mapie Wielkopolski. Realizujemy zlecenia wspólnie z sąsiednim Kaliszem, co pozwala optymalizować koszty dojazdu. Pranie tapicerki, czyszczenie dywanów, materacy, ozonowanie pomieszczeń. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Острув-Великопольском',
        subtitle: 'Великопольша — обслуживаем вместе с Калишем',
        description: 'Острув-Великопольский — важный пункт на карте Великопольши. Выполняем заказы совместно с соседним Калишем. Химчистка мебели, ковров, матрасов, озонирование. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Ostrów Wielkopolski',
        subtitle: 'Greater Poland — served together with Kalisz',
        description: 'Ostrów Wielkopolski is an important point in Greater Poland. We handle orders together with nearby Kalisz, optimizing travel costs. Upholstery cleaning, carpet and mattress cleaning, ozone treatment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Острув-Великопольському',
        subtitle: 'Великопольща — обслуговуємо разом з Калішем',
        description: 'Острув-Великопольський — важливий пункт на карті Великопольщі. Виконуємо замовлення спільно з сусіднім Калішем. Хімчистка меблів, килимів, матраців, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'jelenia-gora',
    name: 'Jelenia Góra',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Jelenia Góra — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Jeleniej Górze. Profesjonalny serwis z Wrocławia.',
      keywords: 'czyszczenie tapicerki Jelenia Góra, pranie dywanów Jelenia Góra, ozonowanie Jelenia Góra',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Jeleniej Górze',
        subtitle: 'Brama Karkonoszy — czyszczenie w górskim klimacie',
        description: 'Jelenia Góra to brama do Karkonoszy i popularny region turystyczny. Oferujemy usługi czyszczenia tapicerki, materacy, dywanów, ozonowania dla mieszkańców i właścicieli apartamentów wakacyjnych. Idealne rozwiązanie dla obiektów noclegowych — czyste meble i świeże powietrze dla gości.',
      },
      ru: {
        heading: 'Услуги химчистки в Еленя-Гуре',
        subtitle: 'Ворота Карконоше — чистка в горном климате',
        description: 'Еленя-Гура — ворота в Карконоше и популярный туристический регион. Услуги химчистки мебели, матрасов, ковров, озонирования для жителей и владельцев апартаментов. Идеальное решение для объектов размещения — чистая мебель и свежий воздух для гостей.',
      },
      en: {
        heading: 'Cleaning Services in Jelenia Góra',
        subtitle: 'Gateway to the Karkonosze Mountains — cleaning in mountain climate',
        description: 'Jelenia Góra is the gateway to the Karkonosze Mountains and a popular tourist region. We offer upholstery, mattress and carpet cleaning, ozone treatment for residents and vacation apartment owners. Perfect solution for accommodation facilities.',
      },
      uk: {
        heading: 'Послуги хімчистки в Єленя-Ґурі',
        subtitle: 'Ворота Карконоше — чистка в гірському кліматі',
        description: 'Єленя-Ґура — ворота до Карконоше та популярний туристичний регіон. Послуги хімчистки меблів, матраців, килимів, озонування для мешканців та власників апартаментів.',
      },
    },
  },
  {
    slug: 'brzeg',
    name: 'Brzeg',
    region: 'opolskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Brzeg — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Brzegu. Na trasie Wrocław–Opole.',
      keywords: 'czyszczenie tapicerki Brzeg, pranie dywanów Brzeg, sprzątanie Brzeg',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Brzegu',
        subtitle: 'Na trasie Wrocław–Opole — wygodny i szybki dojazd',
        description: 'Brzeg leży dokładnie na trasie między Wrocławiem a Opolem, co czyni go idealnym punktem naszej obsługi. Oferujemy pełen zakres usług: pranie tapicerki, czyszczenie materacy, dywanów, ozonowanie. Obsługujemy także Namysłów i Grodków. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Бжеге',
        subtitle: 'На трассе Вроцлав–Ополе — удобный и быстрый выезд',
        description: 'Бжег расположен на трассе между Вроцлавом и Ополе. Полный спектр услуг: химчистка мебели, матрасов, ковров, озонирование. Обслуживаем также Намыслув и Гродкув. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Brzeg',
        subtitle: 'On the Wrocław–Opole route — convenient and fast access',
        description: 'Brzeg is located right on the route between Wrocław and Opole. Full range of services: upholstery cleaning, mattress and carpet cleaning, ozone treatment. We also serve Namysłów and Grodków. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Бжегу',
        subtitle: 'На трасі Вроцлав–Ополе — зручний та швидкий доїзд',
        description: 'Бжег розташований на трасі між Вроцлавом та Ополе. Повний спектр послуг: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
];

export const getCityBySlug = (slug: string): CityData | undefined => {
  return cities.find(c => c.slug === slug);
};
