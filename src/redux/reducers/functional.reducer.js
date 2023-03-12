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
        } else {
          return state;
        }
      }
    default:
      return state;
  }
}

function selectGardenTheme(state = "rgb(230,230,230)", action) {
  switch (action.type) {
    case "CHANGE_GARDEN_THEME":
      return (state = action.payload);
    default:
      return state;
  }
}

function plantDataAPI(state = {}, action) {
  switch (action.type) {
    case "SET_PLANT_DATA_API":
      return (state = action.payload);
    default:
      return state;
  }
}

function modalActive(state = false, action) {
  switch (action.type) {
    case "SET_MODAL_ACTIVE":
      return (state = true);
    case "SET_MODAL_DEACTIVE":
      return (state = false);
    case "RESET_ALL_MODAL":
      return (state = false);
    default:
      return state;
  }
}

function backdrop(state = false, action) {
  switch (action.type) {
    case "BACKDROP_CLICKED":
      return (state = true);
    case "RESET_BACKDROP":
      return (state = false);
    case "RESET_ALL_MODAL":
      return (state = false);
    default:
      return state;
  }
}

function modalColor(state = false, action) {
  switch (action.type) {
    case "MODAL_COLOR_CLICKED":
      return (state = true);
    case "RESET_MODAL_COLOR":
      return (state = false);
    case "RESET_ALL_MODAL":
      return (state = false);
    default:
      return state;
  }
}
function menuState(state=true, action){
  switch(action.type){
    case "HIDE_MENU":
      return state=false;
    case "SHOW_MENU":
      return state=true;
    case "RESET_MENU":
      return state = true;
    default:
      return state;
  }
}
export default combineReducers({
  selectPlantToGarden,
  selectGardenTheme,
  plantDataAPI,
  modalActive,
  backdrop,
  menuState,
  modalColor
});
