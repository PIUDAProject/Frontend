import { MED_COLOR_CLASSES } from '@/lib/constants/med-colors';
import type { MedColor } from '@/lib/data/types';
import { cn } from '@/lib/utils';
import { Pill } from 'lucide-react';
import Image from 'next/image';

interface MedDetailHeroProps {
  name: string;
  kind: string;
  color: MedColor;
  imageUrl?: string;
}

export function MedDetailHero({ name, kind, color, imageUrl }: MedDetailHeroProps) {
  const { iconBg, iconColor } = MED_COLOR_CLASSES[color];

  return (
    <div className="bg-card flex flex-col items-center gap-4 px-6 py-8">
      {/* 약 이미지 */}
      <div
        className={cn('flex size-28 items-center justify-center rounded-2xl', iconBg)}
        aria-hidden
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={96}
            height={96}
            className="size-24 rounded-xl object-contain"
          />
        ) : (
          <Pill size={48} className={iconColor} aria-hidden />
        )}
      </div>

      {/* 이름 + 분류 */}
      <div className="text-center">
        <h1 className="text-foreground text-2xl font-bold">{name}</h1>
        <p className="text-ink-500 mt-1 text-sm">{kind}</p>
      </div>
    </div>
  );
}
