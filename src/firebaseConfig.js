// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPu-...",
  authDomain: "ocr-struk-app.firebaseapp.com",
  projectId: "ocr-struk-app",
  storageBucket: "ocr-struk-app.appspot.com",
  messagingSenderId: "519860426878",
  appId: "1:519860426878:web:....",
  measurementId: "G-..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Tambahkan export ini!
export { db };
