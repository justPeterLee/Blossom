import styles from "./ColorTheme.module.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
export default function ColorTheme() {
  const dispatch = useDispatch();
  const [isClickedOne, setIsClickedOne] = useState(false);
  const [isClickedTwo, setIsClickedTwo] = useState(false);
  const [isClickedThree, setIsClickedThree] = useState(false);
  const [isClickedFour, setIsClickedFour] = useState(false);

  const selectedColor = (e) => {
    const color = e.target.parentElement.dataset.id;
    console.log(color);
    switch (color) {
      case "rgb(220,220,140)":
        setIsClickedOne(true);
        setIsClickedTwo(false);
        setIsClickedThree(false);
        setIsClickedFour(false);
        dispatch({ type: "CHANGE_GARDEN_THEME", payload: color });
        return;
      case "rgb(140,220,140)":
        setIsClickedOne(false);
        setIsClickedTwo(true);
        setIsClickedThree(false);
        setIsClickedFour(false);
        dispatch({ type: "CHANGE_GARDEN_THEME", payload: color });
        return;
      case "rgb(140,140,220)":
        setIsClickedOne(false);
        setIsClickedTwo(false);
        setIsClickedThree(true);
        setIsClickedFour(false);
        dispatch({ type: "CHANGE_GARDEN_THEME", payload: color });
        return;
      case "rgb(245,245,245)":
        setIsClickedOne(false);
        setIsClickedTwo(false);
        setIsClickedThree(false);
        setIsClickedFour(true);
        dispatch({ type: "CHANGE_GARDEN_THEME", payload: color });
        return;
      default:
        return null;
    }
  };
  return (
    <div className={styles.container}>
      <div
        data-id="rgb(220,220,140)"
        className={
          !isClickedOne
          ? ``
          : `${styles.clicked}`
        }
      >
        <div
          className={`${styles.colorBlock} ${styles.colorOne}`}
          onClick={(event) => {
            selectedColor(event);
          }}
        ></div>
      </div>




      <div
        data-id="rgb(140,220,140)"
        className={
          !isClickedTwo
          ? ``
          : `${styles.clicked}`
        }
      >
        <div
          className={`${styles.colorBlock} ${styles.colorTwo}`}
          onClick={(event) => {
            selectedColor(event);
          }}
        ></div>
      </div>




      <div
        data-id="rgb(140,140,220)"
        className={
          !isClickedThree
          ? ``
          : `${styles.clicked}`
        }
      >
        <div
          className={`${styles.colorBlock} ${styles.colorThree}`}
          onClick={(event) => {
            selectedColor(event);
          }}
        ></div>
      </div>




      <div
        data-id="rgb(245,245,245)"
        className={
          !isClickedFour
            ? ``
            : `${styles.clicked}`
        }
      >

        <div
          className={`${styles.colorBlock} ${styles.colorFour}`}
          onClick={(event) => {
            selectedColor(event);
          }}
        ></div>
      </div>



    </div>
  );
}
