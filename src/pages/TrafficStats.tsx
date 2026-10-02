import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RefreshCw, ArrowLeft, BarChart3 } from 'lucide-react';

interface VisitRow {
  session_id: string;
  page_path: string;
  source: string;
  utm_campaign: string | null;
  device: string | null;
  created_at: string;
}

type Period = 1 | 7 | 30 | 90;

const SOURCE_LABELS: Record<string, string> = {
  google_ads: 'Google Ads (реклама)',
  google_organic: 'Google (поиск)',
  other_search: 'Другие поисковики',
  social: 'Соцсети',
  referral: 'Другие сайты',
  utm: 'UTM-метки',
  other_ads: 'Другая реклама',
  direct: 'Прямые заходы',
};

const Bar = ({ value, max }: { value: number; max: number }) => (
  <span className="block mt-1 h-1.5 rounded-full bg-primary/20">
    <span className="block h-1.5 rounded-full bg-primary" style={{ width: `${Math.max(3, (value / (max || 1)) * 100)}%` }} />
  </span>
);

const TrafficStats = () => {
  const [rows, setRows] = useState<VisitRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>(30);

  const load = async () => {
    setLoading(true);
    setError(null);
    const since = new Date(Date.now() - period * 86400000).toISOString();
    const all: VisitRow[] = [];
    for (let from = 0; from < 20000; from += 1000) {
      const { data, error: err } = await supabase
        .from('page_visits')
        .select('session_id,page_path,source,utm_campaign,device,created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .range(from, from + 999);
      if (err) { setError(err.message); break; }
      all.push(...((data as VisitRow[]) || []));
      if (!data || data.length < 1000) break;
    }
    setRows(all);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [period]);

  const stats = useMemo(() => {
    const sessions = new Map<string, string>();
    const adsSessions = new Set<string>();
    const bySource = new Map<string, Set<string>>();
    const byDay = new Map<string, { all: Set<string>; ads: Set<string> }>();
    const pages = new Map<string, number>();
    const adsPages = new Map<string, number>();
    const campaigns = new Map<string, Set<string>>();
    let mobile = 0;
    for (const r of rows) {
      sessions.set(r.session_id, r.source);
      if (!bySource.has(r.source)) bySource.set(r.source, new Set());
      bySource.get(r.source)!.add(r.session_id);
      const day = r.created_at.slice(0, 10);
      if (!byDay.has(day)) byDay.set(day, { all: new Set(), ads: new Set() });
      byDay.get(day)!.all.add(r.session_id);
      pages.set(r.page_path, (pages.get(r.page_path) || 0) + 1);
      if (r.device === 'mobile') mobile++;
      if (r.source === 'google_ads') {
        adsSessions.add(r.session_id);
        byDay.get(day)!.ads.add(r.session_id);
        adsPages.set(r.page_path, (adsPages.get(r.page_path) || 0) + 1);
        const c = r.utm_campaign || 'без названия';
        if (!campaigns.has(c)) campaigns.set(c, new Set());
        campaigns.get(c)!.add(r.session_id);
      }
    }
    const sort = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
    return {
      visitors: sessions.size,
      ads: adsSessions.size,
      views: rows.length,
      mobilePct: rows.length ? Math.round((mobile / rows.length) * 100) : 0,
      sources: [...bySource.entries()].map(([k, v]) => [k, v.size] as [string, number]).sort((a, b) => b[1] - a[1]),
      days: [...byDay.entries()].map(([d, v]) => ({ d, all: v.all.size, ads: v.ads.size })).sort((a, b) => b.d.localeCompare(a.d)),
      pages: sort(pages),
      adsPages: sort(adsPages),
      campaigns: [...campaigns.entries()].map(([k, v]) => [k, v.size] as [string, number]).sort((a, b) => b[1] - a[1]),
    };
  }, [rows]);

  const maxDay = Math.max(1, ...stats.days.map((d) => d.all));

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" /> Посещаемость сайта
          </h1>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin"><ArrowLeft className="w-4 h-4 mr-1" /> В админку</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> Обновить
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {([1, 7, 30, 90] as Period[]).map((p) => (
            <Button key={p} size="sm" variant={period === p ? 'default' : 'outline'} onClick={() => setPeriod(p)}>
              {p === 1 ? 'Сегодня (24 ч)' : `${p} дней`}
            </Button>
          ))}
        </div>

        {error && <p className="text-sm text-destructive mb-4">Не удалось загрузить данные: {error}</p>}

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ['Посетители', stats.visitors],
                ['Из Google Ads', stats.ads],
                ['Просмотры страниц', stats.views],
                ['С телефона', `${stats.mobilePct}%`],
              ].map(([label, val]) => (
                <Card key={label as string}>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-3xl font-bold text-primary">{val}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {stats.views === 0 ? (
              <p className="text-muted-foreground py-8 text-center">Пока нет данных — статистика появится после первых посещений.</p>
            ) : (
              <>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Откуда приходят посетители</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {stats.sources.map(([s, n]) => (
                      <div key={s} className="text-sm">
                        <div className="flex justify-between"><span>{SOURCE_LABELS[s] || s}</span><span className="font-semibold text-primary">{n}</span></div>
                        <Bar value={n} max={stats.sources[0][1]} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">По дням</CardTitle></CardHeader>
                  <CardContent className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-3">Дата</th><th className="py-2 pr-3 w-1/2">Все посетители</th><th className="py-2">Google Ads</th>
                      </tr></thead>
                      <tbody>
                        {stats.days.map((d) => (
                          <tr key={d.d} className="border-b border-border/50">
                            <td className="py-2 pr-3 whitespace-nowrap">{new Date(d.d).toLocaleDateString('ru-RU')}</td>
                            <td className="py-2 pr-3"><span className="font-semibold">{d.all}</span><Bar value={d.all} max={maxDay} /></td>
                            <td className="py-2 font-semibold text-primary">{d.ads}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader><CardTitle className="text-lg">Google Ads: кампании</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {stats.campaigns.length === 0 ? <p className="text-muted-foreground">Пока нет переходов с рекламы.</p> :
                        stats.campaigns.map(([c, n]) => (
                          <div key={c} className="flex justify-between gap-2"><span className="truncate">{c}</span><span className="font-semibold text-primary">{n}</span></div>
                        ))}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-lg">Google Ads: страницы</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {stats.adsPages.length === 0 ? <p className="text-muted-foreground">Пока нет переходов с рекламы.</p> :
                        stats.adsPages.map(([p, n]) => (
                          <div key={p} className="flex justify-between gap-2"><span className="truncate">{p}</span><span className="font-semibold text-primary">{n}</span></div>
                        ))}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Популярные страницы (все посетители)</CardTitle></CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {stats.pages.map(([p, n]) => (
                      <div key={p}>
                        <div className="flex justify-between gap-2"><span className="truncate">{p}</span><span className="font-semibold text-primary">{n}</span></div>
                        <Bar value={n} max={stats.pages[0][1]} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficStats;
