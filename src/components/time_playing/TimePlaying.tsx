import * as React from "react";

import contextAPI from "../../context/contextAPI";

import TimeDown from "../time_down/TimeDown";

import "./TimePlaying.scss";

//
export interface TimePlayingProps {}

//
function TimePlaying({}: TimePlayingProps) {
  //
  const { room } = React.useContext(contextAPI);

  //
  return (
    <div className="TimePlaying">
      <TimeDown time_start={room.playing_time} />
    </div>
  );
}

export default TimePlaying;
