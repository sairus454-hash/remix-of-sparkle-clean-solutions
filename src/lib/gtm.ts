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
