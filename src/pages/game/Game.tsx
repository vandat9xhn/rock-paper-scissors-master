import * as React from "react";

import contextAPI from "../../context/contextAPI";

import Score from "../../components/score/Score";
import Actions from "../../components/actions/Actions";
import TimePlaying from "../../components/time_playing/TimePlaying";
import Choices from "../../components/choices/_main/Choices";
import Picked from "../../components/picked/Picked";
import Voting from "../../components/voting/Voting";

import "./Game.scss";

//
export interface GameProps {
  is_player: boolean;
}

//
function Game({}: GameProps) {
  //
  const { room, player1, player2, is_player, is_player1, is_player2 } =
    React.useContext(contextAPI);

  const to_picked =
    room.playing_state === "ending" ||
    (is_player1 && player1.has_pick) ||
    (is_player2 && player2.has_pick);

  //
  return (
    <div>
      <div className="Game_score">
        <Score />
      </div>

      {room.playing_state !== "playing" ? null : (
        <div>
          <TimePlaying />
        </div>
      )}

      <div className="flex justify-center">
        {to_picked ? (
          <Picked />
        ) : is_player ? (
          <div
            className={`Game_choices ${is_player ? "" : "Game_choices-viewer"}`}
          >
            <Choices />
          </div>
        ) : (
          <div>
            <Voting />
          </div>
        )}
      </div>

      <div>
        <Actions />
      </div>
    </div>
  );
}

export default Game;
