"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/auth/lib/contexts/AuthContext";

const useGetUserData = () => {
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  const { token, refreshToken } = useAuthContext();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          await refreshToken();
        }
        const response = await axios.get(`${API_URL}/user/about`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include Firebase Auth token
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }

        setUserData(response.data);
      } catch (error) {
        setUserError(error.message);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, userLoading, userError };
};

export default useGetUserData;
