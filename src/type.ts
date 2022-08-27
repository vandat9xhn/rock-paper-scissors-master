import * as React from "react";

import { ICONS5 } from "./data/icons";

//
export interface User {
  id: number;
  name: string;
  score: number;
}
export interface Room {
  id: number;
  name: string;
  viewers: { id: number; name: string; id_be_winner: number }[];
  players: {
    id: number;
    name: string;
    has_pick: boolean;
    icon_name?: IconName;
    is_winner: boolean;
    count_predict_winner: number;
  }[];
  playing_state: "waiting" | "playing" | "ending";
  playing_time: number;
  is_bonus: boolean;
  winner_name: string;
  defeater_name: string;
  // winner_id: number;
  // defeater_id: number;
}
export type handleRegisterType = (
  username: string,
  password: string,
  name: string
) => void;
export type handleLoginType = (username: string, password: string) => void;

//
export type IconName = keyof typeof ICONS5;
export type IconsObj = Partial<typeof ICONS5>;
export type handlePickType = (icon_name: IconName) => void;
export type playAgainType = () => void;

// ----

export interface AppStateObj {
  logging_saved_account?: boolean;
  logging?: boolean;
  registering?: boolean;

  user?: User;
  users: User[];
  rooms: Room[];
  ix_room: number;

  icon_name_arr: IconName[];
  icons_obj: IconsObj;
  game_name: string;
}

export interface AppPropsStateObj {
  handleNewStateObj: React.Dispatch<React.SetStateAction<AppStateObj>>;
}

//
export type ObjIdScore = { [id: number]: number };
