import { Plus, UserRound } from 'lucide-react';
import Link from 'next/link';

interface Parent {
  id: string;
  name: string;
}

interface ParentListSectionProps {
  parents: Parent[];
}

export function ParentListSection({ parents }: ParentListSectionProps) {
  return (
    <section aria-label="우리 부모님">
      <h2 className="text-ink-900 mb-4 text-base font-bold">우리 부모님</h2>
      <ul className="flex flex-wrap gap-5" role="list">
        {parents.map((parent) => (
          <li key={parent.id}>
            <Link
              href={`/parents/${parent.id}/edit`}
              aria-label={`${parent.name} 정보 수정`}
              className="focus-visible:ring-primary flex flex-col items-center gap-2 rounded-xl transition-opacity hover:opacity-80 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="bg-ink-300 flex size-16 items-center justify-center overflow-hidden rounded-full">
                <UserRound className="text-ink-400 size-9" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <span className="text-ink-900 text-xs font-medium">{parent.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/parents/add/step1"
            aria-label="부모님 추가"
            className="focus-visible:ring-primary flex flex-col items-center gap-2 rounded-xl transition-opacity hover:opacity-80 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <div className="border-line bg-muted flex size-16 items-center justify-center rounded-full border border-dashed">
              <Plus className="text-ink-400 size-6" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <span className="text-ink-500 text-xs font-medium">가족 추가</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
