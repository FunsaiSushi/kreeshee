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
        Buying Options
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

      {/* Conditionally Render Additional Fields Based on Selection */}
      {formData.buyingOptions === "Retail" && (
        <div className="mt-4">
          <label htmlFor="retailPriceValue" className="block mb-2">
            Retail Price Value
          </label>
          <input
            type="text"
            name="retailPriceValue"
            value={formData.retailPriceValue}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter retail price value"
          />
          <label htmlFor="retailPriceUnit" className="block mt-2 mb-2">
            Retail Price Unit
          </label>
          <input
            type="text"
            name="retailPriceUnit"
            value={formData.retailPriceUnit}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter retail price unit"
          />
        </div>
      )}

      {formData.buyingOptions === "Wholesale" && (
        <div className="mt-4">
          <label htmlFor="wholesalePriceValue" className="block mb-2">
            Wholesale Price Value
          </label>
          <input
            type="text"
            name="wholesalePriceValue"
            value={formData.wholesalePriceValue}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter wholesale price value"
          />
          <label htmlFor="wholesalePriceUnit" className="block mt-2 mb-2">
            Wholesale Price Unit
          </label>
          <input
            type="text"
            name="wholesalePriceUnit"
            value={formData.wholesalePriceUnit}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter wholesale price unit"
          />
        </div>
      )}

      {formData.buyingOptions === "Auction" && (
        <div className="mt-4">
          <label htmlFor="minBidPrice" className="block mb-2">
            Minimum Bid Price
          </label>
          <input
            type="text"
            name="minBidPrice"
            value={formData.minBidPrice}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter minimum bid price"
          />
          <label htmlFor="bidUnit" className="block mt-2 mb-2">
            Bid Unit
          </label>
          <input
            type="text"
            name="bidUnit"
            value={formData.bidUnit}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter bid unit"
          />
        </div>
      )}
    </div>
  );
}
