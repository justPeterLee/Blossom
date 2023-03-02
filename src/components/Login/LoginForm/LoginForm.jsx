import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import styles from "./Login.module.css";

import { BiUser } from "react-icons/bi";
import { FiUnlock } from "react-icons/fi";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <form className="formPanel" onSubmit={login}>
      <p className={styles.title}>SIGN IN</p>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className={styles.input}>
        <label htmlFor="username">
          <BiUser size={25} />
        </label>
        <input
          type="text"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder={"Username"}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="password">
          <FiUnlock size={22}/>
        </label>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}

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
