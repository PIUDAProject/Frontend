import { User } from 'lucide-react';

import { cn } from '@/lib/utils';

interface VCardData {
  name: string;
  relation: string;
  phone: string;
}

interface VCardPreviewProps {
  card: VCardData;
  className?: string;
}

export function VCardPreview({ card, className }: VCardPreviewProps) {
  return (
    <div className={cn('bg-card shadow-card flex flex-col rounded-xl', className)}>
      {/* 아바타 + 이름/연락처 */}
      <div className="flex items-center gap-3.5 px-5 pt-5 pb-4">
        <span
          className="vc-avatar flex size-12 shrink-0 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <User className="size-6 text-white/75" strokeWidth={1.8} />
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-900 text-base font-bold">
            {card.name} ({card.relation})
          </span>
          <span className="text-ink-500 text-sm tabular-nums">{card.phone}</span>
        </div>
      </div>

      {/* 정보 행 */}
      <div className="border-line border-t">
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-ink-500 text-sm">연락처 형식</span>
          <span className="text-primary text-sm font-semibold">vCard 3.0</span>
        </div>
        <div className="border-line flex items-center justify-between border-t px-5 py-3">
          <span className="text-ink-500 text-sm">데이터 상태</span>
          <span className="text-ink-700 flex items-center gap-1.5 text-sm">
            <span
              className="bg-status-done size-2 rounded-full"
              aria-hidden="true"
              role="presentation"
            />
            생성 완료
          </span>
        </div>
      </div>
    </div>
  );
}
