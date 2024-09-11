export default function HireWorkers() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Hire Workers
        </h1>

        <form className="space-y-6">
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

          {/* Number of Workers */}
          <div>
            <label
              htmlFor="workers"
              className="block text-gray-700 font-medium mb-2"
            >
              Number of Workers
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="workers"
              name="workers"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter number of workers"
              required
            />
          </div>

          {/* Needed For */}
          <div>
            <label
              htmlFor="neededFor"
              className="block text-gray-700 font-medium mb-2"
            >
              Needed For
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="neededFor"
              name="neededFor"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Specify what the workers are needed for"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-2"
            >
              Date
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Additional Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-gray-700 font-medium mb-2"
            >
              Additional Details
            </label>
            <textarea
              id="details"
              name="details"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Provide any additional details"
              rows="4"
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
        </form>
      </div>
    </div>
  );
}
