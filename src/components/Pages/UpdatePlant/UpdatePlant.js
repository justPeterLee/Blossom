import styles from "./UpdatePlant.module.css";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, dispatch, useDispatch } from "react-redux";
export default function UpdatePlant() {
  // history dependency (navigate to different pages)
  const history = useHistory();
  // parameters dependency
  const params = useParams();

  // dispatch dependency (redux)
  const dispatch = useDispatch();

  const details = useSelector((store) => store.plant.detailsReducer[0]);
  const garden = useSelector((store)=>store.garden.gardenReducer)
  // parameter plant id
  const plantId = params.id;

  if (!details || details.plant_table_id != plantId || !garden) {
    useEffect(() => {
      dispatch({ type: "FETCH_DETAILS", payload: plantId });
      dispatch({ type: "FETCH_GARDEN" });
    }, []);

    return <p>loading...</p>;
  }

  const [name, setName] = useState(details.plant_name);
  const [height, setHeight] = useState(details.plant_height);
  const [newGarden, setNewGarden] = useState(details.garden_id)
  const updatePlantHandler = () => {
    if (name && height && plantId) {
      dispatch({
        type: "UPDATE_PLANT",
        payload: { id: plantId, name: name, height: height, garden: newGarden},
      });
    }
    history.push(`/plant/detail/${plantId}`);
  };

  return (
    <div className="page_container">
      {/* cancel button */}
      <button
        onClick={() => {
          history.push(`/plant/detail/${plantId}`);
        }}
      >
        cancel
      </button>

      {/* update button */}
      <button
        onClick={updatePlantHandler}
      >
        update
      </button>

      <p>Update Plant</p>

      <div>
        <div>
          <label htmlFor="name-update">name</label>
          <input
            id="name-update"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="name-update">height</label>
          <input
            id="height-update"
            type="number"
            value={height}
            onChange={(event) => {
              setHeight(event.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="garden-update">change garden</label>
          <select name="garden-update" id="garden-update" value={newGarden ?  newGarden : "none"} onChange={(event)=>{setNewGarden(event.target.value)}}>
            <option value="null">none</option>
            {garden.map((gardenValue) => {
                return(
                    <option key={Math.random()} value={gardenValue.garden_table_id}>{gardenValue.garden_name}</option>
                )
            })}

          </select>
        </div>
      </div>
      <button onClick={() => {dispatch({type:"DELETE_PLANT", payload:{plantId: plantId, infoId:details.plant_info_id}}); history.push('/plants')}}>delete</button>
    </div>
  );
}
