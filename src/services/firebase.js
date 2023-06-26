// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt6EtUY6FOefd55otOyrnmTlk-huGemcY",
  authDomain: "login-c9c53.firebaseapp.com",
  projectId: "login-c9c53",
  storageBucket: "login-c9c53.appspot.com",
  messagingSenderId: "921136854294",
  appId: "1:921136854294:web:c6d145a0790fa8b95e8c37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
