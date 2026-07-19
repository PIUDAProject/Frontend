'use client';

import { ChatBubble } from '@/components/chat/chat-bubble';
import { QuickReplyChip } from '@/components/chat/quick-reply-chip';
import type { ChatMessage, ChatQuickReply } from '@/lib/data/types';
import { DrugCardsMessage } from './drug-cards-message';

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectQuickReply: (reply: ChatQuickReply) => void;
  quickRepliesDisabled?: boolean;
}

export function ChatMessageItem({
  message,
  onSelectQuickReply,
  quickRepliesDisabled = false,
}: ChatMessageItemProps) {
  const { content } = message;

  switch (content.type) {
    case 'text':
      return <ChatBubble role={message.role} text={content.text} />;

    case 'drugCards':
      return <DrugCardsMessage cards={content.cards} />;

    case 'quickReplies':
      return (
        <div className="flex flex-col gap-2">
          <ChatBubble role={message.role} text={content.text} />
          <div className="flex flex-wrap gap-2">
            {content.replies.map((reply) => (
              <QuickReplyChip
                key={reply.id}
                reply={reply}
                onSelect={onSelectQuickReply}
                disabled={quickRepliesDisabled}
              />
            ))}
          </div>
        </div>
      );

    case 'errorFallback':
      return (
        <div className="flex flex-col gap-2">
          <ChatBubble role={message.role} text={content.fallback.text} />
          {content.fallback.quickReplies && (
            <div className="flex flex-wrap gap-2">
              {content.fallback.quickReplies.map((reply) => (
                <QuickReplyChip
                  key={reply.id}
                  reply={reply}
                  onSelect={onSelectQuickReply}
                  disabled={quickRepliesDisabled}
                />
              ))}
            </div>
          )}
        </div>
      );
  }
}
