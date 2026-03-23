import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { cities } from '@/data/cities';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const CitySelector = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const sortedCities = [...cities].sort((a, b) => {
    if (a.slug === 'wroclaw') return -1;
    if (b.slug === 'wroclaw') return 1;
    return a.name.localeCompare(b.name, 'pl');
  });

  const cityLabel = t.city?.yourCity || 'Twoje miasto';

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      >
        <span className="relative flex-shrink-0">
          <MapPin className="w-4 h-4 text-primary" />
        </span>
        <span className="text-xs font-semibold text-primary whitespace-nowrap hidden sm:inline">
          {cityLabel}
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {t.city?.selectCity || 'Wybierz miasto'}
            </DialogTitle>
            <DialogDescription>
              {t.city?.selectCityDesc || 'Wybierz swoje miasto, aby zobaczyć dostępne usługi i cennik'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 mt-2 max-h-[60vh] overflow-y-auto pr-1">
            {sortedCities.map((city) => (
              <button
                key={city.slug}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-card hover:bg-accent/40 hover:border-primary/40 transition-colors text-left group"
                onClick={() => {
                  navigate(`/city/${city.slug}`);
                  setOpen(false);
                }}
              >
                <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <span className="text-sm font-medium">{city.name}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CitySelector;
