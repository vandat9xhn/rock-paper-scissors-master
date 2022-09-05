import * as React from "react";

import contextAPI from "../../../../context/contextAPI";

import UserBtn from "../../../user_btn/UserBtn";

import './LayoutOnlinePc.scss';

//
export interface LayoutOnlinePcProps {}

//
function LayoutOnlinePc({}: LayoutOnlinePcProps) {
  const { user, users } = React.useContext(contextAPI);

  const users_sort = [...users].sort((a, b) => b.score - a.score);

  //
  return (
    <div className="LayoutOnlinePc">
      <div className="LayoutOnlinePc_title">Online: {users.length}</div>

      <div className={`LayoutOnlinePc_list`}>
        <div className="LayoutOnlinePc_list_contain">
          {users_sort.map((item, ix) => (
            <div
              key={item.id}
              className={`LayoutOnlinePc_item ${
                item.id === user.id ? "LayoutOnlinePc_item-active" : ""
              }`}
            >
              <UserBtn id_user={item.id}>
                {item.id === user.id ? "You" : item.name}: {item.score}
              </UserBtn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LayoutOnlinePc;
