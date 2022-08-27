import * as React from "react";

import contextAPI from "../../../context/contextAPI";
import Game from "../../game/Game";

//
export interface RoomItemProps {}

//
function RoomItem({}: RoomItemProps) {
  //
  const {
    user,
    rooms,
    ix_room,

    outRoom,
    becomePlayer,
    becomeViewer,
    playGame,
  } = React.useContext(contextAPI);

  const room = rooms[ix_room];
  const player1 = room.players[0];
  const player2 = room.players[1];
  const is_player =
    player1 && !!room.players.find((item) => item.id === user.id);
  const is_player1 = player1 && player1.id === user.id;
  
  //
  if (room.playing_state !== "waiting") {
    return <Game is_player={is_player} />;
  }

  //
  return (
    <div>
      <div>
        <div>Player:</div>
        <div>Player1: {player1 ? player1.name : "No player"}</div>
        <div>Player2: {player2 ? player2.name : "No player"}</div>
      </div>

      {/* btns */}
      <div>
        <div>
          <button
            type="button"
            onClick={is_player ? becomeViewer : becomePlayer}
            disabled={!is_player && room.players.length >= 2}
          >
            Become {is_player ? "Viewer" : "Player"}
          </button>
        </div>

        <div>
          <button type="button" onClick={outRoom}>
            Out Room
          </button>
        </div>

        {!is_player1 || !player2 ? null : (
          <div>
            <button type="button" onClick={playGame}>
              Let's play
            </button>
          </div>
        )}
      </div>

      {/* people */}
      <div>
        <div>Viewer</div>

        <div>
          {room.viewers.map((item, ix) => (
            <div key={item.id}>Name: {item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomItem;
