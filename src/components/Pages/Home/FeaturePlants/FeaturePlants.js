import PlantsItem from "../../Plants/PlantItem/PlantItem";
import styles from "./FeaturePlants.module.css";
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
export default function FeaturePlants() {
  const history = useHistory();
  const plants = useSelector((store) => store.plant.plantReducer);

  return (
    <div className={styles.main}>
      {plants.map((plant) => {
        return (
          <PlantsItem
            key={plant.plant_table_id}
            id={plant.plant_table_id}
            name={plant.plant_name}
            species={plant.scientific_name}
            image={plant.plant_image}
          />
        );
      })}
      
      <div className={styles.create_button_container}>
        <button>
          <AiOutlinePlus
            size={25}
            style={{ color: "rgb(100,100,100)" }}
            onClick={() => {
              history.push("/plant/create");
            }}
          />
        </button>
      </div>
    </div>
  );
}
