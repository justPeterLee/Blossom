import styles from "./FeatureGardenItem.module.css";
import { useHistory } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";


export default function FeatureGardenItem({ id, name, type, num, create, color }) {
  const history = useHistory();

  function gotoGarden() {
    history.push(`/garden/filter/${id}`);
  }

  return (
    <div className={`${styles.container} clickable`} onClick={gotoGarden} style={{backgroundColor: `${color}`}}>
      <div className={styles.title}>
        <p>{name}</p>
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
