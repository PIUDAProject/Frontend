import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { PhoneEditForm } from './_components/phone-edit-form';

export default function PhonePage() {
  return (
    <>
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
        <h1 className="text-ink-900 flex-1 text-center text-base font-bold">휴대폰 번호 수정</h1>
        <div className="size-11" aria-hidden="true" />
      </header>

      <div className="flex flex-1 flex-col px-5.5 pt-8">
        <h2 className="text-ink-900 text-2xl leading-tight font-bold">
          휴대폰 번호를
          <br />
          재인증해 주세요
        </h2>
        <p className="text-ink-500 kr-wrap mt-2 text-sm">휴대폰 번호는 한 번 변경이 가능합니다</p>
      </div>

      <PhoneEditForm />
    </>
  );
}
