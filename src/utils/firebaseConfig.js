import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACjRC4GG2ANgNiX-CkAcvcuvvBzAnpYcM",
  authDomain: "my-codercourse-react.firebaseapp.com",
  projectId: "my-codercourse-react",
  storageBucket: "my-codercourse-react.appspot.com",
  messagingSenderId: "702854577031",
  appId: "1:702854577031:web:7934c163e1439a53373122"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;