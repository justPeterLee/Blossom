import styles from "./GardenEdit.module.css";
import { FaTrash } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
export default function GardenEdit({ id }) {
  const dispatch = useDispatch();
  const garden = useSelector((store) => store.garden.gardenReducer);


  const deleteGardenHandler = () => {
    console.log(id);
    dispatch({ type: "DELETE_MODAL_GARDEN", payload: id });
    dispatch({ type: "FETCH_GARDEN" });
    dispatch({ type: "RESET_ALL_MODAL" });
  };
  if(garden.length !== garden.length){
    dispatch({ type: "FETCH_GARDEN" });
    return <p>loading...</p>
  }
  return (
    <>
      <button className={styles.delete_container} onClick={deleteGardenHandler}>
        <FaTrash className={styles.detele_icon} color={"rgb(255, 0, 0)"} />
        <p>delete</p>
      </button>
    </>
  );
}
