import OfferForm from "../ui/OfferForm";
import OfferCard from "../ui/OfferCard"; // Assume you have a component to render individual offers

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_URL}/post/demands`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const demands = data.demands;

    if (!Array.isArray(demands)) {
      throw new Error('API response "demands" is not an array');
    }

    return demands.map((demand) => ({
      id: demand._id,
    }));
  } catch (error) {
    console.error("Failed to fetch demands:", error);
    return [];
  }
}

async function getDemandById(id) {
  const res = await fetch(`${API_URL}/post/demands/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = await res.json(); // Destructure `data` from the response

  return data; // Return the `data` object
}

export default async function page({ params }) {
  const { id } = params;
  const demand = await getDemandById(id); // Now `demand` is the `data` object from the API

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <h1>{demand.productName}</h1>
      <p>Quantity: {demand.quantity}</p>
      <p>Posted by: {demand.creatorName}</p>
      <div className="w-full max-w-4xl mt-8">
        <h2>Offers:</h2>
        {demand.offers.length > 0 ? (
          demand.offers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))
        ) : (
          <p>No offers available for this demand.</p>
        )}
      </div>
      <OfferForm demandID={id} />
    </div>
  );
}
