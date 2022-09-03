import * as React from "react";

import { IS_MOBILE } from "../../constant";
import contextAPI from "../../context/contextAPI";

import IconItem from "../icon_item/IconItem";
import Result from "../result/Result";

import "./Picked.scss";

//
const ItemPicking = ({
  name,
  is_win,
  online,
  has_pick,
  border,
  src,
  count_predict_winner,
}: {
  name: string;
  online: boolean;
  is_win: boolean;
  has_pick: boolean;
  src: string;
  border: string;
  count_predict_winner: number;
}) => {
  return (
    <React.Fragment>
      <div className="Picked_title text-center">
        {name} {online ? "picked" : "out"}
      </div>

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

      <div className="Picked_voting text-center">
        {count_predict_winner} vote{count_predict_winner >= 2 ? "s" : ""}
      </div>
    </React.Fragment>
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
  const no_winner = !is_player1_win && !is_player2_win;
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
          <ItemPicking
            name={is_player1 ? "you" : player1.name}
            online={player1.online}
            is_win={is_player1_win}
            has_pick={player1.has_pick}
            {...icons_obj[player1.icon_name]}
            count_predict_winner={player1?.count_predict_winner || 0}
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
          <ItemPicking
            name={is_player2 ? "you" : player2.name}
            is_win={is_player2_win}
            online={player2.online}
            has_pick={player2.has_pick}
            {...icons_obj[player2.icon_name]}
            count_predict_winner={player2?.count_predict_winner || 0}
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
