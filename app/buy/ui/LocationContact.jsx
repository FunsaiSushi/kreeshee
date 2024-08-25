import styles from "./DemandForm.module.css";

const LocationContact = ({ formData, handleChange }) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="deliveryLocation" className={styles.label}>
          Delivery Location
        </label>
        <input
          type="text"
          id="deliveryLocation"
          name="deliveryLocation"
          value={formData.deliveryLocation}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="contactInfo" className={styles.label}>
          Contact Info
        </label>
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
    </>
  );
};

export default LocationContact;
