import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAujy6YF8emT7K8xPvb9dfsrVzH5AyWVXY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "travel-c763e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "travel-c763e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "travel-c763e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1038869800685",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1038869800685:web:2ec734197b99f449c50ee4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;

