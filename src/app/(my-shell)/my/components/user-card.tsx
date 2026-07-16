import { Camera, UserRound } from 'lucide-react';
import Link from 'next/link';

interface UserCardProps {
  name: string;
}

export function UserCard({ name }: UserCardProps) {
  return (
    <Link
      href="/my/profile"
      className="focus-visible:ring-primary bg-card shadow-card flex items-center gap-4 rounded-xl p-4 transition-opacity hover:opacity-80 focus-visible:ring-1 focus-visible:outline-none"
      aria-label={`${name} 프로필 편집`}
    >
      <div className="relative shrink-0">
        <div className="bg-ink-300 flex size-16 items-center justify-center overflow-hidden rounded-full">
          <UserRound className="text-ink-400 size-9" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <span className="bg-primary border-card absolute right-0 bottom-0 flex size-5 items-center justify-center rounded-full border-2">
          <Camera size={10} strokeWidth={2.5} className="text-white" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-ink-900 text-base font-bold">{name} 님</span>
        <span className="text-ink-500 flex items-center gap-1 text-xs">
          <UserRound size={12} strokeWidth={2} aria-hidden="true" />
          보호자 계정
        </span>
      </div>
    </Link>
  );
}
