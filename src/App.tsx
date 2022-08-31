import * as React from "react";

import { IS_MOBILE } from "./constant";

import Layout from "./components/layout/Layout";
import Pages from "./pages/Pages";
import ModalUserInfo from "./components/modal/user_info/ModalUserInfo";
import ModalFetching from "./components/modal/fetching/ModalFetching";

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
    <div className="App">
      <Layout>
        <div className="flex justify-center">
          <Pages />
        </div>
      </Layout>

      <ModalUserInfo />
      <ModalFetching />
    </div>
  );
}

export default App;
