import styles from "./AddPlant.module.css";
import PlantInfo from "./PlantInfo/PlantInfo";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function AddPlant() {
  let currentDate = new Date().toJSON().slice(0, 10);
  const [name, setName] = useState();
  const [height, setHeight] = useState();
  const [dateState, setDateState] = useState(currentDate);
  const dispatch = useDispatch();
  const apiData = useSelector((store) => store.functional.plantDataAPI);

  const createPlantHandler = () => {
    const newPlantData = {
      name: name,
      height: height,
      date: dateState,
      plantInfo: apiData,
    };

    dispatch({type:"CREATE_PLANT", payload: newPlantData})
    dispatch({type: "SHOW_MENU"});
  };

  useEffect(()=>{
    //dispatch({type: "HIDE_MENU"});
  })
  return (
    <div className={styles.plant_container}>
      <button onClick={createPlantHandler}>create</button>
      
      <PlantInfo />

      <div className={styles.input_container}>
        <div className={styles.name}>
          <div className={styles.name_title}>
            <label>name</label>
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
            <label>height</label>
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
            <label>start date</label>
          </div>
          <input
            className={styles.name_input}
            type="date"
            value={'2024-02-11'}
            onChange={(event) => {
              setDateState(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
