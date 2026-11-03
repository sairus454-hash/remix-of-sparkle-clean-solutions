import { canTrack, readConsent, resolveRegion } from './trackingConsent';

export const ADS_ID = 'AW-17379470297';
export const ADS_LEAD_LABEL = `${ADS_ID}/r2XtCMGYjoIcENnXlt9A`;
export const ADS_PHONE_LABEL = `${ADS_ID}/2gVCCMP0-4EcENnXlt9A`;
const GA_ID = 'G-YSFRLC0L12';
let adsConfigured = false;
let analyticsConfigured = false;
function bootstrap() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer.push(args as unknown as Record<string, unknown>); };
}
export function refreshTracking() {
  bootstrap();
  const ads = canTrack('advertising');
  const analytics = canTrack('analytics');
  window.gtag?.('consent', 'update', {
    ad_storage: ads ? 'granted' : 'denied', analytics_storage: analytics ? 'granted' : 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  });
  if (!ads && !analytics) return;
  if (!document.querySelector('script[data-masterclean-google]')) {
    const script = document.createElement('script');
    script.async = true; script.dataset.mastercleanGoogle = '';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ads ? ADS_ID : GA_ID}`;
    document.head.appendChild(script);
    window.gtag?.('js', new Date());
  }
  if (ads && !adsConfigured) {
    window.gtag?.('set', 'developer_id.dZjgwMW', true);
    window.gtag?.('config', ADS_ID, { allow_ad_personalization_signals: false });
    adsConfigured = true;
  }
  if (analytics && !analyticsConfigured) {
    window.gtag?.('config', GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    analyticsConfigured = true;
    window.gtag?.('event', 'page_view', { send_to: GA_ID, page_path: location.pathname });
  }
}
export function sendAnalytics(event: string, params?: Record<string, unknown>) {
  if (!canTrack('analytics')) return;
  refreshTracking();
  window.gtag?.('event', event === 'virtual_page_view' ? 'page_view' : event, { ...params, send_to: GA_ID });
}
export function sendAdsConversion(target = ADS_LEAD_LABEL) {
  if (!canTrack('advertising')) return;
  if (![ADS_LEAD_LABEL, ADS_PHONE_LABEL].includes(target)) return;
  refreshTracking();
  const record = readConsent();
  // Local evidence reference; never send visitor consent records or form PII to Google.
  try {
    const evidence = JSON.parse(sessionStorage.getItem('mc-conversion-consent-history') || '[]');
    evidence.push({ target, at: new Date().toISOString(), visitorId: record?.visitorId, choiceAt: record?.history.at(-1)?.at, region: record?.region });
    sessionStorage.setItem('mc-conversion-consent-history', JSON.stringify(evidence));
    window.gtag?.('event', 'conversion', { send_to: target });
  } catch { /* Tracking must not interrupt the confirmed customer request. */ }
}
export function initializeTracking() {
  bootstrap();
  window.gtag?.('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  void resolveRegion().then(refreshTracking);
  const change = () => {
    // Reload cancels already-running libraries on withdrawal; no denied cookieless events.
    if ((adsConfigured && !canTrack('advertising')) || (analyticsConfigured && !canTrack('analytics'))) location.reload();
    else refreshTracking();
  };
  const storage = (event: StorageEvent) => { if (event.key === 'masterclean-consent-v2' || event.key === null) change(); };
  const phone = (event: MouseEvent) => {
    const target = event.target;
    if (target instanceof Element && target.closest('a[href^="tel:"]')) sendAdsConversion(ADS_PHONE_LABEL);
  };
  window.addEventListener('mc-consent-changed', change);
  window.addEventListener('storage', storage);
  document.addEventListener('click', phone, true);
  return () => { window.removeEventListener('mc-consent-changed', change); window.removeEventListener('storage', storage); document.removeEventListener('click', phone, true); };
}