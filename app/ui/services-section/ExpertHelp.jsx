import { useState } from "react";

export default function ExpertHelp() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: "farming", label: "Farming" },
    { id: "transportation", label: "Transportation" },
    { id: "storage", label: "Storage" },
    { id: "others", label: "Others" },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Expert Help
        </h1>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`border-2 rounded-lg p-4 text-center cursor-pointer transition duration-300 ${
                selectedCategory === category.id
                  ? "border-indigo-600 bg-indigo-100"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Describe Your Issue
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Describe the issue you're facing..."
            rows="5"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
