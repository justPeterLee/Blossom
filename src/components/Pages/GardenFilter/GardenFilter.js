import PlantsItem from "../Plants/PlantItem/PlantItem";
import styles from "./GardenFilter.module.css";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function GardenFilter() {
  const dispatch = useDispatch();
  const params = useParams();
  const gardenId = params.id;

  const filterPlants = useSelector((store) => store.garden.gardenFilterReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_GARDEN_FILTER", payload: gardenId });
  },[]);

  if(!filterPlants){
    return <p>loading...</p>
  }
  return (
    <div className={`${styles.transitionContainer} move_in page_container`}>
      <div className={styles.main}>
        {filterPlants.map((plant)=>{return(
                <PlantsItem 
                key={plant.id}
                name={plant.plant_name}
                species={'Rose'}/>
            )})}
      </div>
    </div>
  );
}
