import React, { useState, useContext } from 'react';
import { VoteContext } from '../contexts/VoteContext';

const VoteForm = ({ onClose }) => {
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
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Cast Your Vote</h2>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-gray-500 hover:text-gray-700 ml-3 rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
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