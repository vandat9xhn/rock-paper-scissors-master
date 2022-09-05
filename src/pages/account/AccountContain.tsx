import * as React from "react";

import { handleLoginType, handleRegisterType } from "../../type";

import Login from "../login/Login";
import Register from "../register/Register";

import "./AccountCommon.scss";
import "./Account.scss";
import { socket } from "../../getSocket";
import { SOCKET_EVENTS } from "../../data/socket_events";

//
export interface AccountContainProps {
  handleLogin: handleLoginType;
  handleRegister: handleRegisterType;
}

//
function AccountContain({ handleLogin, handleRegister }: AccountContainProps) {
  //
  const [login_or_register, setLoginOrRegister] = React.useState(true);
  const [arr_id_user, setArrIdUser] = React.useState([]);

  //
  React.useEffect(() => {
    socket.emit(SOCKET_EVENTS.USERS_NOT_LOG);
    socket.on(SOCKET_EVENTS.USERS_NOT_LOG, (arr_id_user_not_log: number[]) => {
      setArrIdUser(arr_id_user_not_log);
    });
  }, []);

  // -----

  const toggleLoginRegister = () => {
    setLoginOrRegister((login_or_register) => !login_or_register);
  };

  //-----

  return (
    <div className="Account">
      <div
        className={`Account_users pointer-events-none ${
          arr_id_user.length === 0 ? "display-none" : ""
        }`}
      >
        <div>Ids of users who are not login</div>
        <div>username=password=id</div>
        <div>
          {arr_id_user.map((item, ix) => (
            <span key={item}>{item}, </span>
          ))}
        </div>
      </div>

      <div className="Account_contain">
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
    </div>
  );
}

export default AccountContain;
