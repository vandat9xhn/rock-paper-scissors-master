import * as React from "react";

import contextAPI from "../../../context/contextAPI";
import Game from "../../game/Game";

//
export interface RoomItemProps {}

//
function RoomItem({}: RoomItemProps) {
  //
  const { user, users, rooms, room_ix, outRoom, becomePlayer, becomeViewer } =
    React.useContext(contextAPI);

  const room = rooms[room_ix];
  const is_player = room.id_players.includes(user.id);
  const player1 = users.find((item) => item.id === room.id_players[0]);
  const player2 = users.find((item) => item.id === room.id_players[1]);

  //
  return (
    <div>
      <div>
        <div>Player1: {player1 ? player1.name : "No player"}</div>

        <div>Player2: {player2 ? player2.name : "No player"}</div>
      </div>

      {/* game */}
      <div>
        {/* <Game /> */}
      </div>

      <div>
        <div>People</div>

        <div>
          {room.users.map((item, ix) => (
            <div key={item.id}>Name: {item.name}</div>
          ))}
        </div>
      </div>

      <div>
        <div>
          <button
            type="button"
            onClick={is_player ? becomeViewer : becomePlayer}
            disabled={!is_player && room.id_players.length >= 2}
          >
            Become {is_player ? "Viewer" : "Player"}
          </button>
        </div>
      </div>

      <div>
        <button type="button" onClick={outRoom}>
          Out Room
        </button>
      </div>
    </div>
  );
}

export default RoomItem;
