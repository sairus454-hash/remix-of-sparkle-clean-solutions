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
  {
    slug: 'lubin',
    name: 'Lubin',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Lubin — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Lubinie. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Lubin, pranie dywanów Lubin, ozonowanie Lubin, sprzątanie Lubin',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Lubinie',
        subtitle: 'Zagłębie Miedziowe — regularne dojazdy z Wrocławia',
        description: 'Lubin to ważne miasto Zagłębia Miedziowego na Dolnym Śląsku. Regularnie realizujemy zlecenia czyszczenia tapicerki meblowej, prania materacy, dywanów, wykładzin oraz ozonowania pomieszczeń. Korzystamy z profesjonalnego sprzętu Kärcher i SantoEmma. Obsługujemy również Polkowice, Głogów i okolice. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Любине',
        subtitle: 'Медный бассейн — регулярные выезды из Вроцлава',
        description: 'Любин — важный город Медного бассейна в Нижней Силезии. Регулярно выполняем заказы на химчистку мебели, матрасов, ковров и озонирование. Используем профессиональное оборудование Kärcher и SantoEmma. Обслуживаем также Полковице, Глогув и окрестности. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Lubin',
        subtitle: 'Copper Basin — regular trips from Wrocław',
        description: 'Lubin is an important city in the Copper Basin of Lower Silesia. We regularly handle upholstery cleaning, mattress and carpet cleaning, and ozone treatment. We use professional Kärcher and SantoEmma equipment. We also serve Polkowice, Głogów and surrounding areas. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Любіні',
        subtitle: 'Мідний басейн — регулярні виїзди з Вроцлава',
        description: 'Любін — важливе місто Мідного басейну в Нижній Сілезії. Регулярно виконуємо замовлення на хімчистку меблів, матраців, килимів та озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'jelcz-laskowice',
    name: 'Jelcz-Laskowice',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Jelcz-Laskowice — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Jelczu-Laskowicach. Blisko Wrocławia i Oławy.',
      keywords: 'czyszczenie tapicerki Jelcz-Laskowice, pranie dywanów Jelcz-Laskowice, ozonowanie Jelcz-Laskowice',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Jelczu-Laskowicach',
        subtitle: 'Zaledwie 25 km od Wrocławia — szybki dojazd',
        description: 'Jelcz-Laskowice to miasto w bezpośrednim sąsiedztwie Wrocławia i Oławy. Regularnie realizujemy zlecenia prania tapicerki meblowej, czyszczenia materacy, dywanów, wykładzin oraz ozonowania. Korzystamy z profesjonalnego sprzętu Kärcher i SantoEmma. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Елч-Ласковице',
        subtitle: 'Всего 25 км от Вроцлава — быстрый выезд',
        description: 'Елч-Ласковице расположен рядом с Вроцлавом и Олавой. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Используем профессиональное оборудование Kärcher и SantoEmma. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Jelcz-Laskowice',
        subtitle: 'Just 25 km from Wrocław — fast arrival',
        description: 'Jelcz-Laskowice is located near Wrocław and Oława. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Professional Kärcher and SantoEmma equipment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Єлч-Ласковіце',
        subtitle: 'Лише 25 км від Вроцлава — швидкий виїзд',
        description: 'Єлч-Ласковіце розташований поруч з Вроцлавом та Олавою. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'strzegom',
    name: 'Strzegom',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Strzegom — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Strzegomiu. Profesjonalny serwis z Wrocławia.',
      keywords: 'czyszczenie tapicerki Strzegom, pranie dywanów Strzegom, ozonowanie Strzegom',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Strzegomiu',
        subtitle: 'Dolny Śląsk — stolica polskiego granitu',
        description: 'Strzegom to miasto znane z wydobycia granitu, leżące niedaleko Świdnicy. Oferujemy profesjonalne pranie tapicerki meblowej, czyszczenie materacy, dywanów, wykładzin oraz ozonowanie pomieszczeń. Obsługujemy również Jawor i okolice. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Стшегоме',
        subtitle: 'Нижняя Силезия — столица польского гранита',
        description: 'Стшегом — город, известный добычей гранита, расположен недалеко от Швидницы. Химчистка мебели, матрасов, ковров, озонирование. Обслуживаем также Явор и окрестности. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Strzegom',
        subtitle: 'Lower Silesia — the capital of Polish granite',
        description: 'Strzegom is known for granite mining, located near Świdnica. We offer upholstery, mattress and carpet cleaning, and ozone treatment. We also serve Jawor and surroundings. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Стшегомі',
        subtitle: 'Нижня Сілезія — столиця польського граніту',
        description: 'Стшегом — місто, відоме видобутком граніту, розташоване неподалік Швидниці. Хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'sobotka',
    name: 'Sobótka',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Sobótka — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Sobótce. U podnóża Ślęży.',
      keywords: 'czyszczenie tapicerki Sobótka, pranie dywanów Sobótka, ozonowanie Sobótka',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Sobótce',
        subtitle: 'U podnóża Ślęży — blisko Wrocławia',
        description: 'Sobótka leży u podnóża góry Ślęży, zaledwie 35 km od Wrocławia. Oferujemy pranie tapicerki meblowej, czyszczenie materacy, dywanów, ozonowanie pomieszczeń i samochodów. Szybki dojazd z Wrocławia. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Собутке',
        subtitle: 'У подножия горы Сленжа — рядом с Вроцлавом',
        description: 'Собутка расположена у подножия горы Сленжа, всего 35 км от Вроцлава. Химчистка мебели, матрасов, ковров, озонирование помещений и авто. Быстрый выезд из Вроцлава. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Sobótka',
        subtitle: 'At the foot of Mount Ślęża — near Wrocław',
        description: 'Sobótka lies at the foot of Mount Ślęża, just 35 km from Wrocław. We offer upholstery, mattress and carpet cleaning, ozone treatment. Fast arrival from Wrocław. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Собутці',
        subtitle: 'Біля підніжжя гори Сленжа — поруч з Вроцлавом',
        description: 'Собутка розташована біля підніжжя гори Сленжа, лише 35 км від Вроцлава. Хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'klodzko',
    name: 'Kłodzko',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Kłodzko — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Kłodzku. Profesjonalny serwis w Kotlinie Kłodzkiej.',
      keywords: 'czyszczenie tapicerki Kłodzko, pranie dywanów Kłodzko, ozonowanie Kłodzko',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Kłodzku',
        subtitle: 'Stolica Kotliny Kłodzkiej — serwis dla mieszkańców i turystyki',
        description: 'Kłodzko to stolica Ziemi Kłodzkiej i ważny ośrodek turystyczny. Oferujemy pranie tapicerki meblowej, czyszczenie materacy, dywanów, ozonowanie pomieszczeń. Idealne rozwiązanie dla pensjonatów i apartamentów. Obsługujemy również Polanicę-Zdrój, Kudowę-Zdrój i Bystrzycę Kłodzką. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Клодзко',
        subtitle: 'Столица Клодзкой котловины — сервис для жителей и туризма',
        description: 'Клодзко — столица Клодзкой земли и важный туристический центр. Химчистка мебели, матрасов, ковров, озонирование. Отличное решение для пансионатов и апартаментов. Обслуживаем Поланицу-Здруй, Кудову-Здруй и Быстрицу-Клодзку. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Kłodzko',
        subtitle: 'Capital of Kłodzko Valley — service for residents and tourism',
        description: 'Kłodzko is the capital of Kłodzko Land and an important tourist center. We offer upholstery, mattress and carpet cleaning, ozone treatment. Perfect for guesthouses and apartments. We also serve Polanica-Zdrój, Kudowa-Zdrój and Bystrzyca Kłodzka. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Клодзко',
        subtitle: 'Столиця Клодзької котловини — сервіс для мешканців і туризму',
        description: 'Клодзко — столиця Клодзької землі та важливий туристичний центр. Хімчистка меблів, матраців, килимів, озонування. Обслуговуємо також Поланицю-Здруй та Кудову-Здруй. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'kielczow',
    name: 'Kiełczów',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Kiełczów — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Kiełczowie. Tuż przy Wrocławiu.',
      keywords: 'czyszczenie tapicerki Kiełczów, pranie dywanów Kiełczów, ozonowanie Kiełczów',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Kiełczowie',
        subtitle: 'Tuż przy Wrocławiu — szybki i wygodny dojazd',
        description: 'Kiełczów to dynamicznie rozwijająca się miejscowość w bezpośrednim sąsiedztwie Wrocławia. Oferujemy pranie tapicerki meblowej, czyszczenie materacy, dywanów, wykładzin, ozonowanie pomieszczeń i samochodów. Dojazd z Wrocławia zajmuje zaledwie kilkanaście minut. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Келчуве',
        subtitle: 'Рядом с Вроцлавом — быстрый и удобный выезд',
        description: 'Келчув — динамично развивающийся населённый пункт рядом с Вроцлавом. Химчистка мебели, матрасов, ковров, озонирование помещений и авто. Время в пути из Вроцлава — всего 15 минут. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Kiełczów',
        subtitle: 'Right next to Wrocław — fast and convenient access',
        description: 'Kiełczów is a rapidly growing town right next to Wrocław. We offer upholstery, mattress and carpet cleaning, ozone treatment. Travel time from Wrocław — just 15 minutes. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Келчуві',
        subtitle: 'Поруч з Вроцлавом — швидкий та зручний доїзд',
        description: 'Келчув — населений пункт, що динамічно розвивається поруч з Вроцлавом. Хімчистка меблів, матраців, килимів, озонування. Час у дорозі з Вроцлава — лише 15 хвилин. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'dzierzoniow',
    name: 'Dzierżoniów',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Dzierżoniów — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Dzierżoniowie. Profesjonalny sprzęt Kärcher.',
      keywords: 'czyszczenie tapicerki Dzierżoniów, pranie dywanów Dzierżoniów, ozonowanie Dzierżoniów',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Dzierżoniowie',
        subtitle: 'Dolny Śląsk — miasto u podnóża Gór Sowich',
        description: 'Dzierżoniów to urokliwe miasto u podnóża Gór Sowich. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Obsługujemy również Bielawę, Pieszyce i Piławę Górną. Korzystamy z profesjonalnego sprzętu Kärcher i SantoEmma. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Дзержонюве',
        subtitle: 'Нижняя Силезия — город у подножия Совиных гор',
        description: 'Дзержонюв — живописный город у подножия Совиных гор. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Обслуживаем Белаву, Пешице и окрестности. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Dzierżoniów',
        subtitle: 'Lower Silesia — city at the foot of the Owl Mountains',
        description: 'Dzierżoniów is a charming city at the foot of the Owl Mountains. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. We also serve Bielawa, Pieszyce and surroundings. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Дзержонюві',
        subtitle: 'Нижня Сілезія — місто біля підніжжя Совиних гір',
        description: 'Дзержонюв — мальовниче місто біля підніжжя Совиних гір. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'nysa',
    name: 'Nysa',
    region: 'opolskie',
    seo: {
      title: 'Czyszczenie tapicerki i sprzątanie Nysa — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Nysie. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Nysa, pranie dywanów Nysa, ozonowanie Nysa',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Nysie',
        subtitle: 'Województwo opolskie — perła Śląska nad Nysą Kłodzką',
        description: 'Nysa to jedno z najstarszych i najpiękniejszych miast Opolszczyzny, nazywane „śląskim Rzymem". Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Korzystamy z profesjonalnego sprzętu Kärcher i SantoEmma. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Нысе',
        subtitle: 'Опольское воеводство — жемчужина Силезии на реке Ныса-Клодзка',
        description: 'Ныса — один из старейших и красивейших городов Опольщины, называемый «силезским Римом». Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Nysa',
        subtitle: 'Opole Voivodeship — the pearl of Silesia on Nysa Kłodzka river',
        description: 'Nysa is one of the oldest and most beautiful cities in the Opole region, called the "Silesian Rome." We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Нисі',
        subtitle: 'Опольське воєводство — перлина Сілезії на річці Ниса-Клодзка',
        description: 'Ниса — одне з найстаріших та найкрасивіших міст Опольщини, зване «сілезьким Римом». Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'brzeg-dolny',
    name: 'Brzeg Dolny',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Brzeg Dolny — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Brzegu Dolnym. Szybki dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Brzeg Dolny, pranie dywanów Brzeg Dolny, ozonowanie Brzeg Dolny',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Brzegu Dolnym',
        subtitle: 'Dolny Śląsk — zaledwie 40 km od Wrocławia',
        description: 'Brzeg Dolny to malownicze miasto nad Odrą, położone w pobliżu Wrocławia. Regularnie realizujemy zlecenia czyszczenia tapicerki meblowej, prania materacy, dywanów oraz ozonowania. Korzystamy z profesjonalnego sprzętu Kärcher i SantoEmma. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Бжег-Дольном',
        subtitle: 'Нижняя Силезия — всего 40 км от Вроцлава',
        description: 'Бжег-Дольный — живописный город на Одре вблизи Вроцлава. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Brzeg Dolny',
        subtitle: 'Lower Silesia — just 40 km from Wrocław',
        description: 'Brzeg Dolny is a picturesque town on the Oder river near Wrocław. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Бжег-Дольному',
        subtitle: 'Нижня Сілезія — лише 40 км від Вроцлава',
        description: 'Бжег-Дольний — мальовниче місто на Одрі поблизу Вроцлава. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'sroda-slaska',
    name: 'Środa Śląska',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Środa Śląska — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Środzie Śląskiej. Blisko Wrocławia.',
      keywords: 'czyszczenie tapicerki Środa Śląska, pranie dywanów Środa Śląska, ozonowanie Środa Śląska',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Środzie Śląskiej',
        subtitle: 'Dolny Śląsk — miasto słynnego skarbu średzkie',
        description: 'Środa Śląska to historyczne miasto znane ze słynnego skarbu średzkiego. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Profesjonalny sprzęt Kärcher i SantoEmma. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Сьроде-Слёнской',
        subtitle: 'Нижняя Силезия — город знаменитого средского клада',
        description: 'Сьрода-Слёнска — историческое город, известный знаменитым средским кладом. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Środa Śląska',
        subtitle: 'Lower Silesia — city of the famous Środa Treasure',
        description: 'Środa Śląska is a historic city known for the famous Środa Treasure. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Сьроді-Сльонській',
        subtitle: 'Нижня Сілезія — місто знаменитого середського скарбу',
        description: 'Сьрода-Сльонска — історичне місто, відоме знаменитим середським скарбом. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'glogow',
    name: 'Głogów',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Głogów — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Głogowie. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Głogów, pranie dywanów Głogów, ozonowanie Głogów',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Głogowie',
        subtitle: 'Dolny Śląsk — historyczne miasto nad Odrą',
        description: 'Głogów to jedno z najstarszych miast Dolnego Śląska z bogatą historią. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Obsługujemy również Polkowice i okolice. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Глогуве',
        subtitle: 'Нижняя Силезия — исторический город на Одре',
        description: 'Глогув — один из старейших городов Нижней Силезии с богатой историей. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Обслуживаем также Полковице и окрестности. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Głogów',
        subtitle: 'Lower Silesia — historic city on the Oder river',
        description: 'Głogów is one of the oldest cities in Lower Silesia with rich history. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. We also serve Polkowice and surroundings. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Глогуві',
        subtitle: 'Нижня Сілезія — історичне місто на Одрі',
        description: 'Глогув — одне з найстаріших міст Нижньої Сілезії з багатою історією. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'olesnica',
    name: 'Oleśnica',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Oleśnica — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Oleśnicy. Szybki dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Oleśnica, pranie dywanów Oleśnica, ozonowanie Oleśnica',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Oleśnicy',
        subtitle: 'Dolny Śląsk — miasto z pięknym zamkiem Książąt Oleśnickich',
        description: 'Oleśnica to urokliwe miasto z pięknym zamkiem i bogatą historią. Położona zaledwie 30 km od Wrocławia. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Олесьнице',
        subtitle: 'Нижняя Силезия — город с красивым замком Олесьницких князей',
        description: 'Олесьница — очаровательный город с красивым замком и богатой историей. Расположена всего в 30 км от Вроцлава. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Oleśnica',
        subtitle: 'Lower Silesia — city with beautiful Oleśnica Castle',
        description: 'Oleśnica is a charming city with a beautiful castle and rich history, located just 30 km from Wrocław. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Олесьниці',
        subtitle: 'Нижня Сілезія — місто з красивим замком Олесьницьких князів',
        description: 'Олесьниця — чарівне місто з красивим замком і багатою історією. Розташована лише за 30 км від Вроцлава. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'namyslow',
    name: 'Namysłów',
    region: 'opolskie',
    seo: {
      title: 'Czyszczenie tapicerki Namysłów — MasterClean',
      description: 'Pranie tapicerki, czyszczenie dywanów i ozonowanie w Namysłowie. Profesjonalny sprzęt Kärcher.',
      keywords: 'czyszczenie tapicerki Namysłów, pranie dywanów Namysłów, ozonowanie Namysłów',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Namysłowie',
        subtitle: 'Województwo opolskie — miasto znane z browaru i średniowiecznych murów',
        description: 'Namysłów to historyczne miasto znane z browaru i dobrze zachowanych średniowiecznych murów obronnych. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Намыслуве',
        subtitle: 'Опольское воеводство — город пивоварни и средневековых стен',
        description: 'Намыслув — исторический город, известный пивоварней и хорошо сохранившимися средневековыми оборонительными стенами. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Namysłów',
        subtitle: 'Opole Voivodeship — city known for its brewery and medieval walls',
        description: 'Namysłów is a historic city known for its brewery and well-preserved medieval defensive walls. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Намислуві',
        subtitle: 'Опольське воєводство — місто пивоварні та середньовічних мурів',
        description: 'Намислув — історичне місто, відоме пивоварнею та добре збереженими середньовічними оборонними мурами. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'polkowice',
    name: 'Polkowice',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Polkowice — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów i ozonowanie w Polkowicach. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Polkowice, pranie dywanów Polkowice, ozonowanie Polkowice',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Polkowicach',
        subtitle: 'Zagłębie Miedziowe — dynamicznie rozwijające się miasto',
        description: 'Polkowice to nowoczesne i dynamicznie rozwijające się miasto w sercu Zagłębia Miedziowego. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Obsługujemy również Lubin i Głogów. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Полковицах',
        subtitle: 'Медный бассейн — динамично развивающийся город',
        description: 'Полковице — современный и динамично развивающийся город в сердце Медного бассейна. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Обслуживаем также Любин и Глогув. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Polkowice',
        subtitle: 'Copper Basin — a dynamically developing city',
        description: 'Polkowice is a modern and dynamically developing city in the heart of the Copper Basin. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. We also serve Lubin and Głogów. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Полковицях',
        subtitle: 'Мідний басейн — динамічно розвинуте місто',
        description: 'Полковице — сучасне та динамічно розвинуте місто в серці Мідного басейну. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'smolec',
    name: 'Smolec',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Smolec — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Smolcu. Ceny jak we Wrocławiu. Dojazd gratis.',
      keywords: 'czyszczenie tapicerki Smolec, pranie dywanów Smolec, ozonowanie Smolec, sprzątanie Smolec',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Smolcu',
        subtitle: 'Tuż przy Wrocławiu — ceny miejskie, dojazd gratis',
        description: 'Smolec to dynamicznie rozwijająca się miejscowość bezpośrednio przy Wrocławiu. Oferujemy pełen zakres usług: pranie tapicerki meblowej i samochodowej, czyszczenie materacy, dywanów, ozonowanie, mycie okien, sprzątanie i usługi złotej rączki — w cenach wrocławskich. Dojazd gratis przy zamówieniu od 180 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Смольце',
        subtitle: 'Рядом с Вроцлавом — городские цены, бесплатный выезд',
        description: 'Смолец — динамично развивающийся пригород Вроцлава. Предлагаем полный спектр услуг: химчистка мебели и авто, чистка матрасов и ковров, озонирование, мойка окон, уборка и мастер на час — по вроцлавским ценам. Бесплатный выезд при заказе от 180 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Smolec',
        subtitle: 'Right next to Wrocław — city prices, free travel',
        description: 'Smolec is a dynamically growing suburb right next to Wrocław. We offer the full range of services: upholstery and car cleaning, mattress and carpet cleaning, ozone treatment, window cleaning, house cleaning and handyman — at Wrocław prices. Free travel for orders from 180 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки у Смольці',
        subtitle: 'Поруч з Вроцлавом — міські ціни, безкоштовний виїзд',
        description: 'Смолець — динамічно розвинутий передмістя Вроцлава. Пропонуємо повний спектр послуг: хімчистка меблів та авто, чистка матраців і килимів, озонування, миття вікон, прибирання та майстер на годину — за вроцлавськими цінами. Безкоштовний виїзд при замовленні від 180 PLN.',
      },
    },
  },
  {
    slug: 'katy-wroclawskie',
    name: 'Kąty Wrocławskie',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Kąty Wrocławskie — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Kątach Wrocławskich. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Kąty Wrocławskie, pranie dywanów Kąty Wrocławskie, ozonowanie Kąty Wrocławskie',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Kątach Wrocławskich',
        subtitle: 'Blisko Wrocławia — wygodny dojazd i atrakcyjne ceny',
        description: 'Kąty Wrocławskie to urokliwa gmina w bezpośrednim sąsiedztwie Wrocławia. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Profesjonalny sprzęt Kärcher i SantoEmma. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Контах Вроцлавских',
        subtitle: 'Рядом с Вроцлавом — удобный выезд и привлекательные цены',
        description: 'Конты Вроцлавские — живописная гмина рядом с Вроцлавом. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Профессиональное оборудование Kärcher и SantoEmma. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Kąty Wrocławskie',
        subtitle: 'Near Wrocław — convenient access and attractive prices',
        description: 'Kąty Wrocławskie is a charming municipality right next to Wrocław. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Professional Kärcher and SantoEmma equipment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Контах Вроцлавських',
        subtitle: 'Поруч з Вроцлавом — зручний виїзд та привабливі ціни',
        description: 'Конти Вроцлавські — мальовнича ґміна поруч з Вроцлавом. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'siechnice',
    name: 'Siechnice',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Siechnice — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Siechnicach. Szybki dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Siechnice, pranie dywanów Siechnice, ozonowanie Siechnice',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Siechnicach',
        subtitle: 'Tuż za Wrocławiem — szybki dojazd i profesjonalna obsługa',
        description: 'Siechnice to dynamicznie rozwijająca się gmina na obrzeżach Wrocławia. Regularnie realizujemy zlecenia czyszczenia tapicerki meblowej, materacy, dywanów i ozonowania. Korzystamy z profesjonalnego sprzętu Kärcher i SantoEmma. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Сехницах',
        subtitle: 'Сразу за Вроцлавом — быстрый выезд и профессиональное обслуживание',
        description: 'Сехнице — динамично развивающаяся гмина на окраине Вроцлава. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Профессиональное оборудование Kärcher и SantoEmma. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Siechnice',
        subtitle: 'Just outside Wrocław — fast arrival and professional service',
        description: 'Siechnice is a dynamically growing municipality on the outskirts of Wrocław. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Professional Kärcher and SantoEmma equipment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Сехницях',
        subtitle: 'Відразу за Вроцлавом — швидкий виїзд і професійне обслуговування',
        description: 'Сехнице — динамічно розвинута ґміна на околиці Вроцлава. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'tyniec-maly',
    name: 'Tyniec Mały',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Tyniec Mały — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Tyńcu Małym. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Tyniec Mały, pranie dywanów Tyniec Mały, ozonowanie Tyniec Mały',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Tyńcu Małym',
        subtitle: 'W sąsiedztwie Wrocławia — profesjonalne czyszczenie na miejscu',
        description: 'Tyniec Mały to spokojne osiedle w bezpośrednim sąsiedztwie Wrocławia. Regularnie realizujemy zlecenia czyszczenia tapicerki, materacy, dywanów i ozonowania. Profesjonalny sprzęt i ekologiczne środki czyszczące. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Тыньце Малом',
        subtitle: 'По соседству с Вроцлавом — профессиональная чистка на месте',
        description: 'Тынец Малы — тихий район рядом с Вроцлавом. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Профессиональное оборудование и экологичные средства. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Tyniec Mały',
        subtitle: 'Next to Wrocław — professional cleaning on site',
        description: 'Tyniec Mały is a quiet residential area right next to Wrocław. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Professional equipment and eco-friendly cleaning products. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Тиньці Малому',
        subtitle: 'Поруч з Вроцлавом — професійне чищення на місці',
        description: 'Тинець Малий — тихий район поруч з Вроцлавом. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'zmigrod',
    name: 'Żmigród',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Żmigród — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Żmigrodzie. Dojazd z Wrocławia.',
      keywords: 'czyszczenie tapicerki Żmigród, pranie dywanów Żmigród, ozonowanie Żmigród',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Żmigrodzie',
        subtitle: 'Dolina Baryczy — profesjonalne usługi czyszczenia',
        description: 'Żmigród to malownicze miasto w Dolinie Baryczy. Regularnie realizujemy zlecenia czyszczenia tapicerki meblowej, materacy, dywanów i ozonowania. Profesjonalny sprzęt Kärcher i SantoEmma. Minimalny koszt zamówienia: 300 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Жмигруде',
        subtitle: 'Долина Барычи — профессиональные услуги чистки',
        description: 'Жмигруд — живописный город в Долине Барычи. Регулярно выполняем заказы: химчистка мебели, матрасов, ковров, озонирование. Профессиональное оборудование Kärcher и SantoEmma. Минимальный заказ: 300 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Żmigród',
        subtitle: 'Barycz Valley — professional cleaning services',
        description: 'Żmigród is a picturesque town in the Barycz Valley. We regularly handle upholstery, mattress and carpet cleaning, and ozone treatment. Professional Kärcher and SantoEmma equipment. Minimum order: 300 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Жмігруді',
        subtitle: 'Долина Баричі — професійні послуги чищення',
        description: 'Жмігруд — мальовниче місто в Долині Баричі. Регулярно виконуємо замовлення: хімчистка меблів, матраців, килимів, озонування. Мінімальне замовлення: 300 PLN.',
      },
    },
  },
  {
    slug: 'bielany-wroclawskie',
    name: 'Bielany Wrocławskie',
    region: 'dolnośląskie',
    seo: {
      title: 'Czyszczenie tapicerki Bielany Wrocławskie — MasterClean',
      description: 'Profesjonalne pranie tapicerki, czyszczenie dywanów, materacy i ozonowanie w Bielanach Wrocławskich. Ceny jak we Wrocławiu. Dojazd gratis.',
      keywords: 'czyszczenie tapicerki Bielany Wrocławskie, pranie dywanów Bielany Wrocławskie, ozonowanie Bielany Wrocławskie',
    },
    content: {
      pl: {
        heading: 'Usługi czyszczenia w Bielanach Wrocławskich',
        subtitle: 'Tuż przy Wrocławiu — ceny miejskie, dojazd gratis',
        description: 'Bielany Wrocławskie to prężnie rozwijająca się miejscowość w bezpośrednim sąsiedztwie Wrocławia. Oferujemy pełen zakres usług: pranie tapicerki meblowej i samochodowej, czyszczenie materacy, dywanów, ozonowanie, mycie okien, sprzątanie i usługi złotej rączki — w cenach wrocławskich. Dojazd gratis przy zamówieniu od 180 PLN.',
      },
      ru: {
        heading: 'Услуги химчистки в Беланах Вроцлавских',
        subtitle: 'Рядом с Вроцлавом — городские цены, бесплатный выезд',
        description: 'Беланы Вроцлавские — динамично развивающийся пригород Вроцлава. Предлагаем полный спектр услуг: химчистка мебели и авто, чистка матрасов и ковров, озонирование, мойка окон, уборка и мастер на час — по вроцлавским ценам. Бесплатный выезд при заказе от 180 PLN.',
      },
      en: {
        heading: 'Cleaning Services in Bielany Wrocławskie',
        subtitle: 'Right next to Wrocław — city prices, free travel',
        description: 'Bielany Wrocławskie is a dynamically growing suburb right next to Wrocław. We offer the full range of services: upholstery and car cleaning, mattress and carpet cleaning, ozone treatment, window cleaning, house cleaning and handyman — at Wrocław prices. Free travel for orders from 180 PLN.',
      },
      uk: {
        heading: 'Послуги хімчистки в Беланах Вроцлавських',
        subtitle: 'Поруч з Вроцлавом — міські ціни, безкоштовний виїзд',
        description: 'Белани Вроцлавські — динамічно розвинуте передмістя Вроцлава. Пропонуємо повний спектр послуг: хімчистка меблів та авто, чистка матраців і килимів, озонування, миття вікон, прибирання та майстер на годину — за вроцлавськими цінами. Безкоштовний виїзд при замовленні від 180 PLN.',
      },
    },
  },
];

export const getCityBySlug = (slug: string): CityData | undefined => {
  return cities.find(c => c.slug === slug);
};
