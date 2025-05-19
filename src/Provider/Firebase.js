// Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChTg1wn-1CqZGMSjb75SyfR-rQnAAqBvk",
  authDomain: "movie-discovery-app-2d2e2.firebaseapp.com",
  projectId: "movie-discovery-app-2d2e2",
  storageBucket: "movie-discovery-app-2d2e2.appspot.com",
  messagingSenderId: "784876200552",
  appId: "1:784876200552:web:355b7c190cf96c006b91dd",
  measurementId: "G-K128T7855G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
