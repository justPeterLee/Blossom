import styles from './ExploreGardenItem.module.css';
import { useHistory } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";


export default function ExploreGardenItem({ id, name, type, num, create }) {
  const history = useHistory();

  function gotoGarden() {
    history.push(`/garden/feature/`);
  }

  return (
    <div className={`${styles.container} clickable`} onClick={gotoGarden}>
      <div className={styles.title}>
        <p>explore more</p>
      </div>

      <div className={styles.description}>
        <p>indoor plant</p>
      </div>

      <div className={styles.extraDescription}>
        <div className={styles.arrow}></div>
        <BsArrowRight className={styles.arrow} />
      </div>
    </div>
  );
}
