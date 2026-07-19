export function WeekStripSkeleton() {
  return (
    <div aria-hidden="true" className="flex gap-1.5 px-4 pt-4 pb-2.5">
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="border-line bg-card h-16 flex-1 animate-pulse rounded-xl border" />
      ))}
    </div>
  );
}

export function CurrentCardSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-4 p-4">
      <div className="bg-card-current h-32 animate-pulse rounded-xl opacity-50" />
    </div>
  );
}

export function AlertSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3 px-4 pb-4">
      <div className="bg-danger-bg h-20 animate-pulse rounded-xl" />
    </div>
  );
}

export function MediCardSkeleton() {
  return (
    <div aria-hidden="true" className="px-4 pb-4">
      <div className="shadow-card bg-card h-48 animate-pulse rounded-xl" />
    </div>
  );
}
