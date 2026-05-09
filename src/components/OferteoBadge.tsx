import { useLanguage } from '@/i18n/LanguageContext';
import oferteoBadge from '@/assets/oferteo-najlepsi-2026.png';
import fixlyBadge from '@/assets/fixly-top-2025.png';
import olawaBadge from '@/assets/partner-olawa-badge-2.jpg';
import mediaexpertBadge from '@/assets/partner-mediaexpert-badge.jpg';

const OferteoBadge = () => {
  const { language } = useLanguage();
  const oferteoLabel =
    language === 'ru' ? 'Oferteo — Лучшие 2026 — химчистка диванов'
    : language === 'uk' ? 'Oferteo — Найкращі 2026 — хімчистка диванів'
    : language === 'en' ? 'Oferteo — Best of 2026 — sofa cleaning'
    : 'Oferteo — Najlepsi 2026 — pranie kanap';
  const fixlyLabel =
    language === 'ru' ? 'Fixly — Топ исполнитель 2025 — MasterClean'
    : language === 'uk' ? 'Fixly — Топ виконавець 2025 — MasterClean'
    : language === 'en' ? 'Fixly — Top contractor 2025 — MasterClean'
    : 'Fixly — Top wykonawca 2025 — MasterClean';
  const olawaLabel =
    language === 'ru' ? 'Сотрудничество с администрацией города Олава'
    : language === 'uk' ? 'Співпраця з адміністрацією міста Олава'
    : language === 'en' ? 'Cooperation with the City Administration of Oława'
    : 'Współpraca z Administracją Miasta Oława';
  const mediaexpertLabel =
    language === 'ru' ? 'Сотрудничество с Media Expert'
    : language === 'uk' ? 'Співпраця з Media Expert'
    : language === 'en' ? 'Cooperation with Media Expert'
    : 'Współpraca z Media Expert';

  return (
    <section className="py-8 bg-gradient-section">
      <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-6 sm:gap-10">
        <a
          href="https://www.oferteo.pl/pranie-kanap"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={oferteoLabel}
          className="hover:scale-105 transition-transform inline-block"
        >
          <img
            src={oferteoBadge}
            alt={oferteoLabel}
            width={180}
            height={180}
            loading="lazy"
            className="w-32 sm:w-40 md:w-48 h-auto drop-shadow-lg"
          />
        </a>
        <a
          href="https://www.fixly.pl/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={fixlyLabel}
          className="hover:scale-105 transition-transform inline-block"
        >
          <img
            src={fixlyBadge}
            alt={fixlyLabel}
            width={180}
            height={180}
            loading="lazy"
            className="w-32 sm:w-40 md:w-48 h-auto drop-shadow-lg"
          />
        </a>
        <a
          href="/city/olawa"
          aria-label={olawaLabel}
          className="hover:scale-105 transition-transform inline-block"
        >
          <img
            src={olawaBadge}
            alt={olawaLabel}
            width={180}
            height={180}
            loading="lazy"
            className="w-32 sm:w-40 md:w-48 h-auto rounded-full drop-shadow-lg"
          />
        </a>
        <a
          href="https://www.mediaexpert.pl/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={mediaexpertLabel}
          className="hover:scale-105 transition-transform inline-block"
        >
          <img
            src={mediaexpertBadge}
            alt={mediaexpertLabel}
            width={180}
            height={180}
            loading="lazy"
            className="w-32 sm:w-40 md:w-48 h-auto rounded-lg drop-shadow-lg"
          />
        </a>
      </div>
    </section>
  );
};

export default OferteoBadge;

