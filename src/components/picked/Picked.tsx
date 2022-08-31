import * as React from "react";

import { IS_MOBILE } from "../../constant";
import contextAPI from "../../context/contextAPI";

import IconItem from "../icon_item/IconItem";
import Result from "../result/Result";

import "./Picked.scss";

//
const ItemPicking = ({
  is_win,
  has_pick,
  border,
  src,
}: {
  is_win: boolean;
  has_pick: boolean;
  src: string;
  border: string;
}) => {
  return (
    <div className="Picked_item flex justify-center items-center">
      {!has_pick ? (
        <div className="Picked_item_picking brs-50per"></div>
      ) : (
        <div
          className={`Picked_item_picked Picked_icon ${
            is_win ? "Picked_icon-win" : ""
          }`}
        >
          <IconItem border={border} src={src} />
        </div>
      )}
    </div>
  );
};

//
export interface PickedProps {}

//
function Picked({}: PickedProps) {
  //
  const {
    icons_obj,
    room,
    player1,
    player2,
    is_player1,
    is_player2,
    playAgain,
  } = React.useContext(contextAPI);

  //
  const ending = room.playing_state === "ending";
  const is_player1_win = player1 && player1.is_winner;
  const is_player2_win = player2 && player2.is_winner;
  const no_winner = !is_player1_win && !is_player2_win && !!player1.icon_name;
  const is_you_win =
    !no_winner &&
    ((is_player1 && is_player1_win) || (is_player2 && is_player2_win));
  const win_str = no_winner
    ? "no winner"
    : `${
        is_you_win ? "you" : is_player1_win ? player1.name : player2.name
      } win`;

  //
  return (
    <div className="Picked">
      <div className="Picked_row flex">
        <div className="Picked_col Picked_col-left">
          <div className="Picked_title text-center">
            {is_player1 ? "you" : player1 ? player1.name : "player1"} picked
          </div>

          <ItemPicking
            is_win={is_player1_win}
            has_pick={player1.has_pick}
            {...icons_obj[player1.icon_name]}
          />
        </div>

        {!ending || IS_MOBILE ? null : (
          <div className="Picked_result">
            <Result
              is_player1={is_player1}
              win_str={win_str}
              playAgain={playAgain}
            />
          </div>
        )}

        <div className="Picked_col Picked_col-right">
          <div className="Picked_title text-center">
            {is_player2 ? "you" : player2 ? player2.name : "PLAYER2"} PICKED
          </div>

          <ItemPicking
            is_win={is_player2_win}
            has_pick={player2.has_pick}
            {...icons_obj[player2.icon_name]}
          />
        </div>
      </div>

      {!ending || !IS_MOBILE ? null : (
        <div className="Picked_result">
          <Result
            is_player1={is_player1}
            win_str={win_str}
            playAgain={playAgain}
          />
        </div>
      )}
    </div>
  );
}

export default Picked;
