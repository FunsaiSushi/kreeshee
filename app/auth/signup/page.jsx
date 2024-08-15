"use client";

import { useState } from "react";
import {
  sendSignInLinkToEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../lib/firebase"; // Using the auth instance from your firebase.js

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setError("");
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handleBlur = () => {
    if (!validEmail) {
      setError("Please enter a valid email. (e.g. john@example.com )");
    }
  };

  const handleContinue = async () => {
    if (validEmail) {
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          setError("Email already exists. Please login instead.");
        } else {
          // Send Verification Email
          const actionCodeSettings = {
            url: "http://localhost:3000/verifyEmail", // This is the link user will click after verification
            handleCodeInApp: true,
          };
          await sendSignInLinkToEmail(auth, email, actionCodeSettings);
          window.localStorage.setItem("emailForSignIn", email);
          setError("Verification email sent! Please check your email.");
          setIsVerified(true);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlur}
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          onClick={handleContinue}
          disabled={!validEmail}
          className={`w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md transition ${
            validEmail ? "hover:bg-indigo-700" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        {isVerified && (
          <p className="text-green-500 text-center mt-4">
            Please verify your email!
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
