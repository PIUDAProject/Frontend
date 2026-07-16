import { MED_COLOR_CLASSES } from '@/lib/constants/med-colors';
import type { NotePrescription } from '@/lib/data/types';
import { cn } from '@/lib/utils';
import { Building2, Pill } from 'lucide-react';
import Link from 'next/link';

interface SearchResultsProps {
  results: NotePrescription[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <p className="kr-wrap text-ink-500 px-4 py-10 text-center text-sm">
        <span className="text-foreground font-semibold">&ldquo;{query}&rdquo;</span> 검색 결과가
        없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-6">
      {results.flatMap((prescription) =>
        prescription.hospitals.flatMap((hospital) =>
          hospital.medications.map((med) => {
            const color = MED_COLOR_CLASSES[med.color];
            return (
              <Link
                key={med.id}
                href={`/note/${med.id}`}
                className="shadow-card bg-card focus-visible:ring-primary flex items-center gap-3 rounded-xl p-4 focus-visible:ring-2 focus-visible:outline-none active:opacity-75"
              >
                <div
                  className={cn(
                    'flex size-11 shrink-0 items-center justify-center rounded-xl',
                    color.iconBg,
                  )}
                  aria-hidden
                >
                  <Pill size={20} className={color.iconColor} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-ink-500 text-sm">{med.kind}</span>
                  <span className="text-foreground text-base font-semibold">{med.name}</span>
                  {hospital.hospitalName && (
                    <div className="mt-0.5 flex items-center gap-1">
                      <Building2 size={11} className="text-ink-400 shrink-0" aria-hidden />
                      <span className="text-ink-500 text-xs">{hospital.hospitalName}</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          }),
        ),
      )}
    </div>
  );
}
