import React from "react";
import styles from "./DemandForm.module.css";

const Notes = ({ formData, handleChange }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="demandNotes" className={styles.label}>
        Demand Notes
      </label>
      <textarea
        id="demandNotes"
        name="demandNotes"
        placeholder="Quality requirements, Payment terms etc"
        value={formData.demandNotes}
        onChange={handleChange}
        className={`${styles.input} ${styles.notes}`}
      ></textarea>
    </div>
  );
};

export default Notes;
