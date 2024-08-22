"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import SupplyPostCard from "./SupplyPostCard";

const AllSupplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchSupplies = useCallback(async () => {
    if (loading || !hasMore) return; // Avoid multiple fetches
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/post/supplies?page=${page}&limit=10`,
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

      if (Array.isArray(data.supplies)) {
        setSupplies((prev) => {
          // Only add new supplies if they aren't already in the list
          const newSupplies = data.supplies.filter(
            (newSupply) => !prev.some((supply) => supply._id === newSupply._id)
          );
          return [...prev, ...newSupplies];
        });
      }

      if (data.pagination && typeof data.pagination.pages === "number") {
        setHasMore(page < data.pagination.pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching supplies:", error);
    }
    setLoading(false);
  }, [page, loading, hasMore, API_URL]);

  // Fetch supplies when the page changes
  useEffect(() => {
    fetchSupplies();
  }, [fetchSupplies]);

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
    <div>
      <h1 className="text-2xl font-bold mb-4">All Supplies</h1>
      <div>
        {supplies.map((supply) => (
          <SupplyPostCard key={supply._id} supply={supply} />
        ))}
      </div>
      {loading && <p>Loading more supplies...</p>}
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default AllSupplies;
