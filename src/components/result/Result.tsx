import * as React from "react";

import "./Result.scss";

//
export interface ResultProps {
  change_score: 0 | -1 | 1;
  playAgain: () => void;
}

//
function Result({ change_score, playAgain }: ResultProps) {
  //
  return (
    <div className="Result flex justify-center text-center">
      <div className="Result_win">
        YOU{" "}
        {change_score === 1 ? "WIN" : change_score === -1 ? "LOSE" : "NOT WIN"}
      </div>

      <div>
        <button
          className="Result_btn cursor-pointer"
          type="button"
          onClick={playAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default Result;
