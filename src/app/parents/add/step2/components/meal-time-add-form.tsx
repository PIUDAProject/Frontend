'use client';

import { TimePickerDrawer } from '@/components/ui/time-picker-drawer';
import { Clock, Moon, Sun, Sunrise } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type MealKey = 'morning' | 'noon' | 'night';
type Meals = Record<MealKey, string>;

const MEALS: { key: MealKey; label: string; icon: React.ReactNode }[] = [
  {
    key: 'morning',
    label: '아침 식사 시간',
    icon: <Sunrise className="text-meal-morning size-5.5" strokeWidth={1.9} aria-hidden="true" />,
  },
  {
    key: 'noon',
    label: '점심 식사 시간',
    icon: <Sun className="text-meal-noon size-5.5" strokeWidth={2} aria-hidden="true" />,
  },
  {
    key: 'night',
    label: '저녁 식사 시간',
    icon: <Moon className="text-meal-night size-5.5" strokeWidth={1.9} aria-hidden="true" />,
  },
];

export function MealTimeAddForm() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [meals, setMeals] = useState<Meals>({
    morning: '오전 8:00',
    noon: '오후 12:00',
    night: '오후 6:00',
  });
  const [editing, setEditing] = useState<MealKey | null>(null);

  function handleConfirm(time: string) {
    if (editing) setMeals((prev) => ({ ...prev, [editing]: time }));
    setEditing(null);
  }

  function handleSkip() {
    start(async () => {
      router.push('/parents/add/send-card');
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    start(async () => {
      router.push('/parents/add/send-card');
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-3.5 px-5.5 pt-7.5">
          {MEALS.map((m) => (
            <div key={m.key} className="bg-card shadow-card rounded-xl p-4 pb-5">
              <div className="text-ink-700 flex items-center gap-2.5 text-sm font-semibold">
                <span className="grid size-5.5 place-items-center">{m.icon}</span>
                {m.label}
              </div>
              <button
                type="button"
                onClick={() => setEditing(m.key)}
                aria-label={`${m.label}: ${meals[m.key]}. 변경`}
                className="bg-muted text-ink-900 focus-visible:ring-primary hover:bg-secondary mt-3 flex h-14 w-full items-center rounded-md px-4.5 text-left text-xl font-bold tabular-nums transition focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]"
              >
                {meals[m.key]}
                <Clock
                  className="text-ink-500 ml-auto size-5 shrink-0"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 px-5.5 pt-4.5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={handleSkip}
            disabled={pending}
            className="border-line bg-surface text-ink-900 focus-visible:ring-primary h-14 flex-1 rounded-2xl border text-base font-bold transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
          >
            건너뛰기
          </button>
          <button
            type="submit"
            disabled={pending}
            className="bg-primary text-primary-foreground shadow-fab focus-visible:ring-primary h-14 flex-[1.7] rounded-2xl text-base font-bold transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
          >
            완료하기
          </button>
        </div>
      </form>

      <TimePickerDrawer
        key={editing ?? 'closed'}
        open={editing !== null}
        label={`${MEALS.find((m) => m.key === editing)?.label ?? ''}`}
        value={editing ? meals[editing] : meals.morning}
        onClose={() => setEditing(null)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
