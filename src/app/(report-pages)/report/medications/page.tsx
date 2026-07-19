import { TEMP_PATIENT_ID } from '@/lib/data/report';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ReportMedicationsHeaderCount } from './_components/report-medications-header-count';
import { ReportMedicationsList } from './_components/report-medications-list';
import {
  ReportMedicationsHeaderCountSkeleton,
  ReportMedicationsListSkeleton,
} from './_components/skeletons';

export default function ReportMedicationsPage() {
  return (
    <div className="bg-surface mx-auto flex min-h-dvh max-w-[390px] flex-col">
      <header className="z-sticky border-line bg-surface-2 sticky top-0 border-b px-2 pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center gap-3">
          <Link
            href="/report"
            aria-label="뒤로 가기"
            className="text-ink-700 focus-visible:ring-primary -ml-1 flex min-h-11 min-w-11 items-center justify-center rounded-md focus-visible:ring-1 focus-visible:outline-none"
          >
            <ChevronLeft size={22} aria-hidden />
          </Link>
          <Suspense fallback={<ReportMedicationsHeaderCountSkeleton />}>
            <ReportMedicationsHeaderCount patientId={TEMP_PATIENT_ID} />
          </Suspense>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-3 p-4">
        <Suspense fallback={<ReportMedicationsListSkeleton />}>
          <ReportMedicationsList patientId={TEMP_PATIENT_ID} />
        </Suspense>
      </main>
    </div>
  );
}
