import { useState } from "react";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";
import styles from "./UpdateGardenItem.module.css";
export default function UpdateGardenItem({ gardenName }) {
  const [isChecked, setIsChecked] = useState(false);
  const gardenSelectItem = () => {
    console.log("hello");
    setIsChecked(!isChecked);
  };
  return (
    <button className={styles.item} onClick={gardenSelectItem}>
      <p>{gardenName}</p>
      {isChecked ? (
        <ImRadioChecked className={styles.icon} />
      ) : (
        <ImRadioUnchecked className={styles.icon} />
      )}
    </button>
  );
}
