import styles from "./AddGarden.module.css";
import ColorTheme from "./ColorTheme/ColorTheme";
import Select from "./Select/Select";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function AddGarden() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [theme, setTheme] = useState("");
  const [selected, setSelected] = useState([]);
  
  const themeRedux = useSelector(store=>store.functional.selectGardenTheme);
  const selectedRedux = useSelector(store=>store.functional.selectPlantToGarden);
  const createGardenHandler = () =>{
    if(!themeRedux){
      setTheme(null);
    }else{
      setTheme(themeRedux)
    }

    if(!selectedRedux){
      setSelected(null)
    }else{
      setSelected(selectedRedux)
    }

    const newGardenData = {
      name: name,
      type: type,
      theme: theme,
      selected: selected
    }

    console.log(newGardenData)
  }
  return (
    <div className={`${styles.container}`}>
      <button onClick={createGardenHandler}>create</button>
      {/* text input  */}
      <div className={styles.text_input_container}>
        <div>
          <label className={styles.name}>name</label>
          <input className={styles.input} id="garden_name_input"  value={name} onChange={(event)=>{setName(event.target.value)}}/>
        </div>

        <div>
          <label className={styles.type}>type</label>
          <input className={styles.input} id="garden_type_input" value={type} onChange={(event)=>{setType(event.target.value)}}/>
        </div>
      </div>

      {/* color selection */}
      <div className={styles.theme_input_container}>
        <div className={styles.theme_title}>
          <p>theme</p>
        </div>

        <ColorTheme />
      </div>

      {/* plant selection */}
      <div className={styles.select_ipnut_container}>
      <div className={styles.select_title}>
          <p>select</p>
        </div>
        <Select/>
      </div>
    </div>
  );
}
