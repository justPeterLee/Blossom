import React from 'react';
import LogOutButton from '../../Layout/LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />


      <p>tech:</p>
      <p>node</p>
      <p>express</p>
      <p>react</p>
      <p>postgresql</p>
      <p>css</p>
      <p>perenualAPI</p>
      <p>plant.id API</p>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
