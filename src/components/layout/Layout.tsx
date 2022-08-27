import * as React from "react";

import contextAPI from "../../context/contextAPI";

import "./Layout.scss";

//
export interface LayoutProps {
  children: React.ReactElement;
}

//
function Layout({ children }: LayoutProps) {
  //
  const { user, users } = React.useContext(contextAPI);

  //
  return (
    <div>
      {!user ? null : (
        <div className="Layout_online">
          <div className="Layout_online_title">Online: {users.length}</div>

          <div className={`Layout_online_list`}>
            {users.map((item, ix) => (
              <div key={item.id} className="Layout_online_item">
                {item.name}: {item.score}
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
