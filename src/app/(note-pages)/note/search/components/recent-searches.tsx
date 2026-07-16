'use client';

import { Clock, X } from 'lucide-react';
import { useState } from 'react';

const STORAGE_KEY = 'note-search-recents';
const STORAGE_VERSION = 1;

type StoredData = { version: number; items: string[] };

function loadRecents(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredData;
    if (parsed.version !== STORAGE_VERSION) return [];
    return parsed.items;
  } catch {
    return [];
  }
}

function saveRecents(items: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, items }));
}

export function useRecentSearches() {
  const [recents, setRecents] = useState<string[]>(loadRecents);

  function addRecent(q: string) {
    setRecents((prev) => {
      const next = [q, ...prev.filter((r) => r !== q)].slice(0, 10);
      saveRecents(next);
      return next;
    });
  }

  function removeRecent(q: string) {
    setRecents((prev) => {
      const next = prev.filter((r) => r !== q);
      saveRecents(next);
      return next;
    });
  }

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    setRecents([]);
  }

  return { recents, addRecent, removeRecent, clearAll };
}

interface RecentSearchesProps {
  recents: string[];
  onSelect: (q: string) => void;
  onRemove: (q: string) => void;
  onClearAll: () => void;
}

export function RecentSearches({ recents, onSelect, onRemove, onClearAll }: RecentSearchesProps) {
  if (recents.length === 0) {
    return (
      <p className="kr-wrap text-ink-500 px-4 py-10 text-center text-sm">최근 검색어가 없습니다.</p>
    );
  }

  return (
    <div className="px-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-ink-500 text-xs font-semibold">최근 검색어</span>
        <button
          type="button"
          onClick={onClearAll}
          className="focus-visible:ring-primary text-ink-400 hover:text-ink-700 -m-2 rounded-md p-2 text-xs focus-visible:ring-1 focus-visible:outline-none"
        >
          전체 삭제
        </button>
      </div>

      <ul role="list" className="flex flex-col">
        {recents.map((q) => (
          <li key={q} className="flex items-center justify-between gap-2 py-2.5">
            <button
              type="button"
              onClick={() => onSelect(q)}
              className="flex min-w-0 flex-1 items-center gap-2.5 text-left transition-opacity duration-100 hover:opacity-70"
            >
              <Clock size={15} className="text-ink-400 shrink-0" aria-hidden />
              <span className="text-foreground truncate text-sm">{q}</span>
            </button>
            <button
              type="button"
              aria-label={`${q} 삭제`}
              onClick={() => onRemove(q)}
              className="focus-visible:ring-primary text-ink-400 hover:text-ink-700 -m-2.5 rounded-md p-2.5 focus-visible:ring-1 focus-visible:outline-none"
            >
              <X size={14} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
