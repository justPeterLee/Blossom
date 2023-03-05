import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
export default function Details() {
  const params = useParams();
  const plantId = params.id;
  const dispatch = useDispatch();
  const details = useSelector((store) => store.plant.detailsReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: plantId });
  }, []);
  return (
    <div>
      <p>Details Page</p>
    </div>
  );
}
