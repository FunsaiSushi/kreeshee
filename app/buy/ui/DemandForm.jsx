"use client";

import { useState } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";

import NameQuantity from "./NameQuantity";
import Dates from "./Dates";
import LocationContact from "./LocationContact";
import Notes from "./Notes";
import { useAuthContext } from "@/app/auth/contexts/AuthContext";

const DemandForm = () => {
  const { token, refreshToken } = useAuthContext();

  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    demandStartDate: "",
    demandDeadline: "",
    deliveryLocation: "",
    contactInfo: "",
    demandNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (!token) {
        await refreshToken();
      }
      const response = await axios.post(
        `${API_URL}/post/create-demand`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage("Demand created successfully");
        setFormData({
          productName: "",
          quantity: "",
          demandStartDate: "",
          demandDeadline: "",
          deliveryLocation: "",
          contactInfo: "",
          demandNotes: "",
        });
        setCurrentStep(1);
      } else {
        setErrorMessage("Failed to create demand");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred: " + (error.response?.data?.message || error.message)
      );
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
        return <NameQuantity formData={formData} handleChange={handleChange} />;
      case 2:
        return <Notes formData={formData} handleChange={handleChange} />;
      case 3:
        return <Dates formData={formData} handleChange={handleChange} />;
      case 4:
        return (
          <LocationContact formData={formData} handleChange={handleChange} />
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
        return !formData.demandNotes;
      case 3:
        return !(formData.demandStartDate && formData.demandDeadline);
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
          {loading ? "Submitting..." : "Create Demand"}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleNextStep}
        disabled={isNextButtonDisabled()}
        className="w-full bg-primary text-quaternary py-2 rounded-full hover:bg-secondary transition-colors duration-300 ease-in-out cursor-pointer"
      >
        Next
      </button>
    );
  };

  return (
    <div className="container max-w-xl mx-auto p-4 mt-2 bg-quaternary rounded-2xl relative">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w-5/6">
            <div className="mt-2">{renderStep()}</div>
            <div>
              {successMessage && (
                <p className="text-quaternary mb-2">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-600 mb-2">{errorMessage}</p>
              )}
            </div>
          </div>
          <div className="w-1/6 flex flex-col items-end justify-center pr-2 space-y-4">
            <FaShoppingBag
              size={26}
              className={`cursor-pointer ${
                currentStep >= 1 ? "text-primary" : "text-tertiary"
              }`}
              onClick={() => handleIconClick(1)}
            />
            <TbNotes
              size={26}
              className={`cursor-pointer ${
                currentStep >= 2 ? "text-primary" : "text-tertiary"
              }`}
              onClick={() => handleIconClick(2)}
            />
            <FaCalendarAlt
              size={26}
              className={`cursor-pointer ${
                currentStep >= 3 ? "text-primary" : "text-tertiary"
              }`}
              onClick={() => handleIconClick(3)}
            />
            <FaLocationDot
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
  );
};

export default DemandForm;
