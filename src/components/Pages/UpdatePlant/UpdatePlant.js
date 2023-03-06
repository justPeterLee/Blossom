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
  // parameter plant id
  const plantId = params.id;

  if (!details || details.id != plantId) {
    useEffect(() => {
      dispatch({ type: "FETCH_DETAILS", payload: plantId });
    }, []);

    return <p>loading...</p>;
  }

  const [name, setName] = useState(details.plant_name);
  const [height, setHeight] = useState(details.plant_height);
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
        onClick={() => {
          history.push(`/plant/detail/${plantId}`);
        }}
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
          <select name="garden-update" id="garden-update">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
      <button onClick={() => [history.push()]}>delete</button>
    </div>
  );
}
