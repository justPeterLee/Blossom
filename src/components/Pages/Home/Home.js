import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GardenItem from "../Garden/GardenItem/GardenItem";
import PlantsItem from "../Plants/PlantItem/PlantItem";
import FeaturePlants from "./FeaturePlants/FeaturePlants";
import LogOutButton from "../../Layout/LogOutButton/LogOutButton";

import styles from './Home.module.css'
export default function Home() {
  const dispatch = useDispatch();

  const garden = useSelector((store) => store.garden.gardenReducer);
  const plant = useSelector((store) => store.plant);

  useEffect(() => {
    dispatch({ type: "FETCH_GARDEN" });
    dispatch({ type: "FETCH_PLANT" });
  }, []);

  return (
    <div className={styles.container}>
      
      <LogOutButton />
      <GardenItem />

      <div className={styles.feature_plants_container}>
        <p className={styles.modal_title}>view plants: </p>
        <FeaturePlants />
      </div>
    </div>
  );
}
