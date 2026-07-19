'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FREQUENCY_OPTIONS = [
  { value: '1', label: '1일 1회' },
  { value: '2', label: '1일 2회' },
  { value: '3', label: '1일 3회' },
] as const;

interface FrequencySelectProps {
  value: 1 | 2 | 3 | null;
  onChange: (value: 1 | 2 | 3) => void;
}

export function FrequencySelect({ value, onChange }: FrequencySelectProps) {
  return (
    <Select value={value?.toString() ?? ''} onValueChange={(v) => onChange(Number(v) as 1 | 2 | 3)}>
      <SelectTrigger className="h-9" aria-label="복용 횟수 선택">
        <SelectValue placeholder="선택" />
      </SelectTrigger>
      <SelectContent>
        {FREQUENCY_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
