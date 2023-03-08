import { combineReducers } from "redux";

function selectPlantToGarden(state = [], action) {
  switch (action.type) {
    case "ADD_PLANT_TO_GARDEN":
      return (state = [...state, action.payload]);
    case "REMOVE_PLANT_TO_GARDEN":
      for (let i = 0; i < state.length; i++) {
        if (action.payload.id === state[i].id) {
          state.splice(i, 1);
          return state;
        }else{
            return state
        }
      };
    default:
        return state;
  }
}

function selectGardenTheme(state="rgb(230,230,230)", action){
    switch(action.type){
        case "CHANGE_GARDEN_THEME":
            return state = action.payload;
        default:
            return state;
    }
}

function plantDataAPI(state={},action){
    switch(action.type){
        case "SET_PLANT_DATA_API":
            return state = action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    selectPlantToGarden,
    selectGardenTheme,
    plantDataAPI
});
