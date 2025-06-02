
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ccf43.firebaseapp.com",
  projectId: "mern-estate-ccf43",
  storageBucket: "mern-estate-ccf43.appspot.com",
  messagingSenderId: "765451884672",
  appId: "1:765451884672:web:1c72f94ba28ba84b09ae65",
  database: "https://mern-estate-ccf43-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);