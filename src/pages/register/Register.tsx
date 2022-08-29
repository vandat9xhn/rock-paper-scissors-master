import * as React from "react";

import { handleRegisterType } from "../../type";

//
export interface RegisterProps {
  handleRegister: handleRegisterType;
}

//
function Register({ handleRegister }: RegisterProps) {
  const [state_obj, setStateObj] = React.useState({
    username: "",
    password: "",
    name: "",
  });

  // ----

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStateObj((state_obj) => ({
      ...state_obj,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegister: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { username, password, name } = state_obj;

    if (username && password) {
      handleRegister(username, password, name);
    }
  };

  //
  return (
    <div className="Register">
      <form className="Register_form">
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

        <div className="account-field">
          <div className="account-label">Name</div>

          <div>
            <input
              className="account-input"
              type="text"
              name="name"
              value={state_obj.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className={`account-btn ${
            !state_obj.username || !state_obj.password || !state_obj.name
              ? "account-btn-disable"
              : ""
          }`}
          type="submit"
          onClick={onRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
