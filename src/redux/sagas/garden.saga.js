import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// watcher saga
function* gardenSaga() {
  yield takeEvery("FETCH_GARDEN", fetchGarden);
  yield takeEvery("FETCH_GARDEN_FILTER", fetchGardenFilter);
  yield takeEvery("CREATE_GARDEN", createGarden);

  yield takeEvery("DELETE_MODAL_GARDEN", deleteGarden);

  yield takeEvery("FETCH_GARDEN_ID", fetchGardenId);

  // explore garden
  yield takeEvery("FETCH_EXPLORE_GARDEN", fetchExploreGarden)
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
    yield axios.post(`/api/garden/create`, action.payload);
    yield put({ type: "FETCH_GARDEN"});
  }catch(err){
    console.log("Error with creating garden (saga): ", err)
  }
}

function* deleteGarden(action){
  try{
    const gardenId = action.payload;
    yield axios.delete(`/api/garden/delete/${gardenId}`)
    yield put({ type: "FETCH_GARDEN"});
  }catch(err){
    console.log("Error with deleting garden")
  }
}

function* fetchGardenId(action){
  try{
    const gardenId = action.payload;
    const garden = yield axios.get(`/api/garden/gardenId/${gardenId}`)
    yield put({type:"SET_GARDEN_BY_ID", payload:garden.data});
  }catch(err){
    console.log("Error with getting garden by id: ", err)
  }
}

function* fetchExploreGarden(action){
  try{
    const data = action.payload;
    const featureType = data.query;
    const page = data.page
    const gardenFilter = yield axios.post(`/api/data/explore/garden`, {featureType: featureType, page: page})
    yield put({type:"SET_EXPLORE_GARDEN", payload: gardenFilter.data})
  }catch(err){
    console.log("error with getting explore garden feature: ", err);
  }
}
export default gardenSaga;
