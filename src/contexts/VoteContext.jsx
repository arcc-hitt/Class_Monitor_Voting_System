import React, { createContext, useState, useEffect } from 'react';

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [votes, setVotes] = useState({
    alice: [],
    bob: [],
    charlie: [],
  });
  const [voters, setVoters] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem('voting-votes') || '{"alice":[],"bob":[],"charlie":[]}');
    const savedVoters = JSON.parse(localStorage.getItem('voting-voters') || '{}');
    setVotes(savedVotes);
    setVoters(savedVoters);
  }, []);

  // Save to localStorage whenever votes or voters change
  useEffect(() => {
    localStorage.setItem('voting-votes', JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem('voting-voters', JSON.stringify(voters));
  }, [voters]);

  const castVote = (candidate, voterName) => {
    if (!voterName || voters[voterName]) return false;
    setVotes(v => ({
      ...v,
      [candidate]: [...v[candidate], voterName],
    }));
    setVoters(v => ({
      ...v,
      [voterName]: candidate,
    }));
    return true;
  };

  return (
    <VoteContext.Provider value={{ votes, voters, castVote }}>
      {children}
    </VoteContext.Provider>
  );
};
