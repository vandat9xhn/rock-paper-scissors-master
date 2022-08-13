import * as React from "react";
import * as ReactDom from "react-dom";

//
export interface PortalProps {
  children: React.ReactElement;
}

//
function Portal({ children }: PortalProps) {
  //
  return ReactDom.createPortal(
    children,
    document.getElementsByTagName("body")[0]
  );
}

export default Portal;
