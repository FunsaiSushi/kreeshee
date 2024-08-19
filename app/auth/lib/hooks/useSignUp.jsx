"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  updatePassword,
  updateProfile,
} from "../../../lib/config/firebase";
// import { generateTempPassword } from "../utils/generateTempPassword";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const checkEmailUniqueness = async (email) => {
    try {
      const res = await axios.post(`${API_URL}/auth/check-mongo-user`, {
        email,
      });
      return { isUnique: res.data.isUnique, email };
    } catch (error) {
      console.error("Error checking email uniqueness", error);
    }
  };

  const checkUserInFirebase = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/check-firebase-user`, {
        email,
      });

      return response.data; // { exists, user }
    } catch (error) {
      console.error("Error checking user in Firebase:", error);
    }
  };

  const completeSignUp = async ({ name, password }) => {
    setLoading(true);
    try {
      const user = auth.currentUser;

      // Update the password and profile
      await updatePassword(user, password);
      await updateProfile(user, {
        displayName: name,
      });

      // Call your backend API to create a user record in MongoDB
      await axios.post(`${API_URL}/auth/create-user`, {
        name,
        email: user.email,
        password,
        firebaseUid: user.uid,
      });

      setCurrentUser({
        ...user,
        displayName: name,
      });

      // Redirect to the homepage
      router.push("/");
    } catch (error) {
      console.error("Error finalizing sign up:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    checkEmailUniqueness,
    checkUserInFirebase,
    completeSignUp,
  };
};

export default useSignUp;
