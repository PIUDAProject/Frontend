import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MOCK_ACCOUNT = {
  provider: '카카오',
  email: 'windybaby1019@gmail.com',
  lastLoginAt: '2026.06.12',
};

export default function AccountPage() {
  return (
    <main className="bg-surface-2 mx-auto flex min-h-svh max-w-[390px] flex-col">
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
        <h1 className="text-ink-900 flex-1 text-center text-base font-bold">가입된 계정</h1>
        <div className="size-11" aria-hidden="true" />
      </header>

      <div className="flex flex-col gap-8 px-5.5 pt-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-ink-900 text-2xl font-semibold tracking-tight">가입된 계정 안내</h2>
          <p className="text-ink-900 kr-wrap text-base leading-relaxed">
            본인 인증이 완료됐어요.
            <br />
            로그인 방법이 달라도 하나의 계정으로 통합돼요.
          </p>
        </div>

        <div className="bg-card shadow-card flex items-center gap-4 rounded-xl p-4.5">
          <div
            className="bg-social-kakao flex size-12 shrink-0 items-center justify-center rounded-full text-xl"
            aria-hidden="true"
          >
            <Image src="/assets/icons/kakao.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-ink-900 text-base">{MOCK_ACCOUNT.provider}</span>
            <span className="text-ink-700 truncate text-sm">{MOCK_ACCOUNT.email}</span>
            <span className="text-ink-400 text-xs">최근 로그인 {MOCK_ACCOUNT.lastLoginAt}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
