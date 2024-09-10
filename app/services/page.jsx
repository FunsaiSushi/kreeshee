"use client";

import React, { useState } from "react";
import Services from "../ui/services-section/Services";
import ServicesNav from "../ui/services-section/ServicesNav";
import ExpertHelp from "../ui/services-section/ExpertHelp";
import HireWorkers from "../ui/services-section/HireWorkers";
import Warehouse from "../ui/services-section/Warehouse";
import RentTruck from "../ui/services-section/RentTruck";

const Page = () => {
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
      <div className="w-full p-4 space-y-6 flex flex-col justify-center items-center">
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

export default Page;
