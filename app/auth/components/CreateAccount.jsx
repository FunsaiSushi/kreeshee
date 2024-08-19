"use client";

import { useState, useRef } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import "./auth-styles.css";
import useSignUp from "../lib/hooks/useSignUp";
// import { isValidPassword } from "../utils/passwordValidation";

export default function CreateAccount() {
  const { completeSignUp } = useSignUp();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameInputFocused, setNameInputFocused] = useState(false);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);
  const inputRef = useRef(null);

  // const [passwordValid, setPasswordValid] = useState(true);
  const handleNameInputFocus = () => {
    setNameInputFocused(true);
  };

  const handleNameInputBlur = () => {
    setNameInputFocused(false);
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // setPasswordValid(isValidPassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await completeSignUp({ name, password });
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 w-full min-h-screen flex justify-center items-center">
      <div className="w-80 space-y-6 bg-quaternary p-6 rounded-3xl">
        <h2 className="text-3xl text-center">Create account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="user-input w-full relative">
            <input
              ref={inputRef}
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              onFocus={handleNameInputFocus}
              onBlur={handleNameInputBlur}
              required
              className={`border-2 ${
                nameInputFocused
                  ? "focused focus:border-primary"
                  : "border-black"
              }`}
            />
            <label
              className={`${
                name && !nameInputFocused
                  ? `has-content text-primary" : ""}`
                  : ""
              }`}
              htmlFor="name"
            >
              Name
            </label>
          </div>

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
                passwordInputFocused ? `has-content text-primary" : ""}` : ""
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
          {/* {!passwordValid && (
            <div className="text-red-500 text-sm mt-2">
              Password must contain at least 8 characters, including uppercase,
              lowercase, numbers, and special characters.
            </div>
          )} */}
          <button
            type="submit"
            className={`py-2 w-full rounded-full bg-primary hover:bg-secondary text-quaternary font-bold`}
            // ${passwordValid ? "bg-primary hover:bg-cyan-300" : "bg-neutral-500"}
            // !passwordValid ||
            disabled={loading} // Disable button if password is not valid or form is loading
          >
            {loading ? "Signing up..." : "Join Kreeshee"}
          </button>
        </form>
      </div>
    </div>
  );
}
