import * as React from "react";

import contextAPI from "../context/contextAPI";

import RoomList from "./room/list/RoomList";
import RoomItem from "./room/item/RoomItem";
import Account from "./account/Account";

import "./Pages.scss";

//
export interface PagesProps {}

//
function Pages({}: PagesProps) {
  //
  const { user, ix_room } = React.useContext(contextAPI);

  // ----

  //
  if (!user) {
    return <Account />;
  }

  //
  if (ix_room < 0) {
    return <RoomList />;
  }

  return <RoomItem />;
}

export default Pages;
