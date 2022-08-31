import * as React from "react";

import contextAPI from "../../../context/contextAPI";
import WaitingUser from "../../../components/waiting_user/WaitingUser";

//
export interface WaitingViewersProps {}

//
function WaitingViewers({}: WaitingViewersProps) {
  //
  const { room } = React.useContext(contextAPI);

  //
  return (
    <div className="waiting-users">
      <h3 className="waiting-title">Viewers:</h3>

      <div>
        {room.viewers.map((item, ix) => (
          <WaitingUser key={item.id} id_user={item.id}>
            <div>{item.name}</div>
          </WaitingUser>
        ))}
      </div>
    </div>
  );
}

export default WaitingViewers;
