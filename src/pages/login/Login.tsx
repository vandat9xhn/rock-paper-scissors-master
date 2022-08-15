import * as React from "react";

import { handleLoginType } from "../../type";

//
export interface LoginProps {
  handleLogin: handleLoginType;
}

//
function Login({ handleLogin }: LoginProps) {
  //
  const refIp = React.useRef<HTMLInputElement>(null);

  //
  const onLogin = () => {
    const user_name = refIp.current.value;
    if (user_name) {
      handleLogin(user_name);
    }
  };

  //
  return (
    <div className="Login">
      <div>Your Name:</div>

      <div>
        <input ref={refIp} type="text" />
      </div>

      <button type="button" onClick={onLogin}>
        Join
      </button>
    </div>
  );
}

export default Login;
