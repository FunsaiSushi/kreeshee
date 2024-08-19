import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  // GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4xfwVOt7U-4rWlzkPLqEGvtxlFSLWwoM",
  authDomain: "project-kreeshee.firebaseapp.com",
  projectId: "project-kreeshee",
  storageBucket: "project-kreeshee.appspot.com",
  messagingSenderId: "785787413189",
  appId: "1:785787413189:web:86719bb3caf4ab880446ac",
  measurementId: "G-RYJF129FSW",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);

// Initialize Analytics and other services conditionally
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
// const analytics = getAnalytics(app);

const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

export {
  analytics,
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
};
