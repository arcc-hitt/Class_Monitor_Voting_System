import React from 'react';
import { VoteProvider } from './contexts/VoteContext';
import CandidateList from './components/CandidateList';
import VoteSummary from './components/VoteSummary';
import VoteForm from './components/VoteForm';

export default function App() {
  return (
    <VoteProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Class Monitor Election
            </h1>
            <p className="text-gray-600 text-lg">Make your voice heard!</p>
          </div>

          {/* Main Content */}
          <main className="max-w-6xl mx-auto space-y-8">
            <VoteForm />
            <CandidateList />
            <VoteSummary />
          </main>

          {/* Footer */}
          <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Class Monitor Election - Your vote matters!</p>
          </footer>
        </div>
      </div>
    </VoteProvider>
  );
}
