import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkYeShat1ABN68PpPCdpqjU41UH57YBrA",
  authDomain: "dow-development.firebaseapp.com",
  projectId: "dow-development",
  storageBucket: "dow-development.appspot.com",
  messagingSenderId: "646719160270",
  appId: "1:646719160270:web:1bf46a47b633302ede759f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const auth = getAuth(app);
export { app, db };
