'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function NoteReregisterButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className="border-primary text-primary hover:bg-accent mt-4 w-full gap-1.5"
      onClick={() => router.push('/medication-add/direct')}
    >
      <RefreshCw size={14} aria-hidden />
      약물 재등록
    </Button>
  );
}
