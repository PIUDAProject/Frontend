import { ParentListSection } from './components/parent-list-section';
import { UserCard } from './components/user-card';

const MOCK_USER = { name: '김지수' };

const MOCK_PARENTS = [
  { id: '1', name: '김영희' },
  { id: '2', name: '박철수' },
  { id: '3', name: '이순자' },
];

export default function MyPage() {
  return (
    <div className="flex flex-col gap-6 px-4 py-5">
      <UserCard name={MOCK_USER.name} />
      <ParentListSection parents={MOCK_PARENTS} />
    </div>
  );
}
