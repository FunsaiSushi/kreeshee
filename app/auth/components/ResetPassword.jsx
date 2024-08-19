import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../../../../firebase"; // Adjust the import path as necessary

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const oobCode = params.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid or missing OOB code");
    } else {
      console.log("oobCode:", oobCode);
    }
  }, [oobCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error
    try {
      // Verify the password reset code
      const email = await verifyPasswordResetCode(auth, oobCode);
      console.log("Verified email:", email);

      // Confirm the password reset with Firebase
      await confirmPasswordReset(auth, oobCode, newPassword);
      console.log("Password reset confirmed with Firebase");

      await signInWithEmailAndPassword(auth, email, newPassword);
      const user = auth.currentUser;
      console.log("User signed in:", user);

      const token = await user.getIdToken();

      await axios.post(
        "/api/auth/update-password",
        { email, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after a delay
    } catch (error) {
      console.error("Error updating password:", error.message);
      setError("Error updating password. Please try again.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {success ? (
        <p>Password updated successfully. Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Update Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
