import HeroSlideshow from '@/components/HeroSlideshow';
import heroBannerImage from '@/assets/hero-banner.jpg';
import autoCleaning1 from '@/assets/auto-cleaning-1.jpg';
import autoCleaning2 from '@/assets/auto-cleaning-2.jpg';
import handyman1 from '@/assets/handyman-1.jpg';
import handyman2 from '@/assets/handyman-2.jpg';

const images = [
  { src: heroBannerImage, alt: 'MasterClean — профессиональная химчистка' },
  { src: autoCleaning1, alt: 'Химчистка салона автомобиля' },
  { src: handyman1, alt: 'Мастер на час — мелкий ремонт' },
  { src: autoCleaning2, alt: 'Паровая чистка салона авто' },
  { src: handyman2, alt: 'Сантехнические работы' },
];

const IndexHeroSlideshow = () => <HeroSlideshow images={images} />;

export default IndexHeroSlideshow;
