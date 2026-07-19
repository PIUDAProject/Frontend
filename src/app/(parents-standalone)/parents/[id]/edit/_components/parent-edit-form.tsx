'use client';

import { BirthPickerDrawer, type Birth } from '@/components/ui/birth-picker-drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TimePickerDrawer } from '@/components/ui/time-picker-drawer';
import { Clock, Info, Moon, Sun, Sunrise, Utensils } from 'lucide-react';
import { useState, useTransition } from 'react';

interface ParentData {
  name: string;
  gender: 'male' | 'female';
  birth: Birth;
  phone: string;
  meals: { morning: string; noon: string; night: string };
}

const MEALS = [
  { key: 'morning' as const, label: '아침 식사', icon: Sunrise, iconClass: 'text-meal-morning' },
  { key: 'noon' as const, label: '점심 식사', icon: Sun, iconClass: 'text-meal-noon' },
  { key: 'night' as const, label: '저녁 식사', icon: Moon, iconClass: 'text-meal-night' },
];

interface ParentEditFormProps {
  initialData: ParentData;
}

export function ParentEditForm({ initialData }: ParentEditFormProps) {
  const [pending, start] = useTransition();
  const [name, setName] = useState(initialData.name);
  const [gender, setGender] = useState(initialData.gender);
  const [birth, setBirth] = useState<Birth>(initialData.birth);
  const [phone, setPhone] = useState(initialData.phone);
  const [meals, setMeals] = useState(initialData.meals);
  const [birthOpen, setBirthOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<'morning' | 'noon' | 'night' | null>(null);

  const birthLabel = `${birth.y}. ${birth.m.padStart(2, '0')}. ${birth.d.padStart(2, '0')}`;

  function handleMealConfirm(time: string) {
    if (editingMeal) setMeals((prev) => ({ ...prev, [editingMeal]: time }));
    setEditingMeal(null);
  }

  function handleSave() {
    start(async () => {
      // TODO: 저장 API 연동
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-5">
        {/* 기본 정보 카드 */}
        <section className="bg-card shadow-card rounded-xl p-4" aria-label="기본 정보">
          <div className="text-ink-700 mb-4 flex items-center gap-1.5 text-sm font-semibold">
            <Info
              size={14}
              strokeWidth={1.9}
              className="text-primary shrink-0"
              aria-hidden="true"
            />
            기본 정보
          </div>

          <div className="flex flex-col gap-3.5">
            {/* 성함 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-ink-500 text-xs font-medium">
                성함
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-line bg-surface focus-visible:border-primary focus-visible:ring-primary rounded-md border px-3.5 py-3 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
              />
            </div>

            {/* 성별 + 생년월일 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="gender" className="text-ink-500 text-xs font-medium">
                  성별
                </label>
                <Select value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')}>
                  <SelectTrigger
                    id="gender"
                    className="border-line bg-surface focus-visible:border-primary focus-visible:ring-primary h-11 rounded-md border px-3.5 text-sm focus-visible:ring-1 focus-visible:outline-none"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">남성</SelectItem>
                    <SelectItem value="female">여성</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-ink-500 text-xs font-medium">생년월일</span>
                <button
                  type="button"
                  onClick={() => setBirthOpen(true)}
                  aria-label={`생년월일: ${birthLabel}. 변경`}
                  className="border-line bg-surface hover:border-primary focus-visible:ring-primary h-11 rounded-md border px-3.5 text-left text-sm transition focus-visible:ring-1 focus-visible:outline-none"
                >
                  {birthLabel}
                </button>
              </div>
            </div>

            {/* 전화번호 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-ink-500 text-xs font-medium">
                전화번호
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-line bg-surface focus-visible:border-primary focus-visible:ring-primary rounded-md border px-3.5 py-3 text-sm transition focus-visible:ring-1 focus-visible:outline-none"
              />
            </div>
          </div>
        </section>

        {/* 식사 시간 카드 */}
        <section className="bg-card shadow-card rounded-xl p-4" aria-label="식사 시간">
          <div className="text-ink-700 mb-4 flex items-center gap-1.5 text-sm font-semibold">
            <Utensils
              size={14}
              strokeWidth={1.9}
              className="text-ink-500 shrink-0"
              aria-hidden="true"
            />
            식사 시간
          </div>

          <div className="divide-line flex flex-col divide-y">
            {MEALS.map(({ key, label, icon: Icon, iconClass }) => (
              <div
                key={key}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} strokeWidth={1.9} className={iconClass} aria-hidden="true" />
                  <span className="text-ink-700 text-sm">{label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingMeal(key)}
                  aria-label={`${label}: ${meals[key]}. 변경`}
                  className="text-primary focus-visible:ring-primary flex items-center gap-1.5 rounded text-sm font-semibold focus-visible:ring-1 focus-visible:outline-none"
                >
                  {meals[key]}
                  <Clock size={14} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 저장하기 CTA */}
        <button
          type="button"
          onClick={handleSave}
          disabled={pending}
          aria-busy={pending}
          className="bg-primary text-primary-foreground shadow-fab focus-visible:ring-primary mt-2 h-14 w-full rounded-2xl text-base font-bold transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60 disabled:shadow-none"
        >
          저장하기
        </button>
      </div>

      {/* Drawers */}
      <BirthPickerDrawer
        open={birthOpen}
        value={birth}
        onClose={() => setBirthOpen(false)}
        onConfirm={(v) => {
          setBirth(v);
          setBirthOpen(false);
        }}
      />
      <TimePickerDrawer
        key={editingMeal ?? 'closed'}
        open={editingMeal !== null}
        label={`${MEALS.find((m) => m.key === editingMeal)?.label ?? ''} 시간`}
        value={editingMeal ? meals[editingMeal] : meals.morning}
        onClose={() => setEditingMeal(null)}
        onConfirm={handleMealConfirm}
      />
    </>
  );
}
