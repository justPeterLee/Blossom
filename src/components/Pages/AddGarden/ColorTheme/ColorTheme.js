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
    const color = e.target.dataset.id;
    switch (color) {
      case "one":
        setIsClickedOne(true);
        setIsClickedTwo(false);
        setIsClickedThree(false);
        setIsClickedFour(false);
        dispatch({type:"CHANGE_GARDEN_THEME", payload:color})
        return;
      case "two":
        setIsClickedOne(false);
        setIsClickedTwo(true);
        setIsClickedThree(false);
        setIsClickedFour(false);
        dispatch({type:"CHANGE_GARDEN_THEME", payload:color})
        return;
      case "three":
        setIsClickedOne(false);
        setIsClickedTwo(false);
        setIsClickedThree(true);
        setIsClickedFour(false);
        dispatch({type:"CHANGE_GARDEN_THEME", payload:color})
        return;
      case "four":
        setIsClickedOne(false);
        setIsClickedTwo(false);
        setIsClickedThree(false);
        setIsClickedFour(true);
        dispatch({type:"CHANGE_GARDEN_THEME", payload:color})
        return;
      default:
        return null;
    }


  };
  return (
    <div className={styles.container}>
      <div
        data-id="one"
        className={
          !isClickedOne
            ? `${styles.colorBlock} ${styles.colorOne}`
            : `${styles.colorBlock} ${styles.colorOne} ${styles.clicked}`
        }
        onClick={(event) => {
          selectedColor(event);
        }}
      ></div>

      <div
      data-id="two"
        className={
          !isClickedTwo
            ? `${styles.colorBlock} ${styles.colorTwo}`
            : `${styles.colorBlock} ${styles.colorTwo} ${styles.clicked}`
        }
        onClick={(event) => {
            selectedColor(event);
          }}
      ></div>

      <div
      data-id="three"
        className={
          !isClickedThree
            ? `${styles.colorBlock} ${styles.colorThree}`
            : `${styles.colorBlock} ${styles.colorThree} ${styles.clicked}`
        }
        onClick={(event) => {
            selectedColor(event);
          }}
      ></div>

      <div
      data-id="four"
        className={
          !isClickedFour
            ? `${styles.colorBlock} ${styles.colorFour}`
            : `${styles.colorBlock} ${styles.colorFour} ${styles.clicked}`
        }
        onClick={(event) => {
            selectedColor(event);
          }}
      ></div>
    </div>
  );
}
