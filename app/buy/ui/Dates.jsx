import styles from "./DemandForm.module.css";

const Dates = ({ formData, handleChange }) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="demandStartDate" className={styles.label}>
          Demand Start Date
        </label>
        <input
          type="date"
          id="demandStartDate"
          name="demandStartDate"
          value={formData.demandStartDate}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="demandDeadline" className={styles.label}>
          Demand Deadline
        </label>
        <input
          type="date"
          id="demandDeadline"
          name="demandDeadline"
          value={formData.demandDeadline}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
    </>
  );
};

export default Dates;
