'use client';

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

interface MedicationSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MedicationSearchInput({ value, onChange, className }: MedicationSearchInputProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search size={16} className="text-ink-400 absolute left-3.5" aria-hidden />
      <input
        type="search"
        placeholder="약 이름을 입력하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        autoComplete="off"
        className="border-border bg-card placeholder:text-ink-500 focus:border-primary focus:ring-primary w-full rounded-md border py-3 pr-10 pl-10 text-sm focus:ring-1 focus:outline-none"
        aria-label="약 이름 검색"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
          className="text-muted-foreground hover:text-foreground absolute right-3 -m-2.5 p-2.5 transition-colors"
        >
          <X size={16} aria-hidden />
        </button>
      )}
    </div>
  );
}
