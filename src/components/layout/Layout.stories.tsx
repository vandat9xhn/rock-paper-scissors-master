import * as React from "react";
import contextAPI from "../../context/contextAPI";
import { User } from "../../type";
import Layout from "./Layout";
import "../../styles/style.scss";
//
export default {
  title: "Layout",
  component: Layout,
};

//
const users: User[] = Array.from({ length: 10 }, (v, k) => ({
  id: k + 1,
  name: `Name ${k + 1}`,
  score: 0,
}));
const user = users[0];

//
export const LayoutSb = () => {
  return (
    <contextAPI.Provider
      value={
        {
          users: users,
          user: user,
        } as null
      }
    >
      <div className="App">
        <Layout>
          <div style={{ height: "200vh" }}></div>
        </Layout>
      </div>
    </contextAPI.Provider>
  );
};
