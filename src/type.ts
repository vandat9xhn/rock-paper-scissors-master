import { ICONS5 } from "./data/icons";

//
export type IconName = keyof typeof ICONS5;
export type IconsObj = Partial<typeof ICONS5>;
export type handlePickType = (icon_name: IconName) => void;
export type playAgainType = () => void;
