'use client';

import { useEffect, useRef, useState } from 'react';

const TICK_MS = 700;
const TICK_STEP = 13;

interface SendProgressProps {
  onComplete: () => void;
}

export function SendProgress({ onComplete }: SendProgressProps) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      const next = Math.min(progressRef.current + TICK_STEP, 100);
      progressRef.current = next;
      setProgress(next);
      if (next >= 100) {
        clearInterval(id);
        onComplete();
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <div className="flex flex-col gap-2">
      <p className="kr-wrap text-ink-500 text-sm">부모님 휴대폰으로 연락처를 발송하고 있습니다</p>
      <div
        className="bg-muted h-2 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="연락처 발송 진행률"
      >
        <div
          className="bg-primary h-full w-full origin-left rounded-full transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-ink-500 text-sm">전송 중...</span>
        <span className="text-primary text-sm font-bold tabular-nums">{progress}%</span>
      </div>
    </div>
  );
}
