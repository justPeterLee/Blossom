import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// plant watcher function
function* plantSaga() {
  yield takeEvery("FETCH_PLANT", fetchPlant);
  yield takeEvery("FETCH_DETAILS", fetchDetails);
}

// fetch plant function (GET)
function* fetchPlant() {
  try {
    // axios request
    const plant = yield axios.get("/api/plant");

    // redux request
    yield put({ type: "SET_PLANT", payload: plant.data });
  } catch (err) {
    console.log("Error with GETting plant data: ", err);
  }
}

function* fetchDetails(action) {
  try {
    const plantId = action.payload;
    const details = yield axios.get(`/api/plant/details/${plantId}`);

    yield put({ type: "SET_PLANT_DETAILS", payload: details.data });
  } catch (err) {
    console.log("Error with fetching Deatils: ", err);
  }
}
export default plantSaga;
