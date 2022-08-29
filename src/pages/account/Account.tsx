import * as React from "react";

import contextAPI from "../../context/contextAPI";

import AccountContain from "./AccountContain";

//
export interface AccountProps {}

//
function Account({}: AccountProps) {
  //
  const {
    logging_saved_account,
    logging,
    registering,

    handleLoginSavedAccount,
    handleLogin,
    handleRegister,
  } = React.useContext(contextAPI);

  //
  React.useEffect(() => {
    handleLoginSavedAccount();
  }, []);

  //-----

  return (
    <AccountContain
      fetching={logging_saved_account || logging || registering}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
    />
  );
}

export default Account;
