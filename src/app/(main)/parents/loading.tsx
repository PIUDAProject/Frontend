export default function ParentsLoading() {
  return (
    <div className="p-4">
      <p className="sr-only" role="status" aria-live="polite">
        콘텐츠를 불러오는 중입니다
      </p>
      <ul aria-hidden="true" className="grid grid-cols-3 gap-6" role="list">
        {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className="flex justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted h-25 w-25 animate-pulse rounded-full" />
              <div className="bg-muted h-3 w-12 animate-pulse rounded" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
