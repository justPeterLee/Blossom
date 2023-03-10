import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./GardenItem.module.css";
import { BsArrowRight } from "react-icons/bs";
import { RxDotsVertical } from "react-icons/rx";

import GardenEdit from "../GardenEdit/GardenEdit";

export default function GardenItem({ id, name, type, num, create }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [overMenu, setOverMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const modalState = useSelector((store) => store.functional.modalActive);

  async function gotoGarden() {
    const dontAllow = await isModalActive();
    if (!dontAllow) {
      if (!overMenu) {
        if (!showEdit) {
          history.push(`/garden/filter/${id}`);
        }
      }
    }
  }

  async function showEditMenu() {
    await dispatch({ type: "SET_MODAL_ACTIVE" });
    if (!modalState) {
      setShowEdit(!showEdit);
    }
  }

  const isModalActive = () => {
    if (showEdit) {
      return true;
    } else if (!showEdit) {
      return false;
    }
  };

  useEffect(() => {
    if (!modalState) {
      setShowEdit(false);
    }
  }, [modalState]);

  return (
    <div className={`${styles.container} clickable`} onClick={gotoGarden}>
      <div className={styles.title}>
        <p>{name}</p>
        <RxDotsVertical
          size={20}
          className={styles.dotMenu}
          onMouseOver={() => {
            setOverMenu(true);
            console.log(overMenu);
          }}
          onMouseOut={() => {
            setOverMenu(false);
            console.log(overMenu);
          }}
          onClick={showEditMenu}
        />
        <div
          className={
            showEdit
              ? `${styles.garden_edit_container} ${styles.show}`
              : `${styles.garden_edit_container} ${styles.hide}`
          }
        >
          <GardenEdit id={id}/>
        </div>
      </div>

      <div className={styles.description}>
        <p>type: {type}</p>
        <p>plants: {num}</p>
      </div>

      <div className={styles.extraDescription}>
        <div className={styles.date}>
          <p>created: {create}</p>
        </div>

        <div className={styles.arrow}></div>
        <BsArrowRight className={styles.arrow} />
      </div>
    </div>
  );
}
