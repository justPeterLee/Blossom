function gardenReducer(state = [], action) {
  switch (action.type) {
    case "SET_GARDEN":
      return state = action.payload;
    default:
      return state;
  }
}

export default gardenReducer