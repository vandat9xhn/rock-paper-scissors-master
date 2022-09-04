import * as React from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import { handleLoginType, handleRegisterType } from "../../type";
import "../../styles/style.scss";

import AccountContain from "./AccountContain";

//
export default {
  title: "Account",
  component: AccountContain,
};

const handleLogin: handleLoginType = (username, password) => {
  console.log(username, password);
};

const handleRegister: handleRegisterType = (username, password, name) => {
  console.log(username, password, name);
};

//
export const LoginSb = () => (
  <div className="App">
    <div className="flex justify-center">
      <AccountContain
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    </div>
  </div>
);
