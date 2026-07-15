'use client';

import { cn } from '@/lib/utils';
import type { DosingTime } from './types';

const TIME_OPTIONS: {
  value: DosingTime;
  label: string;
  activeClass: string;
  hoverClass: string;
}[] = [
  {
    value: 'morning',
    label: '아침',
    activeClass: 'border-meal-morning bg-accent text-meal-morning',
    hoverClass: 'hover:border-meal-morning hover:bg-accent hover:text-meal-morning',
  },
  {
    value: 'noon',
    label: '점심',
    activeClass: 'border-meal-noon bg-caution-bg text-meal-noon',
    hoverClass: 'hover:border-meal-noon hover:bg-caution-bg hover:text-meal-noon',
  },
  {
    value: 'night',
    label: '저녁',
    activeClass: 'border-meal-night bg-danger-bg text-meal-night',
    hoverClass: 'hover:border-meal-night hover:bg-danger-bg hover:text-meal-night',
  },
];

interface DosingTimeToggleProps {
  selected: DosingTime[];
  onChange: (times: DosingTime[]) => void;
}

export function DosingTimeToggle({ selected, onChange }: DosingTimeToggleProps) {
  function toggle(time: DosingTime) {
    if (selected.includes(time)) {
      onChange(selected.filter((t) => t !== time));
    } else {
      onChange([...selected, time]);
    }
  }

  return (
    <div className="flex gap-2" role="group" aria-label="복용 시기 선택">
      {TIME_OPTIONS.map(({ value, label, activeClass, hoverClass }) => {
        const isActive = selected.includes(value);
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => toggle(value)}
            className={cn(
              'min-h-[44px] flex-1 rounded-lg border py-3 text-sm font-medium transition-colors duration-150',
              isActive ? activeClass : cn('border-border text-muted-foreground', hoverClass),
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
