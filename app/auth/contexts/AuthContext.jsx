// app/contexts/AuthContext.js

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
} from "../../lib/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshToken = async () => {
    if (currentUser) {
      const token = await currentUser.getIdToken(true);
      setToken(token);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      setCurrentUser(user);
      setToken(token);
      router.push("/"); // Redirect to homepage or desired route
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      setToken(null);
      router.push("/auth/signin"); // Redirect to sign-in page
    } catch (error) {
      console.error("Sign Out Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    token,
    loading,
    refreshToken,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
