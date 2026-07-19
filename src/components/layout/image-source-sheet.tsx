'use client';

import {
  Drawer,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
} from '@/components/ui/drawer';
import type { LucideIcon } from 'lucide-react';
import { Camera, Images } from 'lucide-react';
import { Drawer as DrawerPrimitive } from 'vaul';

export type ImageSource = 'album' | 'camera';

interface ImageSourceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (src: ImageSource) => void;
}

const OPTIONS: { value: ImageSource; label: string; description: string; Icon: LucideIcon }[] = [
  {
    value: 'camera',
    label: '카메라로 촬영',
    description: '지금 바로 사진을 찍어요.',
    Icon: Camera,
  },
  {
    value: 'album',
    label: '앨범에서 선택',
    description: '저장된 사진을 가져와요.',
    Icon: Images,
  },
];

export function ImageSourceSheet({ open, onOpenChange, onSelect }: ImageSourceSheetProps) {
  function handleSelect(src: ImageSource) {
    onOpenChange(false);
    onSelect(src);
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerPortal>
        <DrawerOverlay className="bg-black/40" />
        <DrawerPrimitive.Content className="z-modal bg-card fixed inset-x-0 bottom-0 mx-auto flex h-auto w-full max-w-[390px] flex-col rounded-t-2xl focus:outline-none">
          <div className="bg-ink-300 mx-auto mt-3 mb-2 h-1.5 w-12 rounded-full" />
          <div className="flex flex-col gap-5 px-6 pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
            <div className="flex flex-col gap-1">
              <DrawerTitle className="text-2xl font-bold">사진 불러오기</DrawerTitle>
              <DrawerDescription className="text-muted-foreground kr-wrap text-base">
                처방전이나 약봉투 사진을 선택하세요.
              </DrawerDescription>
            </div>
            <div className="flex flex-col gap-2">
              {OPTIONS.map(({ value, label, description, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleSelect(value)}
                  className="hover:bg-accent hover:border-primary focus-visible:ring-primary flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors duration-150 focus-visible:ring-1 focus-visible:outline-none active:opacity-80"
                >
                  <div className="bg-med-blue-bg flex size-12 shrink-0 items-center justify-center rounded-lg">
                    <Icon size={22} className="text-primary" aria-hidden />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-foreground text-base font-semibold">{label}</span>
                    <span className="text-muted-foreground kr-wrap text-sm">{description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPortal>
    </Drawer>
  );
}
