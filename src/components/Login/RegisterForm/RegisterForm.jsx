import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from "./RegisterForm.module.css";

import { BiUser } from "react-icons/bi";
import { FiUnlock } from "react-icons/fi";
function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [focused, setFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false)

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  const toggleFocusOn = () => {
    setFocus(true)
  }
  const toggleFocusOff = () => {
    setFocus(false)
  }

  const togglePassFocusOn = () => {
    setPassFocus(true)
  }
  const togglePassFocusOff = () => {
    setPassFocus(false)
  }

  return (
    <form className="formPanel" onSubmit={registerUser}>
       <p className={styles.title}>Register User</p>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className={styles.input} style={focused ? { backgroundColor: "rgb(245,245,250)",borderBottom: "solid 1px rgb(100,100,200)"}: {}}>
        <label htmlFor="username">
          <BiUser size={25} className={styles.icon} style={focused ? { color: "rgb(0,0,200)"} : {}}/>
        </label>
        <input
          type="text"
          name="username"
          required
          value={username}

          style={focused ? { backgroundColor: "rgb(245,245,250)"} : {}}

          onChange={(event) => setUsername(event.target.value)}
          onFocus={toggleFocusOn}
          onBlur={toggleFocusOff}

          placeholder={"Username"}
        />
      </div>
      <div className={styles.input} style={passFocus ? {backgroundColor: "rgb(245,245,250)",borderBottom: "solid 1px rgb(100,100,200)"}: {}}>
        <label htmlFor="password">
          <FiUnlock size={22} className={styles.icon} style={passFocus ? { color: "rgb(0,0,200)"} : {}}/>
        </label>
        <input
          type="password"
          name="password"
          required
          value={password}

          style={passFocus ? { backgroundColor: "rgb(245,245,250)"} : {}}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={togglePassFocusOn}
          onBlur={togglePassFocusOff}

          placeholder={"Password"}
        />
      </div>
      <div>
        <input className={styles.btn} type="submit" name="submit" value="CREATE" />
      </div>
    </form>
  );
}

export default RegisterForm;
