// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJIpP5UYf6WclCmVLZT1wz0kWi1QVaPdU",
  authDomain: "mobilesignin-c552f.firebaseapp.com",
  projectId: "mobilesignin-c552f",
  storageBucket: "mobilesignin-c552f.appspot.com",
  messagingSenderId: "238442760944",
  appId: "1:238442760944:web:01b1b580925672ef445035",
  measurementId: "G-590GFWPCHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);