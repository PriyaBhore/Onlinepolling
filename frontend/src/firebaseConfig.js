// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCzv4do6cwaLWYKnPqTAzV3886kmd4-W20",
    authDomain: "onlinepollingsystem-6987e.firebaseapp.com",
    projectId: "onlinepollingsystem-6987e",
    storageBucket: "onlinepollingsystem-6987e.appspot.com",
    messagingSenderId: "603635695686",
    appId: "1:603635695686:web:13213662490b04d87c4a47"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
