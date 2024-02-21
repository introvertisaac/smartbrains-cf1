// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv87RPPpxHjpietyTB7HqWdusXzcARwVQ",
  authDomain: "smartbrains-codepen.firebaseapp.com",
  databaseURL: "https://smartbrains-codepen-default-rtdb.firebaseio.com",
  projectId: "smartbrains-codepen",
  storageBucket: "smartbrains-codepen.appspot.com",
  messagingSenderId: "652511215753",
  appId: "1:652511215753:web:38d0459cd7c2625b99c658",
  measurementId: "G-Y6TDT28ZNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);