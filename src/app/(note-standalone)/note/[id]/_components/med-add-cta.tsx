'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface MedAddCtaProps {
  medicationName: string;
}

export function MedAddCta({ medicationName }: MedAddCtaProps) {
  const router = useRouter();

  function handleAdd() {
    const params = new URLSearchParams({ drugName: medicationName });
    router.push(`/medication-add/direct?${params.toString()}`);
  }

  return (
    <div className="border-line bg-card fixed bottom-0 left-1/2 w-full max-w-[390px] -translate-x-1/2 border-t px-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <Button size="cta" onClick={handleAdd}>
        내 약 상자에 추가하기
      </Button>
    </div>
  );
}
