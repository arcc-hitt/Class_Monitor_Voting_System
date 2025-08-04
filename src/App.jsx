import React from 'react';
import { VoteProvider } from './contexts/VoteContext';
// import Header from './components/Header';
import CandidateList from './components/CandidateList';
import VoteSummary from './components/VoteSummary';
import VoteForm from './components/VoteForm';
// import Footer from './components/Footer';

export default function App() {
  return (
    <VoteProvider>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
        {/* <Header title="Class Monitor Election 2025" /> */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <VoteForm />
          <CandidateList />
          <VoteSummary />
        </main>
        {/* <Footer /> */}
      </div>
    </VoteProvider>
  );
}
