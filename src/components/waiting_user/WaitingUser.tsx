import * as React from "react";

import UserBtn from "../user_btn/UserBtn";

//
export interface WaitingUserProps {
  id_user?: number;
  children: string | React.ReactElement;
}

//
function WaitingUser({ id_user = -1, children }: WaitingUserProps) {
  //
  return <UserBtn id_user={id_user}>{children}</UserBtn>;
}

export default WaitingUser;
