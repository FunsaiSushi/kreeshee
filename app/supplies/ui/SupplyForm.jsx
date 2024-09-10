"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// icons for each step
import { FaEdit } from "react-icons/fa"; // NameQuantity
import { FaImage } from "react-icons/fa6"; // ImageInput
import { MdSell } from "react-icons/md"; // BuyingOptions
import { TbNotes } from "react-icons/tb"; // Description

import { useAuthContext } from "../../auth/contexts/AuthContext";
import ImageInput from "./ImageInput";
import NameQuantity from "./NameQuantity";
import BuyingOptions from "./BuyingOptions";
import PriceValueUnit from "./PriceValueUnit";
import Description from "./Description";

export default function SupplyForm() {
  const { currentUser } = useAuthContext();
  const { token } = useAuthContext();
  const [formData, setFormData] = useState({
    seller: "",
    productName: "",
    quantity: "",
    quality: "",
    buyingOptions: "", // Default to Retail
    retailPriceValue: "",
    retailPriceUnit: "",
    wholesalePriceValue: " ",
    wholesalePriceUnit: "",
    minBidPrice: "",
    bidUnit: "",
    productImages: [],
    description: "",
  });
  const [selectedCover, setSelectedCover] = useState(null); // Track selected cover image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        seller: currentUser.displayName || currentUser.email,
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

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleIconClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <NameQuantity
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <ImageInput
            formData={formData}
            handleFileChange={handleFileChange}
            selectedCover={selectedCover}
            handleSelectCover={handleSelectCover}
          />
        );
      case 3:
        return (
          <BuyingOptions
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <Description
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  const isNextButtonDisabled = () => {
    switch (currentStep) {
      case 1:
        return !(formData.productName && formData.quantity);
      case 2:
        return formData.productImages.length === 0;
      case 3:
        return !formData.buyingOptions;
      default:
        return false;
    }
  };

  const renderButtons = () => {
    if (currentStep === 4) {
      return (
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-quaternary py-2 px-4 rounded-full hover:bg-secondary transition-colors duration-300 ease-in-out"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleNextStep}
        disabled={isNextButtonDisabled()}
        className="w-full bg-primary text-quaternary py-2 rounded-xl hover:bg-secondary transition-colors duration-300 ease-in-out cursor-pointer"
      >
        Next
      </button>
    );
  };

  return (
    <div className="container mx-auto max-w-2xl flex justify-center w-full p-4">
      <div className="flex flex-col justify-center w-full items-center bg-quaternary rounded-xl p-4">
        <h2 className="text-2xl font-semibold">Post Supply</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full space-y-4"
        >
          <div className="flex">
            <div className="w-5/6">
              <div className="mt-2">{renderStep()}</div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="w-1/6 flex flex-col items-end justify-center pr-2 space-y-4">
              <FaEdit
                size={26}
                className={`cursor-pointer ${
                  currentStep >= 1 ? "text-primary" : "text-tertiary"
                }`}
                onClick={() => handleIconClick(1)}
              />
              <FaImage
                size={26}
                className={`cursor-pointer ${
                  currentStep >= 2 ? "text-primary" : "text-tertiary"
                }`}
                onClick={() => handleIconClick(2)}
              />
              <MdSell
                size={26}
                className={`cursor-pointer ${
                  currentStep >= 3 ? "text-primary" : "text-tertiary"
                }`}
                onClick={() => handleIconClick(3)}
              />
              <TbNotes
                size={26}
                className={`cursor-pointer ${
                  currentStep >= 4 ? "text-primary" : "text-tertiary"
                }`}
                onClick={() => handleIconClick(4)}
              />
            </div>
          </div>
          <div className="mt-0">{renderButtons()}</div>
        </form>
      </div>
    </div>
  );
}
