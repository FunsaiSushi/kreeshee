"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "../../auth/lib/contexts/AuthContext";

export default function SupplyPostForm() {
  const { currentUser } = useAuthContext();
  const { token, refreshToken } = useAuthContext();
  const [formData, setFormData] = useState({
    seller: "",
    productName: "",
    productType: "",
    productImages: [],
    amountValue: "",
    amountUnit: "",
    priceValue: "",
    isFixed: false,
    startDate: "",
    endDate: "",
    expiryDate: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Automatically set the seller's name from the current authenticated user
  useEffect(() => {
    if (currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        seller: currentUser.displayName || currentUser.email, // Fallback to email if no display name
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, productImages: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("seller", formData.seller);
      data.append("productName", formData.productName);
      data.append("productType", formData.productType);
      formData.productImages.forEach((image) => {
        data.append("productImages", image);
      });
      data.append("amountValue", formData.amountValue);
      data.append("amountUnit", formData.amountUnit);
      data.append("priceValue", formData.priceValue);
      data.append("isFixed", formData.isFixed);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("expiryDate", formData.expiryDate);
      data.append("notes", formData.notes);

      if (!token) {
        await refreshToken(); // Ensure token is fresh
      }
      // Include Authorization header with the token
      const response = await axios.post(`${API_URL}/post/create-supply`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include Firebase Auth token here
        },
      });

      if (response.status === 200) {
        router.push("/supplies");
      } else {
        setError("Failed to create supply post.");
      }
    } catch (error) {
      setError("An error occurred while creating the post.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Supply Post</h1>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="productName" className="block font-semibold">
            Product Name <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>

        {/* Product Type */}
        <div className="mb-4">
          <label htmlFor="productType" className="block font-semibold">
            Product Type:
          </label>
          <input
            type="text"
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleInputChange}
            className="w-full border px-2 py-1"
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amountValue" className="block font-semibold">
            Amount Value <span className="text-red-500">*</span>:
          </label>
          <input
            type="number"
            id="amountValue"
            name="amountValue"
            value={formData.amountValue}
            onChange={handleInputChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amountUnit" className="block font-semibold">
            Amount Unit <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="amountUnit"
            name="amountUnit"
            value={formData.amountUnit}
            onChange={handleInputChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="priceValue" className="block font-semibold">
            Price Value <span className="text-red-500">*</span>:
          </label>
          <input
            type="number"
            id="priceValue"
            name="priceValue"
            value={formData.priceValue}
            onChange={handleInputChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isFixed" className="block font-semibold">
            Fixed Price:
          </label>
          <input
            type="checkbox"
            id="isFixed"
            name="isFixed"
            checked={formData.isFixed}
            onChange={handleInputChange}
            className="mr-2"
          />
          <span>Yes</span>
        </div>

        {/* Dates */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block font-semibold">
            Start Date <span className="text-red-500">*</span>:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block font-semibold">
            End Date <span className="text-red-500">*</span>:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expiryDate" className="block font-semibold">
            Expiry Date:
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full border px-2 py-1"
          />
        </div>

        {/* Product Images */}
        <div className="mb-4">
          <label htmlFor="productImages" className="block font-semibold">
            Product Images <span className="text-red-500">*</span>:
          </label>
          <input
            type="file"
            id="productImages"
            name="productImages"
            multiple
            onChange={handleFileChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label htmlFor="notes" className="block font-semibold">
            Notes:
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full border px-2 py-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
}
