// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWDyMpGawnIetBU1hiOP3HAkvGkIDeBD8",
  authDomain: "runitapp-dbf8e.firebaseapp.com",
  projectId: "runitapp-dbf8e",
  storageBucket: "runitapp-dbf8e.appspot.com",
  messagingSenderId: "810260372115",
  appId: "1:810260372115:web:2693cfeb60975229680b66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const Firestore = getFirestore(app);
export const storage = getStorage(app);

// export { auth, app, Firestore };
