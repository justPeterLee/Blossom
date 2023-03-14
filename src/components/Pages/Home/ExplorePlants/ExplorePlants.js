import ExplorePlantItem from "./ExplorePlantItem/ExplorePlantItem";
import styles from "./ExplorePlants.module.css";
import { useSelector } from "react-redux";
export default function ExplorePlant() {
  const explorePlant = useSelector((store) => store.plant.explorePlantReducer);

  return (
    <div className={styles.main}>
      {explorePlant.map((plant) => {
        return (
          <ExplorePlantItem
            key={plant.id}
            name={plant.common_name}
            spes={plant.scientific_name[0]}
            image={plant.default_image}
          />
        );
      })}

      <div className={styles.filler}><p>fill</p></div>
    </div>
  );
}
