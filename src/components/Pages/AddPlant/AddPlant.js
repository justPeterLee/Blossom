import styles from "./AddPlant.module.css";
import PlantInfo from "./PlantInfo/PlantInfo";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function AddPlant() {
  let history = useHistory()
  let currentDate = new Date().toJSON().slice(0, 10);
  const [name, setName] = useState();
  const [height, setHeight] = useState();
  const [dateState, setDateState] = useState(currentDate);
  const dispatch = useDispatch();
  const apiData = useSelector((store) => store.functional.plantDataAPI);

  const createPlantHandler = async () => {
    const newPlantData = {
      name: name,
      height: height,
      date: dateState,
      plantInfo: apiData,
    };

    await dispatch({ type: "CREATE_PLANT", payload: newPlantData });
    dispatch({ type: "SHOW_MENU" });
    dispatch({type: "RESET_PLANT_DATA_API"})
    await dispatch({type:"FETCH_PLANT"})
    history.push('/plants')

  };

  useEffect(() => {
    //dispatch({type: "HIDE_MENU"});
    dispatch({type: "RESET_PLANT_DATA_API"})
  },[]);
  return (
    <div className={styles.plant_container}>
      <PlantInfo />

      <div className={styles.input_container}>
        <div className={styles.name}>
          <div className={styles.name_title}>
            <label className={styles.label_text}>name</label>
          </div>
          <input
            className={styles.name_input}
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className={styles.name}>
          <div className={styles.name_title}>
            <label className={styles.label_text}>height</label>
          </div>
          <input
            className={styles.name_input}
            type="number"
            value={height}
            onChange={(event) => {
              setHeight(event.target.value);
            }}
          />
        </div>

        <div className={styles.name}>
          <div className={styles.name_title}>
            <label className={styles.label_text}>start date</label>
          </div>
          <input
            className={styles.name_input}
            type="date"
            value={dateState}
            onChange={(event) => {
              setDateState(event.target.value);
            }}
          />
        </div>
      </div>

      <div className={styles.button_div}>
        <button onClick={createPlantHandler} className={styles.createButton}>
          create
        </button>
      </div>
    </div>
  );
}
