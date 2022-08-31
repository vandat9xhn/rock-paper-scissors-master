import * as React from "react";
import contextAPI from "../../context/contextAPI";

import "./UserBtn.scss";

//
export interface UserBtnProps {
  id_user?: number;
  children: string | React.ReactElement;
}

//
function UserBtn({ id_user = -1, children }: UserBtnProps) {
  //
  const { openUserInfo } = React.useContext(contextAPI);

  //
  const onOpenUserInfo = () => {
    if (id_user <= 0) {
      return;
    }

    openUserInfo(id_user);
  };

  //
  return (
    <div
      className={`UserBtn ${
        id_user <= 0 ? "pointer-events-none" : "cursor-pointer"
      }`}
      onClick={onOpenUserInfo}
    >
      {children}
    </div>
  );
}

export default UserBtn;
