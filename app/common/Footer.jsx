"use client";

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-quaternary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Kreeshee</h3>
            <p className="text-quaternary">
              Kreeshee is the largest fresh produce marketplace in Bangladesh,
              connecting farmers, traders, and consumers for a seamless buying
              and selling experience.
            </p>
            <p className="text-quaternary">
              &copy; {new Date().getFullYear()} Kreeshee. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-brightLime">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-brightLime">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-brightLime">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-brightLime">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/kreeshee"
                className=" hover:text-brightLime"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://www.twitter.com/kreeshee"
                className=" hover:text-brightLime"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com/kreeshee"
                className=" hover:text-brightLime"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="https://www.instagram.com/kreeshee"
                className=" hover:text-brightLime"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-quaternary mt-8 pt-4 text-center text-sm">
          Built with ♥ by Kreeshee Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;
