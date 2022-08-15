import { ICONS5 } from "./data/icons";

//
export interface User {
  id: number;
  name: string;
}
export interface Room {
  id: number;
  name: string;
  users: User[];
  id_players: number[];
}
export type handleLoginType = (user_name: string) => void;

//
export type IconName = keyof typeof ICONS5;
export type IconsObj = Partial<typeof ICONS5>;
export type handlePickType = (icon_name: IconName) => void;
export type playAgainType = () => void;
