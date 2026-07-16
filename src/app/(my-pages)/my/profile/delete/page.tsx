import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { DeleteConfirmButton } from './components/delete-confirm-button';

const NOTICES = [
  <>
    회원 탈퇴 시, 현재 아이디로는{' '}
    <span className="text-primary font-medium">30일 동안 재가입을 할 수 없어요.</span>
  </>,
  '회원 탈퇴 이전의 회원 정보, 약물 및 처방전 등록 내역, 약물안전리포트 생성 내역 등은 재가입 시 확인할 수 없어요.',
  '개인정보처리방침 관련 법에 따라 일정 기간 보관이 필요한 정보를 제외한 모든 개인정보는 즉시 파기돼요.',
];

export default function DeletePage() {
  return (
    <main className="bg-surface-2 mx-auto flex min-h-svh max-w-[390px] flex-col">
      {/* 헤더 */}
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
        <h1 className="text-ink-900 flex-1 text-center text-base font-bold">계정 탈퇴</h1>
        <div className="size-11" aria-hidden="true" />
      </header>

      <div className="flex flex-1 flex-col px-5.5 pt-8">
        <h2 className="text-ink-900 kr-wrap text-2xl leading-tight font-bold">
          신세인님,
          <br />
          회원 탈퇴 전 유의사항을 확인해 주세요
        </h2>

        <ul className="mt-8 flex flex-col gap-4" role="list">
          {NOTICES.map((notice, i) => (
            <li key={i} className="text-ink-700 kr-wrap flex gap-2 text-sm leading-relaxed">
              <span className="text-ink-400 mt-0.5 shrink-0">·</span>
              <span>{notice}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-2.5 px-5.5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <Link
          href="/my/profile"
          className="border-line text-ink-900 focus-visible:ring-primary hover:bg-muted flex h-14 flex-1 items-center justify-center rounded-2xl border text-base font-bold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          이전
        </Link>
        <DeleteConfirmButton />
      </div>
    </main>
  );
}
