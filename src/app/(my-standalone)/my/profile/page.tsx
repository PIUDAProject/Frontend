import { Camera, ChevronLeft, ChevronRight, Pencil, Settings, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MOCK_PROFILE = {
  name: '김지수',
  phone: '010-1234-5678',
  connectedAccount: { provider: '카카오', connectedAt: '2023.10.15' },
};

export default function ProfilePage() {
  return (
    <>
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
        <h1 className="text-ink-900 flex-1 text-center text-base font-bold">보호자 프로필</h1>
        <button
          type="button"
          aria-label="설정"
          aria-disabled="true"
          className="focus-visible:ring-primary flex min-h-11 min-w-11 items-center justify-center rounded-md focus-visible:ring-1 focus-visible:outline-none"
        >
          <Settings size={20} strokeWidth={1.8} className="text-ink-700" aria-hidden="true" />
        </button>
      </header>

      <div className="flex flex-col items-center gap-6 px-4 pt-8 pb-6">
        {/* 프로필 아바타 */}
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
        <span className="text-ink-900 text-xl font-bold">{MOCK_PROFILE.name}</span>

        {/* 기본 정보 */}
        <div className="bg-card shadow-card w-full overflow-hidden rounded-xl">
          <ProfileField label="이름" value={MOCK_PROFILE.name} editHref="/my/profile/name" />
          <div className="border-line mx-4 border-t" aria-hidden="true" />
          <ProfileField
            label="전화번호"
            value={MOCK_PROFILE.phone}
            editHref="/my/profile/phone"
            labelColor="primary"
          />
        </div>

        {/* 연결된 계정 */}
        <div className="w-full">
          <h2 className="text-ink-900 mb-2 text-sm font-semibold">연결된 계정</h2>
          <div className="bg-card shadow-card rounded-xl">
            <Link
              href="/my/profile/account"
              className="focus-visible:ring-primary flex items-center gap-3 rounded-xl px-4 py-3.5 focus-visible:ring-1 focus-visible:outline-none"
            >
              <span
                className="bg-social-kakao flex size-9 items-center justify-center rounded-full text-lg"
                aria-hidden="true"
              >
                <Image src="/assets/icons/kakao.svg" alt="" width={20} height={20} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-ink-900 text-sm font-medium">
                  {MOCK_PROFILE.connectedAccount.provider} 계정
                </span>
                <span className="text-ink-500 text-xs">
                  연결됨: {MOCK_PROFILE.connectedAccount.connectedAt}
                </span>
              </div>
              <ChevronRight
                size={16}
                strokeWidth={2}
                className="text-ink-400 shrink-0"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* 계정 탈퇴 */}
        <Link
          href="/my/profile/delete"
          className="text-danger focus-visible:ring-primary -m-2 self-start rounded p-2 text-sm focus-visible:ring-1 focus-visible:outline-none"
        >
          계정 탈퇴
        </Link>
      </div>
    </>
  );
}

function ProfileField({
  label,
  value,
  editHref,
  labelColor,
}: {
  label: string;
  value: string;
  editHref: string;
  labelColor?: 'primary';
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span
          className={`text-xs font-medium ${labelColor === 'primary' ? 'text-primary' : 'text-ink-500'}`}
        >
          {label}
        </span>
        <span className="text-ink-900 text-sm font-medium">{value}</span>
      </div>
      <Link
        href={editHref}
        aria-label={`${label} 수정`}
        className="focus-visible:ring-primary -mr-1 flex min-h-11 min-w-11 items-center justify-center rounded-md focus-visible:ring-1 focus-visible:outline-none"
      >
        <Pencil size={16} strokeWidth={1.8} className="text-ink-500" aria-hidden="true" />
      </Link>
    </div>
  );
}
