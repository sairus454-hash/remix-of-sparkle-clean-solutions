import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Sparkles, Search, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';

export interface SmartFilterCategory {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface SmartServiceFilterProps {
  categories: SmartFilterCategory[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  /** Visual color theme — primary (default) or yellow (handyman) */
  variant?: 'primary' | 'yellow';
  /** Show search field (default true) */
  showSearch?: boolean;
  /** Optional results counter (e.g. "12 услуг найдено") */
  resultsCount?: number;
}

const labels = {
  ru: { all: 'Все услуги', title: 'Умный фильтр услуг', search: 'Найти услугу…', clear: 'Очистить', found: 'найдено', noResults: 'Ничего не найдено — попробуйте другой запрос' },
  pl: { all: 'Wszystkie usługi', title: 'Inteligentny filtr usług', search: 'Znajdź usługę…', clear: 'Wyczyść', found: 'znaleziono', noResults: 'Brak wyników — spróbuj inne zapytanie' },
  en: { all: 'All services', title: 'Smart service filter', search: 'Find a service…', clear: 'Clear', found: 'found', noResults: 'No results — try another query' },
  uk: { all: 'Усі послуги', title: 'Розумний фільтр послуг', search: 'Знайти послугу…', clear: 'Очистити', found: 'знайдено', noResults: 'Нічого не знайдено — спробуйте інший запит' },
};

const SmartServiceFilter = ({
  categories,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  variant = 'primary',
  showSearch = true,
  resultsCount,
}: SmartServiceFilterProps) => {
  const { language } = useLanguage();
  const l = labels[language as keyof typeof labels] || labels.pl;

  const activeClasses = variant === 'yellow'
    ? 'bg-yellow-400/20 border-yellow-400 text-yellow-700 shadow-md'
    : 'bg-gradient-hero text-primary-foreground border-transparent shadow-glow';

  const inactiveClasses = variant === 'yellow'
    ? 'bg-card text-foreground border-border hover:border-yellow-400/60 hover:bg-yellow-400/10'
    : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent/40';

  return (
    <div className="max-w-5xl mx-auto mb-6 sm:mb-8 space-y-3">
      <p className="text-xs sm:text-sm font-medium text-muted-foreground text-center sm:text-left">
        {l.title}
      </p>

      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            inputMode="search"
            placeholder={l.search}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-9 h-11 sm:h-10 bg-card"
            aria-label={l.search}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label={l.clear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        <button
          type="button"
          onClick={() => onFilterChange('all')}
          aria-pressed={activeFilter === 'all'}
          className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all touch-manipulation active:scale-95 ${
            activeFilter === 'all' ? activeClasses : inactiveClasses
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {l.all}
        </button>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const active = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onFilterChange(cat.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all touch-manipulation active:scale-95 ${
                active ? activeClasses : inactiveClasses
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.title}
            </button>
          );
        })}
      </div>

      {(searchQuery || activeFilter !== 'all') && typeof resultsCount === 'number' && (
        <p className="text-xs text-muted-foreground text-center sm:text-left" aria-live="polite">
          {resultsCount > 0
            ? `${resultsCount} ${l.found}`
            : l.noResults}
        </p>
      )}
    </div>
  );
};

/** Hook — apply text search to items inside categories */
export function useFilteredCategoryItems<
  T extends { id: string; items: { id: string; name: string }[] }
>(categories: T[], activeFilter: string, searchQuery: string): { categories: T[]; totalItems: number } {
  return useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const byCat = activeFilter === 'all'
      ? categories
      : categories.filter(c => c.id === activeFilter);

    if (!q) {
      const total = byCat.reduce((s, c) => s + c.items.length, 0);
      return { categories: byCat, totalItems: total };
    }

    const filtered = byCat
      .map(c => ({ ...c, items: c.items.filter(i => i.name.toLowerCase().includes(q)) }))
      .filter(c => c.items.length > 0) as T[];
    const total = filtered.reduce((s, c) => s + c.items.length, 0);
    return { categories: filtered, totalItems: total };
  }, [categories, activeFilter, searchQuery]);
}

export default SmartServiceFilter;
