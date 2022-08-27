import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";
import {
  getIxPlayer,
  getIxRoom,
  getIxUser,
  getIxViewer,
} from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useLogoutType extends AppPropsStateObj {}

//
export const useLogout = ({ handleNewStateObj }: useLogoutType) => {
  //
  const emitLogout = () => {
    socket.emit(SOCKET_EVENTS.LOGOUT);
  };

  const onLogout = () => {
    socket.on(SOCKET_EVENTS.LOGOUT, (id_user: number) => {
      handleNewStateObj((state_obj) => {
        const users = [...state_obj.users];
        const ix_user = getIxUser(users, id_user);
        users.splice(ix_user, 1);

        return {
          ...state_obj,
          users: users,
        };
      });
    });
  };

  const onRoomerLogout = () => {
    socket.on(
      SOCKET_EVENTS.ROOMER_LOGOUT,
      (id_room: number, id_user: number) => {
        handleNewStateObj((state_obj) => {
          const rooms = [...state_obj.rooms];
          const ix_room = getIxRoom(rooms, id_room);
          const room = rooms[ix_room];
          const ix_viewer = getIxViewer(room, id_user);

          if (ix_viewer) {
            room.viewers.splice(ix_viewer, 1);
          } else {
            const ix_player = getIxPlayer(room, id_user);
            room.players.splice(ix_player, 1);
          }

          return {
            ...state_obj,
            rooms: rooms,
          };
        });
      }
    );
  };

  // ----

  return {
    emitLogout,
    onLogout,
    onRoomerLogout,
  };
};
