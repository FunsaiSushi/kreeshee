"use client";

import AllSupplies from "../supplies/ui/AllSupplies";
import DemandForm from "./ui/DemandForm";

export default function page() {
  return (
    <div className="px-4">
      <DemandForm />
      <AllSupplies />
    </div>
  );
}
