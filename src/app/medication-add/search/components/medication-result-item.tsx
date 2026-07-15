'use client';

import { cn } from '@/lib/utils';
import { Check, Pill } from 'lucide-react';
import type { DrugItem } from './medication-search-results';

// 카테고리명 해시로 3가지 색상 태그 중 하나를 결정 — 동일 카테고리는 항상 동일 색상
function getCategoryVariant(category: string): 'blue' | 'purple' | 'orange' {
  const hash = category.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (['blue', 'purple', 'orange'] as const)[hash % 3];
}

const COLOR_CLASSES = {
  blue: { bg: 'bg-med-blue-bg', icon: 'text-med-blue' },
  purple: { bg: 'bg-med-purple-bg', icon: 'text-med-purple' },
  orange: { bg: 'bg-med-orange-bg', icon: 'text-med-orange' },
} as const;

interface MedicationResultItemProps {
  drug: DrugItem;
  isSelected: boolean;
  onSelect: () => void;
}

export function MedicationResultItem({ drug, isSelected, onSelect }: MedicationResultItemProps) {
  const colors = COLOR_CLASSES[getCategoryVariant(drug.category)];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        'relative flex w-full items-center gap-4 rounded-xl p-4.5 text-left transition-all duration-150',
        isSelected
          ? 'border-primary bg-card shadow-card border-2'
          : 'bg-card shadow-card hover:border-primary/30 hover:bg-accent border-2 border-transparent',
      )}
    >
      <div
        className={cn('flex size-12 shrink-0 items-center justify-center rounded-lg', colors.bg)}
      >
        <Pill size={20} className={colors.icon} aria-hidden />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="kr-wrap text-foreground text-base font-semibold">{drug.name}</span>
        <span className="text-muted-foreground text-sm">
          {drug.manufacturer} / {drug.category}
        </span>
      </div>

      {isSelected ? (
        <div
          aria-hidden
          className="bg-accent-foreground absolute top-0 right-0 flex size-8 items-center justify-center rounded-tr-xl rounded-bl-lg"
        >
          <Check size={14} className="text-white" strokeWidth={2.5} />
        </div>
      ) : null}
    </button>
  );
}
