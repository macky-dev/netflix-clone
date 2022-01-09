import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-698f0.firebaseapp.com",
  projectId: "netflix-clone-698f0",
  storageBucket: "netflix-clone-698f0.appspot.com",
  messagingSenderId: "88328538968",
  appId: "1:88328538968:web:94788af54bbe9fce06732d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth();

export default db;
