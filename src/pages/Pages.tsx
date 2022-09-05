import * as React from "react";

import contextAPI from "../context/contextAPI";

import RoomList from "./room/list/RoomList";
import Account from "./account/Account";
import Game from "./game/Game";
import Waiting from "./waiting/Waiting";

import "./Pages.scss";

//
export interface PagesProps {}

//
function Pages({}: PagesProps) {
  //
  const { user, ix_room, room } = React.useContext(contextAPI);

  //
  React.useEffect(() => {
    const handleBeforeunload = (e: BeforeUnloadEvent) => {
      return (e.returnValue = "");
    };

    window.addEventListener("beforeunload", handleBeforeunload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
  }, []);

  //

  // ----

  if (!user) {
    return <Account />;
  }

  if (ix_room < 0) {
    return <RoomList />;
  }

  if (room.playing_state === "waiting") {
    return <Waiting />;
  }

  return <Game />;
}

export default Pages;
