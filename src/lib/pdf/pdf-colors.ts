// @react-pdf/renderer는 oklch()를 지원하지 않아 DESIGN.md 토큰의 근사 hex 값으로 별도 정의
export const PDF_COLORS = {
  primary: '#005BBF', // Steadfast Blue
  deepInk: '#1F2430', // 헤드라인/본문
  inkText: '#41454F', // 보조 본문
  inkSubtle: '#767A85', // 캡션/각주/필드 라벨
  inkBorder: '#E4E6EC', // 구분선
  canvas: '#FCFCFD', // 페이지 배경
  cardWhite: '#FFFFFF',
  danger: '#DC2626',
  dangerBg: '#FDECEC',
  caution: '#B7791F',
  cautionBg: '#FDF3DD',
  statusActive: '#005BBF',
  statusActiveBg: '#EAF1FC',
  statusDone: '#1F9D5A',
  statusDoneBg: '#EAF7EF',
  // 홈 복약 현황 카드와 동일한 다크 배경 변형 (Steadfast Blue Deeper) — 사용중인 약물 배너에 재사용
  cardCurrent: '#0B3B75',
  cardCurrentText: '#FAFAFC',
  cardCurrentTextMuted: '#D6D8E0',
  medBlue: '#005BBF',
  medBlueBg: '#E8F0FE',
  medPurple: '#7C3AED',
  medPurpleBg: '#F1EAFE',
  medOrange: '#EA580C',
  medOrangeBg: '#FFF1E6',
} as const;
