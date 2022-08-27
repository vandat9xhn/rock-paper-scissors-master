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
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => joinRoom(item.id)}
          >
            <div>
              {item.name}: {item.playing_state}
            </div>

            <div>Viewer: {item.viewers.length}</div>

            <div>Player: {item.players.length}</div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
