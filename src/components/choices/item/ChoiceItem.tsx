import * as React from "react";

import { handlePickType, IconName } from "../../../type";

import IconItem from "../../icon_item/IconItem";

import "./ChoiceItem.scss";

//
export interface ChoiceItemProps {
  icon_name: IconName;
  src: string;
  border: string;
  handlePick: handlePickType;
}

//
function ChoiceItem({ icon_name, src, border, handlePick }: ChoiceItemProps) {
  //
  const [is_press, setIsPress] = React.useState(false);

  // -----

  //
  const onClick = () => {
    handlePick(icon_name);
  };

  const handleDown = () => {
    setIsPress(true);
  };

  const handleUp = () => {
    setIsPress(false);
  };

  //
  return (
    <div
      className={`ChoiceItem cursor-pointer ${
        is_press ? "ChoiceItem-press" : "ChoiceItem-normal"
      }`}
      onClick={onClick}
      style={{
        boxShadow: is_press
          ? "0 0 transparent"
          : `0 6px 0 0 #0000002b, 0 6px 0 0 ${border}`,
      }}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
    >
      <IconItem border={border} src={src} />
    </div>
  );
}

export default ChoiceItem;
