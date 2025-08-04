import React, { useContext } from 'react';
import { VoteContext } from '../contexts/VoteContext';

const CandidateCard = ({ name, imgUrl }) => {
  const { votes } = useContext(VoteContext);
  const voteCount = votes[name]?.length || 0;
  const totalVotes = Object.values(votes).reduce((sum, voters) => sum + voters.length, 0);
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="relative mb-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {name.charAt(0).toUpperCase()}
          </div>
          {voteCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
              {voteCount}
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-center text-gray-800 mb-2 capitalize">
          {name}
        </h3>
        
        <div className="text-center mb-3">
          <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
          <div className="text-sm text-gray-500">{voteCount} votes</div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Voter list */}
        {votes[name]?.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs font-semibold text-gray-700 mb-2">Recent Voters:</div>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {votes[name].slice(-3).map(voter => (
                <div key={voter} className="text-xs text-gray-600 bg-white px-2 py-1 rounded-md">
                  {voter}
                </div>
              ))}
              {votes[name].length > 3 && (
                <div className="text-xs text-gray-500 italic">
                  +{votes[name].length - 3} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
