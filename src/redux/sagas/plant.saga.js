import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

// plant watcher function
function* plantSaga() {
  yield takeEvery("FETCH_PLANT", fetchPlant);
  yield takeEvery("FETCH_DETAILS", fetchDetails);
  yield takeEvery("UPDATE_PLANT", updatePlant);
  yield takeEvery("DELETE_PLANT", deletePlant);

  // get plants with no garden
  yield takeEvery("FETCH_PLANT_NO_GARDEN", fetchNoGardenPlant);

  // GET plant data API
  yield takeEvery("FETCH_PLANT_DATA_API", fetchPlantDataAPI);

  // (POST) create plant
  yield takeEvery("CREATE_PLANT", createPlantInfo);

  // GET explore plants
  yield takeEvery("FETCH_EXPLORE_PLANT", fetchExplorePlant);
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

function* updatePlant(action) {
  try {

    const plantData = action.payload
    yield axios.put(`/api/plant/update`, action.payload);
    //yield put({ type: "UPDATE_PLANT", payload: plantData.id});
  } catch (err) {
    console.log("Error with updating Plant: ", err);
  }
}

function* deletePlant(action) {
  try {
    const plantId = action.payload.plantId;
    const plantInfoId = action.payload.infoId;
    yield axios.delete(`/api/plant/delete/${plantId}/${plantInfoId}`);
    yield fetchPlant;
  } catch (err) {
    console.log("Error with DELETING plant: ", err);
  }
}

// plants with no garden
function* fetchNoGardenPlant() {
  try {
    const plants = yield axios.get(`/api/plant/no-garden`);
    yield put({ type: "SET_NO_GARDEN_PLANT", payload: plants.data });
  } catch (err) {
    console.log("Error with GETTING plant with no garden: ", err);
  }
}

// fetch API data
function* fetchPlantDataAPI(action) {
  try {
    const plantDataAPI = yield axios.post(`/api/data/upload`, action.payload);
    console.log(plantDataAPI.data);
    yield put({ type: "SET_PLANT_DATA_API", payload: plantDataAPI.data });
  } catch (err) {
    console.log("Error with GETTING plant API data: ", err);
  }
}

// create plant
function* createPlant(action) {
  try {
    const newPlantDataReq = action;
    yield axios.post(`/api/plant/create`, newPlantDataReq);
    //yield fetchPlant;
  } catch (err) {
    console.log("Error with creating new plant: ", err);
  }
}

// create plant info
function* createPlantInfo(action) {
  try {
    const newPlantData = action.payload;
    const plantInfo = yield axios.post(`/api/plant/info/create`, newPlantData);
    const plantId = plantInfo.data
    let newPlantDataInfo = {
      name: newPlantData.name,
      height: newPlantData.height,
      date: newPlantData.date,
      image: newPlantData.image,
      plantId: plantId[0].plant_info_table_id
    }
    yield createPlant(newPlantDataInfo);
  } catch (err) {
    console.log("Error with creating plant info: ", err);
  }
}


function* fetchExplorePlant(action){
  try{
    const page = action.payload;
    const explorePlant = yield axios.get(`/api/data/explore/plant/${page}`);
    yield put({type: "SET_EXPLORE_PLANT", payload: explorePlant.data});
  }catch(err){
    console.log('Error with getting explore plants: ', err)
  }
}
export default plantSaga;
