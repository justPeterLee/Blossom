import styles from "./OriginScroll.module.css";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { useSelector } from "react-redux";

export default function OriginScroll() {
    const countries = useSelector(store=>store.plant.detailsReducer[0].sci_origin)
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <HiOutlineLocationMarker size={30} className={styles.icons}/>
      </div>
      <div className={styles.line}></div>
      <div className={styles.countries}>
        {countries.split(",").map((country)=>{
            return(
                <p key={Math.random()}>{country}</p>
            )
        })}
      </div>
    </div>
  );
}
