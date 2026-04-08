import HeroSlideshow from '@/components/HeroSlideshow';
import { useLanguage } from '@/i18n/LanguageContext';
import autoCleaning1 from '@/assets/auto-cleaning-1.jpg';
import autoCleaning2 from '@/assets/auto-cleaning-2.jpg';
import autoCleaning3 from '@/assets/auto-cleaning-3.jpg';

const AutoHeroSlideshow = () => {
  const { t } = useLanguage();
  const images = [
    { src: autoCleaning1, alt: t.auto?.heroAlt1 || 'Car seat cleaning' },
    { src: autoCleaning2, alt: t.auto?.heroAlt2 || 'Steam interior cleaning' },
    { src: autoCleaning3, alt: t.auto?.heroAlt3 || 'Car carpet cleaning' },
  ];
  return <HeroSlideshow images={images} />;
};

export default AutoHeroSlideshow;
