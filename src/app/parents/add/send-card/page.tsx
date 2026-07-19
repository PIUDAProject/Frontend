import { CallCareBar } from '@/components/send-card/call-care-bar';
import { Suspense } from 'react';
import { ParentAddSendCardFlow } from './_components/parent-add-send-card-flow';

const MOCK_CARD = {
  name: '부모님',
  relation: '보호 대상',
  phone: '010-0000-0000',
};

export default function ParentAddSendCardPage() {
  return (
    <main
      aria-label="연락처 카드 발송"
      className="bg-surface-2 mx-auto flex min-h-svh w-full max-w-[390px] flex-col"
    >
      <CallCareBar />
      <Suspense fallback={<div className="flex-1" aria-busy="true" aria-label="로딩 중" />}>
        <ParentAddSendCardFlow card={MOCK_CARD} />
      </Suspense>
    </main>
  );
}
