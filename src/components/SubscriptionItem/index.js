import React from "react";
import styles from "./styles.module.css";

const SubsriptionItem = ({ name, description, currentPackage, subscribe }) => {
  return (
    <div className={styles.subscriptionItem}>
      <div>
        <h5>{name}</h5>
        <h5>{description}</h5>
      </div>
      <button
        onClick={subscribe}
        className={`${styles.subscriptionItem__button} ${
          currentPackage && styles.subscriptionItem__buttonDisabled
        }`}
      >
        {currentPackage ? "Current Package" : "Subscribe"}
      </button>
    </div>
  );
};

export default SubsriptionItem;
