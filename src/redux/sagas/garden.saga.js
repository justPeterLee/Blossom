import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// watcher saga
function* gardenSaga() {
  yield takeEvery("FETCH_GARDEN", fetchGarden);
}

// fetch Garden
function* fetchGarden() {
  try {
    // axios request from saga
    const gardens = yield axios.get("/api/garden");

    // redux call to set Garden to current state
    yield put({ type: "SET_GARDEN", payload: gardens.data });

  } catch (err) {
    console.log("Error with fetching garden: ", err);
  }
}


export default gardenSaga;