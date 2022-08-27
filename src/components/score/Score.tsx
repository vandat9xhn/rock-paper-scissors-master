import * as React from "react";

import contextAPI from "../../context/contextAPI";

import "./Score.scss";

//
export interface ScoreProps {}

//
function Score({}: ScoreProps) {
  //
  const { game_name, user } = React.useContext(contextAPI);

  //
  return (
    <div className="Score flex">
      <div className="Score_name">
        {game_name.split("\n").map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>

      <div className="Score_right">
        <div className="Score_title">YOUR SCORE</div>

        <div className="Score_num">{user.score}</div>
      </div>
    </div>
  );
}

export default Score;
