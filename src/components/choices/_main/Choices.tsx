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
  const { icons_obj, icon_name_arr, handlePick } = React.useContext(contextAPI);

  //
  const bg = icon_name_arr.length === 5 ? pentagon : triangle;

  //
  return (
    <div
      className="Choices pos-rel wh-100per"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {icon_name_arr.map((item, ix) => (
        <div
          key={item}
          className="Choices_item"
          style={{
            transform: `rotate(${(360 * ix) / icon_name_arr.length}deg)`,
          }}
        >
          <div
            style={{
              transform: `rotate(${-(360 * ix) / icon_name_arr.length}deg)`,
            }}
          >
            <ChoiceItem
              icon_name={item}
              {...icons_obj[item]}
              handlePick={handlePick}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Choices;
