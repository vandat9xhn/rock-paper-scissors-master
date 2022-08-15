import * as React from "react";

import contextAPI from "../context/contextAPI";

import Login from "./login/Login";
import RoomList from "./room/list/RoomList";
import RoomItem from "./room/item/RoomItem";

import "./Pages.scss";

//
export interface PagesProps {}

//
function Pages({}: PagesProps) {
  //
  const { user, room_ix, handleLogin } = React.useContext(contextAPI);

  // ----

  //
  if (!user) {
    return <Login handleLogin={handleLogin} />;
  }

  // 
  if (room_ix < 0) {
    return <RoomList />
  }

  return <RoomItem />

  
}

export default Pages;
