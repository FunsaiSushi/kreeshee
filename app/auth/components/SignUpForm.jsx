"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle, FaApple } from "react-icons/fa";

import {
  auth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "../../lib/config/firebase";
import { isValidEmail } from "../lib/utils/emailValidation";
import useSignUp from "../lib/hooks/useSignUp";
import { useAuthContext } from "../lib/contexts/AuthContext";
import "./auth-styles.css";

const SignUpForm = ({ onEmailUnique, onUnverifiedEmail }) => {
  const { checkEmailUniqueness, checkUserInFirebase } = useSignUp();
  const router = useRouter();
  const inputRef = useRef(null);
  const { currentUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailUnique, setEmailUnique] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (currentUser?.displayName) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (currentUser?.displayName) {
    return null;
  }

  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmailUnique(true);
    setEmail(newEmail);
    setEmailValid(newEmail.trim() === "" || isValidEmail(newEmail));
    setInputFocused(true);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
    if (email.trim() !== "" && !isValidEmail(email)) {
      setEmailValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the email is valid
      if (!isValidEmail(email)) {
        setEmailValid(false);
        return;
      }
      setLoading(true);

      // Check mongodb if email exists
      const { isUnique } = await checkEmailUniqueness(email);
      setEmailUnique(isUnique);
      if (!isUnique) {
        setLoading(false);
        return;
      } else {
        // Check Firebase if email exists
        const { user, exists } = await checkUserInFirebase(email);

        if (exists) {
          if (!user.emailVerified) {
            onUnverifiedEmail(email);
            setLoading(false);
            return;
          } else {
            const tempPassword = localStorage.getItem("tempPassword");

            if (!tempPassword) {
              console.error("Temporary password not found.");
              setLoading(false);
              return;
            }

            const credential = EmailAuthProvider.credential(
              user.email,
              tempPassword // Use the temp password here
            );

            // Re-authenticate the user
            await reauthenticateWithCredential(auth.currentUser, credential);

            router.push("/auth/signup/create-account");
          }
        } else {
          onEmailUnique(email);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-2 w-full">
      <button className="auth-provider-btn">
        <FaGoogle size={24} />
        <div className="text-center text-lg">Continue with Google</div>
      </button>
      <button className="auth-provider-btn">
        <FaApple size={26} />
        <div className="text-center text-lg">Continue with Apple</div>
      </button>
      <div>or</div>
      <form
        className="flex flex-col justify-center items-center w-full space-y-2"
        onSubmit={handleSubmit}
      >
        <div className={`user-input w-full relative`}>
          <input
            ref={inputRef}
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            required
            className={`border-2 ${
              inputFocused ? "focused focus:border-primary" : ""
            } ${
              emailValid && !inputFocused ? "border-black" : "border-red-500"
            }`}
          />

          <label
            className={`${
              email && !inputFocused
                ? `has-content ${emailValid ? "text-primary" : "text-red-700"}`
                : ""
            }`}
            htmlFor="email"
          >
            Email
          </label>
        </div>

        <div className="w-full relative pt-8">
          {!emailValid && !inputFocused && (
            <div className="absolute top-0 left-0 w-full text-red-700 text-sm font-semibold">
              Please enter a valid email.
            </div>
          )}

          {!emailUnique && (
            <div className=" text-red-700 text-sm font-semibold">
              Email already exists.
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-2 ${
              emailValid ? "bg-primary hover:bg-secondary" : "bg-neutral-500"
            } transition duration-300 ease-in-out text-white text-lg font-normal rounded-full focus:outline-none`}
            disabled={!emailValid || loading}
          >
            {loading ? (
              <span className="w-5 h-5 mr-3 border-b-2 border-neutral-800 rounded-full animate-spin"></span>
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>

      <div className="flex text-xs right-0">
        <Link
          href="/privacy"
          className="hover:text-secondary font-bold text-primary mr-4 transition duration-300"
        >
          Privacy
        </Link>
        <div>•</div>
        <Link
          href="/terms"
          className="hover:text-secondary font-bold text-primary ml-4 transition duration-300"
        >
          Terms
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
