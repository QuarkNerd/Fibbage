// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCria8fPZ6_UkRSuorsPPIjBDU_cTmrRHQ",
  authDomain: "fibbage-f908b.firebaseapp.com",
  projectId: "fibbage-f908b",
  storageBucket: "fibbage-f908b.appspot.com",
  messagingSenderId: "329325629594",
  appId: "1:329325629594:web:578a3f1c825ce1adaa4f23",
  measurementId: "G-ZC4WQCH1HJ"
};

// Initialize Firebase
export const firebassApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebassApp);
// const analytics = getAnalytics(app);