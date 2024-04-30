import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMLj8Ks8DJBFm454jH-30fyNjIcDGYxZI",
  authDomain: "car-rental-f084b.firebaseapp.com",
  projectId: "car-rental-f084b",
  storageBucket: "car-rental-f084b.appspot.com",
  messagingSenderId: "958211278565",
  appId: "1:958211278565:web:cfe38d2b4eac23c7f0b60c"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)

export default app