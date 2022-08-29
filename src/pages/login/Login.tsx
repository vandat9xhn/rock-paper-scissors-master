import * as React from "react";

import { handleLoginType } from "../../type";

import "./Login.scss";

//
export interface LoginProps {
  handleLogin: handleLoginType;
}

//
function Login({ handleLogin }: LoginProps) {
  const [state_obj, setStateObj] = React.useState({
    username: "",
    password: "",
  });

  // ----

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStateObj((state_obj) => ({
      ...state_obj,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { username, password } = state_obj;

    if (username && password) {
      handleLogin(username, password);
    }
  };

  //
  return (
    <div className="Login">
      <form className="Login_form">
        <div className="account-field">
          <div className="account-label">Username</div>

          <div>
            <input
              className="account-input"
              type="text"
              name="username"
              value={state_obj.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="account-field">
          <div className="account-label">Password</div>

          <div>
            <input
              className="account-input"
              type="password"
              name="password"
              value={state_obj.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className={`account-btn ${
            !state_obj.username || !state_obj.password
              ? "account-btn-disable"
              : ""
          }`}
          type="submit"
          onClick={onLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
