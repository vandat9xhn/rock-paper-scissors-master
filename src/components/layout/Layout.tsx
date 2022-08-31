import * as React from "react";

import contextAPI from "../../context/contextAPI";
import UserBtn from "../user_btn/UserBtn";

import "./Layout.scss";

//
export interface LayoutProps {
  children: React.ReactElement;
}

//
function Layout({ children }: LayoutProps) {
  //
  const { user, users } = React.useContext(contextAPI);

  const users_sort = [...users].sort((a, b) => b.score - a.score);

  //
  return (
    <div>
      {!user ? null : (
        <div className="Layout_online">
          <div className="Layout_online_title">Online: {users.length}</div>

          <div className={`Layout_online_list`}>
            {users_sort.map((item, ix) => (
              <div key={item.id} className="Layout_online_item">
                <UserBtn id_user={item.id}>
                  <div>
                    {item.id === user.id ? "You" : item.name}: {item.score}
                  </div>
                </UserBtn>
              </div>
            ))}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

export default Layout;
