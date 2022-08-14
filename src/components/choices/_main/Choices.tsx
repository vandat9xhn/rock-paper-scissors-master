import * as React from "react";

import ChoiceItem from "../item/ChoiceItem";

import pentagon from "../../../../images/bg-pentagon.svg";
import triangle from "../../../../images/bg-triangle.svg";

import "./Choices.scss";
import contextAPI from "../../../context/contextAPI";

//
export interface ChoicesProps {}

//
function Choices({}: ChoicesProps) {
  //
  const { icons_obj, icon_name_arr, is_bonus, handlePick } =
    React.useContext(contextAPI);

  //
  const bg = icon_name_arr.length === 5 ? pentagon : triangle;

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
                handlePick={handlePick}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Choices;
