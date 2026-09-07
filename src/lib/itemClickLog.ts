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

export const logItemClick = async (payload: ItemClickPayload) => {
  try {
    const key = `${payload.item_id}|${payload.action || 'open'}`;
    const now = Date.now();
    const last = recent.get(key) || 0;
    if (now - last < 1500) return;
    recent.set(key, now);

    await supabase.from('item_clicks').insert({
      item_id: payload.item_id.slice(0, 120),
      item_name: payload.item_name.slice(0, 200),
      item_category: payload.item_category?.slice(0, 80) ?? null,
      price: typeof payload.price === 'number' ? payload.price : null,
      action: payload.action || 'open',
      location: payload.location?.slice(0, 80) ?? null,
      language: payload.language?.slice(0, 5) ?? null,
      page_path: payload.page_path?.slice(0, 200) ?? null,
    });
  } catch {
    // analytics must never break the app
  }
};
