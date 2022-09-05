import * as React from "react";

import { IS_MOBILE } from "../../constant";
import contextAPI from "../../context/contextAPI";

import LayoutOnlineMb from "./online/mobile/LayoutOnlineMb";
import LayoutOnlinePc from "./online/pc/LayoutOnlinePc";
import Chat from "../chat/Chat";

import "./Layout.scss";

//
export interface LayoutProps {
  children: React.ReactElement;
}

//
function Layout({ children }: LayoutProps) {
  //
  const { user } = React.useContext(contextAPI);

  //
  return (
    <div>
      {!user ? null : (
        <React.Fragment>
          {IS_MOBILE ? <LayoutOnlineMb /> : <LayoutOnlinePc />}

          <Chat />
        </React.Fragment>
      )}

      {children}
    </div>
  );
}

export default Layout;
