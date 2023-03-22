import styles from "./AddGarden.module.css";
import ColorTheme from "./ColorTheme/ColorTheme";
import Select from "./Select/Select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default function AddGarden() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [theme, setTheme] = useState("");
  const [selected, setSelected] = useState([]);

  const themeRedux = useSelector((store) => store.functional.selectGardenTheme);
  const selectedRedux = useSelector(
    (store) => store.functional.selectPlantToGarden
  );

  const dispatch = useDispatch();

  const createGardenHandler = () => {
    if (!themeRedux) {
      setTheme(null);
    } else {
      setTheme(themeRedux);
    }

    if (!selectedRedux) {
      setSelected(null);
    } else {
      setSelected(selectedRedux);
    }

    if (name && type) {
      const newGardenData = {
        name: name,
        type: type,
        theme: themeRedux,
        selected: selectedRedux,
      };
      console.log(newGardenData);

      dispatch({ type: "CREATE_GARDEN", payload: newGardenData });
      history.push("/garden");
    } else {
      alert("invalid");
    }
  };
  return (
    <div className={`${styles.container}`}>

      {/* text input  */}
      <div className={styles.text_input_container}>
        <div>
          <label className={styles.name}>name</label>
          <input
            className={styles.input}
            id="garden_name_input"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div>
          <label className={styles.type}>type</label>
          <input
            className={styles.input}
            id="garden_type_input"
            value={type}
            onChange={(event) => {
              setType(event.target.value);
            }}
          />
        </div>
      </div>

      {/* color selection */}
      <div className={styles.theme_input_container}>
        <div className={styles.theme_title}>
          <p className={styles.theme_text} style={{ fontSize: "20px" }}>
            theme
          </p>
        </div>

        <ColorTheme />
      </div>

      {/* plant selection */}
      <div className={styles.select_ipnut_container}>
        <div className={styles.select_title}>
          <p className={styles.select_text}>select</p>
        </div>
        <Select />
      </div>

      <button onClick={createGardenHandler} className={styles.button}>create</button>
    </div>
  );
}
