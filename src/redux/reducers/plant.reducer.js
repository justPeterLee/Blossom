function plantReducer(state = [], action){
    switch(action.type){
        case "SET_PLANT":
            return state = action.payload;
        default:
            return state;
    }
}

export default plantReducer;