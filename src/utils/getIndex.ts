import { Room, User } from "../type";

//
export const getIxUser = (users: User[], id_user = 0) =>
  users.findIndex((item) => item.id === id_user);

export const getIxRoom = (rooms: Room[], id_room = 0) =>
  rooms.findIndex((item) => item.id === id_room);

export const getIxPlayer = (room: Room, id_user = 0) =>
  room.players.findIndex((item) => item.id === id_user);

export const getIxViewer = (room: Room, id_user = 0) =>
  room.viewers.findIndex((item) => item.id === id_user);
