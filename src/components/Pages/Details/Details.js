import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styles from "./Details.module.css";

import { RiPlantLine } from "react-icons/ri";
import { TiBrush } from "react-icons/ti";
import { RiRulerLine } from "react-icons/ri";
import { BiCake } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import ColorCircle from "./ColorCircle/ColorCircle";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import OriginScroll from "./OriginScroll/OriginScroll";
import SoilScroll from "./SoilScroll/SoilScroll";

const data = [
  {
    name: "Page A",
    uv: 40,
    pv: 24,
    amt: 24,
  },
  {
    name: "Page B",
    uv: 30,
    pv: 13,
    amt: 22,
  },
  {
    name: "Page C",
    uv: 20,
    pv: 98,
    amt: 22,
  },
  {
    name: "Page D",
    uv: 27,
    pv: 39,
    amt: 20,
  },
  {
    name: "Page E",
    uv: 18,
    pv: 48,
    amt: 21,
  },
  {
    name: "Page F",
    uv: 23,
    pv: 38,
    amt: 25,
  },
  {
    name: "Page G",
    uv: 34,
    pv: 40,
    amt: 21,
  },
];

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
        <div
          className={styles.color_container_stretch}
          style={details.scientific_color ? { paddingTop: "1.5rem" } : {}}
        >
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

          {/* origin */}
          {details.sci_origin && <OriginScroll />}

          {/* maintenance & growth */}
          <div className={styles.maintenance_growth}>
            {details.sci_maintenance && (
              <>
              <div className={styles.maintenance_container}>
                <p className={styles.maintenance_title}>maintenance: </p>
                <p className={styles.extra_info_text}>
                  {details.sci_maintenance}
                </p>
              </div>
              <div className={styles.maint_line}></div>
              </>
            )}

            {details.sci_growth_rate && (
              <div className={styles.growth_container}>
                <p className={styles.growth_title}>growth rate: </p>
                <p className={styles.extra_info_text}>
                  {details.sci_growth_rate}
                </p>
              </div>
            )}
          </div>

          {/* cycle & type */}
          <div className={styles.cycle_type}>
            {details.sci_cycle && (
              <div className={styles.cylce_container}>
                <p className={styles.cycle_title}>cycle: </p>
                <p className={styles.extra_info_text}>{details.sci_cycle}</p>
              </div>
            )}

            {details.sci_type ? (
              <div className={styles.cylce_container}>
                <p className={styles.cycle_title}>type: </p>
                <p className={styles.extra_info_text}>indoors</p>
              </div>
            ) : (
              <div className={styles.cylce_container}>
                <p className={styles.cycle_title}>type: </p>
                <p className={styles.extra_info_text}>outdoors</p>
              </div>
            )}
          </div>

          {/* soil */}
          {details.sci_soil && (
            <SoilScroll/>
          )}
        </div>

        {/* graph */}
        <div className={styles.graph_container_stretch}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 50,
                right: 30,
                left: -10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
