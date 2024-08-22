"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "../../auth/contexts/AuthContext";
import ImageInput from "./ImageInput";
import NameQuantityQuality from "./NameQuantityQuality";
import BuyingOptions from "./BuyingOptions";
import PriceValueUnit from "./PriceValueUnit";
import Description from "./Description";

export default function SupplyPostForm() {
  const { currentUser } = useAuthContext();
  const { token } = useAuthContext();
  const [formData, setFormData] = useState({
    seller: "",
    productName: "",
    quantity: "",
    quality: "",
    buyingOptions: "Retail", // Default to Retail
    retailPriceValue: "",
    retailPriceUnit: "",
    wholesalePriceValue: "",
    wholesalePriceUnit: "",
    minBidPrice: "",
    bidUnit: "",
    endTime: "",
    productImages: [],
    description: "",
  });
  const [selectedCover, setSelectedCover] = useState(null); // Track selected cover image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        seller: currentUser.displayName || currentUser.email, // Fallback to email if no display name
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      productImages: files,
    }));
    setSelectedCover(null); // Reset selected cover on new file upload
  };

  const handleSelectCover = (index) => {
    setSelectedCover(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const supplyData = new FormData();
    for (let key in formData) {
      if (key === "productImages") {
        for (let i = 0; i < formData.productImages.length; i++) {
          supplyData.append("productImages", formData.productImages[i]);
        }
      } else {
        supplyData.append(key, formData[key]);
      }
    }

    // Add the cover image index to the form data
    if (selectedCover !== null) {
      supplyData.append("postCover", selectedCover);
    }

    try {
      const response = await axios.post(
        `${API_URL}/post/create-supply`,
        supplyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        router.push("/supplies");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log(error.message + "Internal server error.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl flex justify-center w-full p-4">
      <div className=" flex flex-col justify-center w-full items-center bg-quaternary rounded-3xl p-4">
        <h2 className="text-2xl font-semibold">Post supply</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full space-y-4"
        >
          <ImageInput
            formData={formData}
            handleFileChange={handleFileChange}
            selectedCover={selectedCover}
            handleSelectCover={handleSelectCover}
          />
          <NameQuantityQuality
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <BuyingOptions
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <PriceValueUnit
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <Description
            formData={formData}
            handleInputChange={handleInputChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white py-2 w-full text-lg rounded-full transition-colors duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
