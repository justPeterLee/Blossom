import styles from "./PlantInfo.module.css";
import { AiFillPicture } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function PlantInfo() {
  const dispatch = useDispatch();
  const [sciName, setSciName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const apiData = useSelector((store) => store.functional.plantDataAPI);
  const uploadimageToExpress = (e) => {
    const file = e.target.files;
    const formData = new FormData();
    Object.keys(file).forEach((key) => {
      formData.append(file.item(key).name, file.item(key));
    });
    // axios.post('/plant/upload', formData)
    setIsLoading(true)
    dispatch({ type: "FETCH_PLANT_DATA_API", payload: formData });
    setSciName(apiData.scientific_name);
    console.log('false')
  };

  if (sciName != apiData.scientific_name) {
    setSciName(apiData.scientific_name);
  }

  useEffect(()=>{
    setSciName('')
    setIsLoading(false)
  },[apiData])
  return (
    <div className={styles.API_container}>
      {isLoading &&
        <div className={styles.loading_container}>
          <AiOutlineLoading3Quarters size={70} className={styles.loading} />
        </div>
      }
      <div className={styles.input_image}>
        <label htmlFor="plant-file">
          { !apiData.image ? <div className={styles.input_upload_custom}>
            <AiFillPicture size={35} style={{ color: "rgb(170,170,170)" }} />
            <label
              style={{
                color: "rgb(150,150,150)",
                fontFamily: "openSansLight",
                fontSize: "17px",
              }}
            >
              upload image
            </label>
          </div> : <img className={styles.image_input} src={apiData.image}></img>}
        </label>
        <input
          id="plant-file"
          className={styles.input_upload}
          type="file"
          onChange={(e) => {
            uploadimageToExpress(e);
          }}
        />
      </div>

      <div className={styles.sci_name}>
        <div className={styles.input_container}>
          <label className={styles.label_text} style={{ fontSize: "20px" }}>
            scientific name
          </label>
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="(generated)"
          value={sciName}
        />
      </div>

      <div className={styles.api_data}>
        <div className={styles.info_title}>
          <p className={styles.label_text}>information</p>
        </div>
        {apiData && (
          <div className={styles.info_description}>
            {apiData.origin && (
              <div className={styles.info_item}>
                <p className={styles.label_text_sub}>orgin: </p>
                <p>{apiData.origin}</p>
              </div>
            )}
            {apiData.maintenance && (
              <div className={styles.info_item}>
                <p className={styles.label_text_sub}>maintenance: </p>
                <p>{apiData.maintenance}</p>
              </div>
            )}
            {apiData.cycle && (
              <div className={styles.info_item}>
                <p className={styles.label_text_sub}>cycle: </p>
                <p>{apiData.cycle}</p>
              </div>
            )}
            {apiData.type && (
              <div className={styles.info_item}>
                <p className={styles.label_text_sub}>type: </p>
                <p>{apiData.type ? "indoors" : "outdoors"}</p>
              </div>
            )}
            {apiData.soil && (
              <div className={styles.info_item}>
                <p className={styles.label_text_sub}>soil: </p>
                <p>{apiData.soil}</p>
              </div>
            )}
            {apiData.growth_rate && (
              <div className={styles.info_item}>
                <p className={styles.label_text_sub}>growth rate: </p>
                <p>{apiData.growth_rate}</p>
              </div>
            )}{" "}
          </div>
        )}
      </div>
    </div>
  );
}
