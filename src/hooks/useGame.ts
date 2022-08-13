import * as React from "react";

import { handlePickType, IconName, IconsObj } from "../type";
import { getInitialGame, getChangeScore } from "../data/icons";

//
const getInitialState = (): Omit<useGameState, "score"> => ({
  is_bonus: true,
  icon_name_arr: [],
  icons_obj: {},
  game_name: "",

  // house_icon: "",
  // icon_name: "",
  change_score: 0,
});

//
interface useGameState {
  is_bonus: boolean;
  icon_name_arr: IconName[];
  icons_obj: IconsObj;
  game_name: string;

  house_icon?: IconName;
  icon_name?: IconName;
  change_score: 0 | 1 | -1;
  score: number;
}

//
export function useGame() {
  //
  const [state_obj, setStateObj] = React.useState<useGameState>({
    is_bonus: true,
    icon_name_arr: [],
    icons_obj: {},
    game_name: "",

    // house_icon: "",
    // icon_name: "",
    change_score: 0,
    score: 0,
  });

  //
  React.useEffect(() => {
    handleInitial();
  }, []);

  // ----

  const handleInitial = () => {
    setStateObj((state_obj) => ({
      ...state_obj,
      ...getInitialGame(state_obj.is_bonus),
    }));
  };

  const changeIsBonus = (_is_bonus = true) => {
    setStateObj((state_obj) => ({
      ...state_obj,
      is_bonus: _is_bonus,
    }));
  };

  //
  const handlePick: handlePickType = (_icon_name) => {
    setStateObj((state_obj) => ({
      ...state_obj,
      icon_name: _icon_name,
    }));

    setTimeout(() => {
      setStateObj((state_obj) => {
        const { icon_name_arr } = state_obj;
        const new_house_icon =
          icon_name_arr[Math.round(Math.random() * (icon_name_arr.length - 1))];

        const _change_score = getChangeScore(
          new_house_icon,
          state_obj.icon_name,
          state_obj.is_bonus
        );
        const _score = state_obj.score + _change_score;

        return {
          ...state_obj,
          house_icon: new_house_icon,
          change_score: _change_score,
          score: _score >= 0 ? _score : 0,
        };
      });
    }, 500);
  };

  const playAgain = () => {
    setStateObj((state_obj) => ({
      ...state_obj,
      ...getInitialState(),
      ...getInitialGame(state_obj.is_bonus),
      house_icon: undefined,
      icon_name: undefined,
    }));
  };

  // ---

  return {
    ...state_obj,

    changeIsBonus,
    handlePick,
    playAgain,
  };
}

export type useGameReturnType = ReturnType<typeof useGame>;
