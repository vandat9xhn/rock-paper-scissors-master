import * as React from "react";

import contextAPI from "../../../context/contextAPI";

import './WaitingActions.scss';

//
export interface WaitingActionsProps {}

//
function WaitingActions({}: WaitingActionsProps) {
  //
  const {
    room,
    is_player,

    outRoom,
    becomePlayer,
    becomeViewer,
  } = React.useContext(contextAPI);

  //
  const disabled = !is_player && room.players.length >= 2;

  //
  return (
    <div className="WaitingActions">
      <div>
        <button className="WaitingActions_btn" type="button" onClick={outRoom}>
          Out
        </button>
      </div>

      <div>
        <button
          className={`WaitingActions_btn ${
            disabled ? "WaitingActions_btn-disabled" : ""
          }`}
          type="button"
          onClick={is_player ? becomeViewer : becomePlayer}
          disabled={disabled}
        >
          Become {is_player ? "Viewer" : "Player"}
        </button>
      </div>
    </div>
  );
}

export default WaitingActions;
