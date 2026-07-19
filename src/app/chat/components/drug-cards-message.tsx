'use client';

import { DrugInfoCard } from '@/components/chat/drug-info-card';
import { DRUG_CARD_VISIBLE_COUNT } from '@/lib/constants/chat';
import type { ChatDrugCard } from '@/lib/data/types';
import { useState } from 'react';

interface DrugCardsMessageProps {
  cards: ChatDrugCard[];
}

// 카드가 DRUG_CARD_VISIBLE_COUNT를 초과하면 "더보기"로 접어 노출
export function DrugCardsMessage({ cards }: DrugCardsMessageProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleCards = expanded ? cards : cards.slice(0, DRUG_CARD_VISIBLE_COUNT);
  const hiddenCount = cards.length - DRUG_CARD_VISIBLE_COUNT;

  return (
    <div className="flex flex-col gap-2">
      {visibleCards.map((card) => (
        <DrugInfoCard key={card.id} card={card} />
      ))}
      {!expanded && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-primary focus-visible:ring-primary min-h-11 self-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:ring-1 focus-visible:outline-none active:opacity-70"
        >
          더보기 ({hiddenCount}건)
        </button>
      )}
    </div>
  );
}
