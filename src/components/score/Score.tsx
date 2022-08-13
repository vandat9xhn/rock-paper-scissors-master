import * as React from "react";

import contextAPI from "../../context/contextAPI";

import "./Score.scss";

//
export interface ScoreProps {}

//
function Score({}: ScoreProps) {
  //
  const { game_name, score } = React.useContext(contextAPI);

  //
  return (
    <div className="Score flex">
      <div className="Score_name">{game_name}</div>

      <div className="Score_right">
        <div className="Score_title">SCORE</div>

        <div className="Score_num">{score}</div>
      </div>
    </div>
  );
}

export default Score;
