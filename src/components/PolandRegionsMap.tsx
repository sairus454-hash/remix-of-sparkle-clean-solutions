import { useLanguage } from '@/i18n/LanguageContext';
import CircularRevealCard from './CircularRevealCard';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

const regions = [
  {
    id: 'dolnoslaskie',
    // Approximate path for Dolnośląskie
    path: 'M205,340 L230,325 L260,320 L285,330 L300,345 L310,370 L295,390 L270,400 L240,395 L215,385 L200,365 Z',
    center: { x: 255, y: 360 },
    labelRu: 'Нижнесилезское',
    labelEn: 'Lower Silesian',
    labelPl: 'Dolnośląskie',
    labelUk: 'Нижньосілезьке',
    capital: 'Wrocław',
  },
  {
    id: 'opolskie',
    // Approximate path for Opolskie
    path: 'M310,345 L335,335 L355,345 L360,370 L350,390 L325,400 L295,390 L310,370 Z',
    center: { x: 330, y: 368 },
    labelRu: 'Опольское',
    labelEn: 'Opole',
    labelPl: 'Opolskie',
    labelUk: 'Опольське',
    capital: 'Opole',
  },
  {
    id: 'wielkopolskie',
    // Approximate path for Wielkopolskie
    path: 'M220,200 L260,185 L300,190 L330,205 L340,230 L335,260 L320,285 L290,300 L260,305 L230,295 L210,275 L200,245 L205,220 Z',
    center: { x: 270, y: 248 },
    labelRu: 'Великопольское',
    labelEn: 'Greater Poland',
    labelPl: 'Wielkopolskie',
    labelUk: 'Великопольське',
    capital: 'Poznań',
  },
  {
    id: 'lubuskie',
    // Approximate path for Lubuskie
    path: 'M145,215 L170,200 L200,205 L215,225 L210,255 L200,280 L180,290 L155,280 L140,255 L138,235 Z',
    center: { x: 175, y: 248 },
    labelRu: 'Любуское',
    labelEn: 'Lubusz',
    labelPl: 'Lubuskie',
    labelUk: 'Любуське',
    capital: 'Gorzów Wlkp.',
  },
];

// Simplified Poland outline
const polandOutline =
  'M190,100 L230,85 L280,80 L330,85 L370,95 L410,100 L445,115 L470,140 L480,170 L485,210 L480,250 L470,280 L455,310 L440,335 L420,355 L400,375 L380,390 L360,400 L340,410 L310,415 L280,420 L250,415 L220,405 L195,395 L170,380 L150,360 L135,335 L125,305 L120,275 L118,245 L120,215 L130,185 L145,155 L160,130 L175,115 Z';

const PolandRegionsMap = () => {
  const { t, language } = useLanguage();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getLabel = (region: (typeof regions)[0]) => {
    switch (language) {
      case 'en': return region.labelEn;
      case 'pl': return region.labelPl;
      case 'uk': return region.labelUk;
      default: return region.labelRu;
    }
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <CircularRevealCard index={0}>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <MapPin className="w-7 h-7 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              </div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
              {language === 'ru' ? 'Наши регионы' : language === 'en' ? 'Our Regions' : language === 'pl' ? 'Nasze regiony' : 'Наші регіони'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'ru'
                ? 'Работаем в 4 воеводствах западной и юго-западной Польши'
                : language === 'en'
                  ? 'We operate in 4 voivodeships of western and south-western Poland'
                  : language === 'pl'
                    ? 'Działamy w 4 województwach zachodniej i południowo-zachodniej Polski'
                    : 'Працюємо в 4 воєводствах західної та південно-західної Польщі'}
            </p>
          </div>
        </CircularRevealCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* SVG Map */}
          <CircularRevealCard index={1}>
            <div className="flex justify-center">
              <svg viewBox="100 60 410 380" className="w-full max-w-md drop-shadow-lg" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}>
                {/* Poland outline */}
                <path
                  d={polandOutline}
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  className="transition-all duration-500"
                />

                {/* Highlighted regions */}
                {regions.map((region, i) => (
                  <g key={region.id}>
                    <path
                      d={region.path}
                      fill={hoveredRegion === region.id ? 'hsl(var(--primary))' : 'hsl(var(--fresh))'}
                      fillOpacity={hoveredRegion === region.id ? 0.9 : 0.6}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      style={{
                        animation: `fade-in 0.6s ease-out ${0.3 + i * 0.15}s both`,
                      }}
                    />
                    {/* Pulsing dot at capital */}
                    <circle
                      cx={region.center.x}
                      cy={region.center.y}
                      r={hoveredRegion === region.id ? 5 : 3.5}
                      fill="hsl(var(--primary))"
                      className="transition-all duration-300"
                      style={{ animation: 'pulse 2s ease-in-out infinite' }}
                    />
                    {/* Capital label */}
                    <text
                      x={region.center.x}
                      y={region.center.y - 10}
                      textAnchor="middle"
                      className="text-[9px] font-semibold fill-foreground pointer-events-none select-none"
                      style={{
                        animation: `fade-in 0.5s ease-out ${0.5 + i * 0.15}s both`,
                      }}
                    >
                      {region.capital}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CircularRevealCard>

          {/* Region cards */}
          <div className="grid grid-cols-2 gap-4">
            {regions.map((region, i) => (
              <CircularRevealCard key={region.id} index={i + 2}>
                <div
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer h-full ${
                    hoveredRegion === region.id
                      ? 'bg-primary/10 border-primary shadow-glow scale-[1.03]'
                      : 'bg-card border-border shadow-card hover:border-primary/50'
                  }`}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      hoveredRegion === region.id ? 'bg-primary' : 'bg-fresh'
                    }`} />
                    <h3 className="font-serif font-semibold text-foreground text-sm">{getLabel(region)}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {region.capital}
                  </p>
                </div>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolandRegionsMap;
