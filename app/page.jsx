import Link from "next/link";
import Image from "next/image";

import { MdSell } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

import Offers from "./ui/Offers";
import Demands from "./ui/Demands";

const page = () => {
  return (
    <main className="flex flex-col items-center pt-16 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between w-full mb-4 bg-primary rounded-b-3xl">
        <div className="md:w-1/2 p-4 text-quaternary">
          <h1
            className="lg:text-6xl font-bold mb-4 text-nowrap"
            style={{ fontSize: "2rem" }}
          >
            Welcome to kreeshee.
          </h1>
          <p className="text-xl lg:text-3xl font-semibold">
            Bangladesh's biggest online fresh produce market.
          </p>
        </div>
        {/* images */}
        <div className="w-full md:w-1/2 flex justify-end relative rounded-3xl overflow-hidden">
          <div className="relative w-1/3 h-72">
            <Image
              src="/farmer4.avif"
              alt="Farmer 4"
              fill
              className="object-cover object-[25%]"
            />
          </div>

          <div className="relative w-1/3 h-72">
            <Image
              src="/truck.png"
              alt="Truck"
              fill
              className="object-cover object-[30%]"
            />
          </div>

          <div className="relative w-1/3 h-72">
            <Image src="/store.jpg" alt="Store" fill className="object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 text-xl text-quaternary font-bold z-10 bg-black bg-opacity-80 p-4 flex justify-center w-full">
            From farmer to your doorstep.
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 w-full max-w-5xl px-4 my-2">
        <Link href="/auth/signup" className="sign-up-button">
          <MdSell />
          <div className="lg:hidden">Sell</div>{" "}
          <div className="hidden lg:block">Sell at kreeshee</div>
        </Link>
        <Link href="/auth/signup" className="sign-up-button">
          <FaShoppingBag />
          <div className="lg:hidden">Buy</div>
          <div className="hidden lg:block">Buy at kreeshee</div>
        </Link>
      </div>

      <div className="w-full p-4 space-y-6 flex flex-col justify-center items-center">
        <Offers />
        <Demands />
      </div>
    </main>
  );
};

export default page;
