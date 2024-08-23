import Image from "next/image";

const SupplyPostCard = ({ supply }) => {
  const { productName, postCoverImage, retailPrice, wholesalePrice, auction } =
    supply;

  return (
    <div className="w-full max-w-sm bg-primary rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative h-36 w-full">
        <Image
          src={postCoverImage}
          alt={productName}
          fill
          className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="p-2">
        <div className="flex flex-col justify-center items-center text-white mb-2">
          <div className=" font-semibold">{productName}</div>

          {retailPrice ? (
            <p className="text-sm">
              {retailPrice.value} / {retailPrice.unit}
            </p>
          ) : wholesalePrice ? (
            <p className="text-sm">
              {wholesalePrice.value} / {wholesalePrice.unit}
            </p>
          ) : auction ? (
            <p className="text-sm">
              {auction.minBidPrice} / {auction.bidUnit}
            </p>
          ) : (
            <p className="text-sm">Price information not available</p>
          )}
        </div>
        <button className="w-full rounded-full py-1 bg-quaternary text-primary font-semibold text-base hover:bg-primary-dark transition-colors duration-200 ease-in-out">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default SupplyPostCard;
