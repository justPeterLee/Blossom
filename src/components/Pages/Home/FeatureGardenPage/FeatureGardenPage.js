import { useSelector } from "react-redux";
import styles from "./FeatureGardenPage.module.css";
import ExplorePlantItem from "../ExplorePlants/ExplorePlantItem/ExplorePlantItem";
export default function FeatureGardenPage() {
  const gardenInfo = useSelector((store) => store.garden.exploreGardenReducer);
  return (
    <div className={styles.container}>
      {gardenInfo.map((plant) => {
        return (
          <ExplorePlantItem
            key={plant.id}
            name={plant.common_name}
            spes={plant.scientific_name[0]}
            image={plant.default_image}
          />
        );
      })}
    </div>
  );
}
