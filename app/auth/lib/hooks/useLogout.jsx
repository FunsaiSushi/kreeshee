import { useState } from "react";
import { auth, signOut } from "../../../lib/config/firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogOut;
