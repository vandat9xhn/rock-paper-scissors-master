import * as React from "react";

import contextAPI from "../../context/contextAPI";

import AccountContain from "./AccountContain";

//
export interface AccountProps {}

//
function Account({}: AccountProps) {
  //
  const { handleLoginSavedAccount, handleLogin, handleRegister } =
    React.useContext(contextAPI);

  //
  React.useEffect(() => {
    handleLoginSavedAccount();
  }, []);

  //-----

  return (
    <AccountContain handleLogin={handleLogin} handleRegister={handleRegister} />
  );
}

export default Account;
