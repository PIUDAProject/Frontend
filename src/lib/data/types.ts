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

// 리포트 타입 (환자당 최신 1건 기준)
export type ReportGrade = 'BASIC';

export type ReportPatientInfo = {
  patientName: string;
  reportDate: string; // 리포트 생성 기준일, 'YYYY.MM.DD'
  reportId: string; // PDF 하단 각주에만 노출되는 리포트 식별자
  birthDate: string; // 'YYYY.MM.DD'
  age: number;
  grade: ReportGrade;
};

export type DrugInteractionSeverity = 'danger' | 'caution';

export type DrugInteractionDrug = {
  name: string;
  color: MedColor;
  kind: string; // 제품종류
  hospitalName?: string; // 처방기관
  prescriptionDate: string; // 처방날짜, 'YY.MM.DD'
};

export type DrugInteractionPair = {
  id: string;
  drugA: DrugInteractionDrug;
  drugB: DrugInteractionDrug;
  severity: DrugInteractionSeverity;
  description: string;
};

// 리포트에 포함된 약물 (약물노트의 NoteMedication과 별개 — 처방 상세 정보를 포함)
export type ReportMedicationStatus = 'active' | 'completed';

export type ReportMedication = {
  id: string;
  name: string;
  kind: string;
  color: MedColor;
  status: ReportMedicationStatus;
  hospitalName?: string;
  dosagePeriod: { startDate: string; endDate: string };
  dosePerTime: string; // 1회 투약량
  timesPerDay: number; // 1일 투여횟수
  totalDays: number; // 총 투여일수
};

export type ReportHospitalGroup = {
  id: string;
  hospitalName?: string;
  medications: ReportMedication[];
};

export type ReportSummary = {
  patient: ReportPatientInfo;
  hospitals: ReportHospitalGroup[];
  interactions: DrugInteractionPair[];
};
