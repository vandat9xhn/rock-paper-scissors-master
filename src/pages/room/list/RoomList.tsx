import * as React from "react";

import contextAPI from "../../../context/contextAPI";

import "./RoomList.scss";

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
        <div key={item.id} className="RoomList_item">
          <button
            className="RoomList_btn cursor-pointer"
            type="button"
            onClick={() => joinRoom(item.id)}
          >
            <h3 className="RoomList_name">{item.name}</h3>

            <div className="RoomList_info">
              <span>Viewer: {item.viewers.length}</span>
              <span>{" - "}</span>
              <span>Player: {item.players.length}</span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
