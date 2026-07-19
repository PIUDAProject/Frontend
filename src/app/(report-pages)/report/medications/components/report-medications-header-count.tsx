import { getReportSummary } from '@/lib/data/report';

interface ReportMedicationsHeaderCountProps {
  patientId: string;
}

export async function ReportMedicationsHeaderCount({
  patientId,
}: ReportMedicationsHeaderCountProps) {
  const summary = await getReportSummary(patientId);
  const medicationCount = summary.hospitals.reduce(
    (sum, hospital) => sum + hospital.medications.length,
    0,
  );

  return (
    <h1 className="text-foreground text-xl font-semibold">사용중인 약물 {medicationCount}건</h1>
  );
}
