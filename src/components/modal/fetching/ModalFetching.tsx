import * as React from "react";

import contextAPI from "../../../context/contextAPI";
import Portal from "../../portal/Portal";

//
export interface ModalFetchingProps {}

//
function ModalFetching({}: ModalFetchingProps) {
  //
  const { logging, registering, logging_saved_account } =
    React.useContext(contextAPI);

  // -----

  if (logging || registering || logging_saved_account) {
    return (
      <Portal>
        <div className="wh-100per" style={{ position: "fixed" }}>
          Fetching...
        </div>
      </Portal>
    );
  }

  return null;
}

export default ModalFetching;
