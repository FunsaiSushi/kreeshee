import React from "react";

function Offers() {
  return (
    <main className="flex flex-col w-full p-4 max-w-7xl bg-quaternary rounded-xl">
      {/* subheader */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-primary">Latest Demands</h2>
          <div className="border-2 text rounded-full border-primary py-1 px-4 text-primary font-semibold">
            Sort
          </div>
          <div className="border-2 rounded-full border-primary py-1 px-4 text-primary font-semibold">
            Filter
          </div>
        </div>

        <div className="hidden lg:flex border-2 rounded-full border-primary py-1 px-4 text-primary font-semibold">
          Show more
        </div>
      </div>

      {/* items */}
      <div className="flex"></div>
      <div className="flex lg:hidden justify-center border-2 rounded-full border-primary py-1 px-4 mt-4 text-primary font-semibold">
        Show more
      </div>
    </main>
  );
}

export default Offers;
