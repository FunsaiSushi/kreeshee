"use client";

import React from "react";
import Image from "next/image";
import Footer from "../common/Footer";

const About = () => {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-5xl space-y-8 text-center">
          <h1 className="text-4xl font-bold text-primary">About Kreeshee</h1>
          <p className="text-lg text-gray-700">
            Welcome to{" "}
            <span className="text-brightLime font-semibold">Kreeshee</span>, the
            largest fresh produce marketplace in Bangladesh! We connect farmers,
            traders, and consumers, offering a seamless platform for buying and
            selling fresh produce, renting trucks, booking warehouses, and
            hiring skilled workers.
          </p>

          <div className="relative w-full h-64 md:h-96 flex justify-center">
            <Image
              src="/kreeshee-building.jpg"
              alt="Kreeshee Marketplace"
              width={500}
              height={500}
              className="object-cover h-64 md:h-96 rounded-3xl shadow-lg"
            />
          </div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-secondary">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              At Kreeshee, our mission is to transform Bangladesh’s agriculture
              and logistics industries by creating a platform where people can
              easily trade fresh produce, access logistics services, and connect
              with agricultural experts and professionals.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-secondary">
              Services We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Fresh Produce Marketplace",
                  description:
                    "Trade a variety of fresh produce directly from local farmers and traders. Our platform ensures transparency, quality, and fair pricing for your agricultural needs.",
                },
                {
                  title: "Truck Rental Service",
                  description:
                    "Rent trucks for efficient goods transportation across the country. Truck owners can browse rental posts and make offers, ensuring smooth logistics.",
                },
                {
                  title: "Warehouse Rental",
                  description:
                    "Need storage? Rent warehouses tailored to your requirements. We offer a selection of options for both short-term and long-term use.",
                },
                {
                  title: "Hire Workers",
                  description:
                    "Hire skilled workers for farming, loading, unloading, or transporting goods directly through the platform to meet your agricultural or logistical needs.",
                },
                {
                  title: "Expert Help",
                  description:
                    "Connect with professionals and experts in agriculture or logistics to get advice, solve challenges, and optimize your business operations.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 shadow-lg bg-white"
                >
                  <h3 className="text-2xl font-semibold text-primary">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-secondary">
              Why Choose Kreeshee?
            </h2>
            <ul className="text-left text-gray-700 list-disc list-inside">
              <li>Bangladesh's largest fresh produce marketplace.</li>
              <li>Convenient access to trucks, warehouses, and workers.</li>
              <li>
                A trusted platform with secure payments and verified users.
              </li>
              <li>
                Expert advice from agriculture and logistics professionals.
              </li>
              <li>
                A comprehensive, user-friendly solution for all agricultural and
                logistical needs.
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
