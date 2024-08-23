import { useState, useEffect } from "react";
import Link from "next/link";
import SupplyPostCard from "../supplies/ui/SupplyPostCard";

function Supplies() {
  const [latestSupplies, setLatestSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchLatestSupplies = async () => {
      try {
        const response = await fetch(
          `${API_URL}/post/supplies?limit=12&sort=createdAt:desc`,
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
        setLatestSupplies(data.supplies || []);
      } catch (error) {
        console.error("Error fetching latest supplies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestSupplies();
  }, [API_URL]);

  return (
    <main className="flex flex-col w-full p-4 max-w-7xl bg-quaternary rounded-xl">
      {/* Subheader */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="sm:text-xl font-semibold text-primary">
          Latest Supplies
        </h2>
        <Link
          href="/supplies"
          className="hidden sm:flex text-lg rounded-full bg-primary hover:bg-secondary text-quaternary py-1 px-4 font-semibold transition-colors duration-300"
        >
          Show more
        </Link>
      </div>

      {/* Supplies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? (
          <p>Loading latest supplies...</p>
        ) : (
          latestSupplies.map((supply) => (
            <SupplyPostCard key={supply._id} supply={supply} />
          ))
        )}
      </div>

      <Link
        href="/supplies"
        className="flex sm:hidden bg-primary hover:bg-secondary text-quaternary justify-center rounded-full py-1 px-4 mt-4 font-semibold transition-colors duration-300"
      >
        Show more
      </Link>
    </main>
  );
}

export default Supplies;
