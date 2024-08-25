"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMail } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { useAuthContext } from "../auth/contexts/AuthContext"; // Import the context
import SearchBox from "./SearchBox";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuthContext(); // Get the current user
  const router = useRouter(); // Use the router hook to get the current route
  const pathname = usePathname(); // Get the current pathname

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle scrolling to the Services section
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
      if (isOpen) {
        toggleMenu();
      }
    }
  };

  return (
    <nav
      className={`top-0 h-16 ${
        isOpen
          ? "fixed container mx-auto min-h-screen flex-col justify-center backdrop-blur-xl bg-opacity-75 bg-primary"
          : "sticky justify-between"
      } z-40 flex w-full items-center p-4 bg-primary `}
      style={isOpen ? { top: 0 } : {}}
    >
      {/* logo */}
      <div>
        <Link
          href="/"
          className={` ${
            isOpen ? "hidden" : "text-2xl font-bold text-quaternary mr-2"
          }`}
        >
          Kreeshee
        </Link>
      </div>

      {/* navbar */}
      <div
        className={`flex ${
          isOpen ? "flex-col space-y-3 text-xl" : ""
        } justify-end xl:justify-between items-center w-full`}
      >
        {/* left links */}
        <div
          className={`${
            isOpen
              ? "flex flex-col justify-center items-center space-y-3"
              : "hidden"
          } xl:flex xl:space-x-2`}
        >
          <Link
            href="/farmers"
            className="nav-link"
            onClick={() => {
              if (isOpen) {
                toggleMenu();
              }
            }}
          >
            For Farmers
          </Link>
          <Link
            href="/retailers"
            className="nav-link"
            onClick={() => {
              if (isOpen) {
                toggleMenu();
              }
            }}
          >
            For Retailers
          </Link>
          {/* Conditionally render either a button or a Link */}
          {pathname === "/" ? (
            <button className="nav-link" onClick={scrollToServices}>
              Services
            </button>
          ) : (
            <Link
              href="/#services-section"
              className="nav-link"
              onClick={() => {
                if (isOpen) {
                  toggleMenu();
                }
              }}
            >
              Services
            </Link>
          )}
          <Link
            href="/about-kreeshee"
            className="nav-link"
            onClick={() => {
              if (isOpen) {
                toggleMenu();
              }
            }}
          >
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
            } xl:flex xl:space-x-2`}
          >
            <button className="nav-link flex justify-center items-center space-x-2">
              <GrLanguage />
              <div>English</div>
            </button>
            <Link
              href="/contact"
              className="nav-link flex justify-center items-center space-x-2"
              onClick={() => {
                if (isOpen) {
                  toggleMenu();
                }
              }}
            >
              <IoMail />
              <div>Contact</div>
            </Link>

            {/* Conditionally render Login or Profile link */}
            {currentUser?.displayName ? (
              <Link
                href="/profile"
                className="nav-link flex justify-center items-center space-x-2"
                onClick={() => {
                  if (isOpen) {
                    toggleMenu();
                  }
                }}
              >
                <MdAccountCircle />
                <div>{currentUser.displayName}</div>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="nav-link flex justify-center items-center space-x-2"
                onClick={() => {
                  if (isOpen) {
                    toggleMenu();
                  }
                }}
              >
                <MdAccountCircle />
                <div>Login</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
