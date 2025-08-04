import CandidateCard from './CandidateCard';

const candidates = [
  { name: 'alice', imgUrl: '/images/alice.jpg' },
  { name: 'bob', imgUrl: '/images/bob.jpg' },
  { name: 'charlie', imgUrl: '/images/charlie.jpg' },
];

export default function CandidateList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {candidates.map(c => (
        <CandidateCard key={c.name} {...c} />
      ))}
    </div>
  );
}
