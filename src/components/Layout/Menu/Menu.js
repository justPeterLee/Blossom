import { useState } from "react";
import styles from "./Menu.module.css";
import { RiHomeLine } from "react-icons/ri";
import { BiSun } from "react-icons/bi";
import { TbPlant } from "react-icons/tb";
import { SlNotebook } from "react-icons/sl";

import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function Menu() {
  const dispatch = useDispatch();
  const history = useHistory();

  const modalState = useSelector((store) => store.functional.modalColor);

  // to change burger classes
  const [isBurgerClicked, setBurgerClicked] = useState(false);

  const [homeActive, setHomeActive] = useState(true);
  const [gardenActive, setGardenActive] = useState(false);
  const [plantsActive, setPlantsActive] = useState(false);
  const [taskActive, setTaskActive] = useState(false);

  const [isHover, setIsHover] = useState(false)

  // toggle burger menu change
  const updateMenu = async () => {
    await dispatch({ type: "MODAL_COLOR_CLICKED" });
    if (!modalState) {
      setBurgerClicked(!isBurgerClicked);
    }
    else if(modalState){
      setBurgerClicked(false)
      dispatch({ type: "RESET_ALL_MODAL" })
    }

  };


  useEffect(()=>{
    if(!modalState){
      setBurgerClicked(false);
      dispatch({ type: "RESET_ALL_MODAL" })
    }
  }, [modalState])

  return (
    <div className={styles.menuContainer} style={!isBurgerClicked ? {zIndex:'6'}: {}}>

      {/* three bars (burger menu) */}
      <div className={styles.linesContainer} onClick={updateMenu}>
        <div
          className={
            !isBurgerClicked
              ? `${styles.burger_class} ${styles.unClicked}`
              : `${styles.burger_class} ${styles.clicked} ${styles.clickable}`
          }
        ></div>
        <div
          className={
            !isBurgerClicked
              ? `${styles.burger_class} ${styles.unClicked}`
              : `${styles.burger_class} ${styles.clicked}`
          }
        ></div>
        <div
          className={
            !isBurgerClicked
              ? `${styles.burger_class} ${styles.unClicked}`
              : `${styles.burger_class} ${styles.clicked}`
          }
        ></div>
      </div>


      {/* home icon */}
      <div className={styles.iconContainer}>
        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon}`
          }
          style={homeActive ? {backgroundColor: 'darkgrey'} : {}} 
          onClick={() => {
            setHomeActive(true);
            setGardenActive(false);
            setPlantsActive(false);
            setTaskActive(false);
            history.push('/');
            setBurgerClicked(false)
            dispatch({ type: "RESET_ALL_MODAL" })
          }}
        >
          <div className={`${styles.icons}`}>
            <RiHomeLine className={styles.home} size={40} />
          </div>
          <p style={{fontSize: "24px"}}>home</p>
        </div>


        {/* garden icon */}
        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon} `
          }
          style={gardenActive ? {backgroundColor: 'darkgrey'} : {}} 
          onClick={() => {
            setHomeActive(false);
            setGardenActive(true);
            setPlantsActive(false);
            setTaskActive(false);
            history.push('/garden');
            setBurgerClicked(false)
            dispatch({ type: "RESET_ALL_MODAL" })
          }}
        >
          <div className={`${styles.icons}`}>
            <BiSun className={styles.garden} size={40} />
          </div>
          <p style={{fontSize: "24px"}}>garden</p>
        </div>


        {/* Plant Icon */}
        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon}`
          }
          style={plantsActive ? {backgroundColor: 'darkgrey'} : {}} 
          onClick={() => {
            setHomeActive(false);
            setGardenActive(false);
            setPlantsActive(true);
            setTaskActive(false);
            history.push('/plants');
            setBurgerClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" })
            
          }}
        >
          <div className={`${styles.icons}`}>
            <TbPlant className={styles.garden} size={40} />
          </div>
          <p style={{fontSize: "24px"}}>plants</p>
        </div>

        {/* task icon */}
        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon}`
          }
          style={taskActive ? {backgroundColor: 'darkgrey'} : {}} 
          onClick={() => {
            setHomeActive(false);
            setGardenActive(false);
            setPlantsActive(false);
            setTaskActive(true);
            history.push('/tasks');
            setBurgerClicked(false)
            dispatch({ type: "RESET_ALL_MODAL" })
          }}
        >
          <div className={`${styles.icons}`}>
            <SlNotebook className={styles.garden} size={40} />
          </div>
          <p style={{fontSize: "24px"}}>tasks</p>
        </div>

      </div>
    </div>
  );
}
