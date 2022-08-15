import * as React from "react";

import { IS_MOBILE } from "../../constant";
import contextAPI from "../../context/contextAPI";
import Portal from "../portal/Portal";

import rule_bonus from "../../../images/image-rules-bonus.svg";
import rule from "../../../images/image-rules.svg";
import icon_close from "../../../images/icon-close.svg";
import "./Actions.scss";

//
export interface ActionsProps {}

//
function Actions({}: ActionsProps) {
  //
  const { icon_name, is_bonus, changeIsBonus } = React.useContext(contextAPI);

  //
  const [show_rules, setShowRules] = React.useState(false);

  // ----

  //
  const handleGameBonus = () => {
    changeIsBonus();
  };

  const handleGameNormal = () => {
    changeIsBonus(false);
  };

  const openRules = () => {
    setShowRules(true);
  };

  const closeRules = () => {
    setShowRules(false);
  };

  //
  return (
    <div className="Actions">
      {icon_name ? null : (
        <React.Fragment>
          <button
            type="button"
            className={`Actions_btn ${is_bonus ? "Actions_btn-active" : ""}`}
            onClick={handleGameBonus}
          >
            Bonus
          </button>

          <button
            type="button"
            className={`Actions_btn ${is_bonus ? "" : "Actions_btn-active"}`}
            onClick={handleGameNormal}
          >
            Normal
          </button>
        </React.Fragment>
      )}

      <button type="button" className="Actions_btn" onClick={openRules}>
        Rules
      </button>

      {!show_rules ? null : (
        <Portal>
          <div className="Actions_rules">
            {IS_MOBILE ? null : (
              <div className="Actions_rules_bg" onClick={closeRules}></div>
            )}

            <div className="Actions_rules_contain">
              {IS_MOBILE ? (
                <div className="Actions_rules_tile">RULES</div>
              ) : null}

              <img src={is_bonus ? rule_bonus : rule} alt="" />
            </div>

            <div className="Actions_rules_close">
              <img src={icon_close} alt="" onClick={closeRules} />
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default Actions;
