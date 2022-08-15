import * as React from "react";

import { IS_MOBILE } from "./constant";

import ContextAPIComponent from "./context/ContextAPIComponent";
import Pages from "./pages/Pages";

import "./styles/style.scss";

//
export interface AppProps {}

//
function App({}: AppProps) {
  //
  React.useLayoutEffect(() => {
    if (IS_MOBILE) {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("device-mobile");
    }
  }, []);

  //
  return (
    <ContextAPIComponent>
      <div className="App">
        <div className="flex justify-center">
          <Pages />
        </div>
      </div>
    </ContextAPIComponent>
  );
}

export default App;
