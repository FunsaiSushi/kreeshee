"use client";

import { FaImage } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageInput({
  formData,
  handleFileChange,
  selectedCover,
  handleSelectCover,
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    // Update selectedImages when formData.productImages changes
    if (formData.productImages.length > 0) {
      const imagesArray = Array.from(formData.productImages).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages(imagesArray);
    }
  }, [formData.productImages]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    if (formData.productImages.length + files.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    handleFileChange(e);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    if (selectedCover === index) {
      handleSelectCover(null);
    } else if (selectedCover > index) {
      handleSelectCover(selectedCover - 1);
    }

    // Update formData productImages to reflect the removal
    const updatedFiles = Array.from(formData.productImages).filter(
      (_, i) => i !== index
    );
    const event = { target: { name: "productImages", files: updatedFiles } };
    handleFileChange(event);
  };

  return (
    <div className="mb-2">
      <div
        className="flex items-center justify-center w-full mt-2 py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-secondary transition duration-300"
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
        onChange={handleChange}
        required
        className="hidden"
      />

      {/* Previews of selected images */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className={`relative w-full h-0 pb-[100%] border rounded-3xl overflow-hidden cursor-pointer ${
              selectedCover === index ? "border-primary border-4" : ""
            }`}
            onClick={() => handleSelectCover(index)}
          >
            <Image
              src={image}
              alt={`Preview ${index + 1}`}
              fill
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            />

            <IoIosClose
              size={40}
              className="absolute z-10 top-1 right-1 text-2xl text-white cursor-pointer rounded-full hover:bg-opacity-50 hover:bg-black"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage(index);
              }}
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              Select as Cover
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
