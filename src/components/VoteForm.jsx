import React, { useState, useContext } from 'react';
import { VoteContext } from '../contexts/VoteContext';

const candidates = [
  { name: 'alice', label: 'Alice' },
  { name: 'bob', label: 'Bob' },
  { name: 'charlie', label: 'Charlie' },
];

export default function VoteForm() {
  const { castVote } = useContext(VoteContext);
  const [voterName, setVoterName] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!voterName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!selectedCandidate) {
      setError('Please select a candidate.');
      return;
    }
    const ok = castVote(selectedCandidate, voterName.trim());
    if (!ok) {
      setError('You have already voted!');
    } else {
      setSuccess('Your vote has been cast!');
      setVoterName('');
      setSelectedCandidate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 max-w-md mx-auto bg-white p-4 rounded-xl shadow">
      <div className="mb-2">
        <label className="block font-semibold mb-1">Your Name</label>
        <input
          type="text"
          value={voterName}
          onChange={e => setVoterName(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold mb-1">Select Candidate</label>
        <select
          value={selectedCandidate}
          onChange={e => setSelectedCandidate(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="">-- Select --</option>
          {candidates.map(c => (
            <option key={c.name} value={c.name}>{c.label}</option>
          ))}
        </select>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <button
        type="submit"
        className="mt-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white w-full"
      >
        Vote
      </button>
    </form>
  );
}