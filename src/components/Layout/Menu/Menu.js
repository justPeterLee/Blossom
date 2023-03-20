import { useState } from "react";
import styles from "./Menu.module.css";
import { RiHomeLine } from "react-icons/ri";
import { BiSun } from "react-icons/bi";
import { TbPlant } from "react-icons/tb";
import { SlNotebook } from "react-icons/sl";
import { AiOutlineUser } from "react-icons/ai";

import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function Menu(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const modalState = useSelector((store) => store.functional.modalColor);

  // to change burger classes
  const [isBurgerClicked, setBurgerClicked] = useState(false);

  const [homeActive, setHomeActive] = useState(true);
  const [gardenActive, setGardenActive] = useState(false);
  const [plantsActive, setPlantsActive] = useState(false);
  const [taskActive, setTaskActive] = useState(false);
  const [userActive, setUserActive] = useState(false);

  const [isHover, setIsHover] = useState(false);

  // toggle burger menu change
  const updateMenu = async () => {
    await dispatch({ type: "MODAL_COLOR_CLICKED" });
    if (!modalState) {
      setBurgerClicked(!isBurgerClicked);
    } else if (modalState) {
      setBurgerClicked(false);
      dispatch({ type: "RESET_ALL_MODAL" });
    }
  };

  useEffect(() => {
    if (!modalState) {
      setBurgerClicked(false);
      dispatch({ type: "RESET_ALL_MODAL" });
    }

    if(!props.auth){
      setHomeActive(true)
      setGardenActive(false)
      setPlantsActive(false)
      setTaskActive(false)
      setUserActive(false)
    }
  }, [modalState, props.auth]);

  return (
    <div
      className={styles.menuContainer}
      style={!isBurgerClicked ? { zIndex: "6" } : {}}
    >
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
          style={homeActive ? { backgroundColor: "rgb(200,200,200)" } : {}}
          onClick={() => {
            setHomeActive(true);
            setGardenActive(false);
            setPlantsActive(false);
            setTaskActive(false);
            setUserActive(false);

            history.push("/");
            setBurgerClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" });
          }}
        >
          <div className={`${styles.icons}`}>
            <RiHomeLine className={styles.home} size={40} />
          </div>
          <p style={{ fontSize: "24px" }}>home</p>
        </div>

        {/* garden icon */}
        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon} `
          }
          style={gardenActive ? { backgroundColor: "rgb(200,200,200)" } : {}}
          onClick={() => {
            setHomeActive(false);
            setGardenActive(true);
            setPlantsActive(false);
            setTaskActive(false);
            setUserActive(false);

            history.push("/garden");
            setBurgerClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" });
          }}
        >
          <div className={`${styles.icons}`}>
            <BiSun className={styles.garden} size={40} />
          </div>
          <p style={{ fontSize: "24px" }}>garden</p>
        </div>

        {/* Plant Icon */}
        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon}`
          }
          style={plantsActive ? { backgroundColor: "rgb(200,200,200)" } : {}}
          onClick={() => {
            setHomeActive(false);
            setGardenActive(false);
            setPlantsActive(true);
            setTaskActive(false);
            setUserActive(false);

            history.push("/plants");
            setBurgerClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" });
          }}
        >
          <div className={`${styles.icons}`}>
            <TbPlant className={styles.garden} size={40} />
          </div>
          <p style={{ fontSize: "24px" }}>plants</p>
        </div>

        {/* task icon */}
        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon}`
          }
          style={taskActive ? { backgroundColor: "rgb(200,200,200)" } : {}}
          onClick={() => {
            setHomeActive(false);
            setGardenActive(false);
            setPlantsActive(false);
            setUserActive(false);

            setTaskActive(true);
            history.push("/tasks");
            setBurgerClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" });
          }}
        >
          <div className={`${styles.icons}`}>
            <SlNotebook className={styles.garden} size={40} />
          </div>
          <p style={{ fontSize: "24px" }}>tasks</p>
        </div>

        <div
          className={
            !isBurgerClicked
              ? `${styles.iconTextContainer} ${styles.unClickedIcon}`
              : `${styles.iconTextContainer} ${styles.ClickedIcon}`
          }
          style={userActive ? { backgroundColor: "rgb(200,200,200)" } : {}}
          onClick={() => {
            setHomeActive(false);
            setGardenActive(false);
            setPlantsActive(false);
            setTaskActive(false);
            setUserActive(true);
            history.push("/user");
            setBurgerClicked(false);
            dispatch({ type: "RESET_ALL_MODAL" });
          }}
        >
          <div className={`${styles.icons}`}>
            <AiOutlineUser className={styles.user} size={40} />
          </div>
          <p style={{ fontSize: "24px" }}>user</p>
        </div>
      </div>

      <div className={
            !isBurgerClicked
              ? `${styles.backdropMenu} ${styles.unClickedBack}`
              : `${styles.backdropMenu} ${styles.ClickedBack}`
          }>

      </div>
    </div>
  );
}
