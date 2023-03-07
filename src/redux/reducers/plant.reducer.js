import { combineReducers } from "redux";

function plantReducer(state = [], action){
    switch(action.type){
        case "SET_PLANT":
            return state = action.payload;
        default:
            return state;
    }
}

function detailsReducer(state={}, action){
    switch(action.type){
        case "SET_PLANT_DETAILS":
            return state = action.payload;
        default:
            return state;
    }
}

function noGardenPlantReducer(state=[], action){
    switch(action.type){
        case "SET_NO_GARDEN_PLANT":
            return state = action.payload;
        default:
            return state;
    }
}
export default combineReducers({
    plantReducer,
    detailsReducer,
    noGardenPlantReducer
});