interface ReportFieldProps {
  label: string;
  value: string;
}

export function ReportField({ label, value }: ReportFieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-ink-500 text-xs">{label}</span>
      <span className="text-foreground text-sm font-semibold">{value}</span>
    </div>
  );
}
