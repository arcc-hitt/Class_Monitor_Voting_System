import React, { createContext, useState } from 'react';

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [votes, setVotes] = useState({
    alice: [],
    bob: [],
    charlie: [],
  });
  const [voters, setVoters] = useState({}); // { voterName: candidate }

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
