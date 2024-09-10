"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdSell } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

import Supplies from "./Supplies";
import Demands from "./Demands";
import { useAuthContext } from "../auth/contexts/AuthContext";
import Services from "./services-section/Services";
import ServicesNav from "./services-section/ServicesNav";
import ExpertHelp from "./services-section/ExpertHelp";
import HireWorkers from "./services-section/HireWorkers";
import Warehouse from "./services-section/Warehouse";
import RentTruck from "./services-section/RentTruck";
import styles from "./HeroText.module.css";

const Home = () => {
  const { currentUser } = useAuthContext();
  const [serviceSelected, setServiceSelected] = useState(null);

  const renderServiceComponent = () => {
    switch (serviceSelected) {
      case "warehouse":
        return <Warehouse />;
      case "rentTruck":
        return <RentTruck />;
      case "hireWorkers":
        return <HireWorkers />;
      case "expertHelp":
        return <ExpertHelp />;
      default:
        return null;
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="flex flex-col md:flex-row items-start justify-between w-full mb-4 bg-primary rounded-b-3xl">
        <div className="flex flex-col justify-start md:w-1/2 p-4 text-quaternary">
          <div className={styles.animatedText}>
            <span></span>
          </div>
          <h1 className="big-text text-brightLime">AGRICULTURE</h1>
          <h1 className="flex">
            <p className="small-text pr-2">AND </p>
            <p className="small-text text-brightLime">LOGISTICS</p>
          </h1>
          <h1 className="small-text">IN BANGLADESH</h1>
        </div>
        {/* images */}
        <div className="w-full md:w-1/2 flex justify-end relative rounded-3xl overflow-hidden">
          <div className="relative w-1/3 h-72">
            <Image
              src="/farmer4.avif"
              alt="Farmer 4"
              width={500}
              height={500}
              className="object-cover w-full h-full object-[25%]"
            />
          </div>

          <div className="relative w-1/3 h-72">
            <Image
              src="/truck.png"
              alt="Truck"
              width={500}
              height={500}
              className="object-cover w-full h-full object-[30%]"
            />
          </div>

          <div className="relative w-1/3 h-72">
            <Image
              src="/store.jpg"
              alt="Store"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute bottom-0 left-0 text-2xl text-quaternary z-10 bg-black bg-opacity-80 p-3 flex justify-center w-full">
            FROM FARM TO HOME.
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 w-full max-w-5xl px-4 my-2">
        <Link
          href={currentUser ? "/demands" : "/auth/signup"}
          className="sign-up-button"
        >
          <MdSell />
          <div className="lg:hidden">Sell</div>{" "}
          <div className="hidden lg:block">Sell at kreeshee</div>
        </Link>
        <Link
          href={currentUser ? "/supplies" : "/auth/signup"}
          className="sign-up-button"
        >
          <FaShoppingBag />
          <div className="lg:hidden">Buy</div>
          <div className="hidden lg:block">Buy at kreeshee</div>
        </Link>
      </div>

      <div className="w-full p-4 space-y-6 flex flex-col justify-center items-center">
        <Supplies />
        <Demands />
        <div className="w-full max-w-7xl bg-quaternary rounded-2xl p-4">
          {serviceSelected ? (
            <>
              <ServicesNav
                activeService={serviceSelected}
                setActiveService={setServiceSelected}
              />
              <div className="mt-4">{renderServiceComponent()}</div>
            </>
          ) : (
            <Services setServiceSelected={setServiceSelected} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
