import {
  AlertSkeleton,
  CurrentCardSkeleton,
  MediCardSkeleton,
  WeekStripSkeleton,
} from './components/skeletons';

export default function HomeLoading() {
  return (
    <>
      <h1 className="sr-only">홈</h1>
      <p className="sr-only" role="status" aria-live="polite">
        콘텐츠를 불러오는 중입니다
      </p>
      <WeekStripSkeleton />
      <CurrentCardSkeleton />
      <AlertSkeleton />
      <MediCardSkeleton />
    </>
  );
}
