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

const CitySelector = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const cityLabel = t.city?.yourCity || 'Twoje miasto';

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer group"
      >
        {/* Pulsing glow ring */}
        <span className="absolute inset-0 rounded-full animate-pulse border-2 border-primary/20 pointer-events-none" />
        {/* Bouncing pin icon */}
        <motion.span
          className="relative flex-shrink-0"
          animate={{
            y: [0, -4, 0, -2, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: 'easeInOut',
          }}
        >
          <MapPin className="w-4 h-4 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)]" />
          {/* Pin shadow dot */}
          <motion.span
            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-0.5 rounded-full bg-primary/30"
            animate={{
              scaleX: [1, 0.6, 1, 0.8, 1],
              opacity: [0.3, 0.15, 0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: 'easeInOut',
            }}
          />
        </motion.span>
        <span className="text-xs font-semibold text-primary whitespace-nowrap">
          {cityLabel}
        </span>
      </motion.button>

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
