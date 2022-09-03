import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";
import { getIxRoom } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";
import { makeRestart } from "../utils/makeRestart";

//
interface useRestartType extends AppPropsStateObj {}

//
export const useRestart = ({ handleNewStateObj }: useRestartType) => {
  //
  const emitRestart = () => {
    socket.emit(SOCKET_EVENTS.RESTART);
  };

  const onRestart = () => {
    socket.on(
      SOCKET_EVENTS.RESTART,
      (id_room: number, playing_time: number) => {
        handleNewStateObj((state_obj) => {
          const rooms = [...state_obj.rooms];
          const ix_room = getIxRoom(rooms, id_room);
          const room = rooms[ix_room];
          makeRestart(room, playing_time);

          return {
            ...state_obj,
            rooms: rooms,
            id_user_event: room.players[0].id,
          };
        });
      }
    );
  };

  // ----

  return {
    emitRestart,
    onRestart,
  };
};
