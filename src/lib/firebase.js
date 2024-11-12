// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmySSzL8W-4nCTYteaqVZ0xTMsotmJuhE",
  authDomain: "resell-ticket-4fc39.firebaseapp.com",
  projectId: "resell-ticket-4fc39",
  storageBucket: "resell-ticket-4fc39.firebasestorage.app",
  messagingSenderId: "880234041319",
  appId: "1:880234041319:web:7479dac7014038c8893742",
  measurementId: "G-GVJ29KY8HT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
