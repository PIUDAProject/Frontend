import { TEMP_PATIENT_ID } from '@/lib/data/report';
import { Suspense } from 'react';
import { ReportSummarySection } from './_components/report-summary-section';
import { ReportSummarySkeleton } from './_components/skeletons';

export default function ReportPage() {
  return (
    <Suspense fallback={<ReportSummarySkeleton />}>
      <ReportSummarySection patientId={TEMP_PATIENT_ID} />
    </Suspense>
  );
}
