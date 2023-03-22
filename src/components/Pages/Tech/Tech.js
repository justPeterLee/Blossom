import styles from "./Tech.module.css";
import { useHistory } from "react-router-dom";
export default function Tech() {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <p className={styles.p} style={{ marginBottom: "1rem" }}>
        tech:
      </p>
      <p className={styles.p}>node</p>
      <p className={styles.p}>express</p>
      <p className={styles.p}>axios</p>
      <p className={styles.p}>redux-saga</p>
      <p className={styles.p}>redux</p>
      <p className={styles.p}>react</p>
      <p className={styles.p}>postgresql</p>
      <p className={styles.p}>css</p>
      <p className={styles.p}>perenualAPI</p>
      <p className={styles.p}>plant.id API</p>

      <button onClick={() => {history.push('/user')}} className={styles.user_button}> return back </button>
    </div>
  );
}
