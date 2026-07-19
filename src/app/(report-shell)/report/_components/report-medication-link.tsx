import { ChevronRight, Pill } from 'lucide-react';
import Link from 'next/link';

interface ReportMedicationLinkProps {
  count: number;
}

export function ReportMedicationLink({ count }: ReportMedicationLinkProps) {
  return (
    <Link
      href="/report/medications"
      className="bg-card-current focus-visible:ring-primary flex h-14 items-center gap-3 rounded-2xl px-5 transition-opacity focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none active:opacity-80"
    >
      <Pill size={20} className="text-card-current-text shrink-0" aria-hidden />
      <span className="text-card-current-text flex-1 text-sm font-bold">
        사용중인 약물 {count}건
      </span>
      <ChevronRight size={18} className="text-card-current-text-muted shrink-0" aria-hidden />
    </Link>
  );
}
