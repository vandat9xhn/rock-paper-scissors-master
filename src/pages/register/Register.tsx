import * as React from "react";

import { handleRegisterType } from "../../type";

//
export interface RegisterProps {
  handleRegister: handleRegisterType;
}

//
function Register({ handleRegister }: RegisterProps) {
  //
  const refUsername = React.useRef<HTMLInputElement>(null);
  const refPassword = React.useRef<HTMLInputElement>(null);
  const refName = React.useRef<HTMLInputElement>(null);

  //
  const onRegister: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const username = refUsername.current.value;
    const password = refPassword.current.value;
    const name = refName.current.value.trim();

    if (username && password && name) {
      handleRegister(username, password, name);
    }
  };

  //
  return (
    <div className="Register">
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

        <div>
          <div>Your Name</div>

          <div>
            <input ref={refName} type="text" />
          </div>
        </div>

        <button type="submit" onClick={onRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
