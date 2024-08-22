"use client";

import { useState } from "react";

export default function BuyingOptions({ formData, handleInputChange }) {
  // Function to handle the selection of a box
  const handleBoxClick = (value) => {
    handleInputChange({ target: { name: "buyingOptions", value } });
  };

  return (
    <div className="mb-4 w-full">
      <label htmlFor="buyingOptions" className="block font-semibold mb-2">
        Buying Options <span className="text-red-500">*</span>:
      </label>
      <div className="flex justify-between space-x-2 w-full">
        {/* Retail Option */}
        <div
          onClick={() => handleBoxClick("Retail")}
          className={`cursor-pointer w-1/3 border-2 border-primary transition-colors font-medium text-base duration-300 ease-in-out px-4 py-2 text-center rounded-full ${
            formData.buyingOptions === "Retail"
              ? "bg-primary text-white"
              : "bg-quaternary text-black hover:bg-tertiary hover:text-white"
          }`}
        >
          Retail
        </div>

        {/* Wholesale Option */}
        <div
          onClick={() => handleBoxClick("Wholesale")}
          className={`cursor-pointer w-1/3 border-2 border-primary transition-colors font-medium text-base duration-300 ease-in-out py-2 text-center rounded-full ${
            formData.buyingOptions === "Wholesale"
              ? "bg-primary text-white"
              : "bg-quaternary text-black hover:bg-tertiary hover:text-white"
          }`}
        >
          Wholesale
        </div>

        {/* Auction Option */}
        <div
          onClick={() => handleBoxClick("Auction")}
          className={`cursor-pointer w-1/3 border-2 border-primary transition-colors font-medium text-base duration-300 ease-in-out px-4 py-2 text-center rounded-full ${
            formData.buyingOptions === "Auction"
              ? "bg-primary text-white"
              : "bg-quaternary text-black hover:bg-tertiary hover:text-white"
          }`}
        >
          Auction
        </div>
      </div>
    </div>
  );
}
