// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPNfwdxCd88XBpk1H56_0b9J8XJ8j0EcI",
  authDomain: "ai-trip-planner-ea4db.firebaseapp.com",
  projectId: "ai-trip-planner-ea4db",
  storageBucket: "ai-trip-planner-ea4db.appspot.com",
  messagingSenderId: "66028587696",
  appId: "1:66028587696:web:5f501896971dcb3f980975",
  measurementId: "G-PBXTF5Z2BF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);