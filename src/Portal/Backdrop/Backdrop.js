import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Backdrop.module.css";

function Backdrop() {
  const dispatch = useDispatch();
  const modalActiveState = useSelector((store) => store.functional.modalActive);
  const backdropClickHandler = () => {
    dispatch({ type: "RESET_ALL_MODAL" });
  };

  return (
    <div
      className={styles.backdrop_container}
      style={modalActiveState ? { zIndex: "2" } : {}}
      onClick={backdropClickHandler}
    ></div>
  );
}

export default function BackdropOverlay() {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
}
