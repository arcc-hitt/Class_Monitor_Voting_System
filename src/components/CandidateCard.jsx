import React, { useContext } from 'react';
import { VoteContext } from '../contexts/VoteContext';

export default function CandidateCard({ name, imgUrl }) {
  const { votes, hasVoted, castVote } = useContext(VoteContext);

  const handleVote = () => {
    if (!castVote(name)) {
      alert('You have already voted!');
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
      <img src={imgUrl} alt={name} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="mt-2 text-xl font-semibold text-center">{name}</h3>
      <button
        onClick={handleVote}
        disabled={hasVoted}
        className={`mt-4 px-4 py-2 rounded-full ${
          hasVoted ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {hasVoted ? 'Voted' : 'Vote'}
      </button>
      <p className="mt-2 text-center text-sm text-gray-600">
        Votes: {votes[name]}
      </p>
    </div>
  );
}
