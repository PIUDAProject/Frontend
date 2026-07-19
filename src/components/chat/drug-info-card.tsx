import { InlineCtaButton } from '@/components/chat/inline-cta-button';
import { DRUG_CARD_ACTION_MAX_COUNT } from '@/lib/constants/chat';
import { MED_COLOR_CLASSES } from '@/lib/constants/med-colors';
import type { ChatDrugCard } from '@/lib/data/types';
import { cn } from '@/lib/utils';
import { Pill } from 'lucide-react';

interface DrugInfoCardProps {
  card: ChatDrugCard;
}

export function DrugInfoCard({ card }: DrugInfoCardProps) {
  const color = MED_COLOR_CLASSES[card.color];
  const actions = card.actions.slice(0, DRUG_CARD_ACTION_MAX_COUNT);

  return (
    <div className="bg-card shadow-card w-full rounded-xl p-4">
      {/* 약 아이콘 + 이름 */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl',
            color.iconBg,
          )}
          aria-hidden
        >
          <Pill size={18} className={color.iconColor} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-ink-500 text-sm">{card.kind}</span>
          <span className="text-foreground text-base font-semibold">{card.name}</span>
        </div>
      </div>

      {/* 복용 정보 칩 */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {card.dosageInfo.map((info) => (
          <span
            key={info}
            className={cn(
              'rounded-md px-2 py-0.5 text-xs font-medium',
              color.chipBg,
              color.chipText,
            )}
          >
            {info}
          </span>
        ))}
      </div>

      {/* 주의사항 */}
      {card.caution && (
        <p className="kr-wrap text-ink-500 mt-2 text-sm leading-relaxed">{card.caution}</p>
      )}

      {/* 액션 버튼 (최대 2개: 주 CTA + 보조 CTA) */}
      {actions.length > 0 && (
        <div className="mt-3 flex gap-2">
          {actions.map((action, index) => (
            <InlineCtaButton
              key={action.id}
              action={action}
              variant={index === 0 ? 'primary' : 'secondary'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
