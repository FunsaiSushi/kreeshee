"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/config/firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser, setToken } = useAuthContext();
  const router = useRouter();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      setToken(token);

      console.log(token);

      setCurrentUser(user);
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
