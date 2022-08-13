import * as React from "react";

import contextAPI from "../context/contextAPI";

import Choices from "../components/choices/_main/Choices";
import Picked from "../components/picked/Picked";

import "./Pages.scss";

//
export interface PagesProps {}

//
function Pages({}: PagesProps) {
  //
  const { icon_name } = React.useContext(contextAPI);

  // ----

  //
  if (!icon_name) {
    return (
      <div className="Pages_choices">
        <Choices />
      </div>
    );
  }

  return <Picked />;
}

export default Pages;
