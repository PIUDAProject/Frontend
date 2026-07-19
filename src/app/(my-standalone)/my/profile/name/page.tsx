import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { NameEditForm } from './_components/name-edit-form';

const MOCK_NAME = '김지수';

export default function NameEditPage() {
  return (
    <>
      <header
        className="border-line bg-surface-2 flex items-center border-b px-4.5"
        style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))', paddingBottom: '0.75rem' }}
      >
        <Link
          href="/my/profile"
          aria-label="뒤로가기"
          className="focus-visible:ring-primary -ml-1 flex min-h-11 min-w-11 items-center justify-center rounded-md focus-visible:ring-1 focus-visible:outline-none"
        >
          <ChevronLeft size={24} strokeWidth={2} className="text-ink-900" aria-hidden="true" />
        </Link>
        <h1 className="text-ink-900 flex-1 text-center text-base font-bold">이름 수정</h1>
        <div className="size-11" aria-hidden="true" />
      </header>

      <NameEditForm initialName={MOCK_NAME} />
    </>
  );
}
