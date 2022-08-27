import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";
import { getIxRoom } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useChangeIsBonusType extends AppPropsStateObj {}

//
export const useChangeIsBonus = ({
  handleNewStateObj,
}: useChangeIsBonusType) => {
  //
  const emitChangeIsBonus = (is_bonus: boolean) => {
    socket.emit(SOCKET_EVENTS.CHANGE_IS_BONUS, is_bonus);
  };

  const onChangeIsBonus = () => {
    socket.on(
      SOCKET_EVENTS.CHANGE_IS_BONUS,
      (id_room: number, is_bonus: boolean) => {
        handleNewStateObj((state_obj) => {
          const rooms = [...state_obj.rooms];
          const ix_room = getIxRoom(rooms, id_room);
          const room = rooms[ix_room];
          room.is_bonus = is_bonus;

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
    emitChangeIsBonus,
    onChangeIsBonus,
  };
};
