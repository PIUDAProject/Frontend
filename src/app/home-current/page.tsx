import HomeCurrentCard, { type HomeCurrentCardProps } from './components/home-current-card';

type MockCardData = HomeCurrentCardProps & { id: string };

const MOCK_CARDS: MockCardData[] = [
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

export default function HomeCurrentCardPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {MOCK_CARDS.map(({ id, ...props }) => (
        <HomeCurrentCard key={id} {...props} />
      ))}
    </div>
  );
}
