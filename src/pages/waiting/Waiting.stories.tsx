import * as React from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import "../../styles/style.scss";

import contextAPI from "../../context/contextAPI";
import Waiting from "./Waiting";

//
export default {
  title: "Waiting",
  component: Waiting,
};

const room = {
  id: 1,
  name: "Room 1",
  viewers: ["Dat", "Nam", "Hai"].map((name, ix) => ({
    id: ix + 1,
    name: name,
    id_be_winner: 0,
    online: true,
  })),
  players: ["My", ].map((name, ix) => ({
    id: 11 + ix,
    name: name,
    has_pick: false,
    icon_name: undefined,
    is_winner: false,
    count_predict_winner: 0,
    online: true,
  })),
  playing_state: "waiting",
  playing_time: 60,
  is_bonus: true,
};

//
export const WaitingSb = () => (
  <contextAPI.Provider
    value={
      {
        room,
        is_player: true,
        player1: room.players[0],
        player2: room.players[1],
        is_player1: true,

        outRoom: () => {},
        becomePlayer: () => {},
        becomeViewer: () => {},
        playGame: () => {},

        openUserInfo: () => {}
      } as null
    }
  >
    <div className="App">
      <div className="flex justify-center">
        <Waiting />
      </div>
    </div>
  </contextAPI.Provider>
);
