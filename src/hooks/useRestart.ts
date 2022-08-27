import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";
import { getIxRoom } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useRestartType extends AppPropsStateObj {}

//
export const useRestart = ({ handleNewStateObj }: useRestartType) => {
  //
  const emitRestart = () => {
    socket.emit(SOCKET_EVENTS.RESTART);
  };

  const onRestart = () => {
    socket.on(SOCKET_EVENTS.RESTART, (id_room: number) => {
      console.log('restart');
      
      handleNewStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        const ix_room = getIxRoom(rooms, id_room);
        const room = rooms[ix_room];
        room.playing_state = "waiting";

        room.players.forEach((item) => {
          item.has_pick = false;
          item.icon_name = undefined;
          item.is_winner = false;
          item.count_predict_winner = 0;
        });
        room.viewers.forEach((item) => {
          item.id_be_winner = 0;
        });

        return {
          ...state_obj,
          rooms: rooms,
        };
      });
    });
  };

  // ----

  return {
    emitRestart,
    onRestart,
  };
};
