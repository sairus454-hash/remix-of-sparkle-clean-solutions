import HeroSlideshow from '@/components/HeroSlideshow';
import autoCleaning1 from '@/assets/auto-cleaning-1.jpg';
import autoCleaning2 from '@/assets/auto-cleaning-2.jpg';
import autoCleaning3 from '@/assets/auto-cleaning-3.jpg';

const images = [
  { src: autoCleaning1, alt: 'Чистка сидений автомобиля' },
  { src: autoCleaning2, alt: 'Паровая чистка салона' },
  { src: autoCleaning3, alt: 'Чистка ковролина в авто' },
];

const AutoHeroSlideshow = () => <HeroSlideshow images={images} />;

export default AutoHeroSlideshow;
