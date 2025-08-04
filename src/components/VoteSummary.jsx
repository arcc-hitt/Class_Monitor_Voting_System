import React, { useContext } from 'react';
import { VoteContext } from '../contexts/VoteContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const VoteSummary = () => {
  const { votes } = useContext(VoteContext);
  const data = Object.entries(votes).map(([name, voters]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count: voters.length,
  }));

  const totalVotes = data.reduce((sum, item) => sum + item.count, 0);
  const leader = data.reduce((prev, current) => (prev.count > current.count) ? prev : current, data[0]);

  return (
    <div className="mt-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Live Results</h2>
        <div className="text-lg text-gray-600">
          Total Votes: <span className="font-bold text-blue-600">{totalVotes}</span>
        </div>
        {totalVotes > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            Current Leader: <span className="font-bold text-green-600">{leader.name}</span> 
            {leader.count > 0 && ` (${leader.count} votes)`}
          </div>
        )}
      </div>

      {totalVotes > 0 ? (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                gridLine={{ stroke: '#f3f4f6' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f8fafc', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="count" 
                radius={[8, 8, 0, 0]}
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🗳️</div>
          <p className="text-gray-500 text-lg">No votes cast yet. Be the first to vote!</p>
        </div>
      )}
    </div>
  );
};

export default VoteSummary;
