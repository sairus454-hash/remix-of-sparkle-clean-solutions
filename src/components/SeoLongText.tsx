import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Long-form SEO content block (~1000 words per language) targeting key phrases:
 * PL: pranie kanap Wrocław, czyszczenie tapicerki Wrocław, mycie okien Wrocław, sprzątanie mieszkań Wrocław
 * EN: sofa cleaning Wrocław, upholstery cleaning Wrocław, window cleaning Wrocław, apartment cleaning Wrocław
 * RU: химчистка диванов Вроцлав, чистка обивки Вроцлав, мытьё окон Вроцлав, уборка квартир Вроцлав
 * UK: хімчистка диванів Вроцлав, чистка оббивки Вроцлав, миття вікон Вроцлав, прибирання квартир Вроцлав
 */

type Block = {
  title: string;
  intro: string;
  sections: { h3: string; body: string }[];
};

const CONTENT: Record<'pl' | 'en' | 'ru' | 'uk', Block> = {
  pl: {
    title: 'Pranie kanap Wrocław, czyszczenie tapicerki, mycie okien i sprzątanie mieszkań',
    intro:
      'MasterClean to lokalna firma sprzątająca działająca we Wrocławiu i okolicach (Smolec, Bielany Wrocławskie, Kiełczów, Oława, Jelcz-Laskowice, Sobótka, Strzegom). Specjalizujemy się w usługach takich jak <strong>pranie kanap Wrocław</strong>, <strong>czyszczenie tapicerki Wrocław</strong>, <strong>mycie okien Wrocław</strong> oraz kompleksowe <strong>sprzątanie mieszkań Wrocław</strong>. Pracujemy profesjonalnym sprzętem ekstrakcyjnym i hipoalergicznymi środkami, bezpiecznymi dla dzieci, alergików i zwierząt. Przyjeżdżamy z całym wyposażeniem — klient nie musi niczego przygotowywać poza dostępem do gniazdka i wody.',
    sections: [
      {
        h3: 'Pranie kanap Wrocław — głębokie czyszczenie mebli tapicerowanych',
        body: '<strong>Pranie kanap Wrocław</strong> wykonujemy metodą ekstrakcyjną z użyciem profesjonalnych maszyn marek Karcher i Pro-Team. Proces obejmuje wstępne odkurzenie, naniesienie środka piorącego dopasowanego do rodzaju tkaniny (welur, alkantara, mikrofibra, len, tkaniny syntetyczne), wzburzenie włókien szczotką oraz wypłukanie zabrudzeń pod ciśnieniem z jednoczesnym odsysaniem wody. Z kanapy usuwamy nie tylko widoczne plamy z kawy, wina, tłuszczu czy długopisu, ale też kurz, roztocza, sierść zwierząt i alergeny. Pranie dwuosobowej sofy we Wrocławiu trwa 60–90 minut, a mebel jest gotowy do użytkowania po 4–8 godzinach schnięcia. Pracujemy także w soboty, niedziele i wieczorami — bez dopłat za weekend.',
      },
      {
        h3: 'Czyszczenie tapicerki Wrocław — meble, krzesła, materace, fotele biurowe',
        body: '<strong>Czyszczenie tapicerki Wrocław</strong> obejmuje kanapy, narożniki, materace, krzesła tapicerowane, fotele biurowe, pufy, zagłówki łóżek, wózki dziecięce oraz fotele samochodowe. Każdy materiał wymaga indywidualnego doboru chemii i temperatury — przed praniem zawsze wykonujemy test na niewidocznym fragmencie. Zalecamy czyszczenie raz na 6–12 miesięcy w gospodarstwach z dziećmi i zwierzętami oraz raz na 12–18 miesięcy w pozostałych przypadkach. Regularne pranie tapicerki wydłuża żywotność mebli o kilka lat, eliminuje zapachy oraz zmniejsza ryzyko alergii.',
      },
      {
        h3: 'Mycie okien Wrocław — bez smug, na każdej wysokości',
        body: '<strong>Mycie okien Wrocław</strong> realizujemy w mieszkaniach, domach jednorodzinnych, lokalach usługowych i biurach. Używamy wody demineralizowanej oraz profesjonalnych ściągaczek, dzięki czemu okna pozostają czyste bez smug. Standardowo myjemy szyby z obu stron, ramy oraz parapety. Dla okien dachowych, balkonowych i przeszkleń tarasowych stosujemy uchwyty teleskopowe sięgające do 6 metrów. Cennik mycia okien we Wrocławiu zaczyna się od 40 PLN za okno; przy zamówieniu od 4 sztuk obowiązuje rabat 10%, a od 6 sztuk — 15%. Minimalna wartość zamówienia w Wrocławiu i Smolcu to 160 PLN.',
      },
      {
        h3: 'Sprzątanie mieszkań Wrocław — generalne, po remoncie, regularne',
        body: '<strong>Sprzątanie mieszkań Wrocław</strong> obejmuje sprzątanie standardowe, generalne (z myciem okien, kuchni i łazienki w pełnym zakresie) oraz sprzątanie po remoncie i budowie (usuwanie pyłu cementowego, resztek farby, kleju, silikonu, folii). Cena uzależniona jest od metrażu, zabrudzenia oraz prac dodatkowych — mycia okien, czyszczenia piekarnika, lodówki, prasowania. Klientom regularnym oferujemy stałe stawki i tę samą ekipę. Wszystkie ekipy są zweryfikowane, ubezpieczone i przeszkolone z obsługi sprzętu oraz chemii profesjonalnej.',
      },
      {
        h3: 'Dlaczego klienci z Wrocławia wybierają MasterClean',
        body: 'Działamy ponad 3 lata, mamy ponad 1000 zleceń i ocenę 4,9/5. Wycena jest darmowa i niezobowiązująca — podajemy konkretną kwotę przed pracą, bez ukrytych kosztów ani dopłat za dojazd w obrębie Wrocławia i Smolca. Akceptujemy gotówkę, BLIK, kartę i przelew; firmom wystawiamy fakturę VAT. Pracujemy 7 dni w tygodniu. Zamów <strong>pranie kanap Wrocław</strong>, <strong>czyszczenie tapicerki Wrocław</strong>, <strong>mycie okien Wrocław</strong> lub <strong>sprzątanie mieszkań Wrocław</strong> przez formularz, telefon +48 575 211 401 lub czat — gwarantujemy efekt lub wracamy bezpłatnie i poprawiamy.',
      },
    ],
  },
  en: {
    title: 'Sofa cleaning Wrocław, upholstery cleaning, window cleaning and apartment cleaning',
    intro:
      'MasterClean is a local cleaning company operating in Wrocław and the surrounding area (Smolec, Bielany Wrocławskie, Kiełczów, Oława, Jelcz-Laskowice, Sobótka, Strzegom). We specialize in <strong>sofa cleaning Wrocław</strong>, <strong>upholstery cleaning Wrocław</strong>, <strong>window cleaning Wrocław</strong> and full <strong>apartment cleaning Wrocław</strong>. We use professional extraction equipment and hypoallergenic detergents that are safe for children, allergy sufferers and pets. We arrive with all the equipment we need — the customer does not have to prepare anything except access to a power outlet and water.',
    sections: [
      {
        h3: 'Sofa cleaning Wrocław — deep cleaning of upholstered furniture',
        body: 'For <strong>sofa cleaning Wrocław</strong> we use the hot-water extraction method with Karcher and Pro-Team machines. The process includes pre-vacuuming, applying a detergent matched to the fabric type (velour, alcantara, microfiber, linen, synthetic textiles), agitating the fibers with a brush and rinsing the dirt under pressure with simultaneous water suction. We remove not only visible stains from coffee, wine, grease or pen, but also dust, mites, pet hair and allergens. Cleaning a two-seater sofa in Wrocław takes 60–90 minutes and the furniture is ready to use after 4–8 hours of drying. We also work on Saturdays, Sundays and evenings — no weekend surcharges.',
      },
      {
        h3: 'Upholstery cleaning Wrocław — furniture, chairs, mattresses, office armchairs',
        body: '<strong>Upholstery cleaning Wrocław</strong> covers sofas, corner couches, mattresses, upholstered chairs, office armchairs, poufs, headboards, baby strollers and car seats. Each material requires an individual choice of chemicals and temperature — before cleaning we always perform a test on a hidden fragment. We recommend cleaning every 6–12 months in households with children and pets and every 12–18 months in other cases. Regular upholstery cleaning extends the life of furniture by several years, eliminates odors and reduces the risk of allergies.',
      },
      {
        h3: 'Window cleaning Wrocław — streak-free, at any height',
        body: 'We perform <strong>window cleaning Wrocław</strong> in apartments, single-family houses, commercial premises and offices. We use demineralized water and professional squeegees so that windows remain clean and streak-free. We clean the panes from both sides, the frames and the windowsills. For roof, balcony and terrace glazing we use telescopic poles reaching up to 6 meters — no scaffolding needed. The price list starts at 40 PLN per window; orders of 4+ get a 10% discount and 6+ get 15%. The minimum order value in Wrocław and Smolec is 160 PLN.',
      },
      {
        h3: 'Apartment cleaning Wrocław — deep, post-renovation, recurring',
        body: '<strong>Apartment cleaning Wrocław</strong> includes standard cleaning, deep cleaning (with full window, kitchen and bathroom cleaning) and post-renovation / post-construction cleaning (removal of cement dust, paint residue, glue, silicone, protective foil). The price depends on the floor area, level of dirt and extras — window cleaning, oven, fridge, ironing. For recurring customers we offer fixed rates and the same team every visit. All teams are verified, insured and trained in the use of professional equipment and chemistry.',
      },
      {
        h3: 'Why customers in Wrocław choose MasterClean',
        body: 'We have been operating for over 3 years, with more than 1000 completed jobs and an average rating of 4.9/5. Quotes are free and non-binding — we give a concrete price before starting, with no hidden costs and no travel fees within Wrocław and Smolec. We accept cash, BLIK, card and bank transfer; for businesses we issue VAT invoices. We work 7 days a week. Order <strong>sofa cleaning Wrocław</strong>, <strong>upholstery cleaning Wrocław</strong>, <strong>window cleaning Wrocław</strong> or <strong>apartment cleaning Wrocław</strong> via the form, by phone at +48 575 211 401 or through the chat — we guarantee the result or come back for free and fix it.',
      },
    ],
  },
  ru: {
    title: 'Химчистка диванов Вроцлав, чистка обивки, мытьё окон и уборка квартир',
    intro:
      'MasterClean — местная клининговая компания, работающая во <strong>Вроцлаве</strong> и пригородах (Смолец, Беляны-Вроцлавске, Келчув, Олава, Йельч-Ласковице, Соботка, Стшегом). Мы специализируемся на услугах: <strong>химчистка диванов Вроцлав</strong>, <strong>чистка обивки Вроцлав</strong>, <strong>мытьё окон Вроцлав</strong> и комплексная <strong>уборка квартир Вроцлав</strong>. Используем профессиональное экстракторное оборудование и гипоаллергенные средства, безопасные для детей, аллергиков и животных. Приезжаем со всем оборудованием — клиенту нужны только розетка и доступ к воде.',
    sections: [
      {
        h3: 'Химчистка диванов Вроцлав — глубокая чистка мягкой мебели',
        body: '<strong>Химчистка диванов Вроцлав</strong> выполняется методом экстракции с использованием профессиональных машин Karcher и Pro-Team. Процесс включает предварительную очистку пылесосом, нанесение моющего средства, подобранного под тип ткани (велюр, алькантара, микрофибра, лён, синтетика), вспенивание щёткой и полоскание под давлением с одновременным сбором воды. С дивана удаляются не только пятна от кофе, вина, жира или ручки, но и пыль, клещи, шерсть животных и аллергены. Чистка двухместного дивана во Вроцлаве занимает 60–90 минут, мебель готова к использованию через 4–8 часов сушки. Работаем по субботам, воскресеньям и вечером — без доплат за выходные.',
      },
      {
        h3: 'Чистка обивки Вроцлав — мебель, стулья, матрасы, офисные кресла',
        body: '<strong>Чистка обивки Вроцлав</strong> включает диваны, угловые диваны, матрасы, стулья, офисные кресла, пуфы, изголовья кроватей, детские коляски и автомобильные сиденья. Каждый материал требует индивидуального подбора химии и температуры — перед чисткой всегда делаем тест на незаметном участке. Рекомендуем чистку раз в 6–12 месяцев в домах с детьми и животными и раз в 12–18 месяцев в остальных случаях. Регулярная чистка обивки продлевает срок службы мебели, убирает запахи и снижает риск аллергии.',
      },
      {
        h3: 'Мытьё окон Вроцлав — без разводов, на любой высоте',
        body: '<strong>Мытьё окон Вроцлав</strong> выполняем в квартирах, частных домах, коммерческих помещениях и офисах. Используем деминерализованную воду и профессиональные сгоны — окна остаются чистыми без разводов. Моем стёкла с двух сторон, рамы и подоконники. Для мансардных, балконных и террасных остеклений применяем телескопические штанги до 6 метров — без лесов. Прайс начинается от 40 PLN за окно; от 4 окон — скидка 10%, от 6 — 15%. Минимальный заказ во Вроцлаве и Смольце — 160 PLN.',
      },
      {
        h3: 'Уборка квартир Вроцлав — генеральная, после ремонта, регулярная',
        body: '<strong>Уборка квартир Вроцлав</strong> включает стандартную, генеральную (с мытьём окон, кухни и санузла в полном объёме) и уборку после ремонта/строительства (удаление цементной пыли, остатков краски, клея, силикона, плёнки). Цена зависит от метража, степени загрязнения и допработ — мытьё окон, чистка духовки, холодильника, глажка. Для регулярных клиентов — фиксированные ставки и одна и та же бригада. Все сотрудники проверены, застрахованы и обучены работе с профоборудованием и химией.',
      },
      {
        h3: 'Почему клиенты во Вроцлаве выбирают MasterClean',
        body: 'Работаем более 3 лет, выполнили свыше 1000 заказов, средняя оценка 4,9/5. Расчёт бесплатный и ни к чему не обязывает — конкретную сумму называем до начала работ, без скрытых платежей и доплат за выезд по Вроцлаву и Смольцу. Принимаем наличные, BLIK, карту и перевод; компаниям выставляем счёт VAT. Работаем 7 дней в неделю. Закажите <strong>химчистку диванов Вроцлав</strong>, <strong>чистку обивки Вроцлав</strong>, <strong>мытьё окон Вроцлав</strong> или <strong>уборку квартир Вроцлав</strong> через форму, по телефону +48 575 211 401 или в чате — гарантируем результат или бесплатно вернёмся и доделаем.',
      },
    ],
  },
  uk: {
    title: 'Хімчистка диванів Вроцлав, чистка оббивки, миття вікон і прибирання квартир',
    intro:
      'MasterClean — місцева клінінгова компанія, що працює у <strong>Вроцлаві</strong> та передмісті (Смолець, Беляни-Вроцлавське, Кєлчув, Олава, Єльч-Лясковіце, Соботка, Стшегом). Ми спеціалізуємося на послугах: <strong>хімчистка диванів Вроцлав</strong>, <strong>чистка оббивки Вроцлав</strong>, <strong>миття вікон Вроцлав</strong> та комплексне <strong>прибирання квартир Вроцлав</strong>. Використовуємо професійне екстракційне обладнання та гіпоалергенні засоби, безпечні для дітей, алергіків і тварин. Приїжджаємо з усім обладнанням — клієнту потрібні лише розетка й доступ до води.',
    sections: [
      {
        h3: 'Хімчистка диванів Вроцлав — глибоке чищення м\'яких меблів',
        body: '<strong>Хімчистка диванів Вроцлав</strong> виконується методом екстракції з використанням професійних машин Karcher і Pro-Team. Процес включає попереднє пилососіння, нанесення мийного засобу під тип тканини (велюр, алькантара, мікрофібра, льон, синтетика), збивання щіткою та полоскання під тиском із одночасним збором води. З дивана прибираємо плями від кави, вина, жиру, ручки, а також пил, кліщів, шерсть тварин і алергени. Чистка двомісного дивана у Вроцлаві триває 60–90 хвилин, меблі готові до використання за 4–8 годин сушіння. Працюємо у суботу, неділю та ввечері — без доплат за вихідні.',
      },
      {
        h3: 'Чистка оббивки Вроцлав — меблі, стільці, матраци, офісні крісла',
        body: '<strong>Чистка оббивки Вроцлав</strong> включає дивани, кутові дивани, матраци, стільці, офісні крісла, пуфи, узголів\'я ліжок, дитячі візки та автомобільні сидіння. Кожен матеріал вимагає індивідуального підбору хімії та температури — перед чисткою завжди робимо тест на непомітній ділянці. Рекомендуємо чистку раз на 6–12 місяців у будинках з дітьми та тваринами і раз на 12–18 місяців в інших випадках. Регулярна чистка оббивки подовжує термін служби меблів, усуває запахи та зменшує ризик алергії.',
      },
      {
        h3: 'Миття вікон Вроцлав — без розводів, на будь-якій висоті',
        body: '<strong>Миття вікон Вроцлав</strong> виконуємо у квартирах, приватних будинках, комерційних приміщеннях та офісах. Використовуємо демінералізовану воду й професійні згони — вікна залишаються чистими без розводів. Миємо скло з двох сторін, рами та підвіконня. Для мансардних, балконних і терасних склінь застосовуємо телескопічні штанги до 6 метрів — без риштувань. Прайс — від 40 PLN за вікно; від 4 вікон — знижка 10%, від 6 — 15%. Мінімальне замовлення у Вроцлаві й Смольці — 160 PLN.',
      },
      {
        h3: 'Прибирання квартир Вроцлав — генеральне, після ремонту, регулярне',
        body: '<strong>Прибирання квартир Вроцлав</strong> охоплює стандартне, генеральне (з миттям вікон, кухні й санвузла у повному обсязі) і прибирання після ремонту/будівництва (видалення цементного пилу, залишків фарби, клею, силікону, плівки). Ціна залежить від метражу, ступеня забруднення та додаткових робіт — миття вікон, чистка духовки, холодильника, прасування. Постійним клієнтам — фіксовані ставки і та сама бригада. Усі працівники перевірені, застраховані й навчені роботі з профобладнанням і хімією.',
      },
      {
        h3: 'Чому клієнти у Вроцлаві обирають MasterClean',
        body: 'Працюємо понад 3 роки, виконали більше 1000 замовлень, середня оцінка 4,9/5. Розрахунок безкоштовний і ні до чого не зобов\'язує — конкретну суму називаємо до початку робіт, без прихованих платежів і доплат за виїзд у межах Вроцлава і Смольця. Приймаємо готівку, BLIK, картку і переказ; компаніям виставляємо рахунок VAT. Працюємо 7 днів на тиждень. Замовте <strong>хімчистку диванів Вроцлав</strong>, <strong>чистку оббивки Вроцлав</strong>, <strong>миття вікон Вроцлав</strong> або <strong>прибирання квартир Вроцлав</strong> через форму, за телефоном +48 575 211 401 чи в чаті — гарантуємо результат або безкоштовно повернемося й доробимо.',
      },
    ],
  },
};

const SeoLongText = () => {
  const { language } = useLanguage();
  const data = CONTENT[language] ?? CONTENT.pl;

  return (
    <section
      aria-labelledby="seo-long-text-title"
      className="py-12 sm:py-16 bg-background"
    >
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto prose-like text-foreground">
          <h2
            id="seo-long-text-title"
            className="font-serif text-2xl sm:text-3xl font-bold mb-6 text-foreground"
          >
            {data.title}
          </h2>

          <p
            className="mb-5 text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />

          {data.sections.map((s) => (
            <div key={s.h3}>
              <h3 className="font-serif text-xl font-semibold mt-8 mb-3 text-foreground">
                {s.h3}
              </h3>
              <p
                className="mb-5 text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};

export default SeoLongText;
