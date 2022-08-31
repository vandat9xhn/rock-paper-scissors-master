import * as React from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import "../../styles/style.scss";

import { Room } from "../../type";
import contextAPI from "../../context/contextAPI";
import Voting from "./Voting";
import { getRoomDefault } from "../../default/game";

//
export default {
  title: "Voting",
  component: Voting,
};

const room: Room = getRoomDefault();
room.playing_state = "playing";

//
export const VotingSb = () => (
  <contextAPI.Provider
    value={
      {
        room,
        handleVote: () => {},
      } as null
    }
  >
    <div className="App">
      <div className="flex justify-center">
        <Voting />
      </div>
    </div>
  </contextAPI.Provider>
);
