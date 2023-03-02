import { Fragment } from "react";
import styles from "./Layout.module.css";

import Menu from "./Menu/Menu";
import PlusButton from "./PlusButton/PlusButton";

import { BiUserCircle } from "react-icons/bi";
export default function Layout(props) {
  return (
    <Fragment>
      <header className={styles.container}>
        <div className={styles.topContainer}>
          <Menu />
          <BiUserCircle size={40} className={styles.user} />
        </div>

        <div className={styles.bottomContainer}>
          <PlusButton />
        </div>
      </header>
      <main>{props.children}</main>
    </Fragment>
  );
}
