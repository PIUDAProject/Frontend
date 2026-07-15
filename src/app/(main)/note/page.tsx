export default function NotePage() {
  return (
    <>
      <h1 className="sr-only">약물노트</h1>
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-24 text-center">
        <p className="text-foreground text-base font-semibold">약물노트</p>
        <p className="kr-wrap text-muted-foreground text-sm">
          등록된 약물 목록이 여기에 표시됩니다.
        </p>
      </div>
    </>
  );
}
