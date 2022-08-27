import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";

import { getIxPlayer, getIxRoom, getIxViewer } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useOutRoomType extends AppPropsStateObj {}

//
export const useOutRoom = ({ handleNewStateObj }: useOutRoomType) => {
  //
  const emitOutRoom = () => {
    socket.emit(SOCKET_EVENTS.OUT_ROOM);
  };

  const onOutRoom = () => {
    socket.on(SOCKET_EVENTS.OUT_ROOM, (id_room = 0, id_user = 0) => {
      handleNewStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        const ix_room = getIxRoom(rooms, id_room);
        const room = rooms[ix_room];
        const ix_viewer = getIxViewer(room, id_user);
        const ix_player = getIxPlayer(room, id_user);

        if (ix_viewer >= 0) {
          room.viewers.splice(ix_viewer, 1);
        } else {
          room.players.splice(ix_player, 1);
        }

        return {
          ...state_obj,
          rooms: rooms,
          ix_room: id_user === state_obj.user.id ? -1 : state_obj.ix_room,
        };
      });
    });
  };

  // -----

  return {
    emitOutRoom,
    onOutRoom,
  };
};
