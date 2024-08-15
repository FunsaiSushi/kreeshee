"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`absolute h-16 ${
          isOpen
            ? "min-h-screen flex-col justify-center backdrop-blur-lg bg-opacity-75"
            : "justify-between"
        } top-0 z-40 flex w-full items-center p-4 bg-primary `}
      >
        {/* logo */}
        <div>
          <Link
            href="/"
            className={` ${
              isOpen ? "hidden" : "text-2xl font-bold text-quaternary mr-2"
            }`}
          >
            kreeshee
          </Link>
        </div>

        {/* navbar */}
        <div
          className={`flex ${
            isOpen ? "flex-col space-y-3 text-xl" : ""
          } justify-end lg:justify-between items-center w-full`}
        >
          {/* left links */}
          <div
            className={`${
              isOpen
                ? "flex flex-col justify-center items-center space-y-3"
                : "hidden"
            } lg:flex`}
          >
            <Link href="/farmers" className="nav-link">
              For Farmers
            </Link>
            <Link href="/retailers" className="nav-link">
              For Retailers
            </Link>
            <Link href="/services" className="nav-link">
              Services
            </Link>
            <Link href="/about" className="nav-link">
              About Us
            </Link>
          </div>
          <div className="flex items-center">
            {/* searchbox */}
            <div className={`${isOpen ? "hidden" : "mr-12"}`}>
              <SearchBox />
            </div>
            <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />

            {/* right links */}
            <div
              className={`${
                isOpen
                  ? "flex flex-col justify-center items-center space-y-3"
                  : "hidden"
              } lg:flex`}
            >
              <button className="nav-link">Language</button>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
              <Link
                href="/auth/login"
                className="nav-link"
                onClick={toggleMenu}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
