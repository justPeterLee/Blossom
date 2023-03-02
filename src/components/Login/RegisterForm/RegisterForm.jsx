import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from "./RegisterForm.module.css";

import { BiUser } from "react-icons/bi";
import { FiUnlock } from "react-icons/fi";
function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  return (
    <form className="formPanel" onSubmit={registerUser}>
       <p className={styles.title}>Register User</p>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
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
        <input className={styles.btn} type="submit" name="submit" value="CREATE" />
      </div>
    </form>
  );
}

export default RegisterForm;
