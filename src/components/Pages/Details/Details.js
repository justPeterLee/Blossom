import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styles from "./Details.module.css";
export default function Details() {
    const history = useHistory();
  const params = useParams();
  const plantId = params.id;
  const dispatch = useDispatch();

  const details = useSelector((store) => store.plant.detailsReducer[0]);

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: plantId });
  }, []);

  if(!details){
    return <p>loading...</p>
  }
  return (
    <div className={`${styles.main_container} page_container`}>
      {/* top container (image, feature info) */}
      <div className={styles.image_gen_container}>
        {/* image */}
        <div className={styles.image}></div>

        {/* feature info */}
        <div className={styles.feature_info}>
            <p>{details.scientific_name}</p>
            <p>{details.plant_color}</p>
            <p>{details.plant_height}</p>
            <p>{details.plant_created_at}</p>
        </div>
      </div>

      <div className={styles.sub_container}>
      <button onClick={()=>{history.push(`/plant/update/${details.id}`)}}>update</button>

        {/* task */}
        <div className={styles.task_container_stretch}></div>

        {/* sun and water levels */}
        <div className={styles.sun_water_container}>
          {/* water level */}
          <div className={styles.water_level}>
            <p>{details.water_level}</p>
          </div>

          {/* sun level */}
          <div className={styles.sun_level}>
            <p>{details.sunlight_level}</p>
          </div>
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
          <div className={styles.extra_info_description}>
            <p>origin: {details.sci_origin}</p>
            <p>maintenance: {details.sci_maintenance}</p>
            <p>cycle: {details.sci_cycle}</p>
            <p>type: {details.sci_type}</p>
            <p>soil: {details.sci_soil}</p>
            <p>growth rate: {details.sci_growth_rate}</p>
          </div>
        </div>

        {/* graph */}
        <div className={styles.graph_container_stretch}></div>
      </div>
    </div>
  );
}
