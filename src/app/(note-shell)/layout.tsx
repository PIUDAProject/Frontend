import { BottomNav } from '@/components/layout/BottomNav';
import dynamic from 'next/dynamic';
import { NoteSearchBar } from './note/components/note-search-bar';

const MedicationSheet = dynamic(() =>
  import('@/components/layout/MedicationSheet').then((m) => m.MedicationSheet),
);

export default function NoteShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-line bg-surface-2 z-sticky fixed top-0 left-1/2 w-full max-w-[390px] -translate-x-1/2 border-b px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-3">
        <NoteSearchBar />
      </header>
      <main className="mx-auto mt-(--header-height) max-w-[390px] pb-(--nav-height)">
        {children}
      </main>
      <BottomNav className="z-sticky fixed bottom-0 left-1/2 w-full max-w-[390px] -translate-x-1/2" />
      <MedicationSheet />
    </>
  );
}
