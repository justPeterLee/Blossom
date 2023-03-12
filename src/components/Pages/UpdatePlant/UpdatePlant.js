import styles from "./UpdatePlant.module.css";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, dispatch, useDispatch } from "react-redux";
import { RiRulerLine, RiArrowDropDownLine } from "react-icons/ri";
import UpdateGardenItem from "./UpdateGarden/UpdateGardenItem";
export default function UpdatePlant() {
  const [showGarden, setShowGarden] = useState(false);
  const [render, setRender] = useState(false)
  const [renderWait, setRenderWait] = useState(false)
  // history dependency (navigate to different pages)
  const history = useHistory();
  // parameters dependency
  const params = useParams();

  // dispatch dependency (redux)
  const dispatch = useDispatch();

  const details = useSelector((store) => store.plant.detailsReducer[0]);
  const garden = useSelector((store) => store.garden.gardenReducer);
  const modalState = useSelector((store) => store.functional.modalColor);

  const [name, setName] = useState(details.plant_name);
  const [height, setHeight] = useState(details.plant_height);
  const [newGardenName, setNewGardenName] = useState(details.garden_name);
  const [newGarden, setNewGarden] = useState(details.garden_id);

  // parameter plant id
  const plantId = params.id;

  if (!details || details.plant_table_id != plantId || !garden) {
    return <p>loading...</p>;
  }

  const updatePlantHandler = () => {
    if (name && height && plantId) {
      console.log(name, height, plantId);
      dispatch({
        type: "UPDATE_PLANT",
        payload: { id: plantId, name: name, height: height, garden: newGarden },
      });
    }
    console.log(name, height, plantId);
    history.push(`/plant/detail/${plantId}`);
  };

  async function updateGardenModal() {
    await dispatch({ type: "MODAL_COLOR_CLICKED" });
    if (!modalState) {
      setShowGarden(!showGarden);
      setRender(true)
      setRenderWait(true)
    }
  }


  // ----------------- Prop Chain Function -----------------
  function onNewGardenId(newId){
    setNewGarden(newId.id)
    setNewGardenName(newId.name)
    console.log(newId.id, newId.name)
  }










  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: plantId });
    dispatch({ type: "FETCH_GARDEN" });
    dispatch({ type: "HIDE_MENU" });
    if (!modalState) {
      setShowGarden(false);
      
      setTimeout(()=>{ if(renderWait){setRender(false); setRenderWait(false)}},300)
    }
  }, [modalState]);

  return (
    <div className={styles.container}>
      <div className={styles.top_bottons}>
        {/* cancel button */}
        <button
          className={styles.cancel_button}
          onClick={() => {
            dispatch({ type: "SHOW_MENU" });

            history.push(`/plant/detail/${plantId}`);
          }}
        >
          cancel
        </button>

        {/* update button */}
        <button onClick={updatePlantHandler} className={styles.update_button}>
          update
        </button>
      </div>
      <div></div>

      <div className={styles.page_title}>
        <p>Update Plant</p>
      </div>

      <div className={styles.input_all_container}>
        <div className={styles.name_input_container}>
          <label htmlFor="name-update" className={styles.name_input_title}>
            name
          </label>
          <input
            id="name-update"
            className={styles.name_input}
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className={styles.height_input_container}>
          <label htmlFor="name-height" className={styles.height_input_title}>
            height
          </label>
          {/* <input
            id="height-update"
            type="number"
            value={height}
            onChange={(event) => {
              setHeight(event.target.value);
            }}
          /> */}
          <button
            className={styles.height_button}
            onClick={() => {
              console.log("hello there");
            }}
          >
            <RiRulerLine size={18} />
            <p className={styles.feature_info_data}>
              {details.plant_height.ft}' {details.plant_height.in}"
            </p>
          </button>
        </div>

        <div className={styles.garden_input_container} style={!render ? {overflow:"hidden"} : {}}>
          <label htmlFor="garden-update" className={styles.garden_input_title}>
            change garden
          </label>
          <button className={styles.garden_button} onClick={updateGardenModal}>
            {newGarden ? <p>{newGardenName}</p> : <p>none</p>}
            <RiArrowDropDownLine size={20} />
          </button>
          {/* <select
            name="garden-update"
            id="garden-update"
            value={newGarden ? newGarden : "none"}
            className={styles.garden_input}
            onChange={(event) => {
              setNewGarden(event.target.value);
            }}
          >
            <option value="null">none</option>
            {garden.map((gardenValue) => {
              return (
                <option key={Math.random()} value={gardenValue.garden_table_id}>
                  {gardenValue.garden_name}
                </option>
              );
            })}
          </select> */}

          {
            <div
              className={
                showGarden
                  ? `${styles.container_garden} ${styles.show_garden}`
                  : `${styles.container_garden}`
              }
              
            >
              {garden.map((garden) => {
                return (
                  <UpdateGardenItem
                    gardenName={garden.garden_name}
                    id={garden.garden_table_id}
                    key={garden.garden_table_id}

                    newGardenId={onNewGardenId}
                  />
                );
              })}
            </div>
          }
        </div>
      </div>
      <button
        onClick={() => {
          dispatch({
            type: "DELETE_PLANT",
            payload: { plantId: plantId, infoId: details.plant_info_id },
          });
          history.push("/plants");
        }}
      >
        delete
      </button>
    </div>
  );
}
