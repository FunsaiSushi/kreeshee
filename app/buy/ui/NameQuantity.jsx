import styles from "./DemandForm.module.css";

const NameQuantity = ({ formData, handleChange }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Create New Demand</h2>
      <div className={styles.formGroup}>
        <label htmlFor="productName" className={styles.label}>
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Corn"
          value={formData.productName}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="quantity" className={styles.label}>
          Quantity
        </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
    </>
  );
};

export default NameQuantity;
