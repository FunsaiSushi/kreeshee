"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DemandCard from "../demands/ui/DemandCard";

function Demands() {
  const [latestDemands, setLatestDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchLatestDemands = async () => {
      try {
        const response = await fetch(
          `${API_URL}/post/demands?limit=9&sort=createdAt:desc`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLatestDemands(data.demands || []);
      } catch (error) {
        console.error("Error fetching latest demands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestDemands();
  }, [API_URL]);

  return (
    <main className="flex flex-col w-full p-4 max-w-7xl bg-quaternary rounded-xl">
      {/* Subheader */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="sm:text-xl font-semibold text-primary">
          Latest Demands
        </h2>
        <Link
          href="/demands"
          className="hidden sm:flex text-lg rounded-full bg-primary hover:bg-secondary text-quaternary py-1 px-4 font-semibold transition-colors duration-300"
        >
          Show more
        </Link>
      </div>

      {/* Demands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading latest demands...</p>
        ) : (
          latestDemands.map((demand) => (
            <DemandCard key={demand._id} demand={demand} />
          ))
        )}
      </div>

      <Link
        href="/demands"
        className="flex sm:hidden bg-primary hover:bg-secondary text-quaternary justify-center rounded-full py-1 px-4 mt-4 font-semibold transition-colors duration-300"
      >
        Show more
      </Link>
    </main>
  );
}

export default Demands;
