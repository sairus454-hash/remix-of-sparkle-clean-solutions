import { supabase } from '@/integrations/supabase/client';

export interface ItemClickPayload {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  action?: string;
  location?: string;
  language?: string;
  page_path?: string;
}

// Simple in-session throttle so rapid repeat clicks don't spam the table
const recent = new Map<string, number>();

// The database accepts only these values (see item_clicks insert policy)
const ACTIONS = ['open', 'add', 'remove'];
const LANGS = ['pl', 'ru', 'en', 'uk'];

export const logItemClick = async (payload: ItemClickPayload) => {
  try {
    const key = `${payload.item_id}|${payload.action || 'open'}`;
    const now = Date.now();
    const last = recent.get(key) || 0;
    if (now - last < 1500) return;
    recent.set(key, now);

    await supabase.from('item_clicks').insert({
      item_id: payload.item_id.slice(0, 120) || 'unknown',
      item_name: payload.item_name.slice(0, 200) || 'unknown',
      item_category: payload.item_category?.slice(0, 80) ?? null,
      price: typeof payload.price === 'number' && payload.price >= 0 && payload.price <= 100000 ? payload.price : null,
      action: ACTIONS.includes(payload.action || '') ? payload.action : 'open',
      location: payload.location?.slice(0, 80) ?? null,
      language: LANGS.find((l) => payload.language?.toLowerCase().startsWith(l)) ?? null,
      page_path: payload.page_path?.startsWith('/') ? payload.page_path.slice(0, 200) : null,
    });
  } catch {
    // analytics must never break the app
  }
};
