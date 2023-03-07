import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// watcher saga
function* gardenSaga() {
  yield takeEvery("FETCH_GARDEN", fetchGarden);
  yield takeEvery("FETCH_GARDEN_FILTER", fetchGardenFilter);
  yield takeEvery("CREATE_GARDEN", createGarden);
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

function* fetchGardenFilter(action) {
  try {
    const gardenId = action.payload;
    const gardenFilter = yield axios.get(`/api/garden/${gardenId}`);

    yield put({ type: "SET_GARDEN_FILTER", payload: gardenFilter.data });
  } catch (err) {
    console.log("Error with fetching Garden Filter: ", err);
  }
}

function* createGarden(action){
  try{
    yield axios.post(`api/garden/create`, action.payload);
    yield fetchGarden;
  }catch(err){
    console.log("Error with creating garden (saga): ", err)
  }
}
export default gardenSaga;
