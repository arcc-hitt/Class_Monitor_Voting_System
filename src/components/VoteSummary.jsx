import React, { useContext } from 'react';
import { VoteContext } from '../contexts/VoteContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function VoteSummary() {
  const { votes } = useContext(VoteContext);
  const data = Object.entries(votes).map(([name, voters]) => ({
    name,
    count: voters.length,
  }));

  return (
    <div className="mt-8 bg-gray-50 p-4 rounded-xl shadow-inner">
      <h2 className="text-2xl font-bold mb-4 text-center">Current Standings</h2>
      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
}
