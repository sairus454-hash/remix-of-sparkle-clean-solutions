import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';

const privacyContent = {
  ru: {
    title: 'Политика конфиденциальности',
    seoDesc: 'Политика конфиденциальности MasterClean — как мы собираем, используем и защищаем ваши персональные данные.',
    lastUpdated: 'Последнее обновление: 08.03.2026',
    sections: [
      {
        title: '1. Введение',
        content: [
          'Добро пожаловать в MasterClean 1885.',
          'Мы уважаем вашу конфиденциальность и стремимся защитить ваши персональные данные. Настоящая Политика конфиденциальности объясняет, как мы собираем, используем и защищаем вашу информацию при использовании нашего сайта и услуг.',
          'Если у вас есть вопросы по данной политике, вы можете связаться с нами по адресу <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>.',
        ],
      },
      {
        title: '2. Информация, которую мы собираем',
        content: ['Мы можем собирать следующие виды информации:'],
        subsections: [
          {
            subtitle: 'Персональные данные',
            text: 'Информация, которую вы предоставляете напрямую:',
            items: ['Имя', 'Адрес электронной почты', 'Данные аккаунта', 'Платёжная информация (если применимо)'],
          },
          {
            subtitle: 'Данные об использовании',
            text: 'Мы можем автоматически собирать определённую информацию при использовании сайта:',
            items: ['IP-адрес', 'Тип браузера', 'Информация об устройстве', 'Посещённые страницы', 'Время, проведённое на страницах'],
          },
          {
            subtitle: 'Файлы cookie и технологии отслеживания',
            text: 'Мы используем файлы cookie и аналогичные технологии для:',
            items: ['Запоминания пользовательских настроек', 'Анализа трафика', 'Улучшения наших услуг'],
          },
        ],
      },
      {
        title: '3. Как мы используем вашу информацию',
        content: ['Мы используем собранные данные для:'],
        items: ['Предоставления и работы сервиса', 'Улучшения функциональности сайта', 'Связи с пользователями', 'Обработки транзакций', 'Анализа использования и производительности', 'Обеспечения безопасности и предотвращения мошенничества'],
      },
      {
        title: '4. Обработка с помощью ИИ',
        content: [
          'Наш сервис может использовать технологии искусственного интеллекта для обработки пользовательских запросов с целью предоставления запрашиваемых функций.',
          'Предоставленный пользователем контент может автоматически обрабатываться для генерации результатов, улучшения производительности сервиса и повышения качества обслуживания.',
        ],
      },
      {
        title: '5. Передача информации',
        content: ['Мы не продаём ваши персональные данные.', 'Мы можем передавать информацию:'],
        items: ['Поставщикам услуг (хостинг, аналитика, платежи)', 'Правоохранительным органам по требованию закона', 'Партнёрам, необходимым для работы сервиса'],
      },
      {
        title: '6. Хранение и безопасность данных',
        content: [
          'Мы принимаем разумные технические и организационные меры для защиты ваших данных от несанкционированного доступа, раскрытия или потери.',
          'Однако ни один метод передачи данных через Интернет не является полностью безопасным.',
        ],
      },
      {
        title: '7. Срок хранения данных',
        content: ['Мы храним персональные данные только столько, сколько необходимо для:'],
        items: ['Предоставления услуги', 'Соблюдения правовых обязательств', 'Разрешения споров'],
      },
      {
        title: '8. Ваши права (GDPR)',
        content: ['Если вы находитесь в Европейской экономической зоне (ЕЭЗ), вы имеете право:'],
        items: ['Получить доступ к своим персональным данным', 'Запросить исправление', 'Запросить удаление', 'Возразить против обработки', 'Запросить переносимость данных'],
        footer: 'Для реализации этих прав свяжитесь с нами по адресу <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>.',
      },
      {
        title: '9. Сторонние сервисы',
        content: ['Наш сайт может использовать сторонние сервисы, такие как:'],
        items: ['Провайдеры аналитики', 'Платёжные процессоры', 'Хостинг-провайдеры'],
        footer: 'Эти сервисы могут собирать информацию в соответствии со своими политиками конфиденциальности.',
      },
      {
        title: '10. Изменения в Политике конфиденциальности',
        content: [
          'Мы можем время от времени обновлять данную Политику конфиденциальности.',
          'Изменения будут размещены на этой странице с обновлённой датой «Последнее обновление».',
        ],
      },
      {
        title: '11. Контакты',
        content: ['Если у вас есть вопросы по данной Политике конфиденциальности, свяжитесь с нами:'],
        contacts: [
          { label: 'Email', value: '<a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>' },
          { label: 'Компания', value: 'MasterClean 1885' },
          { label: 'Адрес', value: '54-614 Wrocław, ul. Trawowa 14, Польша' },
        ],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    seoDesc: 'Privacy Policy of MasterClean — how we collect, use, and protect your personal data.',
    lastUpdated: 'Last updated: 08/03/2026',
    sections: [
      {
        title: '1. Introduction',
        content: [
          'Welcome to MasterClean 1885.',
          'We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.',
          'If you have any questions about this policy, you can contact us at <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>.',
        ],
      },
      {
        title: '2. Information We Collect',
        content: ['We may collect the following types of information:'],
        subsections: [
          {
            subtitle: 'Personal Information',
            text: 'Information you provide directly, such as:',
            items: ['Name', 'Email address', 'Account information', 'Payment information (if applicable)'],
          },
          {
            subtitle: 'Usage Data',
            text: 'We may automatically collect certain information when you use the website, including:',
            items: ['IP address', 'Browser type', 'Device information', 'Pages visited', 'Time spent on pages'],
          },
          {
            subtitle: 'Cookies and Tracking Technologies',
            text: 'We use cookies and similar technologies to:',
            items: ['Remember user preferences', 'Analyze traffic', 'Improve our services'],
          },
        ],
      },
      {
        title: '3. How We Use Your Information',
        content: ['We use collected data to:'],
        items: ['Provide and operate our service', 'Improve website functionality', 'Communicate with users', 'Process transactions', 'Analyze usage and performance', 'Ensure security and prevent fraud'],
      },
      {
        title: '4. AI Processing',
        content: [
          'Our service may use artificial intelligence technologies to process user inputs in order to provide requested features or functionality.',
          'User-provided content may be processed automatically to generate results, improve service performance, and enhance user experience.',
        ],
      },
      {
        title: '5. Sharing of Information',
        content: ['We do not sell your personal information.', 'We may share information with:'],
        items: ['Service providers (hosting, analytics, payments)', 'Legal authorities when required by law', 'Partners necessary to operate the service'],
      },
      {
        title: '6. Data Storage and Security',
        content: [
          'We take reasonable technical and organizational measures to protect your data from unauthorized access, disclosure, or loss.',
          'However, no method of transmission over the Internet is completely secure.',
        ],
      },
      {
        title: '7. Data Retention',
        content: ['We retain personal data only as long as necessary to:'],
        items: ['Provide the service', 'Comply with legal obligations', 'Resolve disputes'],
      },
      {
        title: '8. Your Rights (GDPR)',
        content: ['If you are located in the European Economic Area (EEA), you have the right to:'],
        items: ['Access your personal data', 'Request correction', 'Request deletion', 'Object to processing', 'Request data portability'],
        footer: 'To exercise these rights, contact us at <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>.',
      },
      {
        title: '9. Third-Party Services',
        content: ['Our website may use third-party services such as:'],
        items: ['Analytics providers', 'Payment processors', 'Hosting providers'],
        footer: 'These services may collect information according to their own privacy policies.',
      },
      {
        title: '10. Changes to This Privacy Policy',
        content: [
          'We may update this Privacy Policy from time to time.',
          'Changes will be posted on this page with an updated "Last updated" date.',
        ],
      },
      {
        title: '11. Contact Us',
        content: ['If you have questions about this Privacy Policy, contact us:'],
        contacts: [
          { label: 'Email', value: '<a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>' },
          { label: 'Company', value: 'MasterClean 1885' },
          { label: 'Address', value: '54-614 Wrocław, ul. Trawowa 14, Poland' },
        ],
      },
    ],
  },
  pl: {
    title: 'Polityka prywatności',
    seoDesc: 'Polityka prywatności MasterClean — jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe.',
    lastUpdated: 'Ostatnia aktualizacja: 08.03.2026',
    sections: [
      {
        title: '1. Wprowadzenie',
        content: [
          'Witamy w MasterClean 1885.',
          'Szanujemy Twoją prywatność i zobowiązujemy się do ochrony Twoich danych osobowych. Niniejsza Polityka prywatności wyjaśnia, w jaki sposób zbieramy, wykorzystujemy i chronimy Twoje informacje podczas korzystania z naszej strony internetowej i usług.',
          'Jeśli masz pytania dotyczące tej polityki, możesz skontaktować się z nami pod adresem <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>.',
        ],
      },
      {
        title: '2. Informacje, które zbieramy',
        content: ['Możemy zbierać następujące rodzaje informacji:'],
        subsections: [
          {
            subtitle: 'Dane osobowe',
            text: 'Informacje podawane bezpośrednio, takie jak:',
            items: ['Imię i nazwisko', 'Adres e-mail', 'Dane konta', 'Informacje o płatności (jeśli dotyczy)'],
          },
          {
            subtitle: 'Dane o użytkowaniu',
            text: 'Możemy automatycznie zbierać pewne informacje podczas korzystania ze strony:',
            items: ['Adres IP', 'Typ przeglądarki', 'Informacje o urządzeniu', 'Odwiedzane strony', 'Czas spędzony na stronach'],
          },
          {
            subtitle: 'Pliki cookie i technologie śledzenia',
            text: 'Używamy plików cookie i podobnych technologii w celu:',
            items: ['Zapamiętywania preferencji użytkownika', 'Analizy ruchu', 'Ulepszania naszych usług'],
          },
        ],
      },
      {
        title: '3. Jak wykorzystujemy Twoje informacje',
        content: ['Wykorzystujemy zebrane dane do:'],
        items: ['Świadczenia i prowadzenia usługi', 'Ulepszania funkcjonalności strony', 'Komunikacji z użytkownikami', 'Przetwarzania transakcji', 'Analizy użytkowania i wydajności', 'Zapewnienia bezpieczeństwa i zapobiegania oszustwom'],
      },
      {
        title: '4. Przetwarzanie przez AI',
        content: [
          'Nasz serwis może wykorzystywać technologie sztucznej inteligencji do przetwarzania danych użytkowników w celu dostarczania żądanych funkcji.',
          'Treści dostarczone przez użytkownika mogą być automatycznie przetwarzane w celu generowania wyników, poprawy wydajności usługi i ulepszenia doświadczenia użytkownika.',
        ],
      },
      {
        title: '5. Udostępnianie informacji',
        content: ['Nie sprzedajemy Twoich danych osobowych.', 'Możemy udostępniać informacje:'],
        items: ['Dostawcom usług (hosting, analityka, płatności)', 'Organom prawnym, gdy wymaga tego prawo', 'Partnerom niezbędnym do świadczenia usługi'],
      },
      {
        title: '6. Przechowywanie i bezpieczeństwo danych',
        content: [
          'Podejmujemy uzasadnione środki techniczne i organizacyjne w celu ochrony Twoich danych przed nieautoryzowanym dostępem, ujawnieniem lub utratą.',
          'Jednak żadna metoda transmisji przez Internet nie jest całkowicie bezpieczna.',
        ],
      },
      {
        title: '7. Okres przechowywania danych',
        content: ['Przechowujemy dane osobowe tylko tak długo, jak jest to konieczne do:'],
        items: ['Świadczenia usługi', 'Wypełnienia zobowiązań prawnych', 'Rozwiązywania sporów'],
      },
      {
        title: '8. Twoje prawa (RODO)',
        content: ['Jeśli znajdujesz się w Europejskim Obszarze Gospodarczym (EOG), masz prawo do:'],
        items: ['Dostępu do swoich danych osobowych', 'Żądania sprostowania', 'Żądania usunięcia', 'Sprzeciwu wobec przetwarzania', 'Żądania przenoszenia danych'],
        footer: 'Aby skorzystać z tych praw, skontaktuj się z nami pod adresem <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>.',
      },
      {
        title: '9. Usługi stron trzecich',
        content: ['Nasza strona może korzystać z usług stron trzecich, takich jak:'],
        items: ['Dostawcy analityki', 'Procesory płatności', 'Dostawcy hostingu'],
        footer: 'Usługi te mogą zbierać informacje zgodnie z własnymi politykami prywatności.',
      },
      {
        title: '10. Zmiany w Polityce prywatności',
        content: [
          'Możemy od czasu do czasu aktualizować niniejszą Politykę prywatności.',
          'Zmiany zostaną opublikowane na tej stronie ze zaktualizowaną datą „Ostatnia aktualizacja".',
        ],
      },
      {
        title: '11. Kontakt',
        content: ['Jeśli masz pytania dotyczące niniejszej Polityki prywatności, skontaktuj się z nami:'],
        contacts: [
          { label: 'Email', value: '<a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>' },
          { label: 'Firma', value: 'MasterClean 1885' },
          { label: 'Adres', value: '54-614 Wrocław, ul. Trawowa 14, Polska' },
        ],
      },
    ],
  },
  uk: {
    title: 'Політика конфіденційності',
    seoDesc: 'Політика конфіденційності MasterClean — як ми збираємо, використовуємо та захищаємо ваші персональні дані.',
    lastUpdated: 'Останнє оновлення: 08.03.2026',
    sections: [
      {
        title: '1. Вступ',
        content: [
          'Ласкаво просимо до MasterClean 1885.',
          'Ми поважаємо вашу конфіденційність і прагнемо захистити ваші персональні дані. Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо та захищаємо вашу інформацію при використанні нашого сайту та послуг.',
          'Якщо у вас є запитання щодо цієї політики, ви можете зв\'язатися з нами за адресою <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>.',
        ],
      },
      {
        title: '2. Інформація, яку ми збираємо',
        content: ['Ми можемо збирати такі види інформації:'],
        subsections: [
          {
            subtitle: 'Персональні дані',
            text: 'Інформація, яку ви надаєте безпосередньо:',
            items: ['Ім\'я', 'Адреса електронної пошти', 'Дані облікового запису', 'Платіжна інформація (якщо застосовно)'],
          },
          {
            subtitle: 'Дані про використання',
            text: 'Ми можемо автоматично збирати певну інформацію під час використання сайту:',
            items: ['IP-адреса', 'Тип браузера', 'Інформація про пристрій', 'Відвідані сторінки', 'Час, проведений на сторінках'],
          },
          {
            subtitle: 'Файли cookie та технології відстеження',
            text: 'Ми використовуємо файли cookie та подібні технології для:',
            items: ['Запам\'ятовування налаштувань користувача', 'Аналізу трафіку', 'Покращення наших послуг'],
          },
        ],
      },
      {
        title: '3. Як ми використовуємо вашу інформацію',
        content: ['Ми використовуємо зібрані дані для:'],
        items: ['Надання та роботи сервісу', 'Покращення функціональності сайту', 'Зв\'язку з користувачами', 'Обробки транзакцій', 'Аналізу використання та продуктивності', 'Забезпечення безпеки та запобігання шахрайству'],
      },
      {
        title: '4. Обробка за допомогою ШІ',
        content: [
          'Наш сервіс може використовувати технології штучного інтелекту для обробки запитів користувачів з метою надання запитуваних функцій.',
          'Наданий користувачем контент може автоматично оброблятися для генерації результатів, покращення продуктивності сервісу та підвищення якості обслуговування.',
        ],
      },
      {
        title: '5. Передача інформації',
        content: ['Ми не продаємо ваші персональні дані.', 'Ми можемо передавати інформацію:'],
        items: ['Постачальникам послуг (хостинг, аналітика, платежі)', 'Правоохоронним органам за вимогою закону', 'Партнерам, необхідним для роботи сервісу'],
      },
      {
        title: '6. Зберігання та безпека даних',
        content: [
          'Ми вживаємо розумних технічних та організаційних заходів для захисту ваших даних від несанкціонованого доступу, розкриття або втрати.',
          'Однак жоден метод передачі даних через Інтернет не є повністю безпечним.',
        ],
      },
      {
        title: '7. Термін зберігання даних',
        content: ['Ми зберігаємо персональні дані лише стільки, скільки необхідно для:'],
        items: ['Надання послуги', 'Дотримання правових зобов\'язань', 'Вирішення спорів'],
      },
      {
        title: '8. Ваші права (GDPR)',
        content: ['Якщо ви перебуваєте в Європейській економічній зоні (ЄЕЗ), ви маєте право:'],
        items: ['Отримати доступ до своїх персональних даних', 'Вимагати виправлення', 'Вимагати видалення', 'Заперечити проти обробки', 'Вимагати перенесення даних'],
        footer: 'Для реалізації цих прав зв\'яжіться з нами за адресою <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>.',
      },
      {
        title: '9. Сторонні сервіси',
        content: ['Наш сайт може використовувати сторонні сервіси, такі як:'],
        items: ['Провайдери аналітики', 'Платіжні процесори', 'Хостинг-провайдери'],
        footer: 'Ці сервіси можуть збирати інформацію відповідно до власних політик конфіденційності.',
      },
      {
        title: '10. Зміни в Політиці конфіденційності',
        content: [
          'Ми можемо час від часу оновлювати цю Політику конфіденційності.',
          'Зміни будуть розміщені на цій сторінці з оновленою датою «Останнє оновлення».',
        ],
      },
      {
        title: '11. Контакти',
        content: ['Якщо у вас є запитання щодо цієї Політики конфіденційності, зв\'яжіться з нами:'],
        contacts: [
          { label: 'Email', value: '<a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" class="text-primary hover:underline">sairus454@gmail.com</a>' },
          { label: 'Компанія', value: 'MasterClean 1885' },
          { label: 'Адреса', value: '54-614 Wrocław, ul. Trawowa 14, Польща' },
        ],
      },
    ],
  },
};

type SectionType = (typeof privacyContent)['en']['sections'][number];

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const content = privacyContent[language] || privacyContent.en;

  return (
    <Layout>
      <SEO
        title={content.title}
        description={content.seoDesc}
        keywords="polityka prywatności, RODO, ochrona danych osobowych, przetwarzanie danych, MasterClean prywatność"
        canonical="/privacy-policy"
        breadcrumbs={[{ name: content.title, path: '/privacy-policy' }]}
      />
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">{content.title}</h1>
          <p className="text-muted-foreground text-sm mb-8">{content.lastUpdated}</p>

          <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 space-y-6">
            {content.sections.map((section: SectionType, idx: number) => (
              <section key={idx}>
                <h2 className="font-serif text-xl font-semibold text-foreground">{section.title}</h2>
                {section.content?.map((p: string, i: number) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
                {'subsections' in section && (section as any).subsections?.map((sub: any, si: number) => (
                  <div key={si}>
                    <h3 className="font-semibold text-foreground mt-4">{sub.subtitle}</h3>
                    <p>{sub.text}</p>
                    <ul className="list-disc pl-6 space-y-1">
                      {sub.items.map((item: string, ii: number) => (
                        <li key={ii}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {'items' in section && (section as any).items && (
                  <ul className="list-disc pl-6 space-y-1">
                    {(section as any).items.map((item: string, ii: number) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                )}
                {'footer' in section && (section as any).footer && (
                  <p dangerouslySetInnerHTML={{ __html: (section as any).footer }} />
                )}
                {'contacts' in section && (section as any).contacts && (
                  <ul className="list-none space-y-1">
                    {(section as any).contacts.map((c: any, ci: number) => (
                      <li key={ci}><strong>{c.label}:</strong> <span dangerouslySetInnerHTML={{ __html: c.value }} /></li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
