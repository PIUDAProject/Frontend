'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileDown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ReportPdfButton() {
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/report/pdf');
      if (!response.ok) throw new Error('PDF 생성에 실패했습니다.');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = '약물안전리포트.pdf';
      anchor.click();
      URL.revokeObjectURL(url);
      setOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'PDF 다운로드 중 오류가 발생했습니다.';
      toast.error(message);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <>
      <div className="z-sticky fixed bottom-(--bottom-nav-actual-height) left-1/2 flex w-full max-w-[390px] -translate-x-1/2 justify-end px-4 pb-3">
        <button
          type="button"
          aria-label="PDF로 다운로드"
          onClick={() => setOpen(true)}
          className="group flex flex-col items-center gap-1.5 rounded-md focus-visible:outline-none"
        >
          <div className="bg-primary shadow-fab group-focus-visible:ring-primary grid size-11 place-items-center rounded-full transition-opacity duration-150 group-focus-visible:ring-2 group-focus-visible:ring-offset-1 group-active:opacity-80">
            <FileDown size={20} strokeWidth={2.2} className="text-primary-foreground" aria-hidden />
          </div>
          <span aria-hidden="true" className="text-primary text-2xs font-bold">
            PDF 다운
          </span>
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[320px] gap-0 rounded-2xl p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-ink-900 kr-wrap text-lg font-bold">
              약물안전리포트를 PDF로 다운로드하시겠어요?
            </DialogTitle>
            <DialogDescription className="text-ink-500 kr-wrap mt-2 text-sm leading-relaxed">
              지금까지 확인된 복약 현황과 상호작용 결과가 PDF 파일로 저장돼요.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex gap-2.5">
            <Button type="button" variant="outline" size="dialog" onClick={() => setOpen(false)}>
              다음에
            </Button>
            <Button
              type="button"
              size="dialog"
              className="flex-[1.5]"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? '다운로드 중...' : '네'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
