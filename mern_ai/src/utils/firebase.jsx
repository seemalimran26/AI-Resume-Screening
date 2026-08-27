import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4zhwOW6Zu0WW8J4KcvFOhvn17BEE8YwM",
  authDomain: "mernai-66a40.firebaseapp.com",
  projectId: "mernai-66a40",
  storageBucket: "mernai-66a40.firebasestorage.app",
  messagingSenderId: "325025369777",
  appId: "1:325025369777:web:e9547c2932374371eadc90",
  measurementId: "G-1KX2C2V9Z9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
