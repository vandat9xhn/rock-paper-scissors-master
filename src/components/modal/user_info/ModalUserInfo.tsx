import * as React from "react";

import contextAPI from "../../../context/contextAPI";
import Portal from "../../portal/Portal";

import "./ModalUserInfo.scss";

//
export interface ModalUserInfoProps {}

interface UserInfoProps {}

//
function UserInfo({}: UserInfoProps) {
  //
  const { users, id_user_info, closeUserInfo } = React.useContext(contextAPI);

  //
  const user_info = users.find((item) => item.id === id_user_info);

  //
  return (
    <Portal>
      <div className="ModalUserInfo">
        <div className="ModalUserInfo_bg" onClick={closeUserInfo}></div>

        <div className="ModalUserInfo_contain">
          <div className="ModalUserInfo_name">Name: {user_info.name}</div>

          <div>Score: {user_info.score}</div>
        </div>
      </div>
    </Portal>
  );
}

function ModalUserInfo({}: ModalUserInfoProps) {
  //
  const { id_user_info } = React.useContext(contextAPI);

  // ----

  if (id_user_info <= 0) {
    return null;
  }

  return <UserInfo />;
}

export default ModalUserInfo;
