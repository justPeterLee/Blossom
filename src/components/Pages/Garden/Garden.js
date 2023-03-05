import styles from "./Garden.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import GardenItem from "./GardenItem/GardenItem";

export default function Garden() {
  const garden = useSelector((store) => store.garden);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_GARDEN" });
  }, []);

  if(!garden){
    return <p>loading...</p>
  }
  return (
    <div className="page_container">
      {garden.map((gardenInfo)=>{
        return(
            <GardenItem 
            key={gardenInfo.id}
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
