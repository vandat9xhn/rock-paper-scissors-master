import * as React from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import "../../styles/style.scss";

import { Room, User } from "../../type";
import contextAPI from "../../context/contextAPI";
import Game from "./Game";
import { getRoomDefault } from "../../default/game";

//
export default {
  title: "Game",
  component: Game,
};

const room: Room = getRoomDefault();
room.playing_state = "playing";

const player1 = room.players[0];
const player2 = room.players[1];
const viewer1 = room.viewers[0]
const user: User = {
  id: viewer1.id,
  name: viewer1.name,
  score: 1,
};

//
export const GameSb = () => (
  <contextAPI.Provider
    value={
      {
        user,
        room,
        is_player: true,
        player1,
        player2,
        is_player1: user.id === player1.id,
        is_player2: user.id === player2.id,

        outRoom: () => {},
        becomePlayer: () => {},
        becomeViewer: () => {},
        playGame: () => {},

        openUserInfo: () => {},
      } as null
    }
  >
    <div className="App">
      <div className="flex justify-center">
        <Game />
      </div>
    </div>
  </contextAPI.Provider>
);
