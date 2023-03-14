import { Fragment } from "react";
import styles from "./Layout.module.css";

import Menu from "./Menu/Menu";
import PlusButton from "./PlusButton/PlusButton";

import { HiOutlineUserCircle } from "react-icons/hi";

import { useSelector, useDispatch } from "react-redux";
export default function Layout(props) {
  const dispatch = useDispatch();
  const hideMenu = useSelector(store=>store.functional.menuState)
  return (
    <Fragment>
      <header className={hideMenu ? `${styles.container}` : `${styles.container} ${styles.hideMenu}`} style={props.auth ? {} : {display:"none"}}>

        <div className={styles.topContainer}>
          <div className={styles.iconContainer}>
          <Menu />
          </div>

          {/* <div className={styles.textContainer}>
            <p style={{margin:"0"}}>Page Title</p>
          </div> */}
          
          <div className={styles.iconContainer}>
            
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <PlusButton />
        </div>
      </header>
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
}
