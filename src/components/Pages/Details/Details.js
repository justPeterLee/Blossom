import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styles from "./Details.module.css";

import { RiPlantLine } from "react-icons/ri";
import { TiBrush } from "react-icons/ti";
import { RiRulerLine } from "react-icons/ri";
import { BiCake } from "react-icons/bi";

import ColorCircle from "./ColorCircle/ColorCircle";

export default function Details() {
  const history = useHistory();
  const params = useParams();
  const plantId = params.id;
  const dispatch = useDispatch();

  const details = useSelector((store) => store.plant.detailsReducer[0]);
  const [waterStyle, setWaterStyle] = useState(false);
  const [sunStyle, setSunStyle] = useState(false);
  const [sciColor, setSciColor] = useState();

  //details.scientific_color ? details.scientific_color.split(" ",3) : null
  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: plantId });
    setTimeout(() => {
      setWaterStyle(true);
      setSunStyle(true);
    }, 50);
  }, []);

  if (!details || sciColor) {
    return <p>loading...</p>;
  }
  return (
    <div className={`${styles.main_container} page_container`}>
      {/* top container (image, feature info) */}
      <div className={styles.image_gen_container}>
        {/* image */}
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${details.plant_image})` }}
        >
          {/* feature info */}
          <div
            className={styles.feature_info}
            style={{ backgroundColor: "white" }}
          >
            {/* sub feature info container */}
            <div
              className={`${styles.feature_info_container} ${styles.top_info_container}`}
            >
              <RiPlantLine size={19} />
              <p className={styles.feature_info_data}>
                {details.scientific_name}
              </p>
            </div>

            <div
              className={`${styles.feature_info_container} ${styles.mid_info_container}`}
            >
              <div
                className={styles.feature_info_container}
                style={{ marginRight: "3rem" }}
              >
                <TiBrush size={18} />
                <p className={styles.feature_info_data}>
                  {details.plant_color}
                </p>
              </div>

              <div className={styles.feature_info_container}>
                <RiRulerLine size={18} />
                <p className={styles.feature_info_data}>
                  {details.plant_height.ft}' {details.plant_height.in}"
                </p>
              </div>
            </div>

            <div
              className={`${styles.feature_info_container} ${styles.bot_info_container}`}
            >
              <BiCake size={18} />
              {/* {details.plant_created_at.monthAge < 1 && <p>{details.plant_created_at.dayAge} {details.plant_created_at.dayAge > 1 ? "days" : "day"}</p>}
              {details.plant_created_at.monthAge > 1 && <p>{details.plant_created_at.monthAge} {details.plant_created_at.monthAge > 1 ? "months" : "month"}</p>} */}

              <p
                className={styles.feature_info_data}
              >{`${details.plant_created_at.monthName} ${details.plant_created_at.day}, ${details.plant_created_at.year}`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sub_container}>
        <div className={styles.update_button_container}>
          <button
            onClick={() => {
              history.push(`/plant/update/${details.plant_table_id}`);
            }}
            className={styles.update_button}
          >
            update
          </button>
        </div>

        {/* task */}
        <div className={styles.task_container_stretch}></div>

        {/* sun and water levels */}
        <div className={styles.sun_water_container}>
          {/* water level */}
          <div className={styles.water_level}>
            <div
              className={`${styles.water_back_svg} ${styles.move_wave}`}
              style={waterStyle ? { transform: `translateY(${-45}%)` } : {}}
            ></div>
            <p className={styles.level_text}>water level</p>
            <p className={`${styles.level_text} ${styles.level_sub_text}`}>
              {details.water_level}
            </p>
            {/* <p className={styles.level_text}>20 ml</p>
            <p className={styles.level_text}>water level</p> */}

            {/* <p className={styles.level_text_under}>{details.water_level}</p> */}
          </div>

          {/* sun level */}
          <div className={styles.sun_level}>
            <div
              className={`${styles.sun_background} ${styles.sun_rise}`}
              style={sunStyle ? { transform: `translateY(${-70}%)` } : {}}
            ></div>
            <p className={`${styles.level_text} ${styles.sun_text}`}>
              sunlight level
            </p>
            <p
              className={`${styles.level_text} ${styles.level_sub_text} ${styles.sun_text}`}
            >
              {details.sunlight_level}
            </p>
          </div>
        </div>

        {/* color contrast */}
        <div className={styles.color_container_stretch} style={details.scientific_color ? {paddingTop: '1.5rem'}: {}}>
          {details.scientific_color ? (
            <div className={styles.colorSci}>
              <p className={styles.common_color}>common color:</p>
              {details.scientific_color.split(",", 3).map((color) => {
                return <ColorCircle color={color} key={Math.random()} />;
              })}
            </div>
          ) : (
            <div className={styles.colorSci}>{details.plant_color}</div>
          )}
          <div className={styles.line}></div>

          <div className={styles.colorPlant}>
            <ColorCircle color={details.plant_color} />
          </div>
        </div>

        {/* extra info  */}
        <div className={styles.extra_info}>
          {/* title */}
          <div className={styles.extra_info_title}>
            <p>information</p>
          </div>

          {/* contain information */}
          <div className={styles.extra_info_description}>
            {details.origin && (
              <div className={styles.extra_info_description_sub}>
                <p>origin: </p>
                <p>{details.sci_origin}</p>
              </div>
            )}

            {details.maintenance && (
              <div className={styles.extra_info_description_sub}>
                <p className={styles.extra_info_sub_title}>maintenance: </p>
                <p className={styles.extra_info_text}>
                  {details.sci_maintenance}
                </p>
              </div>
            )}
            {details.sci_cycle && (
              <div className={styles.extra_info_description_sub}>
                <p className={styles.extra_info_title}>cycle: </p>
                <p className={styles.extra_info_text}>{details.sci_cycle}</p>
              </div>
            )}
            {details.sci_type ? (
              <div className={styles.extra_info_description_sub}>
                <p className={styles.extra_info_sub_title}>type: </p>
                <p className={styles.extra_info_text}>indoors</p>
              </div>
            ) : (
              <div className={styles.extra_info_description_sub}>
                <p className={styles.extra_info_sub_title}>type: </p>
                <p className={styles.extra_info_text}>outdoors</p>
              </div>
            )}
            {details.sci_soil && (
              <div className={styles.extra_info_description_sub}>
                <p className={styles.extra_info_sub_title}>soil: </p>
                <p className={styles.extra_info_text}>{details.sci_soil}</p>
              </div>
            )}
            {details.sci_growth_rate && (
              <div className={styles.extra_info_description_sub}>
                <p className={styles.extra_info_sub_title}>growth rate: </p>
                <p className={styles.extra_info_text}>
                  {details.sci_growth_rate}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* graph */}
        <div className={styles.graph_container_stretch}></div>
      </div>
    </div>
  );
}
