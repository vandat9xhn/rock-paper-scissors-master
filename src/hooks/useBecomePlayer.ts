import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";
import { getIxRoom, getIxViewer } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useBecomePlayerType extends AppPropsStateObj {}

//
export const useBecomePlayer = ({ handleNewStateObj }: useBecomePlayerType) => {
  //
  const emitBecomePlayer = () => {
    socket.emit(SOCKET_EVENTS.BECOME_PLAYER);
  };

  const onBecomePlayer = () => {
    socket.on(
      SOCKET_EVENTS.BECOME_PLAYER,
      (id_room: number, id_user: number) => {
        handleNewStateObj((state_obj) => {
          const rooms = [...state_obj.rooms];
          const ix_room = getIxRoom(rooms, id_room);
          const room = rooms[ix_room];
          const ix_viewer = getIxViewer(room, id_user);
          const viewer = room.viewers.splice(ix_viewer, 1)[0];
          const player = {
            id: viewer.id,
            name: viewer.name,
            has_pick: false,
            icon_name: undefined,
            is_winner: false,
            count_predict_winner: 0,
            online: true,
          };
          room.players.push(player);

          return {
            ...state_obj,
            rooms: rooms,
            id_user_event: id_user,
          };
        });
      }
    );
  };

  // ----

  return {
    emitBecomePlayer,
    onBecomePlayer,
  };
};
