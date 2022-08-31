import * as React from "react";
import contextAPI from "../../../context/contextAPI";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import "../../../styles/style.scss";

import RoomList from "./RoomList";

//
export default {
  title: "RoomList",
  component: RoomList,
};

const room = {
  id: 1,
  name: "Room 1",
  viewers: [
    {
      id: 1,
      name: "",
      id_be_winner: 0,
      online: true,
    },
  ],
  players: [
    {
      id: 1,
      name: "string",
      has_pick: false,
      icon_name: undefined,
      is_winner: false,
      count_predict_winner: 0,
      online: true,
    },
  ],
  playing_state: "waiting",
  playing_time: 60,
  is_bonus: true,
};

const rooms = [1, 2, 3, 4].map((item) => ({
  ...room,
  id: item,
  name: `Room ${item}`,
}));

//
export const RoomListSb = () => (
  <contextAPI.Provider
    value={
      {
        rooms: rooms,
        joinRoom: (id_room = 0) => {
          console.log(id_room);
        },
      } as null
    }
  >
    <div className="App">
      <div className="flex justify-center">
        <RoomList />
      </div>
    </div>
  </contextAPI.Provider>
);
