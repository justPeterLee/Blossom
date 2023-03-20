import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./PlusButton.module.css";

import { AiFillPlusCircle } from "react-icons/ai";
import { BiSun } from "react-icons/bi";
import { TbPlant } from "react-icons/tb";
import { SlNotebook } from "react-icons/sl";
import { BsPlusLg } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function PlusButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const modalState = useSelector((store) => store.functional.modalColor);

  const [buttonClicked, setButtonClicked] = useState(false);
  const [gardenActive, setGardenActive] = useState(false);
  const [plantsActive, setPlantsActive] = useState(false);
  const [taskActive, setTaskActive] = useState(false);

  const plusClicked = async () => {
    await dispatch({ type: "MODAL_COLOR_CLICKED" });
    if (!modalState) {
      setButtonClicked(!buttonClicked);
    } else if (modalState) {
      setButtonClicked(false);
      dispatch({ type: "RESET_ALL_MODAL" });
    }
  };

  useEffect(() => {
    if (!modalState) {
      setButtonClicked(false);
      dispatch({ type: "RESET_ALL_MODAL" });
    }
  }, [modalState]);
  return (
    <div className={styles.container}>
      <div className={styles.iconButtonContainer}>
        <div
          className={
            !buttonClicked
              ? `${styles.addButtons} ${styles.iconButton_unClicked}`
              : `${styles.addButtons} ${styles.iconButton_Clicked}`
          }
          // style={gardenActive ? {backgroundColor: "rgb(100,100,100)"} : {}}
          // onClick={()=>{setGardenActive(!gardenActive)}}
          onClick={() => {
            setButtonClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" });
            history.push("/garden/create");
          }}
        >
          <p style={{ width: "8rem", fontSize: "24px" }}>add garden</p>
          <div className={styles.addNewButton}>
            <BiSun size={40} className={styles.iconButton} />
            <BsPlusLg size={12} className={styles.iconButton} />
          </div>
        </div>

        <div
          className={
            !buttonClicked
              ? `${styles.addButtons} ${styles.iconButton_unClicked}`
              : `${styles.addButtons} ${styles.iconButton_Clicked}`
          }
          onClick={() => {
            setButtonClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" });
            history.push("/plant/create");
          }}
        >
          <p style={{ width: "6.6rem", fontSize: "24px" }}>add plant</p>
          <div className={styles.addNewButton}>
            <TbPlant size={40} className={styles.iconButton} />
            <BsPlusLg size={12} className={styles.iconButton} />
          </div>
        </div>

        <div
          className={
            !buttonClicked
              ? `${styles.addButtons} ${styles.iconButton_unClicked}`
              : `${styles.addButtons} ${styles.iconButton_Clicked}`
          }
          onClick={() => {
            setButtonClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" });
          }}
        >
          <p style={{ width: "6rem", fontSize: "24px" }}>add task</p>
          <div className={styles.addNewButton}>
            <SlNotebook size={40} className={styles.iconButton} />
            <BsPlusLg size={12} className={styles.iconButton} />
          </div>
        </div>
      </div>

      <div className={styles.addMainButton}>
        <AiFillPlusCircle
          size={50}
          className={
            !buttonClicked ? styles.plus_unClicked : styles.plus_Clicked
          }
          onClick={plusClicked}
        />
      </div>

      <div className={
            !buttonClicked
              ? `${styles.backdropMenu} ${styles.unClickedBack}`
              : `${styles.backdropMenu} ${styles.ClickedBack}`
          }>

      </div>
    </div>
  );
}
