"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/auth/contexts/AuthContext"; // Auth context for token

const TruckRentList = () => {
  const [truckRentPosts, setTruckRentPosts] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load
  const observerRef = useRef(); // Reference for the last element

  const { token } = useAuthContext(); // Get token from context
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Function to fetch truck rent posts with pagination
  const fetchTruckRentPosts = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent fetching if already loading or no more posts
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/truck/rent/posts`, {
        params: { page, limit: 12 }, // 12 posts per page
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      // Check if there are new posts to add
      if (Array.isArray(data.truckRentPosts)) {
        setTruckRentPosts((prev) => {
          const newPosts = data.truckRentPosts.filter(
            (newPost) => !prev.some((post) => post._id === newPost._id)
          );
          return [...prev, ...newPosts];
        });
      }

      // Set whether there are more pages to fetch
      setHasMore(page < data.totalPages);
    } catch (error) {
      console.error("Error fetching truck rent posts:", error);
    }
    setLoading(false);
  }, [page, loading, hasMore, API_URL, token]);

  // Fetch posts whenever the page changes
  useEffect(() => {
    fetchTruckRentPosts();
  }, [fetchTruckRentPosts]);

  // Infinite scrolling logic using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load the next page
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
    <div className="container mx-auto max-w-6xl px-4">
      <h1 className="text-2xl font-bold mb-4">Truck Rentals</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {truckRentPosts.map((post) => (
          <div
            key={post._id}
            className="p-4 border border-gray-300 rounded-md shadow-md"
          >
            <p>
              <strong>Product:</strong> {post.productName}
            </p>
            <p>
              <strong>Amount:</strong> {post.amount}
            </p>
            <p>
              <strong>From:</strong> {post.loadDestination}
            </p>
            <p>
              <strong>To:</strong> {post.unloadDestination}
            </p>
            <div className="flex justify-center">
              <button className="px-4 py-2 bg-primary rounded-full text-quaternary font-bold mt-2">
                Offer ride
              </button>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading more posts...</p>}
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default TruckRentList;
