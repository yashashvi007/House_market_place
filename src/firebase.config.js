import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBD5aoEcfRkcsdhPxUyjSwL1NpySfrmvbQ",
  authDomain: "housefinder-c18b5.firebaseapp.com",
  projectId: "housefinder-c18b5",
  storageBucket: "housefinder-c18b5.appspot.com",
  messagingSenderId: "274191520116",
  appId: "1:274191520116:web:5a9ea8128800d586975c21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()