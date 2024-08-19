"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../../lib/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

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

    return unsubscribe;
  }, []);

  const refreshToken = async () => {
    if (currentUser) {
      const token = await currentUser.getIdToken(true);
      setToken(token);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, token, refreshToken }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
