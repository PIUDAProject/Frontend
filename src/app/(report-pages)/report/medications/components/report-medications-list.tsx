import { getReportSummary, REPORT_METHOD_NOTE } from '@/lib/data/report';
import { ReportMedicationItem } from './report-medication-item';

interface ReportMedicationsListProps {
  patientId: string;
}

export async function ReportMedicationsList({ patientId }: ReportMedicationsListProps) {
  const summary = await getReportSummary(patientId);
  const medications = summary.hospitals.flatMap((hospital) => hospital.medications);

  return (
    <>
      <p className="kr-wrap text-ink-500 px-1 text-sm leading-relaxed">{REPORT_METHOD_NOTE}</p>
      {medications.map((medication) => (
        <ReportMedicationItem key={medication.id} medication={medication} />
      ))}
    </>
  );
}
