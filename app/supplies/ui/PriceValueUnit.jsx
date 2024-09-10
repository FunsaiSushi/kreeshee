"use client";

import { useState } from "react";
import "../../auth/ui/auth-styles.css";

export default function PriceValueUnit({ formData, handleInputChange }) {
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <>
      {formData.buyingOptions === "Retail" && (
        <div className="flex w-full space-x-4">
          <div className="user-input   relative w-full">
            <input
              type="text"
              id="retailPriceValue"
              name="retailPriceValue"
              value={formData.retailPriceValue}
              onChange={handleInputChange}
              onFocus={() => handleFocus("retailPriceValue")}
              onBlur={handleBlur}
              required
              className={`w-full border-2 px-2 py-1 rounded-full text-base border-black transition ease-in-out duration-300 ${
                focusedField === "retailPriceValue"
                  ? "focus:border-primary"
                  : ""
              }`}
            />
            <label
              htmlFor="retailPriceValue"
              className={`absolute top-1/2 left-5 transform -translate-y-1/2 text-base pointer-events-none transition-all ease-in-out duration-300 ${
                formData.retailPriceValue || focusedField === "retailPriceValue"
                  ? "has-content text-primary"
                  : "text-black"
              }`}
            >
              Retail Price Value <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="user-input   relative w-full">
            <input
              type="text"
              id="retailPriceUnit"
              name="retailPriceUnit"
              value={formData.retailPriceUnit}
              onChange={handleInputChange}
              onFocus={() => handleFocus("retailPriceUnit")}
              onBlur={handleBlur}
              required
              className={`w-full border-2 px-2 py-1 rounded-full text-base border-black transition ease-in-out duration-300 ${
                focusedField === "retailPriceUnit" ? "focus:border-primary" : ""
              }`}
            />
            <label
              htmlFor="retailPriceUnit"
              className={`absolute top-1/2 left-5 transform -translate-y-1/2 text-base pointer-events-none transition-all ease-in-out duration-300 ${
                formData.retailPriceUnit || focusedField === "retailPriceUnit"
                  ? "has-content text-primary"
                  : "text-black"
              }`}
            >
              Retail Price Unit <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
      )}

      {formData.buyingOptions === "Wholesale" && (
        <div className="flex w-full space-x-4">
          <div className="user-input   relative w-full">
            <input
              type="text"
              id="wholesalePriceValue"
              name="wholesalePriceValue"
              value={formData.wholesalePriceValue}
              onChange={handleInputChange}
              onFocus={() => handleFocus("wholesalePriceValue")}
              onBlur={handleBlur}
              required
              className={`w-full border-2 px-2 py-1 rounded-full text-base border-black transition ease-in-out duration-300 ${
                focusedField === "wholesalePriceValue"
                  ? "focus:border-primary"
                  : ""
              }`}
            />
            <label
              htmlFor="wholesalePriceValue"
              className={`absolute top-1/2 left-5 transform -translate-y-1/2 text-base pointer-events-none transition-all ease-in-out duration-300 ${
                formData.wholesalePriceValue ||
                focusedField === "wholesalePriceValue"
                  ? "has-content text-primary"
                  : "text-black"
              }`}
            >
              Wholesale Price Value <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="user-input   relative w-full">
            <input
              type="text"
              id="wholesalePriceUnit"
              name="wholesalePriceUnit"
              value={formData.wholesalePriceUnit}
              onChange={handleInputChange}
              onFocus={() => handleFocus("wholesalePriceUnit")}
              onBlur={handleBlur}
              required
              className={`w-full border-2 px-2 py-1 rounded-full text-base border-black transition ease-in-out duration-300 ${
                focusedField === "wholesalePriceUnit"
                  ? "focus:border-primary"
                  : ""
              }`}
            />
            <label
              htmlFor="wholesalePriceUnit"
              className={`absolute top-1/2 left-5 transform -translate-y-1/2 text-base pointer-events-none transition-all ease-in-out duration-300 ${
                formData.wholesalePriceUnit ||
                focusedField === "wholesalePriceUnit"
                  ? "has-content text-primary"
                  : "text-black"
              }`}
            >
              Wholesale Price Unit <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
      )}

      {formData.buyingOptions === "Auction" && (
        <div className="flex w-full space-x-4">
          <div className="user-input   relative w-full">
            <input
              type="text"
              id="minBidPrice"
              name="minBidPrice"
              value={formData.minBidPrice}
              onChange={handleInputChange}
              onFocus={() => handleFocus("minBidPrice")}
              onBlur={handleBlur}
              required
              className={`w-full border-2 px-2 py-1 rounded-full text-base border-black transition ease-in-out duration-300 ${
                focusedField === "minBidPrice" ? "focus:border-primary" : ""
              }`}
            />
            <label
              htmlFor="minBidPrice"
              className={`absolute top-1/2 left-5 transform -translate-y-1/2 text-base pointer-events-none transition-all ease-in-out duration-300 ${
                formData.minBidPrice || focusedField === "minBidPrice"
                  ? "has-content text-primary"
                  : "text-black"
              }`}
            >
              Minimum Bid Price <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="user-input   relative w-full">
            <input
              type="text"
              id="bidUnit"
              name="bidUnit"
              value={formData.bidUnit}
              onChange={handleInputChange}
              onFocus={() => handleFocus("bidUnit")}
              onBlur={handleBlur}
              required
              className={`w-full border-2 px-2 py-1 rounded-full text-base border-black transition ease-in-out duration-300 ${
                focusedField === "bidUnit" ? "focus:border-primary" : ""
              }`}
            />
            <label
              htmlFor="bidUnit"
              className={`absolute top-1/2 left-5 transform -translate-y-1/2 text-base pointer-events-none transition-all ease-in-out duration-300 ${
                formData.bidUnit || focusedField === "bidUnit"
                  ? "has-content text-primary"
                  : "text-black"
              }`}
            >
              Minimum Bid Unit <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
      )}
    </>
  );
}
