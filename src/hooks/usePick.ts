import { AppPropsStateObj, IconName, ObjIdScore } from "../type";
import { socket } from "../getSocket";
import { getIxPlayer } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";
import { makeResult } from "../utils/MakeResult";

//
interface usePickType extends AppPropsStateObj {}

//
export const usePick = ({ handleNewStateObj }: usePickType) => {
  //
  const emitPick = (icon_name: IconName) => {
    socket.emit(SOCKET_EVENTS.PICK, icon_name);
    handleNewStateObj((state_obj) => {
      const rooms = [...state_obj.rooms];
      const room = rooms[state_obj.ix_room];
      const ix_player = getIxPlayer(room, state_obj.user.id);
      room.players[ix_player].icon_name = icon_name;
      room.players[ix_player].has_pick = true;

      return {
        ...state_obj,
        rooms: rooms,
      };
    });
  };

  const onPick = () => {
    // socket.on("pick", (id_room: number) => {
    // });
  };

  const onPickDone = () => {
    socket.on(
      SOCKET_EVENTS.PICK_DONE,
      (
        id_room: number,
        room_picks: (IconName | "")[],
        arr_is_winner: boolean[],
        obj_id_score: ObjIdScore
      ) => {
        handleNewStateObj((state_obj) => {
          const { rooms, users } = makeResult({
            id_room,
            room_picks,
            arr_is_winner,
            obj_id_score,
            state_obj,
          });

          return {
            ...state_obj,
            rooms: rooms,
            users: users,
          };
        });
      }
    );
  };

  // ----

  return {
    emitPick,
    onPick,
    onPickDone,
  };
};
