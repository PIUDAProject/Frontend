'use client';

'use client';

import { searchMedications } from '@/lib/data/note';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDeferredValue, useState } from 'react';
import { DateFilterBadge } from './components/date-filter-badge';
import { RecentSearches, useRecentSearches } from './components/recent-searches';
import { SearchInput } from './components/search-input';
import { SearchResults } from './components/search-results';

export default function NoteSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dateFrom = searchParams.get('from') ?? '';
  const dateTo = searchParams.get('to') ?? '';

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const deferredQuery = useDeferredValue(query);
  const { recents, addRecent, removeRecent, clearAll } = useRecentSearches();

  const results = deferredQuery.trim() ? searchMedications(deferredQuery) : [];
  const showResults = deferredQuery.trim().length > 0;

  function handleSelectRecent(q: string) {
    setQuery(q);
    addRecent(q);
  }

  function handleSearchSubmit(q: string) {
    if (q.trim()) addRecent(q.trim());
  }

  function handleDateFilterClick() {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (dateFrom) params.set('from', dateFrom);
    if (dateTo) params.set('to', dateTo);
    router.push(`/note/search/date-filter?${params.toString()}`);
  }

  return (
    <div className="bg-surface flex min-h-dvh flex-col">
      <h1 className="sr-only">약물 검색</h1>
      <SearchInput value={query} onSearch={setQuery} onSubmit={handleSearchSubmit} />

      {showResults ? (
        <div className="px-4 pt-3 pb-1">
          <DateFilterBadge
            from={dateFrom || undefined}
            to={dateTo || undefined}
            onClick={handleDateFilterClick}
          />
        </div>
      ) : null}

      <div className="flex-1 pt-2">
        {showResults ? (
          <SearchResults results={results} query={query.trim()} />
        ) : (
          <RecentSearches
            recents={recents}
            onSelect={handleSelectRecent}
            onRemove={removeRecent}
            onClearAll={clearAll}
          />
        )}
      </div>
    </div>
  );
}
