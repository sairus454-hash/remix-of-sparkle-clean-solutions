import { useLanguage } from '@/i18n/LanguageContext';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRef } from 'react';

interface CookieContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: {
    title: string;
    content: string | string[];
  }[];
}

const cookieContent: Record<string, CookieContent> = {
  ru: {
    title: 'Политика использования файлов Cookie',
    lastUpdated: 'Дата последнего обновления: 08.03.2026',
    intro: 'Настоящая Политика использования файлов Cookie объясняет, как сайт masterclean1885.com использует файлы cookie и аналогичные технологии.',
    sections: [
      {
        title: 'Администратор сайта',
        content: [
          'Администратором сайта является компания MasterClean 1885.',
          'Контактная информация:',
          'Адрес: 54-614 Wrocław, ul. Trawowa 14, Польша',
          'Email: sairus454@gmail.com',
          'Сайт: masterclean1885.com',
        ],
      },
      {
        title: 'Что такое файлы Cookie',
        content: 'Файлы Cookie — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя (компьютере, смартфоне или планшете) при посещении веб-сайта. Они позволяют сайту распознавать устройство пользователя и улучшать работу сайта.',
      },
      {
        title: 'Для чего используются файлы Cookie',
        content: [
          'обеспечения правильной работы сайта;',
          'улучшения удобства использования сайта;',
          'анализа посещаемости сайта;',
          'запоминания пользовательских настроек;',
          'повышения безопасности сайта.',
        ],
      },
      {
        title: 'Типы используемых Cookie',
        content: [
          'Необходимые Cookie: Эти файлы необходимы для корректной работы сайта и не могут быть отключены в наших системах.',
          'Аналитические Cookie: Позволяют анализировать, как пользователи используют сайт, чтобы улучшать его работу.',
          'Функциональные Cookie: Помогают запоминать настройки пользователя и предоставлять более персонализированный опыт.',
        ],
      },
      {
        title: 'Управление файлами Cookie',
        content: [
          'Пользователь может в любое время изменить настройки использования Cookie в своем браузере.',
          'Большинство браузеров позволяет:',
          'просматривать сохраненные файлы Cookie;',
          'удалять файлы Cookie;',
          'блокировать использование файлов Cookie.',
          'Ограничение использования Cookie может повлиять на корректную работу некоторых функций сайта.',
        ],
      },
      {
        title: 'Изменения в Политике Cookie',
        content: 'Компания MasterClean 1885 оставляет за собой право изменять настоящую Политику использования файлов Cookie. Обновленная версия будет публиковаться на этой странице.',
      },
      {
        title: 'Контактная информация',
        content: [
          'Если у вас есть вопросы по поводу использования файлов Cookie, вы можете связаться с нами:',
          'MasterClean 1885',
          'Адрес: 54-614 Wrocław, ul. Trawowa 14, Польша',
          'Email: sairus454@gmail.com',
          'Сайт: masterclean1885.com',
        ],
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    lastUpdated: 'Last Updated: 08.03.2026',
    intro: 'This Cookie Policy explains how the website masterclean1885.com uses cookies and similar technologies.',
    sections: [
      {
        title: 'Website Administrator',
        content: [
          'The website administrator is MasterClean 1885.',
          'Contact Information:',
          'Address: 54-614 Wrocław, ul. Trawowa 14, Poland',
          'Email: sairus454@gmail.com',
          'Website: masterclean1885.com',
        ],
      },
      {
        title: 'What are Cookies',
        content: 'Cookies are small text files that are stored on a user\'s device (computer, smartphone or tablet) when visiting a website. They allow the website to recognize the user\'s device and improve the website\'s functionality.',
      },
      {
        title: 'Purpose of Cookies',
        content: [
          'ensuring proper website functionality;',
          'improving website usability;',
          'analyzing website traffic;',
          'remembering user preferences;',
          'enhancing website security.',
        ],
      },
      {
        title: 'Types of Cookies Used',
        content: [
          'Essential Cookies: These files are necessary for proper website operation and cannot be disabled in our systems.',
          'Analytical Cookies: Allow us to analyze how users use the website to improve its functionality.',
          'Functional Cookies: Help remember user preferences and provide a more personalized experience.',
        ],
      },
      {
        title: 'Cookie Management',
        content: [
          'Users can change their cookie settings in their browser at any time.',
          'Most browsers allow you to:',
          'view saved cookies;',
          'delete cookies;',
          'block the use of cookies.',
          'Restricting cookie use may affect the proper functioning of some website features.',
        ],
      },
      {
        title: 'Changes to the Cookie Policy',
        content: 'MasterClean 1885 reserves the right to modify this Cookie Policy. The updated version will be published on this page.',
      },
      {
        title: 'Contact Information',
        content: [
          'If you have any questions about our use of cookies, please contact us:',
          'MasterClean 1885',
          'Address: 54-614 Wrocław, ul. Trawowa 14, Poland',
          'Email: sairus454@gmail.com',
          'Website: masterclean1885.com',
        ],
      },
    ],
  },
  pl: {
    title: 'Polityka Cookies',
    lastUpdated: 'Ostatnia aktualizacja: 08.03.2026',
    intro: 'Niniejsza Polityka Cookies wyjaśnia, jak witryna masterclean1885.com wykorzystuje pliki cookies i podobne technologie.',
    sections: [
      {
        title: 'Administrator strony',
        content: [
          'Administratorem strony jest firma MasterClean 1885.',
          'Informacje kontaktowe:',
          'Adres: 54-614 Wrocław, ul. Trawowa 14, Polska',
          'Email: sairus454@gmail.com',
          'Strona: masterclean1885.com',
        ],
      },
      {
        title: 'Czym są pliki Cookies',
        content: 'Pliki Cookies to małe pliki tekstowe, które są przechowywane na urządzeniu użytkownika (komputerze, smartfonie lub tablecie) podczas odwiedzania witryny. Umożliwiają one witrynie rozpoznanie urządzenia użytkownika i usprawnienie funkcjonowania witryny.',
      },
      {
        title: 'Do czego używane są pliki Cookies',
        content: [
          'zapewnienia prawidłowego działania witryny;',
          'poprawy użyteczności witryny;',
          'analizy ruchu na witrynie;',
          'zapamiętywania ustawień użytkownika;',
          'zwiększenia bezpieczeństwa witryny.',
        ],
      },
      {
        title: 'Typy używanych plików Cookies',
        content: [
          'Pliki Cookies niezbędne: Te pliki są niezbędne do prawidłowego działania witryny i nie mogą być wyłączone w naszych systemach.',
          'Pliki Cookies analityczne: Umożliwiają analizę sposobu korzystania z witryny przez użytkowników w celu jej udoskonalenia.',
          'Pliki Cookies funkcjonalne: Pomagają zapamiętywać ustawienia użytkownika i zapewniać bardziej spersonalizowane doświadczenie.',
        ],
      },
      {
        title: 'Zarządzanie plikami Cookies',
        content: [
          'Użytkownik może w dowolnym momencie zmienić ustawienia cookies w przeglądarce.',
          'Większość przeglądarek pozwala na:',
          'przeglądanie zapisanych plików cookies;',
          'usuwanie plików cookies;',
          'blokowanie używania plików cookies.',
          'Ograniczenie używania plików cookies może wpłynąć na prawidłowe działanie niektórych funkcji witryny.',
        ],
      },
      {
        title: 'Zmiany w Polityce Cookies',
        content: 'Firma MasterClean 1885 zastrzega sobie prawo do zmian niniejszej Polityki Cookies. Zaktualizowana wersja będzie publikowana na tej stronie.',
      },
      {
        title: 'Informacje kontaktowe',
        content: [
          'Jeśli masz pytania dotyczące naszego używania plików cookies, skontaktuj się z nami:',
          'MasterClean 1885',
          'Adres: 54-614 Wrocław, ul. Trawowa 14, Polska',
          'Email: sairus454@gmail.com',
          'Strona: masterclean1885.com',
        ],
      },
    ],
  },
  uk: {
    title: 'Політика використання файлів Cookie',
    lastUpdated: 'Дата останнього оновлення: 08.03.2026',
    intro: 'Ця Політика використання файлів Cookie пояснює, як веб-сайт masterclean1885.com використовує файли cookies та аналогічні технології.',
    sections: [
      {
        title: 'Адміністратор сайту',
        content: [
          'Адміністратором сайту є компанія MasterClean 1885.',
          'Контактна інформація:',
          'Адреса: 54-614 Вроцлав, вул. Травова 14, Польща',
          'Email: sairus454@gmail.com',
          'Веб-сайт: masterclean1885.com',
        ],
      },
      {
        title: 'Що таке файли Cookie',
        content: 'Файли Cookie — це невеликі текстові файли, які зберігаються на пристрої користувача (комп\'ютері, смартфоні або планшеті) при відвідуванні веб-сайту. Вони дозволяють веб-сайту розпізнавати пристрій користувача та поліпшувати роботу сайту.',
      },
      {
        title: 'Для чого використовуються файли Cookie',
        content: [
          'забезпечення правильної роботи сайту;',
          'поліпшення зручності використання сайту;',
          'аналізу відвідуваності сайту;',
          'запам\'ятовування налаштувань користувача;',
          'підвищення безпеки сайту.',
        ],
      },
      {
        title: 'Типи використовуваних Cookie',
        content: [
          'Необхідні Cookie: Ці файли необхідні для правильної роботи сайту і не можуть бути вимкнені в наших системах.',
          'Аналітичні Cookie: Дозволяють аналізувати, як користувачі використовують сайт, щоб поліпшити його роботу.',
          'Функціональні Cookie: Допомагають запам\'ятовувати налаштування користувача та надавати більш персоналізований досвід.',
        ],
      },
      {
        title: 'Управління файлами Cookie',
        content: [
          'Користувач може в будь-який час змінити налаштування використання Cookie у своєму браузері.',
          'Більшість браузерів дозволяє:',
          'переглядати збережені файли Cookie;',
          'видаляти файли Cookie;',
          'блокувати використання файлів Cookie.',
          'Обмеження використання Cookie може вплинути на правильну роботу деяких функцій сайту.',
        ],
      },
      {
        title: 'Зміни в Політиці Cookie',
        content: 'Компанія MasterClean 1885 залишає за собою право змінювати цю Політику використання файлів Cookie. Оновлена версія буде опублікована на цій сторінці.',
      },
      {
        title: 'Контактна інформація',
        content: [
          'Якщо у вас є питання щодо нашого використання файлів Cookie, зв\'яжіться з нами:',
          'MasterClean 1885',
          'Адреса: 54-614 Вроцлав, вул. Травова 14, Польща',
          'Email: sairus454@gmail.com',
          'Веб-сайт: masterclean1885.com',
        ],
      },
    ],
  },
};

const Cookies = () => {
  const { language } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const content = cookieContent[language] || cookieContent.en;

  return (
    <>
      <SEO
        title={`${content.title} | MasterClean`}
        description={content.intro}
        canonical="https://masterclean1885.com/cookies"
      />
      <Header />
      <main className="min-h-screen bg-background text-foreground pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card/50 rounded-lg p-8 sm:p-12 border border-border/50">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent">
              {content.title}
            </h1>
            <p className="text-muted-foreground text-sm mb-8">{content.lastUpdated}</p>
            
            <p className="text-foreground/90 mb-8 leading-relaxed">{content.intro}</p>

            <div className="space-y-8">
              {content.sections.map((section, idx) => (
                <div key={idx} className="border-b border-border/30 pb-8 last:border-b-0">
                  <h2 className="text-2xl font-serif font-bold mb-4 text-primary">
                    {idx + 1}. {section.title}
                  </h2>
                  <div className="text-foreground/85 leading-relaxed space-y-3">
                    {typeof section.content === 'string' ? (
                      <p>{section.content}</p>
                    ) : (
                      section.content.map((line, i) => (
                        <p key={i} className={line.endsWith(';') || line.endsWith(':') ? 'ml-4' : ''}>
                          {line}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                {language === 'ru' 
                  ? '© 2026 MasterClean 1885. Все права защищены.' 
                  : language === 'en'
                  ? '© 2026 MasterClean 1885. All rights reserved.'
                  : language === 'pl'
                  ? '© 2026 MasterClean 1885. Wszystkie prawa zastrzeżone.'
                  : '© 2026 MasterClean 1885. Всі права захищені.'}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer ref={footerRef} />
    </>
  );
};

export default Cookies;
