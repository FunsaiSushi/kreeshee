"use client";

import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/auth/contexts/AuthContext"; // Import AuthContext for token

export default function EditUserInfoModal({ field, userData, onClose }) {
  const [inputValue, setInputValue] = useState(userData[field] || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuthContext(); // Get the token from the AuthContext

  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Define your API base URL

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make an API call to update user info
      const response = await axios.post(
        `${API_URL}/user/edit-user-basic-info`,
        { [field]: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(`Updated ${field}:`, inputValue);

        // Close modal after saving
        onClose();
      } else {
        throw new Error("Failed to update user information.");
      }
    } catch (error) {
      setError(error.message || "An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Edit {field}</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          className="border border-gray-300 p-2 w-full mb-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 ${
              loading ? "bg-gray-400" : "bg-blue-600"
            } text-white rounded-md`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
