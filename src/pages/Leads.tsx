import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, RefreshCw, Trash2 } from 'lucide-react';

interface Lead {
  id: string;
  source: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  city: string | null;
  address: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  payment_type: string | null;
  is_processed: boolean;
  created_at: string;
}

const SOURCES: Record<string, string> = {
  contact: 'Форма контакта',
  quick_order: 'Быстрый заказ',
  manager_estimate: 'Оценка менеджера',
  chat: 'Чат',
  carpet: 'Ковры',
};

const Leads = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('all');
  const [status, setStatus] = useState<'all' | 'new' | 'done'>('new');
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);
    if (error) toast({ title: 'Ошибка загрузки', variant: 'destructive' });
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggle = async (lead: Lead) => {
    const next = !lead.is_processed;
    setLeads((l) => l.map((x) => (x.id === lead.id ? { ...x, is_processed: next } : x)));
    const { error } = await (supabase as any)
      .from('leads')
      .update({ is_processed: next, processed_at: next ? new Date().toISOString() : null })
      .eq('id', lead.id);
    if (error) {
      toast({ title: 'Не удалось сохранить', variant: 'destructive' });
      load();
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить заявку?')) return;
    const { error } = await (supabase as any).from('leads').delete().eq('id', id);
    if (error) return toast({ title: 'Не удалось удалить', variant: 'destructive' });
    setLeads((l) => l.filter((x) => x.id !== id));
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) =>
      (source === 'all' || l.source === source) &&
      (status === 'all' || (status === 'done' ? l.is_processed : !l.is_processed)) &&
      (!q || [l.name, l.phone, l.email, l.service, l.message, l.city].some((v) => v?.toLowerCase().includes(q)))
    );
  }, [leads, source, status, search]);

  const newCount = leads.filter((l) => !l.is_processed).length;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Заявки | MasterClean Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/admin"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Админка</Button></Link>
          <h1 className="text-lg font-semibold">Заявки <Badge className="ml-2">{newCount} новых</Badge></h1>
          <Button variant="outline" size="sm" onClick={load}><RefreshCw className="w-4 h-4 mr-2" />Обновить</Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          {(['new', 'done', 'all'] as const).map((s) => (
            <Button key={s} size="sm" variant={status === s ? 'default' : 'outline'} onClick={() => setStatus(s)}>
              {s === 'new' ? 'Необработанные' : s === 'done' ? 'Обработанные' : 'Все'}
            </Button>
          ))}
          <span className="mx-2 text-muted-foreground">|</span>
          <Button size="sm" variant={source === 'all' ? 'default' : 'outline'} onClick={() => setSource('all')}>Все источники</Button>
          {Object.entries(SOURCES).map(([k, v]) => (
            <Button key={k} size="sm" variant={source === k ? 'default' : 'outline'} onClick={() => setSource(k)}>{v}</Button>
          ))}
          <Input className="max-w-xs ml-auto" placeholder="Поиск: имя, телефон, услуга…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Card>
          <CardHeader><CardTitle className="text-base">Найдено: {filtered.length}</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Заявок нет</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Обработано</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Источник</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Услуга / детали</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((l) => (
                    <TableRow key={l.id} className={l.is_processed ? 'opacity-60' : ''}>
                      <TableCell><Checkbox checked={l.is_processed} onCheckedChange={() => toggle(l)} aria-label="Обработано" /></TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{new Date(l.created_at).toLocaleString('ru-RU')}</TableCell>
                      <TableCell><Badge variant="secondary">{SOURCES[l.source] || l.source}</Badge></TableCell>
                      <TableCell className="text-sm">
                        <div className="font-medium">{l.name}</div>
                        <a href={`tel:${l.phone}`} className="text-primary">{l.phone}</a>
                        {l.email && <div className="text-muted-foreground">{l.email}</div>}
                      </TableCell>
                      <TableCell className="text-sm max-w-md">
                        {l.service && <div className="font-medium">{l.service}</div>}
                        {(l.city || l.address) && <div>📍 {[l.city, l.address].filter(Boolean).join(', ')}</div>}
                        {(l.preferred_date || l.preferred_time) && <div>📅 {[l.preferred_date, l.preferred_time].filter(Boolean).join(' ')}</div>}
                        {l.payment_type && <div>💳 {l.payment_type}</div>}
                        {l.message && <div className="whitespace-pre-wrap text-muted-foreground mt-1">{l.message}</div>}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => remove(l.id)} aria-label="Удалить"><Trash2 className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leads;
