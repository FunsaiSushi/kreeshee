"use client";

import React from "react";
import Image from "next/image";
import Footer from "../common/Footer";

const About = () => {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl space-y-6 text-center">
          <h1 className="text-4xl font-bold text-primary">About Kreeshee</h1>
          <p className="text-lg text-gray-600">
            Welcome to{" "}
            <span className="text-brightLime font-semibold">Kreeshee</span>, the
            biggest fresh produce market in Bangladesh! At Kreeshee, we bring
            together farmers, traders, and consumers under one platform,
            providing a seamless marketplace for buying and selling fresh
            produce, renting trucks, warehouses, and hiring workers.
          </p>

          <div className="flex justify-center relative w-full h-64 md:h-96">
            <Image
              src="/kreeshee-building.jpg"
              alt="Kreeshee Marketplace"
              width={500}
              height={500}
              className="object-cover aspect-square h-64 md:h-96 rounded-3xl"
            />
          </div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-secondary">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              Our mission is to revolutionize the agriculture and logistics
              industries in Bangladesh by providing a platform where people can
              effortlessly buy and sell fresh produce, access logistics
              services, and connect with professionals and experts in
              agriculture.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-secondary">
              Services We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service 1 */}
              <div className="border rounded-lg p-4 shadow-lg">
                <h3 className="text-2xl font-semibold text-primary">
                  Fresh Produce Marketplace
                </h3>
                <p className="text-gray-600 mt-2">
                  Buy and sell a variety of fresh produce directly from local
                  farmers and traders. Our platform ensures transparency,
                  quality, and fair pricing for all your agricultural needs.
                </p>
              </div>

              {/* Service 2 */}
              <div className="border rounded-lg p-4 shadow-lg">
                <h3 className="text-2xl font-semibold text-primary">
                  Truck Rental Service
                </h3>
                <p className="text-gray-600 mt-2">
                  Rent trucks to transport your goods efficiently across the
                  country. Truck owners can also browse rental posts and make
                  offers, ensuring a smooth logistics process.
                </p>
              </div>

              {/* Service 3 */}
              <div className="border rounded-lg p-4 shadow-lg">
                <h3 className="text-2xl font-semibold text-primary">
                  Warehouse Rental
                </h3>
                <p className="text-gray-600 mt-2">
                  Need storage for your produce? Rent warehouses that meet your
                  needs. Kreeshee offers a wide selection of warehouses for
                  short-term and long-term use.
                </p>
              </div>

              {/* Service 4 */}
              <div className="border rounded-lg p-4 shadow-lg">
                <h3 className="text-2xl font-semibold text-primary">
                  Hire Workers
                </h3>
                <p className="text-gray-600 mt-2">
                  Find skilled workers to help with farming, loading, unloading,
                  or transporting your goods. Hire workers directly through the
                  platform for any agricultural or logistical needs.
                </p>
              </div>

              {/* Service 5 */}
              <div className="border rounded-lg p-4 shadow-lg">
                <h3 className="text-2xl font-semibold text-primary">
                  Expert Help
                </h3>
                <p className="text-gray-600 mt-2">
                  Connect with agriculture or logistics professionals and
                  experts to get advice, solve problems, or optimize your
                  business operations.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-secondary">
              Why Choose Kreeshee?
            </h2>
            <ul className="text-left text-gray-600 list-disc list-inside">
              <li>Largest fresh produce marketplace in Bangladesh.</li>
              <li>Easy access to trucks, warehouses, and workers.</li>
              <li>Trusted platform with secure payments and verified users.</li>
              <li>
                Get expert advice from professionals in the agriculture and
                logistics sectors.
              </li>
              <li>
                Comprehensive and user-friendly platform for all your
                agricultural and logistical needs.
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
