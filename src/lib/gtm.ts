// Google Tag Manager dataLayer helper
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const pushEvent = (event: string, params?: Record<string, unknown>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
};

// Google Ads conversion event
export const pushConversion = (conversionLabel?: string, value?: number, currency = 'PLN') => {
  pushEvent('ads_conversion', {
    send_to: conversionLabel || 'AW-17379470297',
    value,
    currency,
  });
};

// Scroll depth tracking
let scrollTracked = new Set<number>();

const initScrollDepth = () => {
  if (typeof window === 'undefined') return;
  const thresholds = [25, 50, 75, 100];

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((scrollTop / docHeight) * 100);

    for (const t of thresholds) {
      if (percent >= t && !scrollTracked.has(t)) {
        scrollTracked.add(t);
        pushEvent('scroll_depth', { scroll_threshold: t, page_path: window.location.pathname });
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Reset tracked thresholds on route change
export const resetScrollDepth = () => {
  scrollTracked = new Set<number>();
};

// Auto-init
initScrollDepth();

// Pre-defined events
export const gtmEvents = {
  formSubmit: (formName: string, extra?: Record<string, unknown>) => {
    pushEvent('form_submit', { form_name: formName, ...extra });
    // Also fire Google Ads conversion
    pushConversion(undefined, extra?.total as number | undefined);
  },

  phoneClick: (location: string) =>
    pushEvent('phone_click', { click_location: location }),

  whatsappClick: (location: string) =>
    pushEvent('whatsapp_click', { click_location: location }),

  languageChange: (language: string) =>
    pushEvent('language_change', { language }),

  calculatorUse: (service: string, total: number) =>
    pushEvent('calculator_use', { service, total }),

  reviewSubmit: (rating: number) =>
    pushEvent('review_submit', { rating }),

  chatbotOpen: (trigger: 'auto' | 'manual') =>
    pushEvent('chatbot_open', { trigger }),

  chatbotMessage: () =>
    pushEvent('chatbot_message'),

  chatbotLeadSubmit: () => {
    pushEvent('chatbot_lead_submit');
    pushConversion();
  },

  pageView: (pagePath: string, pageTitle: string) =>
    pushEvent('virtual_page_view', { page_path: pagePath, page_title: pageTitle }),
};
