import * as React from "react";

import contextAPI from "../../../context/contextAPI";

//
export interface RoomListProps {}

//
function RoomList({}: RoomListProps) {
  //
  const { rooms, joinRoom } = React.useContext(contextAPI);

  //
  return (
    <div>
      {rooms.map((item, ix) => (
        <div key={item.id}>
          <button type="button" onClick={() => joinRoom(item.id)}>
            {item.name}: {item.users.length} people
          </button>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
