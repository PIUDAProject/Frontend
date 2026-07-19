export function ReportSummarySkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-4 p-4">
      <div className="shadow-card bg-card h-44 animate-pulse rounded-xl" />
      <div className="shadow-card bg-card h-14 animate-pulse rounded-2xl" />
      <div className="shadow-card bg-card h-40 animate-pulse rounded-xl" />
    </div>
  );
}
