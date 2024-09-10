"use client";

import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/auth/contexts/AuthContext";

export default function RentTruck() {
  const [loadDestination, setLoadDestination] = useState("");
  const [unloadDestination, setUnloadDestination] = useState("");
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { token } = useAuthContext(); // Get the token from AuthContext

  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Replace with your actual API URL

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare data to send to the backend
      const data = {
        loadDestination,
        unloadDestination,
        productName,
        amount,
      };

      // Make the axios POST request
      const response = await axios.post(`${API_URL}/truck/rent`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess("Truck rental posted successfully!");
        setLoadDestination("");
        setUnloadDestination("");
        setProductName("");
        setAmount(""); // Reset amount to default 10 tons
      } else {
        throw new Error("Failed to post rent truck request.");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Rent a Truck</h2>

      {/* Display success or error messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Load Destination
          </label>
          <input
            type="text"
            value={loadDestination}
            onChange={(e) => setLoadDestination(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Unload Destination
          </label>
          <input
            type="text"
            value={unloadDestination}
            onChange={(e) => setUnloadDestination(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            placeholder="Watermelons"
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Amount</label>
          <input
            type="text" // Changed from "number" to "text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="10 tons"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white p-2 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
