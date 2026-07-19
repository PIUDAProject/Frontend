'use client';

import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface AddCardButtonProps {
  onClick: () => void;
  className?: string;
}

export function AddCardButton({ onClick, className }: AddCardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'border-primary/40 text-primary hover:border-primary/60 hover:bg-accent flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-4.5 text-sm transition-colors',
        className,
      )}
    >
      <Plus size={14} aria-hidden />약 추가하기
    </button>
  );
}
