'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';

interface ChatInputBarProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ChatInputBar({ onSend, disabled = false, className }: ChatInputBarProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const wasDisabledRef = useRef(disabled);

  // 어시스턴트 응답이 끝나 입력이 다시 활성화되는 시점에 포커스를 입력창으로 되돌려
  // 사용자가 매번 다시 탭/클릭하지 않고 바로 다음 메시지를 이어 입력할 수 있게 한다.
  useEffect(() => {
    if (wasDisabledRef.current && !disabled) {
      inputRef.current?.focus();
    }
    wasDisabledRef.current = disabled;
  }, [disabled]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }

  // 한글 IME 조합 중 Enter 입력이 조합 확정과 폼 제출로 동시에 처리되는 것을 방지
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && event.nativeEvent.isComposing) {
      event.preventDefault();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'border-line bg-card flex items-center gap-2 border-t px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        className,
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="궁금한 점을 물어보세요"
        aria-label="메시지 입력"
        disabled={disabled}
        className="border-input bg-surface placeholder:text-ink-500 focus-visible:border-primary focus-visible:ring-primary h-11 flex-1 rounded-full border px-4 text-base focus-visible:ring-1 focus-visible:outline-none disabled:opacity-50"
      />
      <Button
        type="submit"
        size="icon"
        aria-label="전송"
        disabled={disabled || value.trim().length === 0}
        className="h-11 w-11 shrink-0 rounded-full"
      >
        <Send size={18} strokeWidth={2} aria-hidden="true" />
      </Button>
    </form>
  );
}
