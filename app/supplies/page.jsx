import DemandForm from "../demands/ui/DemandForm";
import AllSupplies from "./ui/AllSupplies";

export default function page() {
  return (
    <div className="container max-w-7xl mx-auto px-4 space-y-4">
      <DemandForm />
      <AllSupplies />
    </div>
  );
}
