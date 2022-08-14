import * as React from "react";

import "./IconItem.scss";

//
export interface IconItemProps {
  border: string;
  src: string;
}

//
function IconItem({ border, src }: IconItemProps) {
  //
  return (
    <div
      className="IconItem flex justify-center items-center wh-100per brs-50per"
      style={{
        borderColor: border,
      }}
    >
      <img className="IconItem_img" src={src} alt="" />
    </div>
  );
}

export default IconItem;
