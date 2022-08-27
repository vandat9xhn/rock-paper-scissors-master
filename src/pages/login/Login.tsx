import * as React from "react";

import { handleLoginType } from "../../type";

//
export interface LoginProps {
  handleLogin: handleLoginType;
}

//
function Login({ handleLogin }: LoginProps) {
  //
  const refUsername = React.useRef<HTMLInputElement>(null);
  const refPassword = React.useRef<HTMLInputElement>(null);

  //
  const onLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const username = refUsername.current.value;
    const password = refPassword.current.value;

    if (username && password) {
      handleLogin(username, password);
    }
  };

  //
  return (
    <div className="Login">
      <form>
        <div>
          <div>Username</div>

          <div>
            <input ref={refUsername} type="text" />
          </div>
        </div>

        <div>
          <div>Password</div>

          <div>
            <input ref={refPassword} type="text" />
          </div>
        </div>

        <button type="submit" onClick={onLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
