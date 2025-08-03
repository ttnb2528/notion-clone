import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANtyp-cTzMI_S3reOwO8J0EFC18ypElSc",
  authDomain: "notion-clone-dffaa.firebaseapp.com",
  projectId: "notion-clone-dffaa",
  storageBucket: "notion-clone-dffaa.firebasestorage.app",
  messagingSenderId: "309746734605",
  appId: "1:309746734605:web:5d03f5f7309a9879fc2744",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
