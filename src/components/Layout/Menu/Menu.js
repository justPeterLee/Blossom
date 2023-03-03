import { useState } from "react";
import styles from "./Menu.module.css";
import { RiHomeLine } from "react-icons/ri";
import { BiSun } from "react-icons/bi";
import { TbPlant } from "react-icons/tb";
import { SlNotebook } from "react-icons/sl";

import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
export default function Menu() {
  const history = useHistory();

  // to change burger classes
  const [isBurgerClicked, setBurgerClicked] = useState(false);

  const [homeActive, setHomeActive] = useState(true);
  const [gardenActive, setGardenActive] = useState(false);
  const [plantsActive, setPlantsActive] = useState(false);
  const [taskActive, setTaskActive] = useState(false);

  const [isHover, setIsHover] = useState(false)

  // toggle burger menu change
  const updateMenu = () => {
    setBurgerClicked(!isBurgerClicked);
  };




  return (
    <div className={styles.menuContainer} onMouseEnter={()=>{setIsHover(true); console.log(isHover)}} onMouseLeave={()=>{setIsHover(false); console.log(isHover)}}>
      <div className={styles.linesContainer} onClick={updateMenu}>
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
        <div
          className={
            !isBurgerClicked
              ? `${styles.burger_class} ${styles.unClicked}`
              : `${styles.burger_class} ${styles.clicked}`
          }
        ></div>
      </div>

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
          }}
        >
          <div className={`${styles.icons}`}>
            <RiHomeLine className={styles.home} size={40} />
          </div>
          <p style={{fontSize: "24px"}}>home</p>
        </div>

        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon}`
          }
          style={gardenActive ? {backgroundColor: 'darkgrey'} : {}} 
          onClick={() => {
            setHomeActive(false);
            setGardenActive(true);
            setPlantsActive(false);
            setTaskActive(false);
            history.push('/garden');
            setBurgerClicked(false)
          }}
        >
          <div className={`${styles.icons}`}>
            <BiSun className={styles.garden} size={40} />
          </div>
          <p style={{fontSize: "24px"}}>garden</p>
        </div>

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
            
          }}
        >
          <div className={`${styles.icons}`}>
            <TbPlant className={styles.garden} size={40} />
          </div>
          <p style={{fontSize: "24px"}}>plants</p>
        </div>

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
