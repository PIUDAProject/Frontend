'use client';

import { RefreshCw } from 'lucide-react';
import { useTransition } from 'react';

interface ResendLineProps {
  onResend: () => void;
}

export function ResendLine({ onResend }: ResendLineProps) {
  const [pending, start] = useTransition();

  function handleResend() {
    start(async () => {
      onResend();
    });
  }

  return (
    <div className="flex items-center justify-center gap-2.5">
      <span className="text-ink-500 text-sm">문자를 못 받으셨나요?</span>
      <button
        type="button"
        onClick={handleResend}
        disabled={pending}
        aria-busy={pending}
        className="text-primary focus-visible:ring-primary flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75 focus-visible:rounded-sm focus-visible:ring-1 focus-visible:outline-none disabled:opacity-50"
      >
        <RefreshCw
          size={13}
          strokeWidth={2.2}
          className={pending ? 'animate-spin' : ''}
          aria-hidden="true"
        />
        {pending ? '재발송 중…' : '재발송'}
      </button>
    </div>
  );
}
