// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}   from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsG45lfZmx3tTUGVTJf5HEahW46usWTg4",
  authDomain: "aitravel-6454b.firebaseapp.com",
  projectId: "aitravel-6454b",
  storageBucket: "aitravel-6454b.firebasestorage.app",
  messagingSenderId: "186076304182",
  appId: "1:186076304182:web:6431bb7a049fc58ae69997",
  measurementId: "G-1GBE3E2JG6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)