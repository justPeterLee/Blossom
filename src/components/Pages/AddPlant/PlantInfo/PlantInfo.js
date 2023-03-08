import styles from "./PlantInfo.module.css";
import { AiFillPicture } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
export default function PlantInfo() {
  const dispatch = useDispatch();
  const [sciName, setSciName] = useState()
  const apiData = useSelector(store=>store.functional.plantDataAPI)
    const uploadimageToExpress = (e) =>{
        const file = e.target.files;
        const formData = new FormData()
        Object.keys(file).forEach(key => {
          formData.append(file.item(key).name, file.item(key))
        })
        // axios.post('/plant/upload', formData)
        dispatch({type:"FETCH_PLANT_DATA_API", payload:formData})
        setSciName(apiData.scientific_name)
      }
  if(sciName != apiData.scientific_name){
    setSciName(apiData.scientific_name)
  }
  return (
    <div className={styles.API_container}>
      <div className={styles.input_image}>
        <label htmlFor="plant-file">
          <div className={styles.input_upload_custom}>
            <AiFillPicture size={35} />
            <label>upload image</label>
          </div>
        </label>
        <input id="plant-file" className={styles.input_upload} type="file" onChange={(e) => {
          uploadimageToExpress(e);
        }}/>
      </div>

      <div className={styles.sci_name}>
        <div className={styles.input_container}>
          <label>scientific name</label>
        </div>
        <input className={styles.input} type="text" placeholder="ex. plant" value={sciName} onChange={(event)=>{setSciName(event.target.value)}}/>
      </div>

      <div className={styles.api_data}>
        <div className={styles.info_title}>
          <p>information</p>
        </div>
        <div className={styles.info_description}>
          <div className={styles.info_item}>
            <p>orgin: </p>
            <p>{apiData.origin}</p>
          </div>

          <div className={styles.info_item}>
            <p>maintenance: </p>
            <p>{apiData.maintenance}</p>
          </div>

          <div className={styles.info_item}>
            <p>cycle: </p>
            <p>{apiData.cycle}</p>
          </div>

          <div className={styles.info_item}>
            <p>type: </p>
            <p>{apiData.type ? "indoors" : "outdoors"}</p>
          </div>

          <div className={styles.info_item}>
            <p>soil: </p>
            <p>{apiData.soil}</p>
          </div>

          <div className={styles.info_item}>
            <p>growth rate: </p>
            <p>{apiData.growth_rate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
