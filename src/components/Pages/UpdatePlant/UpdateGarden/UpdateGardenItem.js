import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";
import styles from "./UpdateGardenItem.module.css";
export default function UpdateGardenItem(props) {
  const dispatch = useDispatch()
  const modalState = useSelector((store) => store.functional.modalActive);

  const [isChecked, setIsChecked] = useState(false);
  const gardenSelectItem = () => {
    console.log("hello");
    
    setIsChecked(!isChecked)
    props.newGardenId({
      id: props.id,
      name: props.gardenName
    })

    setTimeout(()=>{dispatch({ type: "RESET_ALL_MODAL" });setIsChecked(false)},100)
  };

  useEffect(()=>{
    setTimeout(()=>{ setIsChecked(false);},50)
  },[modalState])
  return (
    <button className={styles.item} onClick={gardenSelectItem}>
      <p>{props.gardenName}</p>
      {isChecked ? (
        <ImRadioChecked className={styles.icon} />
      ) : (
        <ImRadioUnchecked className={styles.icon} />
      )}
    </button>
  );
}
