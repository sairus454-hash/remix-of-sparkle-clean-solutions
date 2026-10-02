import { supabase } from '@/integrations/supabase/client';

interface SessionInfo {
  id: string;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer_host: string | null;
}

const KEY = 'mc_visit_session';
let lastPath = '';

const detectSession = (): SessionInfo => {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }

  const p = new URLSearchParams(window.location.search);
  const utm_source = p.get('utm_source');
  const utm_medium = p.get('utm_medium');
  const utm_campaign = p.get('utm_campaign');
  let referrer_host: string | null = null;
  try {
    if (document.referrer) {
      const h = new URL(document.referrer).hostname;
      if (h !== window.location.hostname) referrer_host = h;
    }
  } catch { /* ignore */ }

  let source = 'direct';
  const paid = /^(cpc|ppc|paid|paidsearch)$/i.test(utm_medium || '');
  if (p.get('gclid') || p.get('gbraid') || p.get('wbraid') || (paid && /google/i.test(utm_source || ''))) {
    source = 'google_ads';
  } else if (utm_source) {
    source = paid ? 'other_ads' : 'utm';
  } else if (referrer_host) {
    if (/google\./.test(referrer_host)) source = 'google_organic';
    else if (/(bing|yandex|duckduckgo|yahoo)\./.test(referrer_host)) source = 'other_search';
    else if (/(facebook|instagram|t\.co|twitter|tiktok|linkedin|youtube)/.test(referrer_host)) source = 'social';
    else source = 'referral';
  }

  const info: SessionInfo = {
    id: crypto.randomUUID?.() || String(Date.now()) + Math.random().toString(36).slice(2),
    source,
    utm_source: utm_source?.slice(0, 100) ?? null,
    utm_medium: utm_medium?.slice(0, 100) ?? null,
    utm_campaign: utm_campaign?.slice(0, 150) ?? null,
    referrer_host: referrer_host?.slice(0, 120) ?? null,
  };
  try { sessionStorage.setItem(KEY, JSON.stringify(info)); } catch { /* ignore */ }
  (info as SessionInfo & { _new?: boolean })._new = true;
  return info;
};

const isBot = () => /bot|crawl|spider|lighthouse|headless/i.test(navigator.userAgent);

export const logPageVisit = async (path: string) => {
  try {
    if (typeof window === 'undefined' || isBot()) return;
    if (path.startsWith('/admin') || path === lastPath) return;
    lastPath = path;
    const s = detectSession() as SessionInfo & { _new?: boolean };
    const m = path.match(/^\/(ru|en|uk)(\/|$)/);
    await supabase.from('page_visits').insert({
      session_id: s.id.slice(0, 64),
      page_path: path.slice(0, 200),
      source: s.source,
      utm_source: s.utm_source,
      utm_medium: s.utm_medium,
      utm_campaign: s.utm_campaign,
      referrer_host: s.referrer_host,
      language: m ? m[1] : 'pl',
      device: window.innerWidth < 768 ? 'mobile' : 'desktop',
      is_landing: !!s._new,
    });
  } catch {
    // analytics must never break the app
  }
};
