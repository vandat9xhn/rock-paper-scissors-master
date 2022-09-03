import { AppPropsStateObj, IconName, ObjIdScore } from "../type";
import { socket } from "../getSocket";
import { getIxPlayer, getIxRoom } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";
import { makeResult } from "../utils/MakeResult";

//
interface usePickType extends AppPropsStateObj {}

//
export const usePick = ({ handleNewStateObj }: usePickType) => {
  //
  const emitPick = (icon_name: IconName) => {
    socket.emit(SOCKET_EVENTS.PICK, icon_name);
  };

  const onPick = () => {
    socket.on("pick", (id_room: number, id_user: number) => {
      handleNewStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        const ix_room = getIxRoom(rooms, id_room);
        const room = rooms[ix_room];
        const ix_player = getIxPlayer(room, id_user);
        room.players[ix_player].has_pick = true;

        return {
          ...state_obj,
          rooms: rooms,
          id_user_event: id_user,
        };
      });
    });
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
          const { rooms, users, id_user_last_picked } = makeResult({
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
            id_user_event: id_user_last_picked,
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
