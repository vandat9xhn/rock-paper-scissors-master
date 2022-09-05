import * as React from "react";

import contextAPI from "../../../context/contextAPI";

import Portal from "../../portal/Portal";
import UserBtn from "../../user_btn/UserBtn";

import "./ModalUserOnlineMb.scss";

//
export interface ModalUserOnlineMbProps {
  hideUsersOnline: () => void;
}

//
function ModalUserOnlineMb({ hideUsersOnline }: ModalUserOnlineMbProps) {
  //
  const { users } = React.useContext(contextAPI);

  //
  return (
    <Portal>
      <div className="ModalUserOnlineMb">
        <div className="ModalUserOnlineMb_head">
          <h3 className="ModalUserOnlineMb_heading">Online: {users.length}</h3>

          <div
            className="ModalUserOnlineMb_close cursor-pointer"
            onClick={hideUsersOnline}
          >
            Close
          </div>
        </div>

        <div className="ModalUserOnlineMb_list">
          {users.map((item, ix) => (
            <div key={item.id} className="ModalUserOnlineMb_item" >
              <UserBtn id_user={item.id}>
                {item.name}: {item.score}
              </UserBtn>
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
}

export default ModalUserOnlineMb;
