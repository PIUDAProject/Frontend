import { CallCareBar } from '@/components/send-card/call-care-bar';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { SendCardFlow } from './_components/send-card-flow';

const DEFAULT_NAME = '부모님';
const DEFAULT_RELATION = '보호 대상';

export default async function SendCardPage() {
  const cookieStore = await cookies();
  const rawPhone = cookieStore.get('ongil_registering_parent')?.value ?? '';

  const phone = rawPhone ? rawPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : '010-0000-0000';

  const card = {
    name: DEFAULT_NAME,
    relation: DEFAULT_RELATION,
    phone,
  };

  return (
    <main
      aria-label="연락처 카드 발송"
      className="bg-surface-2 mx-auto flex min-h-svh w-full max-w-[390px] flex-col"
    >
      <CallCareBar />
      <Suspense fallback={<div className="flex-1" aria-busy="true" aria-label="로딩 중" />}>
        <SendCardFlow card={card} />
      </Suspense>
    </main>
  );
}
