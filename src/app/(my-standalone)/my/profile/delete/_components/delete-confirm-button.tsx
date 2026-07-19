'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

export function DeleteConfirmButton() {
  const [open, setOpen] = useState(false);

  function handleDelete() {
    // TODO: 탈퇴 API 연동
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-danger focus-visible:ring-danger h-14 flex-[1.7] rounded-2xl text-base font-bold text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
      >
        탈퇴하기
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[320px] gap-0 rounded-2xl p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-ink-900 text-lg font-bold">
              정말 탈퇴하시겠어요?
            </DialogTitle>
            <DialogDescription className="text-ink-500 kr-wrap mt-2 text-sm leading-relaxed">
              탈퇴 후 30일간 동일 계정으로 재가입할 수 없으며, 모든 데이터가 즉시 삭제됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex gap-2.5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border-line text-ink-900 focus-visible:ring-primary hover:bg-muted flex h-12 flex-1 items-center justify-center rounded-xl border text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-danger focus-visible:ring-danger flex h-12 flex-[1.5] items-center justify-center rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
            >
              탈퇴하기
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
