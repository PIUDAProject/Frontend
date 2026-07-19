import type { ChatRole } from '@/lib/data/types';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  role: ChatRole;
  text: string;
}

export function ChatBubble({ role, text }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'kr-wrap max-w-[80%] rounded-2xl px-4 py-2.5 text-base leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-card text-foreground shadow-card rounded-bl-md',
        )}
      >
        {text}
      </p>
    </div>
  );
}
