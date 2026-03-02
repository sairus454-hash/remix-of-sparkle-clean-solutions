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

// Pre-defined events
export const gtmEvents = {
  formSubmit: (formName: string, extra?: Record<string, unknown>) =>
    pushEvent('form_submit', { form_name: formName, ...extra }),

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

  chatbotLeadSubmit: () =>
    pushEvent('chatbot_lead_submit'),

  pageView: (pagePath: string, pageTitle: string) =>
    pushEvent('virtual_page_view', { page_path: pagePath, page_title: pageTitle }),
};
