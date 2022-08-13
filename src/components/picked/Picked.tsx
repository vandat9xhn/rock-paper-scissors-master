import * as React from "react";
import contextAPI from "../../context/contextAPI";

import IconItem from "../icon_item/IconItem";
import Result from "../result/Result";

import "./Picked.scss";

//
export interface PickedProps {}

//
function Picked({}: PickedProps) {
  //
  const { icons_obj, house_icon, icon_name, change_score, playAgain } =
    React.useContext(contextAPI);

  //
  return (
    <div className="Picked flex">
      <div className="Picked_col">
        <div className="Picked_title text-center">YOU PICKED</div>

        <div className="flex justify-center items-center">
          <div className="Picked_icon">
            <IconItem {...icons_obj[icon_name]} />
          </div>
        </div>
      </div>

      {!house_icon ? null : (
        <div className="Picked_result">
          <Result change_score={change_score} playAgain={playAgain} />
        </div>
      )}

      <div className="Picked_col">
        <div className="Picked_title text-center">THE HOUSE PICKED</div>

        <div className="Picked_house_bot flex justify-center items-center">
          {!house_icon ? (
            <div className="Picked_house_picking brs-50per"></div>
          ) : (
            <div className="Picked_house_picked Picked_icon">
              <IconItem {...icons_obj[house_icon]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Picked;
