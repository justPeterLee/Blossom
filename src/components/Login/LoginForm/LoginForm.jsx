import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import styles from "./Login.module.css";

import { BiUser } from "react-icons/bi";
import { FiUnlock } from "react-icons/fi";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [focused, setFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false)
  
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

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
    <form className={styles.form_container} onSubmit={login}>
      <p className={styles.title}>SIGN IN</p>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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
          <FiUnlock size={22}  className={styles.icon} style={passFocus ? { color: "rgb(0,0,200)"} : {}}/>
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
        <input className={styles.btn} type="submit" name="submit" value="LOGIN" />
      </div>
    </form>
  );
}

export default LoginForm;
