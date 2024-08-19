"use client";

import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "../../lib/config/firebase";
import { generateTempPassword } from "../lib/utils/generateTempPassword";
import Link from "next/link";

const page = () => {
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const handleEmailUnique = async (uniqueEmail) => {
    try {
      const randomPassword = generateTempPassword();
      localStorage.setItem("tempPassword", randomPassword);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        uniqueEmail,
        randomPassword
      );
      const user = userCredential.user;
      await sendEmailVerification(user, {
        url: `${window.location.origin}/auth/signup/create-account`,
      });
      setShowVerificationMessage(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  const handleUnverifiedEmail = () => {
    setShowVerificationMessage(true);
  };

  return (
    <div className="absolute top-0 flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col max-w-sm lg:max-w-xl space-y-2 bg-quaternary p-5 rounded-3xl">
        {showVerificationMessage ? (
          <div className="text-center text-black text-xl">
            A verification email has been sent to your email, please verify to
            continue.
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center ">
            <SignUpForm
              onEmailUnique={handleEmailUnique}
              onUnverifiedEmail={handleUnverifiedEmail}
            />

            <div className="font-semibold pt-10">Already have an account?</div>

            <Link
              href="/auth/login"
              className="w-full flex justify-center items-center py-2 rounded-full text-lg text-primary font-bold border-2 border-primary hover:bg-primary hover:text-quaternary transition duration-300 ease-in-out"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
