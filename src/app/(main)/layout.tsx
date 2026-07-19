import { AppHeader } from '@/components/layout/app-header';
import { BottomNav } from '@/components/layout/bottom-nav';
import dynamic from 'next/dynamic';

// Drawer JS 코드를 별도 청크로 분리 — 초기 번들에서 제외
const MedicationSheet = dynamic(() =>
  import('@/components/layout/medication-sheet').then((m) => m.MedicationSheet),
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader className="z-sticky fixed top-0 left-1/2 w-full max-w-[390px] -translate-x-1/2" />
      <main className="mx-auto mt-(--header-height) max-w-[390px] pb-(--nav-height)">
        {children}
      </main>
      <BottomNav className="z-sticky fixed bottom-0 left-1/2 w-full max-w-[390px] -translate-x-1/2" />
      <MedicationSheet />
    </>
  );
}
