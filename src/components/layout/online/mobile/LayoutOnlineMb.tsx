import * as React from "react";

import contextAPI from "../../../../context/contextAPI";

import ModalUserOnlineMb from "../../../modal/user_online_mb/ModalUserOnlineMb";

import './LayoutOnlineMb.scss';

//
export interface LayoutOnlineMbProps {}

//
function LayoutOnlineMb({}: LayoutOnlineMbProps) {
  //
  const { users } = React.useContext(contextAPI);

  //
  const [is_show, setIsShow] = React.useState(false);

  // ---

  const showUsersOnline = () => {
    setIsShow(true);
  };

  const hideUsersOnline = () => {
    setIsShow(false);
  };

  //
  return (
    <React.Fragment>
      <div className="LayoutOnlineMb_title" onClick={showUsersOnline}>
        Online: {users.length}
      </div>

      {is_show ? <ModalUserOnlineMb hideUsersOnline={hideUsersOnline} /> : null}
    </React.Fragment>
  );
}

export default LayoutOnlineMb;
