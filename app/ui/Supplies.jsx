import Link from "next/link";
import React from "react";

function Supplies() {
  return (
    <main className="flex flex-col w-full p-4 max-w-7xl bg-quaternary rounded-xl">
      {/* subheader */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-primary">Latest Supplies</h2>
          <div className="border-2 text rounded-full border-primary py-1 px-4 text-primary font-semibold">
            Sort
          </div>
          <div className="border-2 rounded-full border-primary py-1 px-4 text-primary font-semibold">
            Filter
          </div>
        </div>

        <Link
          href="/supplies"
          className="hidden lg:flex border-2 rounded-full border-primary hover:bg-primary hover:text-quaternary py-1 px-4 text-primary font-semibold transition-colors duration-300"
        >
          Show more
        </Link>
      </div>

      {/* items */}
      <div className="flex"></div>
      <Link
        href="/supplies"
        className="flex lg:hidden hover:bg-primary hover:text-quaternary justify-center border-2 rounded-full border-primary py-1 px-4 mt-4 text-primary font-semibold transition-colors duration-300"
      >
        Show more
      </Link>
    </main>
  );
}

export default Supplies;
