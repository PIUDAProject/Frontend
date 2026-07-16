'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface SearchInputProps {
  value: string;
  onSearch: (q: string) => void;
  onSubmit?: (q: string) => void;
}

export function SearchInput({ value, onSearch, onSubmit }: SearchInputProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onSearch(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.(value);
    inputRef.current?.blur();
  }

  function handleClear() {
    onSearch('');
    inputRef.current?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-line bg-surface-2 flex items-center gap-2 border-b px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-3"
    >
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => router.back()}
        className="text-ink-700 focus-visible:ring-primary -m-2.5 shrink-0 rounded-md p-2.5 focus-visible:ring-2 focus-visible:outline-none"
      >
        <ChevronLeft size={24} aria-hidden />
      </button>

      <div className="relative flex-1">
        <Search
          size={16}
          className="text-ink-400 absolute top-1/2 left-3 -translate-y-1/2"
          aria-hidden
        />
        <input
          ref={inputRef}
          autoFocus
          type="search"
          value={value}
          onChange={handleChange}
          placeholder="약명, 약 종류, 병원명을 입력하세요"
          className={cn(
            'border-line bg-card text-foreground placeholder:text-ink-500 focus:ring-primary w-full rounded-xl border py-2.5 pr-8 pl-9 text-sm focus:ring-2 focus:outline-none [&::-webkit-search-cancel-button]:hidden',
          )}
        />
        {value && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={handleClear}
            className="text-ink-400 hover:text-ink-700 focus-visible:ring-primary absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-2 transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            <X size={15} aria-hidden />
          </button>
        )}
      </div>
    </form>
  );
}
