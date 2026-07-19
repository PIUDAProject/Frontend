import type { DrugInteractionPair } from '@/lib/data/types';
import { CircleAlert } from 'lucide-react';
import { ReportInteractionCard } from './report-interaction-card';

interface ReportInteractionSectionProps {
  interactions: DrugInteractionPair[];
}

export function ReportInteractionSection({ interactions }: ReportInteractionSectionProps) {
  if (interactions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5 px-1">
        <CircleAlert size={16} className="text-danger" aria-hidden />
        <h2 className="text-foreground text-sm font-bold">약물상호작용 위험</h2>
      </div>
      <p className="kr-wrap text-ink-500 px-1 text-sm">
        현재 복용 중인 약물 조합에서 상호작용 위험이 확인되었습니다.
      </p>
      {interactions.map((pair) => (
        <ReportInteractionCard key={pair.id} pair={pair} />
      ))}
    </div>
  );
}
