// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByRDKEemZ73Qub_RAArnip3gdfKpgr6ps",
  authDomain: "marine-clarity-382308.firebaseapp.com",
  projectId: "marine-clarity-382308",
  storageBucket: "marine-clarity-382308.firebasestorage.app",
  messagingSenderId: "715891667616",
  appId: "1:715891667616:web:a48d754dcfa74ee5104fc5",
  measurementId: "G-1N29FSMD6Y",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
