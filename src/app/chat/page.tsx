import { getChatSuggestions } from '@/lib/data/chat';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ChatScreen } from './components/chat-screen';

export default function ChatPage() {
  const suggestions = getChatSuggestions();

  return (
    <div className="bg-surface mx-auto flex h-dvh max-w-[390px] flex-col">
      <header className="z-sticky border-line bg-surface-2 border-b px-2 pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center gap-3">
          <Link
            href="/home"
            aria-label="뒤로 가기"
            className="text-ink-700 focus-visible:ring-primary -ml-1 flex min-h-11 min-w-11 items-center justify-center rounded-md focus-visible:ring-1 focus-visible:outline-none"
          >
            <ChevronLeft size={22} aria-hidden />
          </Link>
          <h1 className="text-ink-900 text-base font-bold">온길봇</h1>
        </div>
      </header>

      <ChatScreen suggestions={suggestions} />
    </div>
  );
}
