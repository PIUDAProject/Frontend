import dayjs from 'dayjs';

export function getTodayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());
}

export function getWeekISOs(anchorISO: string): string[] {
  const sunday = dayjs(anchorISO).startOf('week');
  return Array.from({ length: 7 }, (_, i) => sunday.add(i, 'day').format('YYYY-MM-DD'));
}
