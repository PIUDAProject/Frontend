import { Camera, ChevronLeft, UserRound } from 'lucide-react';
import Link from 'next/link';
import { ParentEditForm } from './_components/parent-edit-form';

const MOCK_PARENTS: Record<
  string,
  {
    name: string;
    gender: 'male' | 'female';
    birth: { y: string; m: string; d: string };
    phone: string;
    meals: { morning: string; noon: string; night: string };
  }
> = {
  '1': {
    name: '김영희',
    gender: 'female',
    birth: { y: '1952', m: '5', d: '24' },
    phone: '010-1234-5678',
    meals: { morning: '오전 8:30', noon: '오후 12:30', night: '오후 6:30' },
  },
  '2': {
    name: '박철수',
    gender: 'male',
    birth: { y: '1950', m: '3', d: '10' },
    phone: '010-9876-5432',
    meals: { morning: '오전 8:00', noon: '오후 12:00', night: '오후 6:00' },
  },
  '3': {
    name: '이순자',
    gender: 'female',
    birth: { y: '1948', m: '7', d: '15' },
    phone: '010-5555-7777',
    meals: { morning: '오전 7:30', noon: '오후 12:00', night: '오후 6:30' },
  },
};

export default async function ParentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parent = MOCK_PARENTS[id] ?? MOCK_PARENTS['1'];

  return (
    <main className="bg-surface-2 mx-auto min-h-svh max-w-[390px]">
      {/* 헤더 */}
      <header
        className="border-line bg-surface-2 flex items-center border-b px-4.5"
        style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))', paddingBottom: '0.75rem' }}
      >
        <Link
          href="/my"
          aria-label="뒤로가기"
          className="focus-visible:ring-primary -ml-1 flex min-h-11 min-w-11 items-center justify-center rounded-md focus-visible:ring-1 focus-visible:outline-none"
        >
          <ChevronLeft size={24} strokeWidth={2} className="text-ink-900" aria-hidden="true" />
        </Link>
        <h1 className="text-ink-900 flex-1 text-center text-base font-bold">부모님 상세 정보</h1>
        <div className="size-11" aria-hidden="true" />
      </header>

      {/* 프로필 아바타 */}
      <div className="flex flex-col items-center pt-7 pb-2">
        <div className="relative">
          <div className="bg-ink-300 flex size-20 items-center justify-center overflow-hidden rounded-full">
            <UserRound className="text-ink-400 size-11" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <button
            type="button"
            aria-label="프로필 사진 변경"
            className="focus-visible:ring-primary absolute right-0 bottom-0 -m-2 flex items-center justify-center rounded-full p-2 transition-opacity hover:opacity-80 focus-visible:ring-1 focus-visible:outline-none"
          >
            <span className="bg-primary border-card pointer-events-none flex size-7 items-center justify-center rounded-full border-2">
              <Camera size={13} strokeWidth={2.5} className="text-white" aria-hidden="true" />
            </span>
          </button>
        </div>
        <span className="text-ink-900 mt-3 text-base font-bold">{parent.name}</span>
      </div>

      <ParentEditForm initialData={parent} />
    </main>
  );
}
