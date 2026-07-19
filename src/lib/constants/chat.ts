import type { ChatScenarioId } from '@/lib/data/types';

// 챗봇 UI 규칙: 2026 대화형 UI 베스트 프랙티스 기준 상한값
export const QUICK_REPLY_MAX_COUNT = 5;
export const QUICK_REPLY_LABEL_MAX_LENGTH = 20;
export const DRUG_CARD_ACTION_MAX_COUNT = 2;
// 이 개수를 초과하는 약물 카드는 "더보기"로 접어 노출
export const DRUG_CARD_VISIBLE_COUNT = 3;

// 어시스턴트 응답 전 타이핑 인디케이터 노출 시간
export const TYPING_DELAY_MS = 900;

// 시나리오별 매칭 키워드 (실제 NLU 없이 목데이터로 시나리오를 재현하기 위한 단순 매칭)
// '아프다'는 '아파요/아파서'처럼 어간 모음이 축약되는 활용형이 있어 '아프'/'아파' 둘 다 등록
const SCENARIO_KEYWORDS: Record<ChatScenarioId, string[]> = {
  'registered-drugs': ['등록 약', '드시는 약', '먹는 약', '복용 중인 약'],
  'side-effects': ['부작용'],
  'symptom-recommendation': ['추천', '증상', '아프', '아파', '두통', '머리'],
};

export function matchChatScenario(text: string): ChatScenarioId | null {
  const scenarioId = (Object.keys(SCENARIO_KEYWORDS) as ChatScenarioId[]).find((id) =>
    SCENARIO_KEYWORDS[id].some((keyword) => text.includes(keyword)),
  );
  return scenarioId ?? null;
}
