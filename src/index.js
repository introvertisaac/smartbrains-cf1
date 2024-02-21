import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);
