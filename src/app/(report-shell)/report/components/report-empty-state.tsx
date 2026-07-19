'use client';

import { Button } from '@/components/ui/button';
import { useMedicationSheetStore } from '@/lib/stores/medication-sheet-store';
import { Pill } from 'lucide-react';

export function ReportEmptyState() {
  const openSheet = useMedicationSheetStore((s) => s.open);

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
      <Pill size={40} className="text-ink-400" aria-hidden />
      <p className="text-foreground text-xl font-semibold">등록된 약물이 없습니다</p>
      <p className="kr-wrap text-ink-500 text-sm">
        약물을 등록하면 안전 리포트를 확인할 수 있어요.
      </p>
      <Button onClick={openSheet} className="mt-3">
        약물 등록하기
      </Button>
    </div>
  );
}
