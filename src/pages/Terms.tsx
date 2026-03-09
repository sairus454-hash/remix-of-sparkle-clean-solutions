import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';

const content = {
  ru: {
    title: 'Условия использования',
    lastUpdated: 'Последнее обновление: 08.03.2026',
    sections: [
      { heading: '1. Общая информация', body: 'Владельцем и администратором сайта является компания MasterClean 1885.\n\nКонтактная информация:\nАдрес: 54-614 Wrocław, ul. Trawowa 14, Польша\nЭлектронная почта: sairus454@gmail.com' },
      { heading: '2. Использование сайта', body: 'Пользователь обязуется использовать сайт исключительно в законных целях и не предпринимать действий, которые могут нарушить работу сайта или ограничить доступ других пользователей.\n\nЗапрещается:\n• использовать сайт для распространения незаконной информации;\n• пытаться получить несанкционированный доступ к системам сайта;\n• копировать или распространять материалы сайта без разрешения владельца.' },
      { heading: '3. Интеллектуальная собственность', body: 'Все материалы, размещенные на сайте (тексты, изображения, логотипы, дизайн и другие элементы), являются собственностью компании MasterClean 1885 либо используются на законных основаниях.\n\nКопирование, распространение или использование материалов без письменного разрешения запрещено.' },
      { heading: '4. Ограничение ответственности', body: 'Компания MasterClean 1885 прилагает все усилия для обеспечения актуальности и точности информации на сайте, однако не гарантирует полное отсутствие ошибок или неточностей.\n\nКомпания не несет ответственности за:\n• временную недоступность сайта;\n• возможные технические ошибки;\n• действия пользователей сайта.' },
      { heading: '5. Ссылки на сторонние сайты', body: 'Сайт может содержать ссылки на сторонние ресурсы. Компания MasterClean 1885 не несет ответственности за содержание и политику конфиденциальности таких сайтов.' },
      { heading: '6. Изменение условий', body: 'Компания MasterClean 1885 оставляет за собой право изменять настоящие Условия использования в любое время. Обновленная версия будет опубликована на данной странице.' },
      { heading: '7. Применимое право', body: 'Настоящие Условия использования регулируются законодательством Республики Польша.' },
      { heading: '8. Контакты', body: 'Если у вас есть вопросы относительно данных Условий использования, вы можете связаться с нами:\n\nEmail: sairus454@gmail.com\nАдрес: 54-614 Wrocław, ul. Trawowa 14, Польша' },
    ],
  },
  en: {
    title: 'Terms of Use',
    lastUpdated: 'Last updated: 08/03/2026',
    sections: [
      { heading: '1. General Information', body: 'The owner and administrator of this website is MasterClean 1885.\n\nContact information:\nAddress: 54-614 Wrocław, ul. Trawowa 14, Poland\nEmail: sairus454@gmail.com' },
      { heading: '2. Use of the Website', body: 'The user agrees to use the website solely for lawful purposes and not to take any actions that may disrupt the website or restrict access for other users.\n\nProhibited:\n• using the website to distribute illegal information;\n• attempting to gain unauthorized access to website systems;\n• copying or distributing website materials without the owner\'s permission.' },
      { heading: '3. Intellectual Property', body: 'All materials on the website (texts, images, logos, design, and other elements) are the property of MasterClean 1885 or are used on a legal basis.\n\nCopying, distributing, or using materials without written permission is prohibited.' },
      { heading: '4. Limitation of Liability', body: 'MasterClean 1885 makes every effort to ensure the accuracy and timeliness of information on the website but does not guarantee the complete absence of errors or inaccuracies.\n\nThe company is not liable for:\n• temporary unavailability of the website;\n• possible technical errors;\n• actions of website users.' },
      { heading: '5. Links to Third-Party Websites', body: 'The website may contain links to third-party resources. MasterClean 1885 is not responsible for the content or privacy policies of such websites.' },
      { heading: '6. Changes to Terms', body: 'MasterClean 1885 reserves the right to change these Terms of Use at any time. The updated version will be published on this page.' },
      { heading: '7. Applicable Law', body: 'These Terms of Use are governed by the laws of the Republic of Poland.' },
      { heading: '8. Contact Us', body: 'If you have questions regarding these Terms of Use, you can contact us:\n\nEmail: sairus454@gmail.com\nAddress: 54-614 Wrocław, ul. Trawowa 14, Poland' },
    ],
  },
  pl: {
    title: 'Warunki korzystania',
    lastUpdated: 'Ostatnia aktualizacja: 08.03.2026',
    sections: [
      { heading: '1. Informacje ogólne', body: 'Właścicielem i administratorem strony jest firma MasterClean 1885.\n\nDane kontaktowe:\nAdres: 54-614 Wrocław, ul. Trawowa 14, Polska\nE-mail: sairus454@gmail.com' },
      { heading: '2. Korzystanie ze strony', body: 'Użytkownik zobowiązuje się korzystać ze strony wyłącznie w celach zgodnych z prawem i nie podejmować działań, które mogą zakłócić działanie strony lub ograniczyć dostęp innym użytkownikom.\n\nZabronione jest:\n• wykorzystywanie strony do rozpowszechniania nielegalnych treści;\n• podejmowanie prób nieautoryzowanego dostępu do systemów strony;\n• kopiowanie lub rozpowszechnianie materiałów ze strony bez zgody właściciela.' },
      { heading: '3. Własność intelektualna', body: 'Wszystkie materiały zamieszczone na stronie (teksty, obrazy, logotypy, projekt graficzny i inne elementy) są własnością firmy MasterClean 1885 lub są wykorzystywane na podstawie prawnej.\n\nKopiowanie, rozpowszechnianie lub wykorzystywanie materiałów bez pisemnej zgody jest zabronione.' },
      { heading: '4. Ograniczenie odpowiedzialności', body: 'Firma MasterClean 1885 dokłada wszelkich starań, aby informacje na stronie były aktualne i dokładne, jednak nie gwarantuje całkowitego braku błędów lub nieścisłości.\n\nFirma nie ponosi odpowiedzialności za:\n• tymczasową niedostępność strony;\n• ewentualne błędy techniczne;\n• działania użytkowników strony.' },
      { heading: '5. Linki do stron trzecich', body: 'Strona może zawierać linki do zasobów stron trzecich. Firma MasterClean 1885 nie ponosi odpowiedzialności za treść i politykę prywatności takich stron.' },
      { heading: '6. Zmiany warunków', body: 'Firma MasterClean 1885 zastrzega sobie prawo do zmiany niniejszych Warunków korzystania w dowolnym momencie. Zaktualizowana wersja zostanie opublikowana na tej stronie.' },
      { heading: '7. Prawo właściwe', body: 'Niniejsze Warunki korzystania podlegają prawu Rzeczypospolitej Polskiej.' },
      { heading: '8. Kontakt', body: 'Jeśli masz pytania dotyczące niniejszych Warunków korzystania, skontaktuj się z nami:\n\nE-mail: sairus454@gmail.com\nAdres: 54-614 Wrocław, ul. Trawowa 14, Polska' },
    ],
  },
  uk: {
    title: 'Умови використання',
    lastUpdated: 'Останнє оновлення: 08.03.2026',
    sections: [
      { heading: '1. Загальна інформація', body: 'Власником та адміністратором сайту є компанія MasterClean 1885.\n\nКонтактна інформація:\nАдреса: 54-614 Wrocław, ul. Trawowa 14, Польща\nЕлектронна пошта: sairus454@gmail.com' },
      { heading: '2. Використання сайту', body: 'Користувач зобов\'язується використовувати сайт виключно в законних цілях і не вживати дій, які можуть порушити роботу сайту або обмежити доступ інших користувачів.\n\nЗаборонено:\n• використовувати сайт для поширення незаконної інформації;\n• намагатися отримати несанкціонований доступ до систем сайту;\n• копіювати або поширювати матеріали сайту без дозволу власника.' },
      { heading: '3. Інтелектуальна власність', body: 'Усі матеріали, розміщені на сайті (тексти, зображення, логотипи, дизайн та інші елементи), є власністю компанії MasterClean 1885 або використовуються на законних підставах.\n\nКопіювання, поширення або використання матеріалів без письмового дозволу заборонено.' },
      { heading: '4. Обмеження відповідальності', body: 'Компанія MasterClean 1885 докладає всіх зусиль для забезпечення актуальності та точності інформації на сайті, проте не гарантує повну відсутність помилок або неточностей.\n\nКомпанія не несе відповідальності за:\n• тимчасову недоступність сайту;\n• можливі технічні помилки;\n• дії користувачів сайту.' },
      { heading: '5. Посилання на сторонні сайти', body: 'Сайт може містити посилання на сторонні ресурси. Компанія MasterClean 1885 не несе відповідальності за зміст та політику конфіденційності таких сайтів.' },
      { heading: '6. Зміна умов', body: 'Компанія MasterClean 1885 залишає за собою право змінювати ці Умови використання в будь-який час. Оновлена версія буде опублікована на цій сторінці.' },
      { heading: '7. Застосовне право', body: 'Ці Умови використання регулюються законодавством Республіки Польща.' },
      { heading: '8. Контакти', body: 'Якщо у вас є питання щодо цих Умов використання, ви можете зв\'язатися з нами:\n\nEmail: sairus454@gmail.com\nАдреса: 54-614 Wrocław, ul. Trawowa 14, Польща' },
    ],
  },
};

const Terms = () => {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <Layout>
      <SEO
        title={c.title}
        description={`${c.title} — MasterClean 1885`}
        canonical="/terms"
        breadcrumbs={[{ name: c.title, path: '/terms' }]}
      />
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">{c.title}</h1>
          <p className="text-muted-foreground text-sm mb-4">{c.lastUpdated}</p>
          <p className="text-foreground/90 mb-8">
            {language === 'ru' && 'Добро пожаловать на сайт компании MasterClean 1885. Используя данный сайт, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с данными условиями, пожалуйста, не используйте сайт.'}
            {language === 'en' && 'Welcome to the MasterClean 1885 website. By using this website, you agree to these Terms of Use. If you do not agree with these terms, please do not use the website.'}
            {language === 'pl' && 'Witamy na stronie firmy MasterClean 1885. Korzystając z tej strony, akceptujesz niniejsze Warunki korzystania. Jeśli nie zgadzasz się z tymi warunkami, prosimy o niekorzystanie ze strony.'}
            {language === 'uk' && 'Ласкаво просимо на сайт компанії MasterClean 1885. Використовуючи цей сайт, ви погоджуєтесь з цими Умовами використання. Якщо ви не згодні з цими умовами, будь ласка, не використовуйте сайт.'}
          </p>

          <div className="space-y-6">
            {c.sections.map((s, i) => (
              <section key={i}>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-2">{s.heading}</h2>
                <p className="text-foreground/90 whitespace-pre-line">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
