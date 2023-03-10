import styles from "./GardenEdit.module.css";
import { FaTrash } from "react-icons/fa";
export default function GardenEdit() {
  const deleteGardenHandler = (props) => {

  }
  return (
    <>
      <button className={styles.delete_container} onClick={()=>{console.log('hello button')}}>
        <FaTrash className={styles.detele_icon} color={"rgb(255, 0, 0)"}/>
        <p>delete</p>
      </button>
    </>
  );
}
