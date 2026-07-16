import { MOCK_MEDICATION_DETAILS, MOCK_NOTE_PRESCRIPTIONS } from './mock';
import type { NoteMedicationDetail, NotePrescription } from './types';

export function getNotePrescriptions(): NotePrescription[] {
  return MOCK_NOTE_PRESCRIPTIONS;
}

export function getMedicationDetail(id: string): NoteMedicationDetail | undefined {
  return MOCK_MEDICATION_DETAILS.find((m) => m.id === id);
}

export function searchMedications(query: string): NotePrescription[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return MOCK_NOTE_PRESCRIPTIONS.map((prescription) => ({
    ...prescription,
    hospitals: prescription.hospitals
      .map((hospital) => ({
        ...hospital,
        medications: hospital.medications.filter(
          (med) => med.name.toLowerCase().includes(q) || med.kind.toLowerCase().includes(q),
        ),
      }))
      .filter((hospital) => hospital.medications.length > 0),
  })).filter((prescription) => prescription.hospitals.length > 0);
}
