// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEF5bD_Lzmed-y1WmL8U60rwNGage5D-I",
  authDomain: "pleaseworklist.firebaseapp.com",
  projectId: "pleaseworklist",
  storageBucket: "pleaseworklist.appspot.com",
  messagingSenderId: "270348239484",
  appId: "1:270348239484:web:f94fe7206539a62d5cbff9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);