"use client";

import "./description.css"; // Import the CSS file

export default function Description({ formData, handleInputChange }) {
  return (
    <div className="description-container">
      <label htmlFor="description" className="description-label">
        Description
      </label>
      <textarea
        id="description"
        placeholder="Additional details about your product"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="description-textarea"
        rows="4"
      />
    </div>
  );
}
