import * as React from "react";

import contextAPI from "../../context/contextAPI";

import Choices from "../../components/choices/_main/Choices";
import Picked from "../../components/picked/Picked";
import Score from "../../components/score/Score";
import Actions from "../../components/actions/Actions";

import './Game.scss';

//
export interface GameProps {}

//
function Game({}: GameProps) {
  //
  const { icon_name } = React.useContext(contextAPI);

  //
  return (
    <div>
      <div className="Game_score">
        <Score />
      </div>

      <div className="flex justify-center">
        {!icon_name ? (
          <div className="Game_choices">
            <Choices />
          </div>
        ) : (
          <Picked />
        )}
      </div>

      <div>
        <Actions />
      </div>
    </div>
  );
}

export default Game;
