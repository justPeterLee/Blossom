import styles from "./Garden.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import GardenItem from "./GardenItem/GardenItem";

export default function Garden() {
  const garden = useSelector((store) => store.garden.gardenReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_GARDEN" });
    dispatch({type: "SET_MODAL_DEACTIVE"})
  }, []);

  if(!garden){
    return <p>loading...</p>
  }

  if(garden.length !== garden.length){
    dispatch({ type: "FETCH_GARDEN" });
    return <p>loading...</p>
  }
  return (

    <div className="page_container">
      {garden.length === 0 && <div><p>no garden</p></div>}
      {garden.map((gardenInfo)=>{
        return(
            <GardenItem 
            key={gardenInfo.garden_table_id}
            id={gardenInfo.garden_table_id}
            name={gardenInfo.garden_name}
            type={gardenInfo.garden_type}
            num={gardenInfo.count}
            create={gardenInfo.garden_created_at}
            />
        )
      })}
    </div>
  );
}
