import { combineReducers } from "redux";

function plantReducer(state = [], action) {
  switch (action.type) {
    case "SET_PLANT":
      return (state = action.payload);
    default:
      return state;
  }
}

function detailsReducer(state = {}, action) {
  switch (action.type) {
    case "SET_PLANT_DETAILS":
      const monthLabel = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const detailData = action.payload[0];

      let height = detailData.plant_height;
      let feet = Math.floor(height / 12);
      let inches = height - (feet * 12);

      if (inches < 10) {
        inches = `0${inches}`;
      } else {
        inches = `${inches}`;
      }

      detailData.plant_height = { ft: feet, in: inches, height: height };
      let yearNow = new Date().toJSON().slice(0, 4);
      let monthNow = new Date().toJSON().slice(5, 7);
      let dayNow = new Date().toJSON().slice(8, 10);

      console.log(monthNow)

      let date = detailData.plant_created_at;
      let year = date.slice(0, 4);
      let month = date.slice(5, 7);
      let day = date.slice(8, 10);

      let monthName = monthLabel[parseInt(month) - 1];

      let yearAge = parseInt(yearNow - year);
      let monthAge = parseInt(monthNow - month);
      let dayAge = parseInt(dayNow - day);

      if (monthAge < 0) {
        monthAge = parseInt(12 - month + monthNow);
        if (yearAge > 1) {
          console.log(yearAge)
          monthAge = (12 * yearAge) + monthAge;
        }
      }

      detailData.plant_created_at = {
        day: day,
        month: month,
        year: year,
        monthName: monthName,
        yearAge: yearAge,
        monthAge: monthAge,
        dayAge: dayAge,
      };

      return (state = action.payload);
    default:
      return state;
  }
}

function noGardenPlantReducer(state = [], action) {
  switch (action.type) {
    case "SET_NO_GARDEN_PLANT":
      return (state = action.payload);
    default:
      return state;
  }
}

function explorePlantReducer(state=[], action){
  switch (action.type) {
    case "SET_EXPLORE_PLANT":
      return (state = action.payload);
    default:
      return state;
  }
}
export default combineReducers({
  plantReducer,
  detailsReducer,
  noGardenPlantReducer,
  explorePlantReducer
});
