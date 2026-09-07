// Google Tag Manager dataLayer helper
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export const pushEvent = (event: string, params?: Record<string, unknown>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
};

// Google Ads conversion IDs / labels
export const ADS_ID = 'AW-18410131732';
// Label used for lead (form submission) conversions.
// Replace with a dedicated "Zapytanie z formularza" label from Google Ads if you create one.
export const ADS_LEAD_LABEL = `${ADS_ID}/clZ3COmoie4cEJSi0cpE`;

// Google Ads conversion event — sent both via gtag (direct) and dataLayer (GTM)
export const pushConversion = (sendTo?: string, value?: number, currency = 'PLN') => {
  const target = sendTo || ADS_LEAD_LABEL;
  pushEvent('ads_conversion', {
    send_to: target,
    value,
    currency,
  });
  try {
    window.gtag?.('event', 'conversion', {
      send_to: target,
      value,
      currency,
    });
  } catch {
    // ignore — analytics must never break the app
  }
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
const getLanguage = (): string => {
  if (typeof document === 'undefined') return 'unknown';
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const m = path.match(/^\/(ru|en|uk)(\/|$)/);
  if (m) return m[1];
  return document.documentElement.lang || 'pl';
};

export const gtmEvents = {
  formSubmit: (formName: string, extra?: Record<string, unknown>) => {
    const value = extra?.total as number | undefined;
    pushEvent('form_submit', {
      form_name: formName,
      form_status: 'success',
      language: getLanguage(),
      ...extra,
    });
    // Standard lead event (GA4 / Ads)
    pushEvent('generate_lead', {
      form_name: formName,
      language: getLanguage(),
      value,
      currency: 'PLN',
    });
    // Google Ads conversion
    pushConversion(undefined, value);
  },


  formSubmitError: (formName: string, extra?: Record<string, unknown>) => {
    pushEvent('form_submit_error', {
      form_name: formName,
      form_status: 'error',
      language: getLanguage(),
      ...extra,
    });
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
