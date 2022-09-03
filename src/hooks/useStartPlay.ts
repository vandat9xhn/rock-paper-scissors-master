import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";
import { getIxRoom } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useStartPlayType extends AppPropsStateObj {}

//
export const useStartPlay = ({ handleNewStateObj }: useStartPlayType) => {
  //
  const emitStartPlay = () => {
    socket.emit(SOCKET_EVENTS.PLAY_GAME);
  };

  const onStartPlay = () => {
    socket.on(SOCKET_EVENTS.PLAY_GAME, (id_room: number) => {
      handleNewStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        const ix_room = getIxRoom(rooms, id_room);
        const room = rooms[ix_room];
        room.playing_state = "playing";

        return {
          ...state_obj,
          rooms: rooms,
          id_user_event: room.players[0].id,
        };
      });
    });
  };

  // ----

  return {
    emitStartPlay,
    onStartPlay,
  };
};
