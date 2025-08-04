import React, { useState, useContext } from 'react';
import { VoteContext } from '../contexts/VoteContext';

const VoteForm = () => {
  const { castVote } = useContext(VoteContext);
  const [voterName, setVoterName] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const candidates = [
    { name: 'alice', label: 'Alice' },
    { name: 'bob', label: 'Bob' },
    { name: 'charlie', label: 'Charlie' },
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!voterName.trim()) {
      setError('Please enter your name.');
      setIsSubmitting(false);
      return;
    }
    if (!selectedCandidate) {
      setError('Please select a candidate.');
      setIsSubmitting(false);
      return;
    }

    // Simulate a brief loading state
    await new Promise(resolve => setTimeout(resolve, 500));

    const ok = castVote(selectedCandidate, voterName.trim());
    if (!ok) {
      setError('You have already voted!');
    } else {
      setSuccess('Your vote has been cast successfully! 🎉');
      setVoterName('');
      setSelectedCandidate('');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cast Your Vote</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={voterName}
              onChange={e => setVoterName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Candidate
            </label>
            <select
              value={selectedCandidate}
              onChange={e => setSelectedCandidate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isSubmitting}
            >
              <option value="">-- Choose a candidate --</option>
              {candidates.map(c => (
                <option key={c.name} value={c.name}>{c.label}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Casting Vote...
              </span>
            ) : (
              'Cast Your Vote'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoteForm;