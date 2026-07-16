export type MedColor = 'blue' | 'purple' | 'orange';
export type MealType = 'morning' | 'noon' | 'night';

export type Medication = {
  id: string;
  name: string;
  kind?: string;
  use: string[];
  color: MedColor;
  checked: boolean;
};

export type HospitalGroup = {
  id?: string;
  hospital?: string;
  medications: Medication[];
};

export type MealGroup = {
  mealname: string;
  mealType: MealType;
  time: string;
  dateTime: string;
  hospitals: HospitalGroup[];
};

export type NextMedication = {
  time: string;
  name: string;
  extraCount: number;
};

export type CurrentCardData = {
  id: string;
  patientName: string;
  total: number;
  completed: number;
  nextMedication?: NextMedication;
};

export type ExpiryAlertData = {
  id: number;
  medicationName: string;
  daysLeft: number;
  totalDays: number;
};

// 약물노트 타입
export type NoteStatus = 'active' | 'completed' | 'stopped';

export type NoteMedication = {
  id: string;
  name: string;
  kind: string;
  dosageInfo: string[];
  status: NoteStatus;
  color: MedColor;
};

export type NoteHospitalGroup = {
  id: string;
  hospitalName?: string;
  medications: NoteMedication[];
  showReregistration: boolean;
};

export type NotePrescription = {
  id: string;
  prescriptionDate: string;
  hospitals: NoteHospitalGroup[];
};

export type NoteMedicationDetail = {
  id: string;
  name: string;
  kind: string;
  color: MedColor;
  imageUrl?: string;
  tabs: {
    efficacy: string;
    dosage: string;
    caution: string;
    sideEffect: string;
  };
};
