import { AppPropsStateObj, Room } from "../type";
import { socket } from "../getSocket";

import { getInitialGame } from "../data/icons";
import { getIxRoom, getIxUser } from "../utils/getIndex";
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

        rooms[ix_room].viewers.push({
          id: user.id,
          name: user.name,
          id_be_winner: 0,
        });

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
      console.log(room);
      
      handleNewStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        const ix_room = getIxRoom(rooms, room.id);
        rooms[ix_room] = room;

        return {
          ...state_obj,
          rooms: rooms,
          ix_room: ix_room,
          ...getInitialGame(room.is_bonus),
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
