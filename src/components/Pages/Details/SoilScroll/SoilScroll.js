import SoilItem from "./Soilitem/SoilItem";
import styles from "./SoilScroll.module.css";

import { useSelector } from "react-redux";
export default function SoilScroll() {
  const soil = useSelector((store) => store.plant.detailsReducer[0].sci_soil);
  return (
    <div className={styles.container}>
      {soil.split(',').map((soilType)=>{
                return(
                    <SoilItem key={Math.random()} name={soilType}/>
                )
            })}
    </div>
  );
}
