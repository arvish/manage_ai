// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {
  getAuth, 
  GoogleAuthProvider,
  signOut,
  signInWithPopup
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu7huYLne0mwETWokOx7ypoxpXQQeg1VM",
  authDomain: "manage-ai.firebaseapp.com",
  projectId: "manage-ai",
  storageBucket: "manage-ai.appspot.com",
  messagingSenderId: "240998848088",
  appId: "1:240998848088:web:eaaaadc464e7a5c8689c2d",
  measurementId: "G-7CB2JH88G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {firestore, auth};