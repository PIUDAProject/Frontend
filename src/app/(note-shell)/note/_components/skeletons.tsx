export function NoteListSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6 px-4 pt-3 pb-4">
      {/* 필터 버튼 플레이스홀더 */}
      <div className="flex justify-end">
        <div className="bg-ink-100 h-6 w-14 animate-pulse rounded-md" />
      </div>

      {Array.from({ length: 2 }, (_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="bg-ink-100 h-3.5 w-28 animate-pulse rounded px-1" />
          <div className="shadow-card bg-card animate-pulse rounded-xl p-5">
            <div className="bg-ink-200 mb-4 h-4 w-24 rounded" />
            <div className="flex flex-col gap-4">
              {Array.from({ length: 2 }, (_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="bg-ink-200 size-12 shrink-0 rounded-xl" />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="bg-ink-100 h-3.5 w-14 rounded" />
                      <div className="bg-ink-100 h-5 w-14 rounded-full" />
                    </div>
                    <div className="bg-ink-200 h-4 w-36 rounded" />
                    <div className="flex gap-1.5">
                      <div className="bg-ink-100 h-5 w-16 rounded-md" />
                      <div className="bg-ink-100 h-5 w-12 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
