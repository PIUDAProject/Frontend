'use client';

import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

const KO_DAY = ['일', '월', '화', '수', '목', '금', '토'] as const;

type WeekDay = {
  iso: string;
  dayName: string;
  date: number;
  isToday: boolean;
};

function buildWeek(anchorISO: string): WeekDay[] {
  const anchor = dayjs(anchorISO);
  const sunday = anchor.startOf('week');

  return Array.from({ length: 7 }, (_, i) => {
    const d = sunday.add(i, 'day');
    const iso = d.format('YYYY-MM-DD');
    return {
      iso,
      dayName: KO_DAY[d.day()],
      date: d.date(),
      isToday: iso === anchorISO,
    };
  });
}

type WeekStripProps = {
  anchorISO: string;
  markedISO?: readonly string[];
  selectedISO?: string;
  onSelectDate?: (iso: string) => void;
  className?: string;
};

export function WeekStrip({
  anchorISO,
  markedISO,
  selectedISO,
  onSelectDate,
  className,
}: WeekStripProps) {
  const week = buildWeek(anchorISO);
  const marked = new Set(markedISO ?? []);

  const [internal, setInternal] = useState(anchorISO);
  const selected = selectedISO ?? internal;

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleSelect = (iso: string) => {
    if (selectedISO === undefined) setInternal(iso);
    onSelectDate?.(iso);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const nextIndex = e.key === 'ArrowLeft' ? (index - 1 + 7) % 7 : (index + 1) % 7;
    handleSelect(week[nextIndex].iso);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="주간 날짜 선택"
      className={cn('flex gap-1.5 px-4 pt-4 pb-2.5', className)}
    >
      {week.map((day, index) => {
        const isSelected = day.iso === selected;
        const hasDot = marked.has(day.iso);

        return (
          <button
            key={day.iso}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            tabIndex={isSelected ? 0 : -1}
            aria-checked={isSelected}
            aria-current={day.isToday ? 'date' : undefined}
            aria-label={`${day.date}일 ${day.dayName}요일${day.isToday ? ', 오늘' : ''}${hasDot ? ', 복약 일정 있음' : ''}`}
            onClick={() => handleSelect(day.iso)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'group flex min-w-0 flex-1 cursor-pointer flex-col items-center rounded-xl',
              'border pt-2.5 pb-2 transition duration-150 outline-none',
              'focus-visible:ring-2 focus-visible:ring-offset-1',
              isSelected
                ? 'border-primary bg-primary shadow-fab focus-visible:ring-offset-primary focus-visible:ring-white/70'
                : cn(
                    'focus-visible:ring-primary',
                    'border-line bg-card hover:border-primary hover:bg-accent',
                    day.isToday && 'ring-primary/40 ring-1 ring-inset',
                  ),
            )}
          >
            <span
              className={cn(
                'text-2xs leading-none font-semibold',
                isSelected
                  ? 'text-primary-foreground'
                  : cn('text-ink-500 group-hover:text-primary', day.isToday && 'text-primary'),
              )}
            >
              {day.dayName}
            </span>
            <time
              dateTime={day.iso}
              className={cn(
                'mt-1 text-base leading-none font-bold',
                isSelected
                  ? 'text-primary-foreground'
                  : cn('text-ink-900 group-hover:text-primary', day.isToday && 'text-primary'),
              )}
            >
              {day.date}
            </time>
            <span
              aria-hidden
              className={cn(
                'mt-1 size-1 rounded-full transition-colors',
                isSelected ? 'bg-primary-foreground' : hasDot ? 'bg-primary' : 'bg-transparent',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
