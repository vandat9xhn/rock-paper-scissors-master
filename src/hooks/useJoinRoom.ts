import { AppPropsStateObj, Room } from "../type";
import { socket } from "../getSocket";

import { getInitialGame } from "../data/icons";
import {
  getIxPlayer,
  getIxRoom,
  getIxUser,
  getIxViewer,
} from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useJoinRoomType extends AppPropsStateObj {}

//
export const useJoinRoom = ({ handleNewStateObj }: useJoinRoomType) => {
  //
  const emitJoinRoom = (id_room = 0) => {
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, id_room);
  };

  const onJoinRoom = () => {
    socket.on(SOCKET_EVENTS.JOIN_ROOM, (id_room = 0, id_user = 0) => {
      handleNewStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        const ix_room = getIxRoom(rooms, id_room);
        const ix_user = getIxUser(state_obj.users, id_user);
        const user = state_obj.users[ix_user];
        const room = rooms[ix_room];

        const ix_viewer = getIxViewer(room, id_user);
        const ix_player = getIxPlayer(room, id_user);

        // When Gaming: user logout then login again in the room
        if (ix_viewer >= 0) {
          room.viewers[ix_viewer].online = true;
        } else if (ix_player >= 0) {
          room.players[ix_player].online = true;
        } else {
          room.viewers.push({
            id: user.id,
            name: user.name,
            id_be_winner: 0,
            online: true,
          });
        }

        return {
          ...state_obj,
          rooms: rooms,
          ix_room: ix_room,
          ...getInitialGame(rooms[ix_room].is_bonus),
        };
      });
    });
  };

  const onUserJoinRoom = () => {
    socket.on(SOCKET_EVENTS.USER_JOIN_ROOM, (room: Room) => {
      handleNewStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        const ix_room = getIxRoom(rooms, room.id);
        rooms[ix_room] = room;

        return {
          ...state_obj,
          rooms: rooms,
          ix_room: ix_room,
          ...getInitialGame(room.is_bonus),
          id_user_event: state_obj.user.id,
        };
      });
    });
  };

  // -----

  return {
    emitJoinRoom,
    onJoinRoom,
    onUserJoinRoom,
  };
};
