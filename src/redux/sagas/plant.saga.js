import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// plant watcher function
function* plantSaga() {
  yield takeEvery("FETCH_PLANT", fetchPlant);
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
