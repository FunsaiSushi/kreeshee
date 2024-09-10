"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "../../auth/contexts/AuthContext";
import Image from "next/image";
import { FaImage } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

export default function OfferForm({ demandID }) {
  const { currentUser, token } = useAuthContext();
  const [formData, setFormData] = useState({
    sellerID: "", // This will now be the Firebase UID
    seller: "",
    quantity: "",
    price: "",
    demandID: demandID,
    productImages: [],
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        sellerID: currentUser.uid || "", // Use Firebase UID here
        seller: currentUser.displayName || currentUser.email || "",
      }));
    }
  }, [currentUser]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (formData.productImages.length + files.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const newImages = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);

    setFormData((prevData) => ({
      ...prevData,
      productImages: [...prevData.productImages, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    const updatedFiles = Array.from(formData.productImages).filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      productImages: updatedFiles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const offerData = new FormData();
    for (let key in formData) {
      if (key === "productImages") {
        for (let i = 0; i < formData.productImages.length; i++) {
          offerData.append("productImages", formData.productImages[i]);
        }
      } else {
        offerData.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${API_URL}/post/create-offer`,
        offerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Offer made successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error("Internal server error.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Offer</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            placeholder="e.g., 10 tons"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="e.g., $500"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productImages"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Upload Images
          </label>
          <div
            className="flex items-center justify-center w-full py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-secondary transition duration-300"
            onClick={() => document.getElementById("productImages").click()}
          >
            <FaImage className="mr-2" size={24} />
            <span className="text-lg">
              {selectedImages.length > 0 ? "Add more" : "Upload images"}
            </span>
          </div>

          <input
            type="file"
            id="productImages"
            name="productImages"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Preview of selected images */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-0 pb-[100%] border border-gray-200 rounded-lg overflow-hidden group"
            >
              <Image
                src={image}
                alt={`Preview ${index + 1}`}
                fill
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
              />
              <IoIosClose
                size={40}
                className="absolute top-1 right-1 text-2xl text-white cursor-pointer rounded-full hover:bg-opacity-50 hover:bg-black"
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200"
        >
          {loading ? "Submitting..." : "Submit Offer"}
        </button>
      </form>
    </div>
  );
}
