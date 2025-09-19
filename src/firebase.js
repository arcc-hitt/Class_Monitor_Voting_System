import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.databaseURL && config.projectId && config.appId);

let db = null;
if (isFirebaseConfigured) {
  try {
    const app = initializeApp(config);
    db = getDatabase(app);
  } catch (err) {
    console.warn('Firebase initialization failed:', err);
    db = null;
  }
}

export { db };
