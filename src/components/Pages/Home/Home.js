import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GardenItem from "../Garden/GardenItem/GardenItem";
import PlantsItem from "../Plants/PlantItem/PlantItem";
import FeaturePlants from "./FeaturePlants/FeaturePlants";
import LogOutButton from "../../Layout/LogOutButton/LogOutButton";

import styles from "./Home.module.css";
import FeatureGarden from "./FeatureGarden/FeatureGarden";
import ExplorePlant from "./ExplorePlants/ExplorePlants";
export default function Home() {
  const dispatch = useDispatch();
  let day =parseInt(new Date().toJSON().slice(8, 10)) *11;

  const garden = useSelector((store) => store.garden.gardenReducer);
  const plant = useSelector((store) => store.plant);

  useEffect(() => {
    dispatch({ type: "FETCH_GARDEN" });
    dispatch({ type: "FETCH_PLANT" });
    dispatch({type:"FETCH_EXPLORE_PLANT", payload:100})
  }, []);

  return (
    <div className={styles.container}>
      <LogOutButton />
      <GardenItem />
      <div className={styles.explore_plant}>
        <p className={styles.modal_title} style={{marginLeft:"3.3rem"}}>explore more: </p>
        <ExplorePlant/>
      </div>
      
      <div className={styles.feature_plants_container}>
        <p className={styles.modal_title}>view plants: </p>
        <FeaturePlants />
      </div>

      <div className={styles.feature_garden_container}>
        <p className={styles.modal_title} style={{marginLeft:"3.3rem"}}>view garden: </p>
        <FeatureGarden />
      </div>
    </div>
  );
}
