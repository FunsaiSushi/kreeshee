"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "../../auth/lib/contexts/AuthContext"; // Assuming AuthContext is properly exported from this path

export default function SupplyPostForm() {
  const { currentUser } = useContext(AuthContext);
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

      const response = await axios.post("/api/supplies", data, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        {/* Input fields */}
        <div className="mb-4">
          <label htmlFor="productName" className="block font-semibold">
            Product Name:
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

        {/* Add other fields here */}
        <div className="mb-4">
          <label htmlFor="productImages" className="block font-semibold">
            Product Images:
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
