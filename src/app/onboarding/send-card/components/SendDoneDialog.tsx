'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SendDoneDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SendDoneDialog({ open, onClose }: SendDoneDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-[320px] rounded-2xl"
        hideClose
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-ink-900 text-center text-base font-bold">
            연락처 카드 발송 완료
          </DialogTitle>
          <DialogDescription className="kr-wrap text-ink-500 text-center text-sm">
            부모님 휴대폰으로 연락처 카드를
            <br />
            보냈습니다. 확인을 요청해 주세요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            onClick={onClose}
            className="bg-primary text-primary-foreground focus-visible:ring-primary h-11 w-full rounded-2xl text-sm font-bold transition-colors hover:bg-blue-700 focus-visible:ring-1 focus-visible:outline-none"
          >
            확인
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
