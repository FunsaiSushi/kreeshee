import Image from "next/image";

const SupplyPostCard = ({ supply }) => {
  const { productName, postCoverImage, retailPrice } = supply;

  return (
    <div className="w-1/2 max-w-sm bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-6">
      <div className="relative h-48 w-full">
        <Image
          src={postCoverImage}
          alt={productName}
          fill
          className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-white mb-2">
          {productName}
        </h2>
        <div className="text-white text-lg mb-4">
          <p>
            {retailPrice.value} / {retailPrice.unit}
          </p>
        </div>
        <button className="w-full rounded-full py-2 bg-quaternary text-primary font-semibold text-lg hover:bg-primary-dark transition-colors duration-200 ease-in-out">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default SupplyPostCard;
