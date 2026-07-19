import { StepHeader } from '@/components/parent-form/step-header';
import { MealTimeAddForm } from './_components/meal-time-add-form';

export default function ParentAddStep2Page() {
  return (
    <div className="flex flex-1 flex-col">
      <StepHeader step={2} total={2} back="/parents/add/step1" />
      <div className="px-5.5 pt-5.5">
        <h1 className="text-ink-900 mb-1.5 text-4xl font-bold">
          부모님의 식사 시간을
          <br />
          알려주세요
        </h1>
        <p className="kr-wrap text-ink-700 text-sm">
          입력한 시간을 기준으로 복약 알림이 제공됩니다.
        </p>
      </div>
      <MealTimeAddForm />
    </div>
  );
}
