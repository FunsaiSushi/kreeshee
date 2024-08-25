const DemandCard = ({ demand }) => {
  const { productName, quantity, creatorName, offers } = demand;

  return (
    <div className="w-full bg-primary rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
      <div className="text-white mb-2">
        <div className="text-xl font-semibold">{productName}</div>
        <p className="text-sm">Quantity: {quantity}</p>
        <p className="text-sm">Posted by: {creatorName}</p>
      </div>
      <button className="w-full rounded-full py-1 bg-quaternary text-primary font-semibold text-base hover:bg-primary-dark transition-colors duration-200 ease-in-out mb-4">
        Offer Supply
      </button>
      <div className="text-white">
        {offers && offers.length > 0 ? (
          <>
            <p className="text-sm font-semibold mb-2">Offers:</p>
            <ul className="list-disc list-inside">
              {offers.slice(0, 2).map((offer, index) => (
                <li key={index} className="text-sm">
                  {offer}
                </li>
              ))}
            </ul>
            {offers.length > 2 && (
              <button className="mt-2 text-sm text-blue-500 hover:underline">
                Load more offers
              </button>
            )}
          </>
        ) : (
          <p className="text-sm">No offers available</p>
        )}
      </div>
    </div>
  );
};

export default DemandCard;
