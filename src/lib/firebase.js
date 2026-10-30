// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// Initialize Firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy91HRB_Qh5KEpigOQg6FcTz2RoOu_y0M",
  authDomain: "pokemon-5dfc6.firebaseapp.com",
  databaseURL: "https://pokemon-5dfc6-default-rtdb.firebaseio.com",
  projectId: "pokemon-5dfc6",
  storageBucket: "pokemon-5dfc6.firebasestorage.app",
  messagingSenderId: "871489754206",
  appId: "1:871489754206:web:706f940c8f957fa08f90cf",
  measurementId: "G-SVNPR7S470",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth(app);
