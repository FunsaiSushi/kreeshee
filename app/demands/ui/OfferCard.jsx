const OfferCard = ({ offer }) => {
  const productImages = offer.productImages || [];

  return (
    <div className="border p-4 mb-4 rounded shadow">
      <h3>{offer.seller}</h3>
      <p>Quantity: {offer.quantity}</p>
      <p>Price: {offer.price}</p>
      <p>Description: {offer.description}</p>
      {productImages.length > 0 && (
        <div>
          <h4>Images:</h4>
          {productImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Offer Image ${index}`}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferCard;
