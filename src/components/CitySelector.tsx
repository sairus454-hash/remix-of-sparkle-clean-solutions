import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { cities } from '@/data/cities';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const CitySelector = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const cityLabel = t.city?.yourCity || 'Twoje miasto';

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-xs font-medium hover:bg-accent/40 px-2 h-8"
        onClick={() => setOpen(true)}
      >
        <MapPin className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">{cityLabel}</span>
      </Button>

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
          <div className="grid grid-cols-2 gap-2 mt-2">
            <AnimatePresence>
              {cities.map((city, i) => (
                <motion.button
                  key={city.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-card hover:bg-accent/40 hover:border-primary/40 transition-colors text-left group"
                  onClick={() => {
                    navigate(`/city/${city.slug}`);
                    setOpen(false);
                  }}
                >
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  <span className="text-sm font-medium">{city.name}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CitySelector;
