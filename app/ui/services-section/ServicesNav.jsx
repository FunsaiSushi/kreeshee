"use client";

import { useState, useEffect } from "react";
import { FaTruck, FaWarehouse } from "react-icons/fa6";
import { GrUserWorker, GrUserExpert } from "react-icons/gr";
import styles from "./ServicesNav.module.css"; // Import the CSS module

export default function ServicesNav({ activeService, setActiveService }) {
  const [animationClass, setAnimationClass] = useState(styles.startRentTruck);

  useEffect(() => {
    switch (activeService) {
      case "rentTruck":
        setAnimationClass(styles.startRentTruck);
        break;
      case "hireWorkers":
        setAnimationClass(styles.startHireWorkers);
        break;
      case "expertHelp":
        setAnimationClass(styles.startExpertHelp);
        break;
      case "warehouse":
        setAnimationClass(styles.startWarehouse);
        break;
      default:
        setAnimationClass(styles.startRentTruck);
    }
  }, [activeService]);

  return (
    <nav className={styles.nav}>
      <div
        className={`${styles.navLink} ${
          activeService === "rentTruck" ? styles.active : ""
        }`}
        onClick={() => setActiveService("rentTruck")}
      >
        <FaTruck size={18} />
        <p
          className={`${
            activeService === "rentTruck" ? "" : "hidden"
          } sm:block`}
        >
          Rent a truck
        </p>
      </div>

      <div
        className={`${styles.navLink} ${
          activeService === "hireWorkers" ? styles.active : ""
        }`}
        onClick={() => setActiveService("hireWorkers")}
      >
        <GrUserWorker size={18} />
        <p
          className={`${
            activeService === "hireWorkers" ? "" : "hidden"
          } sm:block`}
        >
          Hire workers
        </p>
      </div>

      <div
        className={`${styles.navLink} ${
          activeService === "expertHelp" ? styles.active : ""
        }`}
        onClick={() => setActiveService("expertHelp")}
      >
        <GrUserExpert size={18} />
        <p
          className={`${
            activeService === "expertHelp" ? "" : "hidden"
          } sm:block`}
        >
          Expert help
        </p>
      </div>

      <div
        className={`${styles.navLink} ${
          activeService === "warehouse" ? styles.active : ""
        }`}
        onClick={() => setActiveService("warehouse")}
      >
        <FaWarehouse size={18} />
        <p
          className={`${
            activeService === "warehouse" ? "" : "hidden"
          } sm:block`}
        >
          Storage
        </p>
      </div>

      <div className={`${styles.animation} ${animationClass}`}></div>
    </nav>
  );
}
