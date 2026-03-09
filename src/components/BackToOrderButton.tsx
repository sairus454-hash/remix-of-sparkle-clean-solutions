import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Floating button that appears when user navigated from the contact form
 * (via recommendation chips). Clicking it navigates back to /contacts.
 */
const BackToOrderButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const state = location.state as { openCategory?: string } | null;
  const show = !!state?.openCategory;

  const label: Record<string, string> = {
    ru: 'Назад к заявке',
    pl: 'Wróć do zamówienia',
    uk: 'Назад до заявки',
    en: 'Back to order',
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={() => navigate('/contacts')}
        className="fixed bottom-6 left-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-glow hover:scale-105 active:scale-95 transition-transform text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">{label[language] || label.ru}</span>
        <ShoppingCart className="w-4 h-4 sm:hidden" />
      </motion.button>
    </AnimatePresence>
  );
};

export default BackToOrderButton;
