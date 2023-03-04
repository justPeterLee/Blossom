import { Fragment } from "react";
import styles from "./Layout.module.css";

import Menu from "./Menu/Menu";
import PlusButton from "./PlusButton/PlusButton";

import { HiOutlineUserCircle } from "react-icons/hi";
export default function Layout(props) {
  return (
    <Fragment>
      <header className={styles.container} style={props.auth ? {} : {display:"none"}}>

        <div className={styles.topContainer}>
          <div className={styles.iconContainer}>
          <Menu />
          </div>

          <div className={styles.textContainer}>
            <p style={{margin:"0"}}>Page Title</p>
          </div>
          
          <div className={styles.iconContainer}>
            <HiOutlineUserCircle size={35} className={styles.user} />
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <PlusButton />
        </div>
      </header>
      <main>{props.children}</main>
    </Fragment>
  );
}
