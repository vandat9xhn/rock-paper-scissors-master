import * as React from "react";

import contextAPI from "../../../context/contextAPI";
import WaitingUser from "../../../components/waiting_user/WaitingUser";

import "./WaitingPlayers.scss";

//
export interface WaitingPlayersProps {}

//
function WaitingPlayers({}: WaitingPlayersProps) {
  //
  const { player1, player2, is_player1, is_player2, playGame } =
    React.useContext(contextAPI);

  //
  return (
    <div className="WaitingPlayers waiting-users">
      <div>
        <h3 className="waiting-title">Players:</h3>

        <div>
          <WaitingUser id_user={player1?.id}>
            <div> {is_player1 ? "You" : player1?.name || "No player"}</div>
          </WaitingUser>

          <WaitingUser id_user={player2?.id}>
            <div>{is_player2 ? "You" : player2?.name || "No player"}</div>
          </WaitingUser>
        </div>
      </div>

      <div>
        {!is_player1 ? null : (
          <button
            className={`WaitingPlayers_play ${
              player2 ? "" : "WaitingPlayers_play-disabled"
            }`}
            type="button"
            onClick={playGame}
            disabled={!player2}
          >
            Let's play
          </button>
        )}
      </div>
    </div>
  );
}

export default WaitingPlayers;
