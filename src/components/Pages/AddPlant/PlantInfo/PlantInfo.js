import styles from "./PlantInfo.module.css";
import { AiFillPicture } from "react-icons/ai";
export default function PlantInfo() {
  return (
    <div className={styles.API_container}>
      <div className={styles.input_image}>
        <label htmlFor="plant-file">
          <div className={styles.input_upload_custom}>
            <AiFillPicture size={35} />
            <label>upload image</label>
          </div>
        </label>
        <input id="plant-file" className={styles.input_upload} type="file" />
      </div>

      <div className={styles.sci_name}>
        <div className={styles.input_container}>
          <label>scientific name</label>
        </div>
        <input className={styles.input} type="text" placeholder="ex. plant" />
      </div>

      <div className={styles.api_data}>
        <div className={styles.info_title}>
          <p>information</p>
        </div>
        <div className={styles.info_description}>
          <div className={styles.info_item}>
            <p>Orgin: </p>
            <p>Japan</p>
          </div>

          <div className={styles.info_item}>
            <p>Orgin: </p>
            <p>Japan</p>
          </div>

          <div className={styles.info_item}>
            <p>Orgin: </p>
            <p>japan</p>
          </div>

          <div className={styles.info_item}>
            <p>Orgin: </p>
            <p>Japan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
