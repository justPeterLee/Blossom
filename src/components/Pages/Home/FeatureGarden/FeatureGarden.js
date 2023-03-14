import styles from "./FeatureGarden.module.css";
import { useSelector } from "react-redux";
import FeatureGardenItem from "./FeatureGardenItem/FeatureGardenItem";
import { AiOutlinePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";

export default function FeatureGarden() {
    const history = useHistory();
  const garden = useSelector((store) => store.garden.gardenReducer);

  return (
    <div className={styles.main}>
      {garden.map((gardenInfo) => {
        return (
          <FeatureGardenItem
            key={gardenInfo.garden_table_id}
            id={gardenInfo.garden_table_id}
            name={gardenInfo.garden_name}
            type={gardenInfo.garden_type}
            num={gardenInfo.count}
            color={gardenInfo.garden_theme}
            create={gardenInfo.garden_created_at}
          />
        );
      })}

      <div className={styles.create_button_container}>
        <button>
          <AiOutlinePlus
            size={25}
            style={{ color: "rgb(100,100,100)" }}
            onClick={() => {
              history.push("/garden/create");
            }}
          />
        </button>
      </div>
    </div>
  );
}
