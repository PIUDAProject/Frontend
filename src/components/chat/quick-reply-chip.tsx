'use client';

import { Button } from '@/components/ui/button';
import type { ChatQuickReply } from '@/lib/data/types';

interface QuickReplyChipProps {
  reply: ChatQuickReply;
  onSelect: (reply: ChatQuickReply) => void;
  disabled?: boolean;
}

export function QuickReplyChip({ reply, onSelect, disabled = false }: QuickReplyChipProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="min-h-11 rounded-full"
      disabled={disabled}
      onClick={() => onSelect(reply)}
    >
      {reply.label}
    </Button>
  );
}
