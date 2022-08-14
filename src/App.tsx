import * as React from "react";

import { IS_MOBILE } from "./constant";

import ContextAPIComponent from "./context/ContextAPIComponent";
import Pages from "./pages/Pages";
import Score from "./components/score/Score";
import Actions from "./components/actions/Actions";

import x from "../design/bonus/desktop-step-1-bonus.jpg";
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
        <div className="App_score">
          <Score />
        </div>

        <div className="flex justify-center">
          <Pages />
        </div>

        <div>
          <Actions />
        </div>
        <img style={{ display: "none" }} src={x} alt="" />
      </div>
    </ContextAPIComponent>
  );
}

export default App;
