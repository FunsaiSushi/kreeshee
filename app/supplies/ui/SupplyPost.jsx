const SupplyPost = ({ supply }) => {
  const {
    seller,
    productName,
    productType,
    productImages,
    amount,
    price,
    deliveryDate,
    expiryDate,
    status,
    notes,
  } = supply;

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <h2 className="text-xl font-semibold">{productName}</h2>
      <p>Seller: {seller}</p>
      <p>Type: {productType || "N/A"}</p>
      <p>
        Amount: {amount.value} {amount.unit}
      </p>
      <p>
        Price: ${price.value} {price.isFixed ? "(Fixed)" : "(Negotiable)"}
      </p>
      <p>
        Delivery Date: {new Date(deliveryDate.startDate).toLocaleDateString()} -{" "}
        {new Date(deliveryDate.endDate).toLocaleDateString()}
      </p>
      {expiryDate && (
        <p>Expiry Date: {new Date(expiryDate).toLocaleDateString()}</p>
      )}
      <p>Status: {status}</p>
      <p>Notes: {notes}</p>
      {productImages.length > 0 && (
        <div className="flex space-x-2">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={productName}
              className="w-24 h-24 object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplyPost;
