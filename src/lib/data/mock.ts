import dayjs from 'dayjs';
import type { CurrentCardData, ExpiryAlertData, MealGroup } from './types';

// 이번 주 월~금에 복약 일정이 있는 것으로 가정
const thisWeekSunday = dayjs().startOf('week');
export const MOCK_MARKED_DATES: string[] = Array.from({ length: 5 }, (_, i) =>
  thisWeekSunday.add(i + 1, 'day').format('YYYY-MM-DD'),
);

export const MOCK_CURRENT_CARDS: CurrentCardData[] = [
  {
    id: 'pending',
    patientName: '김철수',
    total: 3,
    completed: 0,
    nextMedication: { time: '오전 08:30', name: '아스피린', extraCount: 2 },
  },
  {
    id: 'partial',
    patientName: '김철수',
    total: 3,
    completed: 1,
    nextMedication: { time: '오전 08:30', name: '아스피린', extraCount: 2 },
  },
  {
    id: 'done',
    patientName: '김철수',
    total: 3,
    completed: 3,
  },
];

export const MOCK_EXPIRY_ALERTS: ExpiryAlertData[] = [
  { id: 1, medicationName: '아모디핀정 5mg', daysLeft: 3, totalDays: 10 },
  { id: 2, medicationName: '타이레놀 500mg', daysLeft: 7, totalDays: 30 },
];

export const MOCK_MEAL_DATA: MealGroup[] = [
  {
    mealname: '아침',
    mealType: 'morning',
    time: '오전 08:30',
    dateTime: '2026-06-13T08:30',
    hospitals: [
      {
        id: 'seoul-hospital',
        hospital: '서울병원',
        medications: [
          {
            id: 'aspirin',
            name: '아스피린',
            kind: '소화제',
            use: ['1일 3회', '1회 1정', '7일 복용'],
            color: 'blue',
            checked: false,
          },
          {
            id: 'stomach',
            name: '위장약',
            use: ['1일 3회', '식후 30분'],
            color: 'blue',
            checked: false,
          },
        ],
      },
      {
        id: 'self',
        medications: [
          {
            id: 'vitamin',
            name: '비타민',
            use: ['1일 1회'],
            color: 'purple',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    mealname: '점심',
    mealType: 'noon',
    time: '오후 12:30',
    dateTime: '2026-06-13T12:30',
    hospitals: [
      {
        id: 'seoul-hospital',
        hospital: '서울병원',
        medications: [
          {
            id: 'antibiotic',
            name: '항생제',
            kind: '감기약',
            use: ['1일 2회', '1회 1정', '5일 복용'],
            color: 'orange',
            checked: false,
          },
          {
            id: 'cough',
            name: '기침약',
            kind: '감기약',
            use: ['1일 2회', '1회 1정', '5일 복용'],
            color: 'orange',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    mealname: '저녁',
    mealType: 'night',
    time: '오후 06:30',
    dateTime: '2026-06-13T18:30',
    hospitals: [
      {
        id: 'seoul-hospital',
        hospital: '서울병원',
        medications: [
          {
            id: 'painkiller',
            name: '진통제',
            kind: '두통약',
            use: ['1일 2회', '1회 1정', '3일 복용'],
            color: 'purple',
            checked: false,
          },
          {
            id: 'sleeping',
            name: '수면제',
            kind: '수면 보조제',
            use: ['1일 1회', '취침 30분 전'],
            color: 'purple',
            checked: false,
          },
        ],
      },
      {
        id: 'self',
        medications: [
          {
            id: 'probiotic',
            name: '프로바이오틱스',
            kind: '유산균',
            use: ['1일 1회', '식후 30분'],
            color: 'blue',
            checked: false,
          },
        ],
      },
    ],
  },
];
