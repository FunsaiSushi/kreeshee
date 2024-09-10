import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { sendPasswordResetEmail } from "firebase/auth";

import useSignUp from "../hooks/useSignUp";
import useLogin from "../hooks/useLogin";
import { useAuthContext } from "../contexts/AuthContext";
import { isValidEmail } from "../utils/emailValidation";
import { auth } from "../../lib/config/firebase";

import "./auth-styles.css";
import Link from "next/link";

const LoginForm = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const { checkEmailUniqueness } = useSignUp();
  const { loading, login } = useLogin();
  const { currentUser } = useAuthContext();

  const [email, setEmail] = useState("");
  const [emailUnique, setEmailUnique] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const [inputFocused, setInputFocused] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signUpMessage, setSignUpMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (currentUser) {
    return null;
  }

  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmailUnique(false);
    setEmail(newEmail);
    setEmailValid(newEmail.trim() === "" || isValidEmail(newEmail));
    setInputFocused(true);
  };

  const handleEmailInputFocus = () => {
    setInputFocused(true);
  };

  const handleEmailInputBlur = () => {
    setInputFocused(false);
    if (email.trim() !== "" && !isValidEmail(email)) {
      setEmailValid(false);
    }
  };

  const handlePasswordInputFocus = () => {
    setPasswordInputFocused(true);
  };

  const handlePasswordInputBlur = () => {
    setPasswordInputFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (!isValidEmail(email)) {
        setEmailValid(false);
        return;
      }
      setSubmitLoading(true);

      if (resetPassword) {
        await handlePasswordReset();
        return;
      }

      // Check mongodb if email exists
      const { isUnique } = await checkEmailUniqueness(email);
      setEmailUnique(isUnique);
      if (!isUnique) {
        setSubmitLoading(false);
        await login(email, password);
        router.push("/");
        return;
      } else {
        setSubmitLoading(false);
        setSignUpMessage(true);
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError("Error sending password reset email. Please try again.");
    }
  };

  return (
    <main className="absolute top-0 flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-col justify-center items-center space-y-4 bg-quaternary p-4 rounded-xl w-full max-w-sm">
        <h2 className="text-3xl text-center">
          {resetPassword ? "Reset Password" : "Login"}
        </h2>

        <form
          className="flex flex-col justify-center items-center w-full space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-2 w-full relative py-6">
            <div className={`user-input w-full relative`}>
              <input
                ref={inputRef}
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={handleEmailInputFocus}
                onBlur={handleEmailInputBlur}
                required
                className={`border-2 ${
                  inputFocused ? "focused focus:border-primary" : ""
                } ${
                  emailValid && !inputFocused
                    ? "border-black"
                    : "border-red-500"
                }`}
              />
              <label
                className={`${
                  email && !inputFocused
                    ? `has-content ${
                        emailValid ? "text-primary" : "text-red-700"
                      }`
                    : ""
                }`}
                htmlFor="email"
              >
                Email
              </label>
            </div>

            {!emailValid && !inputFocused && (
              <div className="absolute bottom-0 right-0 flex justify-end text-red-700 text-sm font-semibold">
                Please enter a valid email.
              </div>
            )}

            {emailUnique && (
              <div className="absolute bottom-0 right-0  flex justify-end text-red-700 text-sm font-semibold">
                Email does not exist. Please sign up.
              </div>
            )}
          </div>

          {!resetPassword && (
            <div className="flex flex-col space-y-2 w-full">
              <div className="user-input w-full relative">
                <input
                  ref={inputRef}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={handlePasswordInputFocus}
                  onBlur={handlePasswordInputBlur}
                  required
                  className={`border-2 ${
                    passwordInputFocused
                      ? "focused focus:border-primary"
                      : "border-black"
                  }`}
                />
                <label
                  className={`${
                    passwordInputFocused
                      ? `has-content text-primary" : ""}`
                      : ""
                  }`}
                  htmlFor="password"
                >
                  Password
                </label>
                <span
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
              {!resetPassword && (
                <button
                  type="button"
                  className="text-primary text-sm font-semibold hover:text-secondary transition duration-300 flex justify-end"
                  onClick={() => {
                    setResetPassword(true);
                    setError(null);
                  }}
                >
                  Forgot Password?
                </button>
              )}
            </div>
          )}

          <div
            className={`relative flex flex-col w-full ${
              resetPassword ? "" : "pt-8"
            }`}
          >
            {error && (
              <div className="absolute top-0 left-0 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}
            <button
              type="submit"
              className={`user-signup-btn text-quaternary font-bold transition-colors duration-300 py-2 w-full rounded-xl ${
                loading ? "bg-neutral-500" : "bg-primary hover:bg-secondary"
              } `}
              disabled={loading}
            >
              {loading
                ? resetPassword
                  ? "Sending email..."
                  : "Logging in..."
                : resetPassword
                ? "Send Reset Email"
                : "Login"}
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            Don't have an account?
          </div>
          <div className="w-full border border-primary rounded-xl flex justify-center items-center py-2 cursor-pointer hover:bg-primary transition-colors duration-300 ease-in-out hover:text-quaternary font-medium text-primary">
            <Link href="/signup"> Sign up </Link>
          </div>
        </form>

        {resetPassword && (
          <button
            type="button"
            className="text-primary hover:text-quaternary hover:bg-primary font-bold border-2 border-primary rounded-full w-full py-2 transition-colors duration-300"
            onClick={() => setResetPassword(false)}
          >
            Back to Login
          </button>
        )}
      </div>
    </main>
  );
};

export default LoginForm;
