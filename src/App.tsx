import * as React from "react";

import Pages from "./pages/Pages";
import Score from "./components/score/Score";

import x from "../design/bonus/desktop-step-1-bonus.jpg";
import "./styles/style.scss";
import ContextAPIComponent from "./context/ContextAPIComponent";

//
export interface AppProps {}

//
function App({}: AppProps) {
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

        <img style={{ display: "none" }} src={x} alt="" />
      </div>
    </ContextAPIComponent>
  );
}

export default App;
