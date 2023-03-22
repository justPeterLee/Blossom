import { combineReducers } from "redux";
function gardenReducer(state = [], action) {
  switch (action.type) {
    case "SET_GARDEN":
      return state = action.payload;
    default:
      return state;
  }
}

function gardenFilterReducer(state=[], action){
  switch (action.type){
    case "SET_GARDEN_FILTER":
      return state = action.payload;
    default:
      return state;
  }
}

function gardenById(state=[], action){
  switch(action.type){
    case "SET_GARDEN_BY_ID":
      return state = action.payload;
    default:
      return state;
  }
}
function exploreGardenReducer(state=[], action){
  switch (action.type) {
    case "SET_EXPLORE_GARDEN":
      return (state = action.payload);
    default:
      return state;
  }
}
export default combineReducers({
  gardenReducer,
  gardenFilterReducer,
  gardenById,
  exploreGardenReducer
}) 