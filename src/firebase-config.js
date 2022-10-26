// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxRbWxhc__7SDKnOUlmqQlq1ZzhmmBk94",
  authDomain: "tracyspinwheel.firebaseapp.com",
  projectId: "tracyspinwheel",
  storageBucket: "tracyspinwheel.appspot.com",
  messagingSenderId: "171677338537",
  appId: "1:171677338537:web:a203c69d20af892bee92b8",
  measurementId: "G-0XWLV1PQZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

