import { useState } from "react";
import styles from "./UpdateGarden.module.css";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";
import UpdateGardenItem from "./UpdateGardenItem/UpdateGardenItem";
export default function UpdateGarden({ gardens }) {
  const [isChecked, setIsChecked] = useState(false);
  const gardenSelectItem = () => {
    console.log("hello");
    setIsChecked(!isChecked);
  };
  return (
    <div className={styles.container}>
      {gardens.map((garden) => {
        return <UpdateGardenItem gardenName={garden.garden_name} id={garden.garden_table_id} key={garden.garden_table_id}/>;
      })}
    </div>
  );
}
