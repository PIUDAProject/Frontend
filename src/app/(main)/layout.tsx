import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader className="z-sticky fixed top-0 left-1/2 w-full max-w-[390px] -translate-x-1/2" />
      <main className="mx-auto mt-(--header-height) max-w-[390px] pb-(--nav-height)">
        {children}
      </main>
      <BottomNav className="z-sticky fixed bottom-0 left-1/2 w-full max-w-[390px] -translate-x-1/2" />
    </>
  );
}
