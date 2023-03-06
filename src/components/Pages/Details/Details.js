import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
export default function Details() {
  const params = useParams();
  const plantId = params.id;
  const dispatch = useDispatch();
  const details = useSelector((store) => store.plant.detailsReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: plantId });
  }, []);
  return (
    <div className={`${styles.main_container} page_container`}>
      {/* top container (image, feature info) */}
      <div className={styles.image_gen_container}>
        {/* image */}
        <div className={styles.image}></div>

        {/* feature info */}
        <div className={styles.feature_info}></div>
      </div>

      <div className={styles.sub_container}>
        {/* task */}
        <div className={styles.task_container_stretch}></div>


        {/* sun and water levels */}
        <div className={styles.sun_water_container}>
          {/* water level */}
          <div className={styles.water_level}></div>

          {/* sun level */}
          <div className={styles.sun_level}></div>
        </div>


        {/* color contrast */}
        <div className={styles.color_container_stretch}></div>


        {/* extra info  */}
        <div className={styles.extra_info}>
          {/* title */}
          <div className={styles.extra_info_title}>
            <p>information</p>
          </div>

          {/* contain information */}
          <div className={styles.extra_info_description}></div>
        </div>

        {/* graph */}
        <div className={styles.graph_container_stretch}></div>
      </div>
    </div>
  );
}
