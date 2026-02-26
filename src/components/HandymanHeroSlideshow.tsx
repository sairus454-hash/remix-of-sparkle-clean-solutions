import HeroSlideshow from '@/components/HeroSlideshow';
import handyman1 from '@/assets/handyman-1.jpg';
import handyman2 from '@/assets/handyman-2.jpg';
import handyman3 from '@/assets/handyman-3.jpg';

const images = [
  { src: handyman1, alt: 'Электромонтажные работы' },
  { src: handyman2, alt: 'Сантехнические работы' },
  { src: handyman3, alt: 'Столярные работы' },
];

const HandymanHeroSlideshow = () => <HeroSlideshow images={images} objectFit="contain" />;

export default HandymanHeroSlideshow;
