import { Suspense } from 'react';
import { NoteListSection } from './_components/note-list-section';
import { NoteListSkeleton } from './_components/skeletons';

export default function NotePage() {
  return (
    <>
      <h1 className="sr-only">약물노트</h1>
      <Suspense fallback={<NoteListSkeleton />}>
        <NoteListSection />
      </Suspense>
    </>
  );
}
