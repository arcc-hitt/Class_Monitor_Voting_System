import React, { createContext, useState, useEffect, useRef } from 'react';
import { db, isFirebaseConfigured } from '../firebase';
import { ref, onValue, set } from 'firebase/database';

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
    // Read local saved data first
    const savedVotes = JSON.parse(localStorage.getItem('voting-votes') || '{"alice":[],"bob":[],"charlie":[]}');
    const savedVoters = JSON.parse(localStorage.getItem('voting-voters') || '{}');

    // If firebase is configured, listen to realtime DB and merge with localStorage as fallback
    if (isFirebaseConfigured && db) {
      const votesRef = ref(db, 'votes');
      const votersRef = ref(db, 'voters');

      const unsubscribeVotes = onValue(votesRef, snapshot => {
        const val = snapshot.val();
        if (val) {
          // Normalize stored candidate lists to arrays (Firebase may return objects for arrays)
          const normalized = {};
          for (const k of Object.keys(val)) {
            const entry = val[k];
            if (Array.isArray(entry)) normalized[k] = entry;
            else if (entry && typeof entry === 'object') normalized[k] = Object.values(entry);
            else normalized[k] = [];
          }
          if (!normalized.alice) normalized.alice = [];
          if (!normalized.bob) normalized.bob = [];
          if (!normalized.charlie) normalized.charlie = [];
          setVotes(normalized);
            initialSyncRef.current = true;
        } else {
          // If Firebase has no data but we have local data, push local data to Firebase and use it
          if (savedVotes) {
            try {
              set(ref(db, 'votes'), savedVotes);
            } catch (err) {
              console.warn('Failed to initialize votes in Firebase:', err);
            }
            setVotes(savedVotes);
          }
        }
      });

      const unsubscribeVoters = onValue(votersRef, snapshot => {
        const val = snapshot.val();
        if (val) setVoters(val);
        else if (savedVoters) {
          try {
            set(ref(db, 'voters'), savedVoters);
          } catch (err) {
            console.warn('Failed to initialize voters in Firebase:', err);
          }
          setVoters(savedVoters);
            initialSyncRef.current = true;
        }
      });

      return () => {
        try {
          unsubscribeVotes();
        } catch (e) {}
        try {
          unsubscribeVoters();
        } catch (e) {}
      };
    }

    // fallback: load data from localStorage on mount
    setVotes(savedVotes);
    setVoters(savedVoters);
  }, []);

  // Save to localStorage whenever votes or voters change
  // Track whether we've completed the initial sync (to avoid overwriting remote data with initial empty state)
  const initialSyncRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('voting-votes', JSON.stringify(votes));
    if (isFirebaseConfigured && db && initialSyncRef.current) {
      try {
        set(ref(db, 'votes'), votes);
      } catch (err) {
        console.warn('Failed to write votes to Firebase:', err);
      }
    }
    // If initial sync hasn't completed yet but we are running in non-firebase mode, nothing else to do
  }, [votes]);

  useEffect(() => {
    localStorage.setItem('voting-voters', JSON.stringify(voters));
    if (isFirebaseConfigured && db && initialSyncRef.current) {
      try {
        set(ref(db, 'voters'), voters);
      } catch (err) {
        console.warn('Failed to write voters to Firebase:', err);
      }
    }
  }, [voters]);

  const castVote = (candidate, voterName) => {
    if (!voterName || voters[voterName]) return false;
    setVotes(v => {
      const current = v && Array.isArray(v[candidate]) ? v[candidate] : [];
      return {
        ...v,
        [candidate]: [...current, voterName],
      };
    });
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
