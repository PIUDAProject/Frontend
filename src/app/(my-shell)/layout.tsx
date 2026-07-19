import { BottomNav } from '@/components/layout/bottom-nav';
import { ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MedicationSheet = dynamic(() =>
  import('@/components/layout/medication-sheet').then((m) => m.MedicationSheet),
);

export default function MyShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header
        className="border-line bg-surface-2 z-sticky fixed top-0 left-1/2 w-full max-w-[390px] -translate-x-1/2 border-b"
        style={{
          paddingTop: 'calc(1rem + env(safe-area-inset-top))',
          paddingBottom: '0.75rem',
          viewTransitionName: 'my-header',
        }}
      >
        <div className="flex items-center px-4.5">
          <Link
            href="/home"
            aria-label="홈으로 이동"
            className="focus-visible:ring-primary -ml-1 flex min-h-11 min-w-11 items-center justify-center rounded-md focus-visible:ring-1 focus-visible:outline-none"
          >
            <ChevronLeft size={24} strokeWidth={2} className="text-ink-900" aria-hidden="true" />
          </Link>
          <h1 className="text-ink-900 flex-1 text-center text-base font-bold">마이페이지</h1>
          <div className="size-11" aria-hidden="true" />
        </div>
      </header>
      <main className="mx-auto mt-(--header-height) max-w-[390px] pb-(--nav-height)">
        {children}
      </main>
      <BottomNav className="z-sticky fixed bottom-0 left-1/2 w-full max-w-[390px] -translate-x-1/2" />
      <MedicationSheet />
    </>
  );
}
