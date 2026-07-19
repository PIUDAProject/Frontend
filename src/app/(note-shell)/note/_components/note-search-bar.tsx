'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function NoteSearchBar() {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="약명, 약 종류, 병원명으로 검색"
      onClick={() => router.push('/note/search')}
      className="border-line bg-card focus-visible:ring-primary hover:bg-muted flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <Search size={17} className="text-ink-400 shrink-0" aria-hidden />
      <span className="text-ink-500 text-sm">약명, 약 종류, 병원명을 입력하세요</span>
    </button>
  );
}
