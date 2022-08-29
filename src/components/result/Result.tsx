import * as React from "react";
import TimeDown from "../time_down/TimeDown";

import "./Result.scss";

//
export interface ResultProps {
  is_player1: boolean;
  win_str: string;
  playAgain: () => void;
}

//
function Result({ is_player1, win_str, playAgain }: ResultProps) {
  //
  return (
    <div className="Result flex justify-center text-center">
      <div className="Result_win">{win_str}</div>

      {is_player1 && (
        <div>
          <button
            className="Result_btn cursor-pointer"
            type="button"
            onClick={playAgain}
          >
            <span>PLAY AGAIN</span>{" "}
            <span>
              (<TimeDown time_start={8} />)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Result;
