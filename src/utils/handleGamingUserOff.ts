import { Room } from "../type";

//
export const handleGamingPlayerOff = (room: Room, id_user: number) => {
  room.players.find((item) => item.id === id_user).online = false;
};

export const handleGamingViewerOff = (room: Room, id_user: number) => {
  room.viewers.find((item) => item.id === id_user).online = false;
};
