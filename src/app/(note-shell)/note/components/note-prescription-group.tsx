import type { NotePrescription } from '@/lib/data/types';
import { NoteHospitalCard } from './note-hospital-card';

interface NotePrescriptionGroupProps {
  prescription: NotePrescription;
}

export function NotePrescriptionGroup({ prescription }: NotePrescriptionGroupProps) {
  return (
    <section aria-label={`${prescription.prescriptionDate} 처방`}>
      <h2 className="text-ink-500 mb-3 px-1 text-xs font-semibold">
        {prescription.prescriptionDate} 처방
      </h2>

      <div className="flex flex-col gap-3">
        {prescription.hospitals.map((group) => (
          <NoteHospitalCard key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
