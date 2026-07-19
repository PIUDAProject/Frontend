'use client';

import type { ChatSuggestion } from '@/lib/data/types';
import { ChevronRight } from 'lucide-react';

interface QuickActionCardProps {
  suggestions: ChatSuggestion[];
  onSelect: (suggestion: ChatSuggestion) => void;
}

// 첫 화면 진입 시 빈 채팅창을 막기 위한 제안 프롬프트 목록
export function QuickActionCard({ suggestions, onSelect }: QuickActionCardProps) {
  return (
    <div className="bg-card shadow-card divide-line divide-y rounded-xl">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          onClick={() => onSelect(suggestion)}
          className="focus-visible:ring-primary flex w-full items-center gap-3 px-4 py-3.5 text-left transition-opacity duration-100 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:outline-none active:opacity-70"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-primary text-2xs font-semibold">{suggestion.label}</span>
            <span className="text-foreground kr-wrap text-sm font-medium">{suggestion.prompt}</span>
          </div>
          <ChevronRight
            size={16}
            strokeWidth={2}
            className="text-ink-400 shrink-0"
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
