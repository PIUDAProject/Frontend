import { getTodayISO } from '@/lib/date';
import { Suspense } from 'react';
import { CurrentCardSection } from './components/current-card-section';
import { ExpiryAlertSection } from './components/expiry-alert-section';
import { MediCardSection } from './components/medi-card-section';
import {
  AlertSkeleton,
  CurrentCardSkeleton,
  MediCardSkeleton,
  WeekStripSkeleton,
} from './components/skeletons';
import { WeekStripSection } from './components/week-strip-section';

// 임시: 실제 로그인 구현 후 세션에서 읽어옴
const TEMP_PATIENT_ID = 'patient-001';

type SearchParams = Promise<{ date?: string }>;

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const { date } = await searchParams;
  const todayISO = getTodayISO();
  const selectedISO = date ?? todayISO;

  return (
    <>
      <h1 className="sr-only">홈</h1>
      <Suspense fallback={<WeekStripSkeleton />}>
        <WeekStripSection
          anchorISO={todayISO}
          selectedISO={selectedISO}
          patientId={TEMP_PATIENT_ID}
        />
      </Suspense>

      <Suspense fallback={<CurrentCardSkeleton />}>
        <CurrentCardSection patientId={TEMP_PATIENT_ID} date={selectedISO} />
      </Suspense>

      <Suspense fallback={<AlertSkeleton />}>
        <ExpiryAlertSection patientId={TEMP_PATIENT_ID} />
      </Suspense>

      <Suspense fallback={<MediCardSkeleton />}>
        <MediCardSection patientId={TEMP_PATIENT_ID} date={selectedISO} />
      </Suspense>
    </>
  );
}
