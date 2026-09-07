import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RefreshCw, ArrowLeft, MousePointerClick } from 'lucide-react';

interface ClickRow {
  item_id: string;
  item_name: string;
  item_category: string | null;
  price: number | null;
  action: string;
  location: string | null;
  page_path: string | null;
  created_at: string;
}

type Period = 7 | 30 | 0;

const ItemStats = () => {
  const [rows, setRows] = useState<ClickRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>(30);

  const load = async () => {
    setLoading(true);
    setError(null);
    let query = supabase
      .from('item_clicks')
      .select('item_id,item_name,item_category,price,action,location,page_path,created_at')
      .order('created_at', { ascending: false })
      .limit(5000);

    if (period > 0) {
      const since = new Date(Date.now() - period * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte('created_at', since);
    }

    const { data, error: err } = await query;
    if (err) setError(err.message);
    setRows((data as ClickRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const grouped = useMemo(() => {
    const map = new Map<
      string,
      { name: string; category: string; clicks: number; adds: number; lastAt: string }
    >();
    for (const r of rows) {
      const key = `${r.item_id}|${r.item_name}`;
      const entry =
        map.get(key) ||
        { name: r.item_name, category: r.item_category || '—', clicks: 0, adds: 0, lastAt: r.created_at };
      entry.clicks += 1;
      if (r.action === 'add') entry.adds += 1;
      if (r.created_at > entry.lastAt) entry.lastAt = r.created_at;
      map.set(key, entry);
    }
    return [...map.values()].sort((a, b) => b.clicks - a.clicks);
  }, [rows]);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of rows) {
      const key = r.item_category || '—';
      map.set(key, (map.get(key) || 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  const maxClicks = grouped[0]?.clicks || 1;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <MousePointerClick className="w-6 h-6 text-primary" />
              Статистика кликов по карточкам
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Всего событий за период: {rows.length}
              {rows.length >= 5000 ? ' (показаны последние 5000)' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-1" /> В админку
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> Обновить
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {([7, 30, 0] as Period[]).map((p) => (
            <Button
              key={p}
              size="sm"
              variant={period === p ? 'default' : 'outline'}
              onClick={() => setPeriod(p)}
            >
              {p === 0 ? 'Всё время' : `${p} дней`}
            </Button>
          ))}
        </div>

        {error && (
          <p className="text-sm text-destructive mb-4">Не удалось загрузить данные: {error}</p>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
          </div>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">
            Пока нет данных — статистика появится после первых кликов по карточкам.
          </p>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">По категориям</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {byCategory.map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{cat}</span>
                    <span className="font-semibold text-primary">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Популярные позиции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-3">#</th>
                        <th className="py-2 pr-3">Позиция</th>
                        <th className="py-2 pr-3">Категория</th>
                        <th className="py-2 pr-3">Клики</th>
                        <th className="py-2 pr-3">В корзину</th>
                        <th className="py-2">Последний клик</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grouped.map((g, i) => (
                        <tr key={g.name + i} className="border-b border-border/50">
                          <td className="py-2 pr-3 text-muted-foreground">{i + 1}</td>
                          <td className="py-2 pr-3">
                            <span className="font-medium text-foreground">{g.name}</span>
                            <span className="block mt-1 h-1.5 rounded-full bg-primary/20">
                              <span
                                className="block h-1.5 rounded-full bg-primary"
                                style={{ width: `${Math.max(4, (g.clicks / maxClicks) * 100)}%` }}
                              />
                            </span>
                          </td>
                          <td className="py-2 pr-3 text-muted-foreground">{g.category}</td>
                          <td className="py-2 pr-3 font-semibold text-primary">{g.clicks}</td>
                          <td className="py-2 pr-3">{g.adds}</td>
                          <td className="py-2 text-muted-foreground whitespace-nowrap">
                            {new Date(g.lastAt).toLocaleString('ru-RU')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemStats;
