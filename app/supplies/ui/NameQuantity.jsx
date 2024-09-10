"use client";

import { useState } from "react";
import "../../auth/ui/auth-styles.css";

export default function NameQuantity({ formData, handleInputChange }) {
  // State to track focus for each input
  const [focusedField, setFocusedField] = useState(null);

  // Handle focus event
  const handleFocus = (field) => {
    setFocusedField(field);
  };

  // Handle blur event
  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <>
      {/* Product Name */}
      <div className="user-input mb-4 relative">
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
          onFocus={() => handleFocus("productName")}
          onBlur={handleBlur}
          required
          className={`w-full border-2 px-2 py-1 rounded-full text-base border-black transition ease-in-out duration-300 ${
            focusedField === "productName" ? "focus:border-primary" : ""
          }`}
        />
        <label
          htmlFor="productName"
          className={`absolute top-1/2 left-5 transform -translate-y-1/2 text-base pointer-events-none transition-all ease-in-out duration-300 ${
            formData.productName || focusedField === "productName"
              ? "has-content text-primary"
              : "text-black"
          }`}
        >
          Product Name <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Quantity */}
      <div className="user-input mb-4 relative">
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          onFocus={() => handleFocus("quantity")}
          onBlur={handleBlur}
          required
          className={`w-full border-2 px-2 py-1 rounded-full text-base border-black transition ease-in-out duration-300 ${
            focusedField === "quantity" ? "focus:border-primary" : ""
          }`}
        />
        <label
          htmlFor="quantity"
          className={`absolute top-1/2 left-5 transform -translate-y-1/2 text-base pointer-events-none transition-all ease-in-out duration-300 ${
            formData.quantity || focusedField === "quantity"
              ? "has-content text-primary"
              : "text-black"
          }`}
        >
          Total Quantity <span className="text-red-500">*</span>
        </label>
      </div>
    </>
  );
}
