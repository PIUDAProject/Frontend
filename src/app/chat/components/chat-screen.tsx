'use client';

import { ChatInputBar } from '@/components/chat/chat-input-bar';
import { QuickActionCard } from '@/components/chat/quick-action-card';
import { TypingIndicator } from '@/components/chat/typing-indicator';
import { createMessage, requestAssistantReply } from '@/lib/data/chat';
import type {
  ChatErrorFallbackStage,
  ChatMessage,
  ChatMessageContent,
  ChatQuickReply,
  ChatSuggestion,
} from '@/lib/data/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageItem } from './chat-message-item';

interface ChatScreenProps {
  suggestions: ChatSuggestion[];
}

// 스크린 리더 라이브 리전에 읽어줄 한 줄 요약 (전체 카드 마크업을 그대로 읽지 않도록 축약)
function describeAssistantMessage(content: ChatMessageContent): string {
  switch (content.type) {
    case 'text':
      return content.text;
    case 'drugCards':
      return `약물 정보 ${content.cards.length}건을 안내했어요.`;
    case 'quickReplies':
      return content.text;
    case 'errorFallback':
      return content.fallback.text;
  }
}

export function ChatScreen({ suggestions }: ChatScreenProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [fallbackStage, setFallbackStage] = useState<ChatErrorFallbackStage>(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 새 메시지나 타이핑 인디케이터가 추가될 때마다 최신 대화가 보이도록 하단으로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, isTyping]);

  function appendMessages(newMessages: ChatMessage[]) {
    setMessages((prev) => [...prev, ...newMessages]);
  }

  // 다음에 보여줄 어시스턴트 메시지에 에러 폴백이 섞여 있으면 단계를 올리고,
  // 정상 응답이면 3단계 폴백 카운터를 초기화한다.
  function updateFallbackStage(replies: ChatMessage[]) {
    const hasErrorFallback = replies.some((message) => message.content.type === 'errorFallback');
    setFallbackStage((prev) => {
      if (!hasErrorFallback) return 1;
      return prev < 3 ? ((prev + 1) as ChatErrorFallbackStage) : 3;
    });
  }

  // requestAssistantReply를 호출해 어시스턴트 응답을 받아오는 공통 흐름.
  // TODO(API 연동): 실제 백엔드 호출로 교체된 뒤에는 이 catch 블록에서
  // 네트워크 실패 시 사용자에게 보여줄 에러 메시지를 노출하도록 구체화한다.
  async function respond(input: Parameters<typeof requestAssistantReply>[0]) {
    setIsTyping(true);
    try {
      const replies = await requestAssistantReply(input);
      appendMessages(replies);
      updateFallbackStage(replies);
    } catch {
      // 목데이터 단계에서는 발생하지 않는 경로
    } finally {
      setIsTyping(false);
    }
  }

  function handleSend(text: string) {
    appendMessages([createMessage('user', { type: 'text', text })]);
    respond({ kind: 'userText', text, fallbackStage });
  }

  function handleSelectQuickReply(reply: ChatQuickReply) {
    appendMessages([createMessage('user', { type: 'text', text: reply.label })]);

    // API와 무관한 순수 화면 동작(대화 초기화, 홈 이동)은 여기서 바로 처리
    if (reply.id === 'fallback-reply-002') {
      setMessages([]);
      setFallbackStage(1);
      return;
    }
    if (reply.id === 'fallback-reply-003') {
      router.push('/home');
      return;
    }

    respond({ kind: 'quickReply', replyId: reply.id });
  }

  const lastMessageId = messages[messages.length - 1]?.id;
  const lastAssistantMessage = messages.findLast((message) => message.role === 'assistant');
  // 타이핑 인디케이터가 이미 role="status"로 대기 상태를 안내하므로,
  // 응답이 도착한 뒤에만 최신 어시스턴트 메시지 요약을 announce해 중복 안내를 피한다.
  const liveAnnouncement =
    !isTyping && lastAssistantMessage ? describeAssistantMessage(lastAssistantMessage.content) : '';

  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>
      <main aria-label="대화 내용" className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <QuickActionCard
            suggestions={suggestions}
            onSelect={(suggestion) => handleSend(suggestion.prompt)}
          />
        )}
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            onSelectQuickReply={handleSelectQuickReply}
            // 최신 메시지가 아니면 이미 지나간 quick-reply이므로 비활성화해 재클릭을 막는다
            quickRepliesDisabled={isTyping || message.id !== lastMessageId}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </main>
      <ChatInputBar onSend={handleSend} disabled={isTyping} />
    </>
  );
}
