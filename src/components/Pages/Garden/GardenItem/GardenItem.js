import { useHistory } from "react-router-dom";
import { useState } from "react";

import styles from "./GardenItem.module.css";
import { BsArrowRight } from "react-icons/bs";
import { RxDotsVertical } from "react-icons/rx";

export default function GardenItem({ id, name, type, num, create }) {
  const history = useHistory();
  const [overMenu, setOverMenu] = useState(false);
  const gotoGarden = () => {
    if (!overMenu) {
      history.push(`/garden/filter/${id}`);
    }
  };
  return (
    <div className={`${styles.container} clickable`} onClick={gotoGarden}>
      <div className={styles.title}>
        <p>{name}</p>
        <RxDotsVertical
          size={20}
          className={styles.dotMenu}
          onMouseOver={() => {
            setOverMenu(true);
            console.log(overMenu)
          }}
          onMouseOut={() => {
            setOverMenu(false);
            console.log(overMenu)
          }}

          onClick={()=>{console.log("hello world")}}
        />
      </div>

      <div className={styles.description}>
        <p>type: {type}</p>
        <p>plants: {num}</p>
      </div>

      <div className={styles.extraDescription}>
        <div className={styles.date}>
          <p>created: {create}</p>
        </div>

        <div className={styles.arrow}></div>
        <BsArrowRight className={styles.arrow} />
      </div>
    </div>
  );
}
