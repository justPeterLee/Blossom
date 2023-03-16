import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import bee from "../../../icon/Bloom-B.png";

function LoginPage() {
  const history = useHistory();

  return (
    <div className="login_container_all">
      <img src={bee} height="225px" className="login_logo_image"/>
      <div className="login_container">
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn_asLink"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </button>
        </center>
      </div>
    </div>
  );
}

export default LoginPage;
