import type { CurrentCardData } from '@/lib/data/types';
import { cn } from '@/lib/utils';

type MedicationStatus = 'pending' | 'partial' | 'done' | 'empty';

export type HomeCurrentCardProps = Omit<CurrentCardData, 'id'>;

function deriveStatus(total: number, completed: number): MedicationStatus {
  if (total === 0) return 'empty';
  if (completed >= total) return 'done';
  if (completed === 0) return 'pending';
  return 'partial';
}

function getStatusSuffix(status: Exclude<MedicationStatus, 'empty'>, completed: number): string {
  if (status === 'done') return '건 완료';
  if (status === 'pending') return '건 예정';
  return `건 예정 · ${completed}건 완료`;
}

function formatNextMedName(med: NonNullable<HomeCurrentCardProps['nextMedication']>): string {
  if (med.extraCount > 0) return `${med.name} 외 ${med.extraCount}건`;
  return med.name;
}

export default function HomeCurrentCard({
  patientName,
  total,
  completed,
  nextMedication,
}: HomeCurrentCardProps) {
  const status = deriveStatus(total, completed);
  const progressPercent = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

  return (
    <article
      className="bg-card-current flex flex-col gap-3 rounded-xl p-6"
      aria-label={`${patientName}님 복약 현황`}
    >
      <p className="kr-wrap text-card-current-text-muted text-sm">오늘 {patientName}님의 복약</p>

      {status === 'empty' ? (
        <p className="kr-wrap text-card-current-text-muted text-sm">오늘 예정된 복약이 없습니다.</p>
      ) : (
        <>
          <div className="flex items-baseline gap-1">
            <span className="text-card-current-text text-4xl font-bold">{total}</span>
            <span className="text-card-current-text text-xl font-semibold">
              {getStatusSuffix(status, completed)}
            </span>
          </div>

          <div
            className="bg-card-current-track h-2 overflow-hidden rounded-full"
            role="progressbar"
            aria-valuenow={completed}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="복약 진행률"
            aria-valuetext={`총 ${total}건 중 ${completed}건 완료`}
          >
            <div
              className={cn(
                'h-full w-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,0,0,1)]',
                status === 'done' ? 'bg-status-done-bright' : 'bg-white',
              )}
              style={{ transform: `scaleX(${progressPercent / 100})` }}
            />
          </div>
        </>
      )}

      {status !== 'done' && status !== 'empty' && nextMedication && (
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="bg-status-done-bright size-1.5 shrink-0 rounded-full"
          />
          <p className="kr-wrap text-card-current-text-muted text-sm">
            다음 복용 · {nextMedication.time} {formatNextMedName(nextMedication)}
          </p>
        </div>
      )}
    </article>
  );
}
