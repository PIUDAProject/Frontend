import { cache } from 'react';
import { MOCK_REPORT_SUMMARY_DANGER } from './mock';
import type { ReportSummary } from './types';

// 임시: 실제 로그인 구현 후 세션에서 읽어옴
export const TEMP_PATIENT_ID = 'patient-001';

export const REPORT_METHOD_NOTE = [
  '약물안전리포트는 최근 90일 이내에 사용한 약물이 대상으로 분석해요.',
  '약물을 중단한 뒤에도 성분이 체내에 남아 다른 약물과 상호작용할 수 있어, 약효가 몸에서 빠지는 기간(최대 7일)을 함께 고려해요.',
  '같은 약물을 동일한 처방기관에서 연속으로 처방받았다면 투약기간을 합쳐서 보여드려요.',
].join(' ');

// API 연동 시 함수 본문만 교체 (시그니처 유지)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReportSummary = cache(async (patientId: string): Promise<ReportSummary> => {
  return MOCK_REPORT_SUMMARY_DANGER;
});
