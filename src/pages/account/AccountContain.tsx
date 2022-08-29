import * as React from "react";

import { handleLoginType, handleRegisterType } from "../../type";

import Portal from "../../components/portal/Portal";
import Login from "../login/Login";
import Register from "../register/Register";

import "./AccountCommon.scss";
import "./Account.scss";

//
export interface AccountContainProps {
  fetching: boolean;
  handleLogin: handleLoginType;
  handleRegister: handleRegisterType;
}

//
function AccountContain({
  fetching,
  handleLogin,
  handleRegister,
}: AccountContainProps) {
  //
  const [login_or_register, setLoginOrRegister] = React.useState(true);

  // -----

  const toggleLoginRegister = () => {
    setLoginOrRegister((login_or_register) => !login_or_register);
  };

  //-----

  return (
    <div className="Account">
      {fetching ? (
        <Portal>
          <div className="wh-100per" style={{ position: "fixed" }}>
            Fetching...
          </div>
        </Portal>
      ) : null}

      <div className={`${login_or_register ? "" : "display-none"}`}>
        <Login handleLogin={handleLogin}></Login>
      </div>

      <div className={`${login_or_register ? "display-none" : ""}`}>
        <Register handleRegister={handleRegister}></Register>
      </div>

      <div>
        <button
          type="button"
          className="Account_btn"
          onClick={toggleLoginRegister}
        >
          Go To {login_or_register ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default AccountContain;
