export function ReportMedicationsHeaderCountSkeleton() {
  return <div aria-hidden="true" className="bg-card h-7 w-40 animate-pulse rounded-md" />;
}

export function ReportMedicationsListSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3">
      <div className="bg-card h-10 w-full animate-pulse rounded-md" />
      <div className="shadow-card bg-card h-40 animate-pulse rounded-xl" />
      <div className="shadow-card bg-card h-40 animate-pulse rounded-xl" />
    </div>
  );
}
