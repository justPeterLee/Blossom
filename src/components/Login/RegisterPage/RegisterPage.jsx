import React, { Fragment } from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import bee from '../../../icon/Bloom-B.png';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className='login_container_all'>
    <img src={bee} height="225px" className='login_logo_image'/>
    <div className='login_container'>
       

      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
    </div>
    
  );
}

export default RegisterPage;
