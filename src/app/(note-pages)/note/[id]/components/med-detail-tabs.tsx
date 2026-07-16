'use client';

import type { NoteMedicationDetail } from '@/lib/data/types';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

const TABS = ['효능·효과', '용법·용량', '주의사항', '부작용'] as const;

type TabLabel = (typeof TABS)[number];

interface MedDetailTabsProps {
  detail: Pick<NoteMedicationDetail, 'tabs'>;
}

export function MedDetailTabs({ detail }: MedDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabLabel>('효능·효과');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const contentMap: Record<TabLabel, string> = {
    '효능·효과': detail.tabs.efficacy,
    '용법·용량': detail.tabs.dosage,
    주의사항: detail.tabs.caution,
    부작용: detail.tabs.sideEffect,
  };

  function handleTabKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % TABS.length;
      tabRefs.current[next]?.focus();
      setActiveTab(TABS[next]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + TABS.length) % TABS.length;
      tabRefs.current[prev]?.focus();
      setActiveTab(TABS[prev]);
    }
  }

  return (
    <>
      {/* 탭 바 — 페이지 헤더(h-14 + safe-area) 아래에 고정 */}
      <div
        role="tablist"
        aria-label="약물 정보 탭"
        className="border-line bg-surface-2 z-sticky sticky top-[calc(3.5rem+env(safe-area-inset-top))] flex border-b"
      >
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              type="button"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab}`}
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
              className={cn(
                'focus-visible:ring-primary flex-1 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none',
                isActive
                  ? 'border-primary text-primary -mb-px border-b-2'
                  : 'text-ink-400 hover:text-ink-700',
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 탭 패널 — 전체 렌더링 후 hidden으로 제어 (aria-controls 유효성 보장) */}
      {TABS.map((tab) => (
        <div
          key={tab}
          role="tabpanel"
          id={`tabpanel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          hidden={activeTab !== tab}
          className="px-5 py-5"
        >
          <p className="kr-wrap text-ink-700 text-base leading-relaxed">{contentMap[tab]}</p>
        </div>
      ))}
    </>
  );
}
