import * as React from "react";
import Portal from "../../components/portal/Portal";

import contextAPI from "../../context/contextAPI";

import Login from "../login/Login";
import Register from "../register/Register";

//
export interface AccountProps {}

//
function Account({}: AccountProps) {
  //
  const {
    fetching_saved_account,
    logging,
    registering,

    handleLoginSavedAccount,
    handleLogin,
    handleRegister,
  } = React.useContext(contextAPI);

  //
  const [login_or_register, setLoginOrRegister] = React.useState(true);

  //
  React.useEffect(() => {
    handleLoginSavedAccount();
  }, []);

  // -----

  const toggleLoginRegister = () => {
    setLoginOrRegister((login_or_register) => !login_or_register);
  };

  //-----

  return (
    <div>
      {fetching_saved_account || logging || registering ? (
        <Portal>
          <div className="wh-100per" style={{ position: "fixed" }}>
            Fetching...
          </div>
        </Portal>
      ) : null}

      <div>
        {login_or_register ? (
          <Login handleLogin={handleLogin}></Login>
        ) : (
          <Register handleRegister={handleRegister}></Register>
        )}
      </div>

      <div>
        <button type="button" onClick={toggleLoginRegister}>
          Go To {login_or_register ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Account;
