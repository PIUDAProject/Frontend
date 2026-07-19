import { ReportField } from '@/components/report-field';
import type { ReportPatientInfo } from '@/lib/data/types';

interface ReportInfoCardProps {
  patient: ReportPatientInfo;
}

export function ReportInfoCard({ patient }: ReportInfoCardProps) {
  return (
    <div className="shadow-card bg-card flex flex-col gap-3 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-primary h-3.5 w-1 rounded-full" aria-hidden />
          <span className="text-ink-700 text-xs font-semibold">분석정보</span>
        </div>
        <span className="bg-primary text-primary-foreground rounded-full px-2.5 py-1 text-xs font-semibold">
          {patient.grade}
        </span>
      </div>

      <div className="border-line border-t" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <ReportField label="이름" value={patient.patientName} />
        <ReportField label="리포트 ID" value={patient.reportId} />
        <ReportField label="생년월일" value={patient.birthDate} />
        <ReportField label="현재 나이" value={`약 ${patient.age}세`} />
      </div>
    </div>
  );
}
