"use client";

import React from "react";

export default function HamburgerMenu({ isOpen, toggleMenu }) {
  return (
    <button
      onClick={toggleMenu}
      className="absolute top-5 right-4 z-50 flex flex-col lg:hidden justify-center items-center w-7 h-6 space-y-1"
    >
      <span
        className={`block rounded-full h-1 w-full bg-quaternary transform transition duration-300 ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`block rounded-full h-1 w-full bg-quaternary transform transition duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`block rounded-full h-1 w-full bg-quaternary transform transition duration-300 ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </button>
  );
}
