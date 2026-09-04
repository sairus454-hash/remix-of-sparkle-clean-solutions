import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BASE_SERVICE_PRICES, loadServicePrices } from '@/data/servicePrices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, RotateCcw, Percent } from 'lucide-react';

const GROUPS: { title: string; keys: string[] }[] = [
  {
    title: 'Мебель',
    keys: [
      'pouf', 'chair', 'chairSeat', 'chairWithBack', 'chairConference', 'chairSwivel',
      'armchair', 'pillow', 'sofa2', 'sofa3', 'sofaCorner', 'sofaCornerLarge',
      'kitchenCorner', 'carseat', 'stroller',
    ],
  },
  {
    title: 'Матрасы и кровати',
    keys: [
      'mattressSingle', 'mattressDouble', 'mattressSingleDry', 'mattressDoubleDry',
      'mattressSingleDry2', 'mattressDoubleDry2', 'bedHeadboard', 'bedFrame',
      'bedHeadboardM', 'bedFrameM',
    ],
  },
  {
    title: 'Кожаная мебель',
    keys: [
      'leatherPouf', 'leatherChair', 'leatherChairSwivel', 'leatherArmchair',
      'leatherPillow', 'leatherSofa2', 'leatherSofa3', 'leatherSofaCorner',
    ],
  },
];

const ALL_KEYS = GROUPS.flatMap(g => g.keys).filter(k => k in BASE_SERVICE_PRICES);

const roundUp5 = (v: number) => Math.ceil(v / 5) * 5;

const PricesManager = () => {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [percent, setPercent] = useState('15');
  const [roundTo5, setRoundTo5] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const { data, error } = await supabase.from('prices').select('service_key, price_value');
      const fromDb: Record<string, number> = {};
      if (!error && data) {
        for (const row of data) {
          const num = Number(row.price_value);
          if (row.service_key && Number.isFinite(num)) fromDb[row.service_key] = num;
        }
      }
      const next: Record<string, string> = {};
      for (const key of ALL_KEYS) {
        next[key] = String(fromDb[key] ?? BASE_SERVICE_PRICES[key]);
      }
      setSaved(fromDb);
      setValues(next);
      setIsLoading(false);
    };
    void fetchPrices();
  }, []);

  const changedKeys = useMemo(
    () => ALL_KEYS.filter(k => Number(values[k]) !== saved[k]),
    [values, saved]
  );

  const applyPercent = () => {
    const pct = Number(percent.replace(',', '.'));
    if (!Number.isFinite(pct) || pct === 0) {
      toast({ title: 'Укажите процент', variant: 'destructive' });
      return;
    }
    setValues(prev => {
      const next: Record<string, string> = { ...prev };
      for (const key of ALL_KEYS) {
        const base = Number(prev[key]) || 0;
        const raw = base * (1 + pct / 100);
        next[key] = String(roundTo5 ? roundUp5(raw) : Math.round(raw));
      }
      return next;
    });
  };

  const resetToBase = () => {
    const next: Record<string, string> = {};
    for (const key of ALL_KEYS) next[key] = String(BASE_SERVICE_PRICES[key]);
    setValues(next);
  };

  const handleSave = async () => {
    const rows = ALL_KEYS.map(key => ({ service_key: key, price_value: Number(values[key]) }));
    const invalid = rows.find(r => !Number.isFinite(r.price_value) || r.price_value < 0);
    if (invalid) {
      toast({ title: 'Некорректная цена', description: invalid.service_key, variant: 'destructive' });
      return;
    }
    setIsSaving(true);
    const { error } = await supabase
      .from('prices')
      .upsert(rows, { onConflict: 'service_key' });
    setIsSaving(false);
    if (error) {
      toast({ title: 'Ошибка сохранения', description: error.message, variant: 'destructive' });
      return;
    }
    const nextSaved: Record<string, number> = {};
    for (const r of rows) nextSaved[r.service_key] = r.price_value;
    setSaved(nextSaved);
    await loadServicePrices(true);
    toast({ title: 'Цены сохранены', description: `Обновлено позиций: ${rows.length}` });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="w-5 h-5" />
            Массовое изменение
          </CardTitle>
          <CardDescription>
            Изменить все цены мебели, матрасов и кожи сразу на указанный процент. Отрицательное
            значение снижает цены. Затем нажмите «Сохранить».
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-4">
          <div className="space-y-2">
            <Label htmlFor="percent">Процент, %</Label>
            <Input
              id="percent"
              className="w-28"
              value={percent}
              onChange={e => setPercent(e.target.value)}
              inputMode="decimal"
            />
          </div>
          <div className="flex items-center gap-2 pb-2">
            <Switch id="round5" checked={roundTo5} onCheckedChange={setRoundTo5} />
            <Label htmlFor="round5">Округлять вверх до 5 zł</Label>
          </div>
          <Button onClick={applyPercent} variant="secondary">Применить процент</Button>
          <Button onClick={resetToBase} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Базовые значения
          </Button>
        </CardContent>
      </Card>

      {GROUPS.map(group => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.keys.filter(k => k in BASE_SERVICE_PRICES).map(key => {
              const isChanged = Number(values[key]) !== saved[key];
              return (
                <div key={key} className="space-y-1.5">
                  <Label htmlFor={`price-${key}`} className="text-xs text-muted-foreground">
                    {key} · база {BASE_SERVICE_PRICES[key]} zł
                  </Label>
                  <Input
                    id={`price-${key}`}
                    value={values[key] ?? ''}
                    inputMode="decimal"
                    onChange={e => setValues(prev => ({ ...prev, [key]: e.target.value }))}
                    className={isChanged ? 'border-primary' : undefined}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-lg border bg-card p-4 shadow-lg">
        <p className="text-sm text-muted-foreground">
          Изменено позиций: {changedKeys.length} из {ALL_KEYS.length}
        </p>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Сохранить в базу
        </Button>
      </div>
    </div>
  );
};

export default PricesManager;
