export interface CityData {
  slug: string;
  name: string;
  region: string;
}

export const cities: CityData[] = [
  { slug: 'wroclaw', name: 'Wrocław', region: 'dolnośląskie' },
  { slug: 'opole', name: 'Opole', region: 'opolskie' },
  { slug: 'legnica', name: 'Legnica', region: 'dolnośląskie' },
  { slug: 'olawa', name: 'Oława', region: 'dolnośląskie' },
  { slug: 'kalisz', name: 'Kalisz', region: 'wielkopolskie' },
  { slug: 'leszno', name: 'Leszno', region: 'wielkopolskie' },
  { slug: 'swidnica', name: 'Świdnica', region: 'dolnośląskie' },
  { slug: 'walbrzych', name: 'Wałbrzych', region: 'dolnośląskie' },
  { slug: 'ostrow-wielkopolski', name: 'Ostrów Wielkopolski', region: 'wielkopolskie' },
  { slug: 'jelenia-gora', name: 'Jelenia Góra', region: 'dolnośląskie' },
  { slug: 'brzeg', name: 'Brzeg', region: 'opolskie' },
];

export const getCityBySlug = (slug: string): CityData | undefined => {
  return cities.find(c => c.slug === slug);
};
