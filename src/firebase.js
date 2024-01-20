// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwmUb_BE9QaXxba_dnGBBrKYo9govK9dk",
  authDomain: "tariquk-437fa.firebaseapp.com",
  projectId: "tariquk-437fa",
  storageBucket: "tariquk-437fa.appspot.com",
  messagingSenderId: "7552291294",
  appId: "1:7552291294:web:b3f3217de88888f76b4d4f",
  measurementId: "G-F239NCKJZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {auth};