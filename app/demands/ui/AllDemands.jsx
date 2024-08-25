"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import DemandCard from "./DemandCard";

const AllDemands = () => {
  const [demands, setDemands] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchDemands = useCallback(async () => {
    if (loading || !hasMore) return; // Avoid multiple fetches
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/post/demands?page=${page}&limit=12`,
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
      console.log("API response data:", data);

      if (Array.isArray(data.demands)) {
        setDemands((prev) => {
          // Only add new demands if they aren't already in the list
          const newDemands = data.demands.filter(
            (newDemand) => !prev.some((demand) => demand._id === newDemand._id)
          );
          return [...prev, ...newDemands];
        });
      }

      if (data.pagination && typeof data.pagination.pages === "number") {
        setHasMore(page < data.pagination.pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching demands:", error);
    }
    setLoading(false);
  }, [page, loading, hasMore, API_URL]);

  // Fetch demands when the page changes
  useEffect(() => {
    fetchDemands();
  }, [fetchDemands]);

  // Infinite scrolling logic using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">All Demands</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demands.map((demand) => (
          <DemandCard key={demand._id} demand={demand} />
        ))}
      </div>
      {loading && <p>Loading more demands...</p>}
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default AllDemands;
