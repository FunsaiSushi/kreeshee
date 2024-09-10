import Link from "next/link";
import OfferCard from "../ui/OfferCard";

const DemandCard = ({ demand }) => {
  const { productName, quantity, creatorName, offers, _id } = demand;

  // Select the first offer if available
  const firstOffer = offers && offers.length > 0 ? offers[0] : null;

  return (
    <Link
      href={`/demands/${_id}`}
      className="w-full bg-primary rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4 cursor-pointer"
    >
      <div className="text-white mb-2">
        <div className="text-xl font-semibold">{productName}</div>
        <p className="text-sm">Quantity: {quantity}</p>
        <p className="text-sm">Posted by: {creatorName}</p>
      </div>
      <button className="w-full rounded-full py-1 bg-quaternary text-primary font-semibold text-base hover:bg-primary-dark transition-colors duration-200 ease-in-out mb-4">
        Offer Supply
      </button>
      {/* <div className="text-white">
        {firstOffer ? (
          <>
            <p className="text-sm font-semibold mb-2">Best Offer:</p>
            
            <OfferCard offer={firstOffer} />
          </>
        ) : (
          <p className="text-sm">No offers available</p>
        )}
      </div> */}
    </Link>
  );
};

export default DemandCard;
