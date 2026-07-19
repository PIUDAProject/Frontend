import { cn } from '@/lib/utils';

const STEPS = [
  {
    step: '1',
    title: '문자 확인',
    desc: '부모님 휴대폰으로 전송된 문자를 확인해 주세요.',
  },
  {
    step: '2',
    title: '링크 접속',
    desc: '문자 안의 링크를 눌러 CallCare 앱을 열어 주세요.',
  },
  {
    step: '3',
    title: '앱 저장',
    desc: '홈 화면에 추가하면 더 빠르게 접속할 수 있습니다.',
  },
] as const;

export function SaveGuide() {
  return (
    <ol className="flex flex-col" aria-label="저장 안내 단계">
      {STEPS.map(({ step, title, desc }, idx) => (
        <li
          key={step}
          className={cn(
            'flex items-start gap-4 py-3.5',
            idx < STEPS.length - 1 && 'border-line border-b',
          )}
        >
          <span
            className="bg-secondary text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums"
            aria-hidden="true"
          >
            {step}
          </span>
          <div className="flex flex-col gap-0.5 pt-1">
            <span className="text-ink-900 text-sm font-semibold">{title}</span>
            <span className="kr-wrap text-ink-500 text-xs">{desc}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
