import styles from "./GardenEdit.module.css";
import { FaTrash } from "react-icons/fa";

import { useDispatch } from "react-redux";
export default function GardenEdit({id}) {
  const dispatch = useDispatch()

  const deleteGardenHandler = () => {
    console.log(id);
    dispatch({type:"DELETE_MODAL_GARDEN", payload: id});
  }
  return (
    <>
      <button className={styles.delete_container} onClick={deleteGardenHandler}>
        <FaTrash className={styles.detele_icon} color={"rgb(255, 0, 0)"}/>
        <p>delete</p>
      </button>
    </>
  );
}
