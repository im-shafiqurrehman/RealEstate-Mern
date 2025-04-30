// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ccf43.firebaseapp.com",
  projectId: "mern-estate-ccf43",
  storageBucket: "mern-estate-ccf43.appspot.com",
  messagingSenderId: "765451884672",
  appId: "1:765451884672:web:1c72f94ba28ba84b09ae65",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);