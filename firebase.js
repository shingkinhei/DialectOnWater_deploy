import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY.replace(/\n/g，'\n'),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN.replace(/\n/g，'\n'),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID.replace(/\n/g，'\n'),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET.replace(/\n/g，'\n'),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID.replace(/\n/g，'\n'),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID.replace(/\n/g，'\n'),
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const firebaseApp = initializeApp(firebaseConfig);



export default firebaseApp;
export const auth = getAuth(app);
export { app, db };


