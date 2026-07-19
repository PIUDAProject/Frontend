export function TypingIndicator() {
  return (
    <div
      role="status"
      aria-label="답변을 준비하고 있어요"
      className="bg-card shadow-card flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md px-4 py-3"
    >
      <span className="bg-ink-400 size-1.5 animate-bounce rounded-full" />
      <span className="bg-ink-400 size-1.5 animate-bounce rounded-full [animation-delay:150ms]" />
      <span className="bg-ink-400 size-1.5 animate-bounce rounded-full [animation-delay:300ms]" />
    </div>
  );
}
