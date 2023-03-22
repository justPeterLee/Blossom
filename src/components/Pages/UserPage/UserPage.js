import React from "react";
import styles from './UserPage.module.css'
import LogOutButton from "../../Layout/LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [tech, setTech] = useState(false);
  const showTech = ()=>{
    setTech(!tech)
  }
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.user_container}>
        <h2>hi, {user.username}</h2>
      </div>
      <LogOutButton className={styles.logOut_button} />

      <button onClick={()=>{history.push('/home')}} className={styles.home_button}>Home</button>

      <div className={styles.button_container}>
      <button onClick={()=>{history.push('/garden')}} className={styles.garden_button}>Garden</button>
      <button onClick={()=>{history.push('/plants')}} className={styles.plant_button}>Plant</button>

      </div>

      <button onClick={()=>{history.push('/tech')}} className={styles.tech_button}>tech</button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
