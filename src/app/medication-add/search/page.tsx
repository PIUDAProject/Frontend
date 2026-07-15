'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeferredValue, useState } from 'react';
import { MedicationSearchInput } from './components/medication-search-input';
import type { DrugItem } from './components/medication-search-results';
import { MedicationSearchResults } from './components/medication-search-results';

const MOCK_DRUGS: DrugItem[] = [
  { code: 'D001', name: '타이레놀정 500mg', manufacturer: '한국얀센', category: '해열진통제' },
  {
    code: 'D002',
    name: '어린이 타이레놀 현탁액',
    manufacturer: '한국얀센',
    category: '해열진통제',
  },
  { code: 'D003', name: '판콜에이내복액', manufacturer: '동화약품', category: '종합감기약' },
  { code: 'D004', name: '게보린정', manufacturer: '삼진제약', category: '해열진통제' },
  { code: 'D005', name: '아스피린정 100mg', manufacturer: '바이엘코리아', category: '혈전예방제' },
  {
    code: 'D006',
    name: '리피토정 10mg',
    manufacturer: '한국화이자제약',
    category: '고지혈증치료제',
  },
  { code: 'D007', name: '노바스크정 5mg', manufacturer: '한국화이자제약', category: '혈압강하제' },
  { code: 'D008', name: '메트포르민정 500mg', manufacturer: '종근당', category: '당뇨병치료제' },
];

// 검색 토큰을 모듈 초기화 시 1회만 소문자 변환 — 매 검색 호출마다 toLowerCase 반복 방지
const DRUG_SEARCH_TOKENS = MOCK_DRUGS.map((d) => ({
  name: d.name.toLowerCase(),
  manufacturer: d.manufacturer.toLowerCase(),
  category: d.category.toLowerCase(),
}));

function searchDrugs(query: string): DrugItem[] {
  if (!query.trim()) return [];
  const lower = query.toLowerCase();
  return MOCK_DRUGS.filter((_, i) => {
    const t = DRUG_SEARCH_TOKENS[i];
    return t.name.includes(lower) || t.manufacturer.includes(lower) || t.category.includes(lower);
  });
}

export default function MedicationSearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugItem | null>(null);
  const deferredQuery = useDeferredValue(query);
  const results = searchDrugs(deferredQuery);
  const isStale = query !== deferredQuery;

  function handleSelect(drug: DrugItem) {
    setSelectedDrug((prev) => (prev?.code === drug.code ? null : drug));
  }

  function handleConfirm() {
    if (!selectedDrug) return;
    router.push(
      `/medication-add/direct?drugName=${encodeURIComponent(selectedDrug.name)}&drugCode=${selectedDrug.code}&manufacturer=${encodeURIComponent(selectedDrug.manufacturer)}&ts=${Date.now()}`,
    );
  }

  return (
    <div className="bg-surface flex min-h-dvh flex-col">
      {/* TopAppBar */}
      <header className="z-sticky border-border bg-surface-2 sticky top-0 border-b px-2 pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="뒤로 가기"
            className="text-primary focus-visible:ring-primary -m-2.5 p-2.5 focus-visible:rounded-md focus-visible:ring-2 focus-visible:outline-none"
          >
            <ChevronLeft size={22} aria-hidden />
          </button>
          <h1 className="text-foreground text-xl font-semibold">약 추가하기</h1>
        </div>
      </header>

      {/* 검색창 */}
      <div className="px-4 pt-4 pb-3">
        <MedicationSearchInput value={query} onChange={setQuery} />
      </div>

      {/* 검색 결과 */}
      <div
        className={cn(
          'flex-1 overflow-y-auto px-4 transition-opacity duration-150',
          selectedDrug ? 'pb-[max(7rem,calc(env(safe-area-inset-bottom)+7rem))]' : 'pb-4',
          isStale && 'opacity-60',
        )}
      >
        <MedicationSearchResults
          results={results}
          selectedCode={selectedDrug?.code ?? null}
          onSelect={handleSelect}
          hasQuery={deferredQuery.length > 0}
        />
      </div>

      {/* 하단 CTA — 선택 시만 표시 */}
      {selectedDrug !== null ? (
        <div className="border-border bg-card fixed bottom-0 left-1/2 w-full max-w-[390px] -translate-x-1/2 border-t px-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Button size="cta" onClick={handleConfirm}>
            선택하기
          </Button>
        </div>
      ) : null}
    </div>
  );
}
