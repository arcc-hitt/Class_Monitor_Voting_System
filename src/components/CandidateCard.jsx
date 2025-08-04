import React, { useContext } from 'react';
import { VoteContext } from '../contexts/VoteContext';

export default function CandidateCard({ name, imgUrl }) {
  const { votes } = useContext(VoteContext);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
      <img src={imgUrl} alt={name} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="mt-2 text-xl font-semibold text-center">{name}</h3>
      <p className="mt-2 text-center text-sm text-gray-600">
        Votes: {votes[name]?.length || 0}
      </p>
      {votes[name]?.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          <div className="font-semibold">Voters:</div>
          <ul>
            {votes[name].map(voter => (
              <li key={voter}>{voter}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
