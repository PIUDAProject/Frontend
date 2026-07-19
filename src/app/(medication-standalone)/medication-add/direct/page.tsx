import { Suspense } from 'react';
import { MedicationDirectForm } from './_components/medication-direct-form';

function DirectFormSkeleton() {
  return (
    <div aria-hidden="true" className="bg-surface flex min-h-dvh flex-col">
      {/* TopAppBar */}
      <div className="border-border bg-surface-2 sticky top-0 border-b px-2 pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center gap-3">
          <div className="bg-ink-200 size-9 animate-pulse rounded-md" />
          <div className="bg-ink-200 h-5 w-24 animate-pulse rounded" />
        </div>
      </div>

      {/* 카드 스켈레톤 */}
      <div className="flex flex-1 flex-col gap-4 px-4 pt-4">
        <div className="shadow-card bg-card h-80 animate-pulse rounded-xl" />
        <div className="border-primary/20 h-12 animate-pulse rounded-lg border-2 border-dashed" />
        <div className="shadow-card bg-card h-24 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}

export default function MedicationDirectPage() {
  return (
    <Suspense fallback={<DirectFormSkeleton />}>
      <MedicationDirectForm />
    </Suspense>
  );
}
