'use client';

import type { NotePrescription, NoteStatus } from '@/lib/data/types';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NotePrescriptionGroup } from './note-prescription-group';

type NoteFilter = 'all' | NoteStatus;

const FILTER_OPTIONS: { value: NoteFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '복용 중' },
  { value: 'stopped', label: '복용 중단' },
  { value: 'completed', label: '복용 완료' },
];

interface NoteListClientProps {
  prescriptions: NotePrescription[];
}

export function NoteListClient({ prescriptions }: NoteListClientProps) {
  const [filter, setFilter] = useState<NoteFilter>('all');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const currentLabel = FILTER_OPTIONS.find((o) => o.value === filter)?.label ?? '전체';

  // Escape 키로 닫고 트리거로 포커스 복귀
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // 드롭다운이 열릴 때 현재 선택된 옵션으로 포커스 이동
  useEffect(() => {
    if (!open || !listboxRef.current) return;
    const buttons = Array.from(listboxRef.current.querySelectorAll<HTMLButtonElement>('button'));
    const selectedIdx = FILTER_OPTIONS.findIndex((o) => o.value === filter);
    (buttons[Math.max(0, selectedIdx)] ?? buttons[0])?.focus();
    // open 변화 시에만 실행 — filter는 초기 포커스 위치 계산용으로만 사용
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleListKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const buttons = Array.from(
      listboxRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [],
    );
    const idx = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      buttons[(idx + 1) % buttons.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      buttons[(idx - 1 + buttons.length) % buttons.length]?.focus();
    }
  }

  function selectFilter(value: NoteFilter) {
    setFilter(value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  const filteredPrescriptions = prescriptions
    .map((prescription) => ({
      ...prescription,
      hospitals: prescription.hospitals
        .map((hospital) => ({
          ...hospital,
          medications:
            filter === 'all'
              ? hospital.medications
              : hospital.medications.filter((med) => med.status === filter),
        }))
        .filter((hospital) => hospital.medications.length > 0),
    }))
    .filter((prescription) => prescription.hospitals.length > 0);

  return (
    <div className="flex flex-col gap-6 px-4 pt-3 pb-6">
      {/* 전역 필터 */}
      <div className="flex justify-end">
        <div className="relative">
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="border-line bg-card text-ink-700 hover:bg-muted flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
          >
            {currentLabel}
            <ChevronDown
              size={12}
              aria-hidden
              className={cn('transition-transform duration-150', open && 'rotate-180')}
            />
          </button>

          {open ? (
            <>
              <div className="z-raised fixed inset-0" onClick={() => setOpen(false)} aria-hidden />
              <ul
                ref={listboxRef}
                role="listbox"
                aria-label="복약 상태 필터"
                onKeyDown={handleListKeyDown}
                className="z-dropdown bg-card shadow-raised absolute top-full right-0 mt-1 min-w-[7.5rem] overflow-hidden rounded-xl"
              >
                {FILTER_OPTIONS.map((option) => (
                  <li key={option.value} role="option" aria-selected={filter === option.value}>
                    <button
                      type="button"
                      onClick={() => selectFilter(option.value)}
                      className={cn(
                        'w-full px-4 py-3 text-left text-sm transition-colors',
                        filter === option.value
                          ? 'bg-status-active-bg text-primary font-medium'
                          : 'text-foreground hover:bg-muted',
                      )}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>

      {/* 처방 목록 */}
      {filteredPrescriptions.length === 0 ? (
        <p className="kr-wrap text-ink-500 py-8 text-center text-sm">
          해당 조건의 약물이 없습니다.
        </p>
      ) : (
        filteredPrescriptions.map((prescription) => (
          <NotePrescriptionGroup key={prescription.id} prescription={prescription} />
        ))
      )}
    </div>
  );
}
