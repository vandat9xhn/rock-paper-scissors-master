import * as React from "react";

import contextAPI from "../../../context/contextAPI";
import Portal from "../../portal/Portal";

import "./ModalFetching.scss";

//
export interface ModalFetchingProps {}

//
function ModalFetching({}: ModalFetchingProps) {
  //
  const {
    logging,
    registering,
    logging_saved_account,
    socket_connected,
    fetching,
  } = React.useContext(contextAPI);

  // -----

  if (
    logging ||
    registering ||
    logging_saved_account ||
    !socket_connected ||
    fetching
  ) {
    return (
      <Portal>
        <div className="ModalFetching pos-fixed-100per flex justify-center items-center">
          <span>Fetching </span>
          <span className="ModalFetching_dot">.</span>
          <span className="ModalFetching_dot">.</span>
          <span className="ModalFetching_dot">.</span>
        </div>
      </Portal>
    );
  }

  return null;
}

export default ModalFetching;
