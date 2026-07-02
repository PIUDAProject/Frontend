'use client';

import { WeekStrip } from '@/components/ui/week-strip';
import { useRouter } from 'next/navigation';

interface WeekStripControllerProps {
  anchorISO: string;
  selectedISO: string;
  markedISO?: readonly string[];
}

export function WeekStripController({
  anchorISO,
  selectedISO,
  markedISO,
}: WeekStripControllerProps) {
  const router = useRouter();

  return (
    <WeekStrip
      anchorISO={anchorISO}
      selectedISO={selectedISO}
      markedISO={markedISO}
      onSelectDate={(iso) => router.replace(`?date=${iso}`, { scroll: false })}
    />
  );
}
