import * as React from "react";

import contextAPI from "./contextAPI";
import { useGame } from "../hooks/useGame";

//
export interface ContextAPIComponentProps {
  children: React.ReactElement;
}

//
function ContextAPIComponent({ children }: ContextAPIComponentProps) {
  //
  const params = useGame();

  //
  return (
    <contextAPI.Provider
      value={{
        ...params,
      }}
    >
      {children}
    </contextAPI.Provider>
  );
}

export default ContextAPIComponent;
