export default function Warehouse() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Rent a Warehouse
        </h1>

        <form className="space-y-6">
          {/* Product */}
          <div>
            <label
              htmlFor="product"
              className="block text-gray-700 font-medium mb-2"
            >
              Product
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="product"
              name="product"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 font-medium mb-2"
            >
              Amount
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Location
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Rent Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Rent Start Date
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Number of Days */}
          <div>
            <label
              htmlFor="days"
              className="block text-gray-700 font-medium mb-2"
            >
              Number of Days
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="days"
              name="days"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter number of days"
              required
            />
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
        </form>
      </div>
    </div>
  );
}
