import * as React from "react";

import contextAPI from "../../../context/contextAPI";
import { handlePickType } from "../../../type";

import ChoiceItem from "../item/ChoiceItem";

import pentagon from "../../../../images/bg-pentagon.svg";
import triangle from "../../../../images/bg-triangle.svg";
import "./Choices.scss";

//
export interface ChoicesProps {}

//
function Choices({}: ChoicesProps) {
  //
  const { rooms, ix_room, is_player, icons_obj, icon_name_arr, handlePick } =
    React.useContext(contextAPI);

  const is_bonus = rooms[ix_room].is_bonus;
  const bg = icon_name_arr.length === 5 ? pentagon : triangle;

  // ----

  const onPick: handlePickType = (icon_name) => {
    if (is_player) {
      handlePick(icon_name);
    }
  };

  //
  return (
    <div
      className="Choices pos-rel wh-100per"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {icon_name_arr.map((item, ix) => {
        const rotate = is_bonus
          ? (360 * ix) / icon_name_arr.length
          : [-40, 40, 180][ix];
        const transform_center = `translate(-50%, -50%)`;

        return (
          <div
            key={item}
            className="Choices_item"
            style={{
              transform: `${transform_center} rotate(${rotate}deg)`,
              height: is_bonus ? undefined : ix == 2 ? "80%" : "130%",
            }}
          >
            <div
              style={{
                transform: `${transform_center} rotate(-${rotate}deg)`,
              }}
            >
              <ChoiceItem
                icon_name={item}
                {...icons_obj[item]}
                handlePick={onPick}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Choices;
