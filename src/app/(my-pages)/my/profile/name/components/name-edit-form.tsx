'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface NameEditFormProps {
  initialName: string;
}

export function NameEditForm({ initialName }: NameEditFormProps) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [name, setName] = useState(initialName);

  const isValid = name.trim().length >= 1 && name.trim() !== initialName.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    start(async () => {
      // TODO: 이름 수정 API 연동
      router.push('/my/profile');
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col px-5.5 pt-7">
      <div className="flex flex-1 flex-col gap-2.5">
        <label htmlFor="name" className="text-ink-700 text-sm font-semibold">
          이름
        </label>
        <input
          id="name"
          type="text"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="성함을 입력하세요"
          className="border-line bg-surface focus-visible:border-primary focus-visible:ring-primary text-ink-900 placeholder:text-ink-400 h-14 rounded-md border px-4.5 text-base transition-[border-color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:outline-none"
        />
      </div>

      <div className="pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="submit"
          disabled={!isValid || pending}
          aria-busy={pending}
          className="bg-primary text-primary-foreground shadow-fab focus-visible:ring-primary h-14 w-full rounded-2xl text-base font-bold transition-colors duration-150 hover:bg-blue-700 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          수정
        </button>
      </div>
    </form>
  );
}
