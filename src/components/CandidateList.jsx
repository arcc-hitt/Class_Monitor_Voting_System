import CandidateCard from './CandidateCard';

const candidates = [
  { name: 'alice', imgUrl: '/images/alice.jpg' },
  { name: 'bob', imgUrl: '/images/bob.jpg' },
  { name: 'charlie', imgUrl: '/images/charlie.jpg' },
];

const CandidateList = () => {
  const candidates = [
    { name: 'alice', imgUrl: '/images/alice.jpg' },
    { name: 'bob', imgUrl: '/images/bob.jpg' },
    { name: 'charlie', imgUrl: '/images/charlie.jpg' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Meet the Candidates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {candidates.map(c => (
          <CandidateCard key={c.name} {...c} />
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
