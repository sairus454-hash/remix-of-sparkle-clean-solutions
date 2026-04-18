import { CityProfile } from './cityProfiles';

type Lang = 'pl' | 'ru' | 'en' | 'uk';

// Простой детерминированный хеш по slug — чтобы каждый город всегда получал один и тот же
// «вариант» текста, но между городами — разные.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const pick = <T,>(arr: T[], seed: number): T => arr[seed % arr.length];

// =========================================================================
// УНИКАЛЬНЫЕ АБЗАЦЫ ОПИСАНИЯ
// =========================================================================
// Для каждого языка — массив «строительных блоков» (вступление, услуги, преимущества).
// Генератор выбирает по 3 блока (intro + services + closing), что даёт сотни комбинаций.

const INTROS: Record<Lang, string[]> = {
  pl: [
    'Działamy na terenie {city} regularnie i konsekwentnie rozwijamy bazę zadowolonych klientów.',
    'Mieszkańcy {city} mogą liczyć na nasz serwis o dowolnej porze tygodnia, również w weekendy.',
    '{city} to jeden z punktów, do których kierujemy nasze ekipy w pierwszej kolejności.',
    'W {city} świadczymy usługi z zachowaniem tych samych standardów jakości jak we Wrocławiu.',
    'Klienci z {city} cenią nas za punktualność i dokładność wykonanej pracy.',
    'Realizacje w {city} prowadzimy zarówno dla klientów indywidualnych, jak i firm.',
  ],
  ru: [
    'Мы регулярно работаем в городе {city} и постепенно расширяем базу довольных клиентов.',
    'Жители {city} могут рассчитывать на наш сервис в любой день недели, включая выходные.',
    '{city} — один из приоритетных пунктов, куда наши бригады выезжают в первую очередь.',
    'В {city} мы соблюдаем те же стандарты качества, что и во Вроцлаве.',
    'Клиенты из {city} отмечают нашу пунктуальность и тщательность выполнения работы.',
    'Заказы в {city} выполняем как для частных клиентов, так и для компаний.',
  ],
  en: [
    'We operate in {city} regularly and consistently grow our base of happy customers.',
    'Residents of {city} can rely on our service any day of the week, weekends included.',
    '{city} is one of the priority destinations for our crews.',
    'In {city} we maintain the same quality standards as in Wrocław.',
    'Customers from {city} value us for punctuality and thoroughness.',
    'Orders in {city} are handled both for private clients and companies.',
  ],
  uk: [
    'Ми регулярно працюємо в {city} та поступово розширюємо базу задоволених клієнтів.',
    'Мешканці {city} можуть розраховувати на наш сервіс будь-якого дня тижня, включаючи вихідні.',
    '{city} — один із пріоритетних пунктів, куди наші бригади виїжджають першочергово.',
    'У {city} ми дотримуємося тих самих стандартів якості, що і у Вроцлаві.',
    'Клієнти з {city} цінують нас за пунктуальність та ретельність роботи.',
    'Замовлення в {city} виконуємо як для приватних клієнтів, так і для компаній.',
  ],
};

const EMPHASIS_BLOCKS: Record<string, Record<Lang, string[]>> = {
  speed: {
    pl: [
      'Bliskość {city} pozwala nam reagować błyskawicznie — często jesteśmy na miejscu jeszcze tego samego dnia.',
      'Krótka odległość od Wrocławia oznacza minimalne koszty dojazdu i elastyczne terminy.',
      'Małe odległości to także większa elastyczność: możemy podjechać dosłownie w przerwie między zleceniami.',
    ],
    ru: [
      'Близость {city} позволяет нам реагировать оперативно — часто приезжаем в тот же день.',
      'Небольшое расстояние от Вроцлава означает минимальные затраты на выезд и гибкие сроки.',
      'Короткое плечо до {city} даёт нам возможность приехать буквально между заказами.',
    ],
    en: [
      'The proximity of {city} lets us respond fast — often the same day you call.',
      'Short distance from Wrocław means minimal travel cost and flexible scheduling.',
      'Being close also means we can fit you in literally between other jobs.',
    ],
    uk: [
      'Близькість {city} дозволяє нам реагувати оперативно — часто приїжджаємо того ж дня.',
      'Невелика відстань від Вроцлава означає мінімальні витрати на виїзд та гнучкі терміни.',
      'Коротке плече до {city} дає можливість приїхати буквально між іншими замовленнями.',
    ],
  },
  fullRange: {
    pl: [
      'W {city} oferujemy pełen katalog usług: pranie tapicerki, czyszczenie dywanów i materacy oraz ozonowanie.',
      'Nasza oferta w {city} obejmuje zarówno pojedyncze zlecenia, jak i kompleksową obsługę dużych obiektów.',
      'Dostępne są wszystkie nasze usługi specjalistyczne — od ozonowania po impregnację tkanin.',
    ],
    ru: [
      'В {city} доступен полный каталог услуг: химчистка мебели, чистка ковров и матрасов, озонирование.',
      'Наше предложение в {city} включает как разовые заказы, так и комплексное обслуживание объектов.',
      'Доступны все специализированные услуги — от озонирования до импрегнации тканей.',
    ],
    en: [
      'In {city} the full service catalogue is available: upholstery cleaning, carpets, mattresses and ozonation.',
      'Our {city} offering covers both one-off orders and comprehensive servicing of larger facilities.',
      'All specialized services are available — from ozone treatment to fabric impregnation.',
    ],
    uk: [
      'У {city} доступний повний каталог послуг: хімчистка меблів, чистка килимів та матраців, озонування.',
      'Наша пропозиція у {city} охоплює як разові замовлення, так і комплексне обслуговування об\'єктів.',
      'Доступні всі спеціалізовані послуги — від озонування до імпрегнації тканин.',
    ],
  },
  tourism: {
    pl: [
      'Sprawdzamy się szczególnie w obsłudze obiektów noclegowych z {city} — pensjonatów, apartamentów wakacyjnych i hoteli.',
      'Świeże, czyste tapicerki i brak zapachów są kluczowe dla branży turystycznej, dlatego inwestujemy w sprzęt klasy profesjonalnej.',
      'Po sezonie turystycznym chętnie wykonujemy generalne odświeżenia całego wyposażenia obiektu.',
    ],
    ru: [
      'Особенно хорошо мы себя проявляем в обслуживании туристических объектов в {city} — пансионатов, апартаментов и отелей.',
      'Свежая чистая мебель и отсутствие запахов критичны для туристической отрасли, поэтому используем профессиональное оборудование.',
      'После сезона мы охотно выполняем генеральное обновление всего оборудования объекта.',
    ],
    en: [
      'We are particularly well suited to servicing accommodation in {city} — guesthouses, holiday apartments and hotels.',
      'Fresh upholstery and no odours are critical for tourism, which is why we invest in professional-grade equipment.',
      'After the season we are happy to perform a full refresh of all furnishings.',
    ],
    uk: [
      'Ми особливо добре підходимо для обслуговування об\'єктів розміщення у {city} — пансіонатів, апартаментів і готелів.',
      'Свіжі меблі та відсутність запахів критичні для туристичної галузі, тому інвестуємо в професійне обладнання.',
      'Після сезону охоче виконуємо генеральне оновлення всього оснащення об\'єкта.',
    ],
  },
  industry: {
    pl: [
      'W {city} obsługujemy wielu klientów z sektora przemysłowego — biura, świetlice pracownicze i mieszkania pracowników.',
      'Realizujemy zlecenia także dla firm cateringowych i obiektów zbiorowego żywienia w {city}.',
      'Dla klientów biznesowych z {city} oferujemy faktury VAT i rozliczenia okresowe.',
    ],
    ru: [
      'В {city} мы обслуживаем многих клиентов промышленного сектора — офисы, комнаты отдыха персонала и квартиры сотрудников.',
      'Выполняем заказы и для предприятий общественного питания в {city}.',
      'Для бизнес-клиентов из {city} предоставляем VAT-фактуры и периодические расчёты.',
    ],
    en: [
      'In {city} we serve many industrial-sector clients — offices, staff lounges and employee apartments.',
      'We also handle orders for catering companies and food-service facilities in {city}.',
      'For business clients in {city} we issue VAT invoices and offer recurring billing.',
    ],
    uk: [
      'У {city} ми обслуговуємо багатьох клієнтів промислового сектору — офіси, кімнати відпочинку персоналу та квартири співробітників.',
      'Виконуємо замовлення і для підприємств громадського харчування у {city}.',
      'Для бізнес-клієнтів з {city} надаємо ПДВ-фактури та періодичні розрахунки.',
    ],
  },
  history: {
    pl: [
      'Stare kamienice {city} to często wyzwanie konserwatorskie — wiemy, jak ostrożnie podejść do delikatnych tkanin i mebli z duszą.',
      'Mieszkania w zabytkowej części {city} obsługujemy ze szczególną starannością i bez ryzyka uszkodzeń.',
      'Specjalizujemy się również w odświeżaniu mebli z duszą i tapicerek o nietypowej fakturze.',
    ],
    ru: [
      'Старые квартиры {city} — часто вызов: мы знаем, как аккуратно подойти к деликатным тканям и винтажной мебели.',
      'Квартиры в исторической части {city} обслуживаем с особой аккуратностью и без риска повреждений.',
      'Также специализируемся на освежении мебели с историей и тканей нестандартной фактуры.',
    ],
    en: [
      'Old townhouses in {city} are often a delicate challenge — we know how to handle vintage fabrics and furniture.',
      'Apartments in the historic part of {city} are serviced with extra care and zero risk of damage.',
      'We also specialise in refreshing vintage furniture and unusual upholstery textures.',
    ],
    uk: [
      'Старі квартири {city} — часто виклик: ми знаємо, як обережно підійти до делікатних тканин і вінтажних меблів.',
      'Квартири в історичній частині {city} обслуговуємо з особливою акуратністю.',
      'Також спеціалізуємося на освіженні меблів з історією та тканин незвичайної фактури.',
    ],
  },
  suburb: {
    pl: [
      'Sąsiedztwo Wrocławia sprawia, że naszych klientów z {city} traktujemy niemal jak wrocławskich — z porównywalną szybkością reakcji.',
      'Wiele osób z {city} dojeżdża do pracy do Wrocławia, dlatego cenimy elastyczne godziny popołudniowe i wieczorne.',
      'W {city} pracujemy często, dzięki czemu znamy okoliczne osiedla, dojazdy i preferencje mieszkańców.',
    ],
    ru: [
      'Соседство с Вроцлавом позволяет нам обслуживать клиентов из {city} почти как вроцлавских — с сопоставимой скоростью реакции.',
      'Многие жители {city} ездят на работу во Вроцлав, поэтому мы ценим гибкое вечернее время.',
      'В {city} мы работаем часто, благодаря чему знаем районы, подъезды и предпочтения жильцов.',
    ],
    en: [
      'Being right next to Wrocław means we treat customers from {city} almost like locals — with comparable response time.',
      'Many residents of {city} commute to Wrocław, so we appreciate flexible afternoon and evening slots.',
      'We work in {city} often and know the local estates, access routes and tenants\' preferences.',
    ],
    uk: [
      'Сусідство з Вроцлавом дозволяє нам обслуговувати клієнтів з {city} майже як вроцлавських — з порівнянною швидкістю реакції.',
      'Багато мешканців {city} їздять на роботу до Вроцлава, тому ми цінуємо гнучкі вечірні години.',
      'У {city} ми працюємо часто і знаємо райони, під\'їзди та вподобання мешканців.',
    ],
  },
};

const CLOSINGS: Record<Lang, string[]> = {
  pl: [
    'Skontaktuj się telefonicznie lub przez formularz, by ustalić dogodny termin w {city}.',
    'Wycenę dla {city} przygotujemy w kilka minut — wystarczy podać liczbę mebli i metraż.',
    'Dla większych zleceń w {city} oferujemy indywidualne rabaty i dogodne formy płatności.',
    'Pamiętaj, że minimalna wartość zamówienia poza Wrocławiem wynosi 220 PLN.',
  ],
  ru: [
    'Свяжитесь с нами по телефону или через форму, чтобы согласовать удобное время в {city}.',
    'Расчёт для {city} мы подготовим за пару минут — достаточно указать количество мебели и метраж.',
    'Для крупных заказов в {city} предлагаем индивидуальные скидки и удобные формы оплаты.',
    'Помните: минимальная сумма заказа за пределами Вроцлава — 220 PLN.',
  ],
  en: [
    'Contact us by phone or via the form to schedule a convenient slot in {city}.',
    'A quote for {city} takes a couple of minutes — just tell us the number of items and floor area.',
    'For larger orders in {city} we offer custom discounts and flexible payment options.',
    'Note: the minimum order outside Wrocław is 220 PLN.',
  ],
  uk: [
    'Зв\'яжіться з нами по телефону або через форму, щоб узгодити зручний час у {city}.',
    'Розрахунок для {city} підготуємо за пару хвилин — достатньо вказати кількість меблів і метраж.',
    'Для великих замовлень у {city} пропонуємо індивідуальні знижки та зручні способи оплати.',
    'Пам\'ятайте: мінімальна сума замовлення поза Вроцлавом — 220 PLN.',
  ],
};

const LANDMARK_SENTENCES: Record<Lang, (city: string, landmark: string) => string> = {
  pl: (c, l) => `Pracując w okolicy ${c}, często bywamy w pobliżu takich punktów jak ${l}.`,
  ru: (c, l) => `Работая в районе ${c}, мы часто бываем рядом с такими местами, как ${l}.`,
  en: (c, l) => `Working in the ${c} area, we often pass landmarks like ${l}.`,
  uk: (c, l) => `Працюючи в районі ${c}, ми часто буваємо біля таких місць, як ${l}.`,
};

const NEARBY_SENTENCES: Record<Lang, (city: string, list: string) => string> = {
  pl: (c, l) => `Z ${c} przy okazji obsługujemy także: ${l}.`,
  ru: (c, l) => `Из ${c} попутно обслуживаем также: ${l}.`,
  en: (c, l) => `From ${c} we additionally serve: ${l}.`,
  uk: (c, l) => `З ${c} попутно обслуговуємо також: ${l}.`,
};

export interface GeneratedCityContent {
  paragraphs: string[];        // 3-4 уникальных абзаца
  faqs: { q: string; a: string }[];  // 2 уникальных FAQ
}

export function generateCityContent(
  cityName: string,
  slug: string,
  lang: Lang,
  profile: CityProfile,
): GeneratedCityContent {
  const seed = hash(slug);
  const replace = (s: string) => s.split('{city}').join(cityName);

  const intro = replace(pick(INTROS[lang], seed));
  const emphasisBlock = replace(pick(EMPHASIS_BLOCKS[profile.emphasis][lang], seed >> 3));
  const closing = replace(pick(CLOSINGS[lang], seed >> 5));

  const paragraphs: string[] = [intro, emphasisBlock];

  if (profile.landmark) {
    paragraphs.push(LANDMARK_SENTENCES[lang](cityName, profile.landmark));
  }
  if (profile.nearby && profile.nearby.length > 0) {
    paragraphs.push(NEARBY_SENTENCES[lang](cityName, profile.nearby.join(', ')));
  }
  paragraphs.push(closing);

  // ===== FAQ — два уникальных вопроса по профилю =====
  const faqs = generateFaqs(cityName, slug, lang, profile, seed);

  return { paragraphs, faqs };
}

function generateFaqs(
  city: string,
  slug: string,
  lang: Lang,
  profile: CityProfile,
  seed: number,
): { q: string; a: string }[] {
  const distance = profile.distanceKm ?? 50;

  // Вопрос 1 — про дорогу/время до города
  const Q1: Record<Lang, string[]> = {
    pl: [
      `Jak długo trwa dojazd ekipy do ${city}?`,
      `Ile czasu zajmuje wam dotarcie na miejsce w ${city}?`,
      `Kiedy najwcześniej możemy umówić wizytę w ${city}?`,
    ],
    ru: [
      `Сколько времени занимает дорога вашей бригады до ${city}?`,
      `За какое время вы доезжаете до ${city}?`,
      `Когда самое раннее можно записаться в ${city}?`,
    ],
    en: [
      `How long does it take you to reach ${city}?`,
      `What is the typical travel time to ${city}?`,
      `What is the earliest visit you can offer in ${city}?`,
    ],
    uk: [
      `Скільки часу займає дорога вашої бригади до ${city}?`,
      `За який час ви доїжджаєте до ${city}?`,
      `Коли найшвидше можна записатися у ${city}?`,
    ],
  };

  const A1: Record<Lang, string> = {
    pl: distance <= 25
      ? `Z Wrocławia dojeżdżamy do ${city} w mniej niż 30 minut. Często możemy zaproponować wizytę jeszcze tego samego lub następnego dnia roboczego.`
      : distance <= 60
        ? `Dojazd z Wrocławia do ${city} zajmuje około ${Math.round(distance / 60 * 60)} minut (ok. ${distance} km). Najczęściej proponujemy termin w ciągu 1–3 dni.`
        : `${city} jest oddalone od Wrocławia o około ${distance} km. Wyjazdy w tę okolicę planujemy z 2–4-dniowym wyprzedzeniem, łącząc kilka zleceń jednego dnia.`,
    ru: distance <= 25
      ? `Из Вроцлава мы добираемся до ${city} менее чем за 30 минут. Часто можем приехать в тот же или на следующий рабочий день.`
      : distance <= 60
        ? `Дорога из Вроцлава до ${city} занимает около ${Math.round(distance / 60 * 60)} минут (≈ ${distance} км). Чаще всего предлагаем визит в течение 1–3 дней.`
        : `${city} находится примерно в ${distance} км от Вроцлава. Выезды в этот район планируем за 2–4 дня, объединяя несколько заказов в один день.`,
    en: distance <= 25
      ? `From Wrocław we reach ${city} in under 30 minutes. We can often offer same-day or next-day appointments.`
      : distance <= 60
        ? `Travel from Wrocław to ${city} takes about ${Math.round(distance / 60 * 60)} minutes (≈ ${distance} km). Visits are usually scheduled within 1–3 days.`
        : `${city} is about ${distance} km from Wrocław. Trips to this area are planned 2–4 days ahead, combining several jobs in a single day.`,
    uk: distance <= 25
      ? `З Вроцлава ми доїжджаємо до ${city} менш ніж за 30 хвилин. Часто можемо приїхати того ж або наступного робочого дня.`
      : distance <= 60
        ? `Дорога з Вроцлава до ${city} займає близько ${Math.round(distance / 60 * 60)} хвилин (≈ ${distance} км). Найчастіше пропонуємо візит протягом 1–3 днів.`
        : `${city} знаходиться приблизно за ${distance} км від Вроцлава. Виїзди в цей район плануємо за 2–4 дні, об\'єднуючи кілька замовлень в один день.`,
  };

  // Вопрос 2 — зависит от профиля города
  const Q2_BY_EMPHASIS: Record<string, Record<Lang, string>> = {
    speed: {
      pl: `Czy w ${city} mogę liczyć na realizację w ten sam dzień?`,
      ru: `Можно ли в ${city} рассчитывать на выезд в день обращения?`,
      en: `Can I get a same-day appointment in ${city}?`,
      uk: `Чи можна у ${city} розраховувати на виїзд у день звернення?`,
    },
    fullRange: {
      pl: `Czy wszystkie usługi z cennika są dostępne w ${city}?`,
      ru: `Доступны ли в ${city} все услуги из прайс-листа?`,
      en: `Are all the services from the price list available in ${city}?`,
      uk: `Чи доступні у ${city} всі послуги з прайс-листа?`,
    },
    tourism: {
      pl: `Czy obsługujecie obiekty noclegowe w ${city}?`,
      ru: `Обслуживаете ли вы объекты размещения в ${city}?`,
      en: `Do you serve accommodation facilities in ${city}?`,
      uk: `Чи обслуговуєте ви об\'єкти розміщення у ${city}?`,
    },
    industry: {
      pl: `Czy wystawiacie faktury VAT dla firm z ${city}?`,
      ru: `Выставляете ли вы счета-фактуры VAT для компаний из ${city}?`,
      en: `Do you issue VAT invoices for companies in ${city}?`,
      uk: `Чи виставляєте ви рахунки-фактури ПДВ для компаній з ${city}?`,
    },
    history: {
      pl: `Czy obsługujecie meble zabytkowe i delikatne tkaniny w ${city}?`,
      ru: `Работаете ли вы со старинной мебелью и деликатными тканями в ${city}?`,
      en: `Do you handle antique furniture and delicate fabrics in ${city}?`,
      uk: `Чи працюєте ви зі старовинними меблями та делікатними тканинами у ${city}?`,
    },
    suburb: {
      pl: `Czy w ${city} obowiązuje minimalna kwota zamówienia?`,
      ru: `Есть ли в ${city} минимальная сумма заказа?`,
      en: `Is there a minimum order amount in ${city}?`,
      uk: `Чи є у ${city} мінімальна сума замовлення?`,
    },
  };

  const isWroclawBase = profile.type === 'wroclaw-base';
  const minOrder = isWroclawBase ? '160 PLN' : '220 PLN';

  const A2_BY_EMPHASIS: Record<string, Record<Lang, string>> = {
    speed: {
      pl: `Tak, ${city} jest na tyle blisko Wrocławia, że często możemy podjechać jeszcze tego samego dnia — najlepiej zadzwonić rano: +48 575 211 401.`,
      ru: `Да, ${city} достаточно близко к Вроцлаву, чтобы мы часто могли приехать в тот же день — лучше всего звонить с утра: +48 575 211 401.`,
      en: `Yes — ${city} is close enough to Wrocław that we can often come the same day. Best to call in the morning: +48 575 211 401.`,
      uk: `Так, ${city} достатньо близько до Вроцлава, щоб ми часто могли приїхати того ж дня — найкраще телефонувати зранку: +48 575 211 401.`,
    },
    fullRange: {
      pl: `W ${city} dostępne są wszystkie nasze usługi czyszczenia tapicerki, dywanów, materacy, ozonowania i mycia okien. Sprzątanie domów i usługi złotej rączki realizujemy wyłącznie we Wrocławiu i okolicach.`,
      ru: `В ${city} доступны все наши услуги: химчистка мебели, ковров, матрасов, озонирование и мытьё окон. Уборка домов и мастер на час — только во Вроцлаве и окрестностях.`,
      en: `In ${city} all our services are available: upholstery, carpets, mattresses, ozonation and window cleaning. House cleaning and handyman are only offered in Wrocław and the surrounding area.`,
      uk: `У ${city} доступні всі наші послуги: хімчистка меблів, килимів, матраців, озонування та миття вікон. Прибирання та майстер на годину — лише у Вроцлаві та околицях.`,
    },
    tourism: {
      pl: `Tak — w ${city} regularnie czyścimy meble w pensjonatach i apartamentach na wynajem. Na większe zlecenia (przygotowanie obiektu do sezonu) udzielamy rabatów.`,
      ru: `Да — в ${city} мы регулярно чистим мебель в пансионатах и апартаментах посуточно. На крупные заказы (подготовка объекта к сезону) даём скидки.`,
      en: `Yes — in ${city} we regularly clean furniture in guesthouses and short-stay apartments. Larger orders (pre-season prep) get discounts.`,
      uk: `Так — у ${city} ми регулярно чистимо меблі в пансіонатах та апартаментах. На великі замовлення (підготовка об\'єкта до сезону) надаємо знижки.`,
    },
    industry: {
      pl: `Tak. Dla firm z ${city} wystawiamy pełne faktury VAT, oferujemy też rozliczenia okresowe i obsługę cykliczną biur i obiektów pracowniczych.`,
      ru: `Да. Для компаний из ${city} выставляем полные VAT-фактуры, предлагаем периодические расчёты и регулярное обслуживание офисов.`,
      en: `Yes. For companies in ${city} we issue full VAT invoices and offer recurring billing and scheduled servicing.`,
      uk: `Так. Для компаній з ${city} виставляємо повні ПДВ-фактури, пропонуємо періодичні розрахунки та регулярне обслуговування офісів.`,
    },
    history: {
      pl: `Tak — w ${city} mamy doświadczenie z meblami stylowymi i wrażliwymi tkaninami. Przed czyszczeniem zawsze wykonujemy próbę na niewidocznym fragmencie.`,
      ru: `Да — в ${city} у нас есть опыт работы со стильной мебелью и чувствительными тканями. Перед чисткой всегда делаем пробу на незаметном участке.`,
      en: `Yes — in ${city} we have experience with stylish furniture and sensitive fabrics. We always test on a hidden patch before cleaning.`,
      uk: `Так — у ${city} ми маємо досвід зі стильними меблями та чутливими тканинами. Перед чищенням завжди робимо пробу на непомітній ділянці.`,
    },
    suburb: {
      pl: `Tak — minimalna wartość zamówienia w ${city} wynosi ${minOrder}. Można ją łatwo osiągnąć łącząc np. czyszczenie kanapy i materaca.`,
      ru: `Да — минимальная сумма заказа в ${city} составляет ${minOrder}. Её легко набрать, объединив например чистку дивана и матраса.`,
      en: `Yes — the minimum order in ${city} is ${minOrder}. It is easy to reach by combining e.g. a sofa and a mattress.`,
      uk: `Так — мінімальна сума замовлення у ${city} становить ${minOrder}. Її легко набрати, об\'єднавши наприклад чистку дивана та матраца.`,
    },
  };

  const q1 = pick(Q1[lang], seed);
  const a1 = A1[lang];
  const q2 = Q2_BY_EMPHASIS[profile.emphasis][lang];
  const a2 = A2_BY_EMPHASIS[profile.emphasis][lang];

  return [
    { q: q1, a: a1 },
    { q: q2, a: a2 },
  ];
}
