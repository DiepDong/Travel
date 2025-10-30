import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAujy6YF8emT7K8xPvb9dfsrVzH5AyWVXY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "travel-c763e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "travel-c763e",
  // NOTE: Firebase Storage bucket must end with .appspot.com
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "travel-c763e.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1038869800685",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1038869800685:web:2ec734197b99f449c50ee4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;

