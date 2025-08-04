import React, { createContext, useState } from 'react';

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [votes, setVotes] = useState({
    alice: 0,
    bob: 0,
    charlie: 0,
  });
  const [hasVoted, setHasVoted] = useState(false);

  const castVote = candidate => {
    if (hasVoted) return false;
    setVotes(v => ({ ...v, [candidate]: v[candidate] + 1 }));
    setHasVoted(true);
    return true;
  };

  return (
    <VoteContext.Provider value={{ votes, hasVoted, castVote }}>
      {children}
    </VoteContext.Provider>
  );
};
