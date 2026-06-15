import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function OnboardingPage() {
  return (
    <main
      className="mx-auto flex min-h-svh w-full max-w-[390px] flex-col items-center px-5 pb-10"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 6rem)' }}
    >
      <h1 className="text-primary mb-4.5 text-center text-4xl font-bold">콜케어</h1>
      {/* 로고 추가할 것 */}
      <div className="bg-ink-100 mb-7.5 h-32 w-32 rounded-xl" aria-hidden="true" />
      <div className="mb-auto flex flex-col gap-4 py-4 text-center">
        <h2 className="kr-wrap text-xl font-semibold">
          보호자가 대신 관리하는 <br />
          복약 케어
        </h2>
        <p className="kr-wrap text-muted-foreground text-sm">
          부모님은 전화만 받으세요. <br />
          복약관리는 보호자가 도와드립니다.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Button
          size="cta"
          className="bg-social-kakao text-social-kakao-text hover:bg-social-kakao shadow-none hover:opacity-90"
          type="button"
        >
          <Image src="/assets/icons/kakao.svg" alt="" width={20} height={20} />
          <span className="flex-1 text-center">카카오로 로그인</span>
          <span className="w-5" aria-hidden="true" />
        </Button>
        <Button
          size="cta"
          className="bg-social-naver text-social-naver-text hover:bg-social-naver shadow-none hover:opacity-90"
          type="button"
        >
          <Image src="/assets/icons/naver.svg" alt="" width={20} height={20} />
          <span className="flex-1 text-center">네이버로 로그인</span>
          <span className="w-5" aria-hidden="true" />
        </Button>
      </div>
      <p className="text-muted-foreground pt-6 text-center text-xs">
        로그인 후 부모님 정보를 등록할 수 있습니다.
      </p>
    </main>
  );
}
