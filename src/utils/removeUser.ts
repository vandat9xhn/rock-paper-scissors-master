import { Room, User } from "../type";
import { getIxPlayer, getIxUser, getIxViewer } from "./getIndex";

//
export const removeUser = (users: User[], id_user: number) => {
  const ix_user = getIxUser(users, id_user);
  users.splice(ix_user, 1);
};

export const removeViewer = (room: Room, id_user: number) => {
  const ix_viewer = getIxViewer(room, id_user);
  room.viewers.splice(ix_viewer, 1);
};

export const removePlayer = (room: Room, id_user: number) => {
  const ix_player = getIxPlayer(room, id_user);
  room.players.splice(ix_player, 1);
};

//
export const removeUserPlayer = (
  users: User[],
  room: Room,
  id_user: number
) => {
  removePlayer(room, id_user);
  removeUser(users, id_user);
};

export const removeUserViewer = (
  users: User[],
  room: Room,
  id_user: number
) => {
  removeViewer(room, id_user);
  removeUser(users, id_user);
};
