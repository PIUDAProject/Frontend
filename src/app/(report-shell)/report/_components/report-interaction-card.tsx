import { MED_COLOR_CLASSES } from '@/lib/constants/med-colors';
import type { DrugInteractionDrug, DrugInteractionPair } from '@/lib/data/types';
import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';

const SEVERITY_BADGE = {
  danger: { bg: 'bg-danger-bg', text: 'text-danger', label: '상호작용 주의' },
  caution: { bg: 'bg-caution-bg', text: 'text-caution-text', label: '함께 복용 시 참고' },
} as const;

const DRUG_FIELDS: { key: keyof DrugInteractionDrug; label: string }[] = [
  { key: 'kind', label: '제품종류' },
  { key: 'name', label: '제품명' },
  { key: 'hospitalName', label: '처방기관' },
  { key: 'prescriptionDate', label: '처방날짜' },
];

interface DrugColumnProps {
  drug: DrugInteractionDrug;
}

function DrugColumn({ drug }: DrugColumnProps) {
  const color = MED_COLOR_CLASSES[drug.color];

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      {DRUG_FIELDS.map(({ key, label }) => (
        <div key={key} className="flex items-start gap-2 text-xs">
          <span className="text-ink-500 w-14 shrink-0">{label}</span>
          <span className="text-foreground kr-wrap font-medium">
            {key === 'name' && (
              <span
                className={cn(
                  'mr-1 inline-block size-1.5 rounded-full bg-current align-middle',
                  color.iconColor,
                )}
                aria-hidden
              />
            )}
            {drug[key] ?? '-'}
          </span>
        </div>
      ))}
    </div>
  );
}

interface ReportInteractionCardProps {
  pair: DrugInteractionPair;
}

export function ReportInteractionCard({ pair }: ReportInteractionCardProps) {
  const badge = SEVERITY_BADGE[pair.severity];

  return (
    <div className="shadow-card bg-card flex flex-col gap-3 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <DrugColumn drug={pair.drugA} />
        <CircleX size={20} className="text-danger shrink-0" aria-hidden />
        <DrugColumn drug={pair.drugB} />
      </div>

      <span
        className={cn('w-fit rounded-full px-2 py-0.5 text-xs font-medium', badge.bg, badge.text)}
      >
        {badge.label}
      </span>

      <p className="kr-wrap text-ink-500 text-sm leading-relaxed">{pair.description}</p>
    </div>
  );
}
