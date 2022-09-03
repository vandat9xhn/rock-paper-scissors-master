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
  viewers: {
    id: number;
    name: string;
    id_be_winner: number;
    online: boolean;
  }[];
  players: {
    id: number;
    name: string;
    has_pick: boolean;
    icon_name?: IconName;
    is_winner: boolean;
    count_predict_winner: number;
    online: boolean;
  }[];
  playing_state: "waiting" | "playing" | "ending";
  playing_time: number;
  is_bonus: boolean;
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
  socket_connected: boolean;
  logging_saved_account?: boolean;
  logging?: boolean;
  registering?: boolean;
  fetching: boolean;
  str_fetching?: keyof AppStateObj;

  user?: User;
  users: User[];
  rooms: Room[];
  ix_room: number;

  icon_name_arr: IconName[];
  icons_obj: IconsObj;
  game_name: string;

  id_user_info: number;
}

// ---

type emitFuncType = (...params: any[]) => void;
type emitFuncReturnType<T extends emitFuncType> = (
  ...params: Parameters<T>
) => void;
export type getEmitFuncType = <T extends emitFuncType>(
  emitFunc: T,
  str_fetching?: keyof AppStateObj,
  handleMoreState?: (state_obj: AppStateObj) => void
) => emitFuncReturnType<T>;

export type FuncHandleStateObj = (
  state_obj: AppStateObj
) => AppStateObj & { id_user_event?: number };
export type getHandleNewStateObjType = (func: FuncHandleStateObj) => void;

//

export interface AppPropsStateObj {
  handleNewStateObj: getHandleNewStateObjType;
}

export type ObjIdScore = { [id: number]: number };
