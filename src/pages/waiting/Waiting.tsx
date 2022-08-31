import * as React from "react";

import WaitingActions from "./actions/WaitingActions";
import WaitingPlayers from "./players/WaitingPlayers";
import WaitingViewers from "./viewers/WaitingViewers";

import './Waiting.scss';

//
export interface WaitingProps {}

//
function Waiting({}: WaitingProps) {
  //
  return (
    <div className="Waiting">
      <div className="Waiting_actions">
        <WaitingActions />
      </div>

      <div className="Waiting_row">
        <div className="Waiting_col">
          <WaitingPlayers />
        </div>

        <div className="Waiting_col">
          <WaitingViewers />
        </div>
      </div>
    </div>
  );
}

export default Waiting;
