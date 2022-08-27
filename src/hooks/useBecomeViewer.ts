import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";
import { getIxPlayer, getIxRoom } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useBecomeViewerType extends AppPropsStateObj {}

//
export const useBecomeViewer = ({ handleNewStateObj }: useBecomeViewerType) => {
  //
  const emitBecomeViewer = () => {
    socket.emit(SOCKET_EVENTS.BECOME_VIEWER);
  };

  const onBecomeViewer = () => {
    socket.on(
      SOCKET_EVENTS.BECOME_VIEWER,
      (id_room: number, id_user: number) => {
        handleNewStateObj((state_obj) => {
          const rooms = [...state_obj.rooms];
          const ix_room = getIxRoom(rooms, id_room);
          const room = rooms[ix_room];
          const ix_player = getIxPlayer(room, id_user);
          const player = room.players.splice(ix_player, 1)[0];
          const viewer = {
            id: player.id,
            name: player.name,
            id_be_winner: 0,
          };
          room.viewers.push(viewer);

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
    emitBecomeViewer,
    onBecomeViewer,
  };
};
