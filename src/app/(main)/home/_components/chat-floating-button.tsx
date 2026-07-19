'use client';

import { cn } from '@/lib/utils';
import { BotMessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// 이 값을 넘겨 스크롤하면 라벨을 숨기고 아이콘만 남긴다 (Material M3 Extended FAB 축소 패턴)
const COLLAPSE_SCROLL_THRESHOLD_PX = 12;

export function ChatFloatingButton() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateCollapsed = () => {
      setCollapsed(window.scrollY > COLLAPSE_SCROLL_THRESHOLD_PX);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateCollapsed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="z-sticky fixed bottom-(--bottom-nav-actual-height) left-1/2 flex w-full max-w-[390px] -translate-x-1/2 justify-end px-4 pb-3">
      <Link
        href="/chat"
        aria-label="온길봇 채팅으로 이동"
        className={cn(
          'bg-card shadow-fab focus-visible:ring-primary flex min-h-11 items-center gap-2 rounded-full py-2 pl-2 transition-[padding,opacity] duration-200 hover:opacity-80 focus-visible:ring-2 focus-visible:outline-none active:opacity-70',
          collapsed ? 'pr-2' : 'pr-4',
        )}
      >
        <span
          className="bg-accent grid size-7 shrink-0 place-items-center rounded-full"
          aria-hidden="true"
        >
          <BotMessageSquare size={16} strokeWidth={2.2} className="text-accent-foreground" />
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'text-accent-foreground overflow-hidden text-sm font-semibold whitespace-nowrap transition-[max-width,opacity] duration-200',
            collapsed ? 'max-w-0 opacity-0' : 'max-w-20 opacity-100',
          )}
        >
          온길봇
        </span>
      </Link>
    </div>
  );
}
