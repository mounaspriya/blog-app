import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_pK0MomLqgURrKcV9jAuF-mOPsMVxA34",
  authDomain: "first-pro-a29d2.firebaseapp.com",
  projectId: "first-pro-a29d2",
  storageBucket: "first-pro-a29d2.appspot.com",
  messagingSenderId: "480279588671",
  appId: "1:480279588671:web:81f1b3f2e57136eefead8a",
  measurementId: "G-0EMDXPC9PS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

const auth = getAuth(app);  // Initialize authentication



export { auth }; 