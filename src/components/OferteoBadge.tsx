import { useLanguage } from '@/i18n/LanguageContext';
import oferteoBadge from '@/assets/oferteo-najlepsi-2026.png';

const OferteoBadge = () => {
  const { language } = useLanguage();
  const label =
    language === 'ru' ? 'Oferteo — Лучшие 2026 — химчистка диванов'
    : language === 'uk' ? 'Oferteo — Найкращі 2026 — хімчистка диванів'
    : language === 'en' ? 'Oferteo — Best of 2026 — sofa cleaning'
    : 'Oferteo — Najlepsi 2026 — pranie kanap';

  return (
    <section className="py-8 bg-gradient-section">
      <div className="container mx-auto px-4 flex justify-center">
        <a
          href="https://www.oferteo.pl/pranie-kanap"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="hover:scale-105 transition-transform inline-block"
        >
          <img
            src={oferteoBadge}
            alt={label}
            width={180}
            height={180}
            loading="lazy"
            className="w-32 sm:w-40 md:w-48 h-auto drop-shadow-lg"
          />
        </a>
      </div>
    </section>
  );
};

export default OferteoBadge;
