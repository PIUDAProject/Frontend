'use client';

import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { CalendarDays, X } from 'lucide-react';
import { useRef } from 'react';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartChange: (date: Date | null) => void;
  onEndChange: (date: Date | null) => void;
  className?: string;
}

function toInputValue(date: Date | null): string {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
}

// 한국식 날짜 표시 (예: "1월 15일")
function formatDisplay(date: Date): string {
  return dayjs(date).format('M월 D일');
}

function calcDays(start: Date | null, end: Date | null): number | null {
  if (!start || !end) return null;
  const diff = dayjs(end).diff(dayjs(start), 'day') + 1;
  return diff > 0 ? diff : null;
}

function triggerPicker(input: HTMLInputElement | null) {
  if (!input) return;
  try {
    input.showPicker();
  } catch {
    // showPicker 미지원 환경: 입력에 포커스 이동
    input.focus();
  }
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  className,
}: DateRangePickerProps) {
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const days = calcDays(startDate, endDate);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center gap-2">
        {/* 시작일 */}
        <div className="relative flex-1">
          <div
            className={cn(
              'flex min-h-[44px] w-full items-center rounded-md border transition-colors',
              startDate ? 'border-primary' : 'border-border',
            )}
          >
            <button
              type="button"
              aria-label={
                startDate ? `복용 시작일 ${formatDisplay(startDate)}, 변경` : '복용 시작일 선택'
              }
              onClick={() => triggerPicker(startRef.current)}
              className={cn(
                'flex flex-1 items-center gap-1.5 px-3 py-2 text-left text-sm',
                startDate ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              <CalendarDays
                size={14}
                className={cn('shrink-0', startDate ? 'text-primary' : 'text-ink-400')}
                aria-hidden
              />
              <span className="truncate">{startDate ? formatDisplay(startDate) : '시작일'}</span>
            </button>

            {startDate && (
              <button
                type="button"
                aria-label="시작일 초기화"
                onClick={() => onStartChange(null)}
                className="text-muted-foreground hover:text-foreground flex items-center justify-center self-stretch px-2.5 transition-colors"
              >
                <X size={12} aria-hidden />
              </button>
            )}
          </div>

          {/* dayjs 파싱으로 UTC 자정 오프셋 버그 방지 */}
          <input
            ref={startRef}
            type="date"
            className="pointer-events-none absolute inset-0 opacity-0"
            value={toInputValue(startDate)}
            max={toInputValue(endDate)}
            onChange={(e) => onStartChange(e.target.value ? dayjs(e.target.value).toDate() : null)}
            aria-hidden
            tabIndex={-1}
          />
        </div>

        <span className="text-ink-400 shrink-0 text-xs" aria-hidden>
          →
        </span>

        {/* 종료일 */}
        <div className="relative flex-1">
          <div
            className={cn(
              'flex min-h-[44px] w-full items-center rounded-md border transition-colors',
              endDate ? 'border-primary' : 'border-border',
            )}
          >
            <button
              type="button"
              aria-label={
                endDate ? `복용 종료일 ${formatDisplay(endDate)}, 변경` : '복용 종료일 선택'
              }
              onClick={() => triggerPicker(endRef.current)}
              className={cn(
                'flex flex-1 items-center gap-1.5 px-3 py-2 text-left text-sm',
                endDate ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              <CalendarDays
                size={14}
                className={cn('shrink-0', endDate ? 'text-primary' : 'text-ink-400')}
                aria-hidden
              />
              <span className="truncate">{endDate ? formatDisplay(endDate) : '종료일'}</span>
            </button>

            {endDate && (
              <button
                type="button"
                aria-label="종료일 초기화"
                onClick={() => onEndChange(null)}
                className="text-muted-foreground hover:text-foreground flex items-center justify-center self-stretch px-2.5 transition-colors"
              >
                <X size={12} aria-hidden />
              </button>
            )}
          </div>

          <input
            ref={endRef}
            type="date"
            className="pointer-events-none absolute inset-0 opacity-0"
            value={toInputValue(endDate)}
            min={toInputValue(startDate)}
            onChange={(e) => onEndChange(e.target.value ? dayjs(e.target.value).toDate() : null)}
            aria-hidden
            tabIndex={-1}
          />
        </div>
      </div>

      {days !== null && (
        <div className="flex justify-end">
          <span className="bg-status-active-bg text-status-active rounded-full px-2.5 py-0.5 text-xs font-medium">
            총 {days}일 복용
          </span>
        </div>
      )}
    </div>
  );
}
