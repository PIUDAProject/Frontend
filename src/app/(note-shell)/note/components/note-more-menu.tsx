'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface NoteMoreMenuProps {
  hospitalName?: string;
}

export function NoteMoreMenu({ hospitalName }: NoteMoreMenuProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function handleConfirmDelete() {
    // TODO: 실제 삭제 API 연동
    setDeleteDialogOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={`${hospitalName ?? '병원'} 더보기`}
            className="text-ink-700 focus-visible:ring-primary -m-2.5 rounded-md p-2.5 hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none"
          >
            <MoreVertical size={18} aria-hidden />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer gap-2">
            <Pencil size={15} className="text-ink-500" aria-hidden />
            약물 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-danger focus:text-danger focus:bg-danger-bg cursor-pointer gap-2"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 size={15} aria-hidden />
            약물 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent hideClose className="max-w-[calc(390px-2rem)] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl font-semibold">
              약물을 삭제할까요?
            </DialogTitle>
            <DialogDescription className="kr-wrap text-ink-500 mt-1 text-sm">
              {hospitalName ?? '병원 정보 없음'}의 약물 목록이 모두 삭제됩니다. 이 작업은 되돌릴 수
              없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2 flex flex-row gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">
                취소
              </Button>
            </DialogClose>
            <Button variant="destructive" className="flex-1" onClick={handleConfirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
