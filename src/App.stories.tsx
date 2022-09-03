import * as React from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import { getStateObjDefault, getFuncDefault } from "./default/game";
import { getMoreStateObj } from "./utils/getMoreStateObj";

import contextAPI from "./context/contextAPI";
import App from "./App";
import { getInitialGame } from "./data/icons";

//
export default {
  title: "App",
  component: App,
};

const state_obj = { ...getStateObjDefault(), ...getInitialGame(true) };
const func_default = getFuncDefault();

// state_obj.user = undefined;

// room
state_obj.ix_room = 0;

// role
const roles = ["player1", "player2", "viewer"] as const;
const role: typeof roles[number] = "player2";
const ix_user = roles.indexOf(role);
state_obj.user = state_obj.users[ix_user];

// state_obj.user = undefined;

// ---
const more_state_obj = getMoreStateObj(state_obj);

const { room, player1, player2, is_player1, is_player2, is_player } =
  more_state_obj;

room.playing_state = "ending";
player1.has_pick = true;
player1.icon_name = "paper";
player1.is_winner = false;
player1.count_predict_winner = 10

player2.has_pick = true;
player2.icon_name = "rock";
player2.is_winner = true;

//
export const AppSb = () => {
  return (
    <contextAPI.Provider
      value={{
        ...state_obj,
        ...more_state_obj,
        ...func_default,
      }}
    >
      <App />
    </contextAPI.Provider>
  );
};
