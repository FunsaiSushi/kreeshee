"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DemandDetails = () => {
  const router = useRouter();
  const { demandId } = router.query;

  const [demandDetails, setDemandDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (demandId) {
      // Fetch demand details from the backend API
      const fetchDemandDetails = async () => {
        try {
          const response = await fetch(`${API_URL}/demands/${demandId}`);
          const data = await response.json();

          if (response.ok) {
            setDemandDetails(data.data);
          } else {
            throw new Error(data.message || "Failed to fetch demand details");
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchDemandDetails();
    }
  }, [demandId]);

  if (loading) {
    return <p>Loading demand details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Demand Details</h1>
      {demandDetails ? (
        <div>
          <p>
            <strong>Creator Name:</strong> {demandDetails.creatorName}
          </p>
          <p>
            <strong>Product Name:</strong> {demandDetails.productName}
          </p>
          <p>
            <strong>Quantity:</strong> {demandDetails.quantity}
          </p>
          <p>
            <strong>Demand Start Date:</strong>{" "}
            {new Date(demandDetails.demandStartDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Demand Deadline:</strong>{" "}
            {new Date(demandDetails.demandDeadline).toLocaleDateString()}
          </p>
          <p>
            <strong>Delivery Location:</strong> {demandDetails.deliveryLocation}
          </p>
          <p>
            <strong>Contact Info:</strong> {demandDetails.contactInfo}
          </p>
          <p>
            <strong>Demand Notes:</strong> {demandDetails.demandNotes}
          </p>
          {demandDetails.offers && demandDetails.offers.length > 0 ? (
            <div>
              <h3>Offers:</h3>
              <ul>
                {demandDetails.offers.map((offer, index) => (
                  <li key={index}>Offer ID: {offer}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No offers yet.</p>
          )}
        </div>
      ) : (
        <p>No demand details available.</p>
      )}
    </div>
  );
};

export default DemandDetails;
