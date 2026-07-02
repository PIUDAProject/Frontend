import { cache } from 'react';
import { MOCK_CURRENT_CARDS, MOCK_EXPIRY_ALERTS, MOCK_MARKED_DATES, MOCK_MEAL_DATA } from './mock';
import type { CurrentCardData, ExpiryAlertData, MealGroup } from './types';

// API 연동 시 함수 본문만 교체 (시그니처 유지)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCurrentCards = cache(
  async (patientId: string, date: string): Promise<CurrentCardData[]> => {
    return MOCK_CURRENT_CARDS;
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getExpiryAlerts = cache(async (patientId: string): Promise<ExpiryAlertData[]> => {
  return MOCK_EXPIRY_ALERTS;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMealData = cache(async (patientId: string, date: string): Promise<MealGroup[]> => {
  return MOCK_MEAL_DATA;
});

// 주어진 weekISOs 중 복약 일정이 있는 날짜만 반환
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMarkedDates = cache(
  async (patientId: string, weekISOs: readonly string[]): Promise<string[]> => {
    return MOCK_MARKED_DATES;
  },
);
