import * as React from "react";

import contextAPI from "../../context/contextAPI";

import TimeDown from "../time_down/TimeDown";

//
export interface TimePlayingProps {}

//
function TimePlaying({}: TimePlayingProps) {
  //
  const { room } = React.useContext(contextAPI);

  //
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: 0,
        transform: "translateX(-50%)",
      }}
    >
      <div>
        <TimeDown time_start={room.playing_time} />
      </div>
    </div>
  );
}

export default TimePlaying;
