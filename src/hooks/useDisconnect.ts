import { AppPropsStateObj, IconName, ObjIdScore } from "../type";
import { socket } from "../getSocket";
import { getIxRoom } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";
import {
  removeUser,
  removeUserPlayer,
  removeUserViewer,
} from "../utils/removeUser";
import { makeResult } from "../utils/MakeResult";

//
interface useDisconnectType extends AppPropsStateObj {}

//
export const useDisconnect = ({ handleNewStateObj }: useDisconnectType) => {
  //
  const onUserDisconnect = () => {
    socket.on(SOCKET_EVENTS.USER_DISCONNECT, (id_user_disconnect = 0) => {
      handleNewStateObj((state_obj) => {
        const users = [...state_obj.users];
        removeUser(users, id_user_disconnect);

        return {
          ...state_obj,
          users: users,
        };
      });
    });
  };

  //
  const onPlayerDisconnect = () => {
    socket.on(
      SOCKET_EVENTS.PLAYER_DISCONNECT,
      (id_room = 0, id_user_disconnect = 0) => {
        handleNewStateObj((state_obj) => {
          const rooms = [...state_obj.rooms];
          const users = [...state_obj.users];
          const ix_room = getIxRoom(rooms, id_room);
          removeUserPlayer(users, rooms[ix_room], id_user_disconnect);

          return {
            ...state_obj,
            rooms: rooms,
            users: users,
          };
        });
      }
    );
  };

  //
  const onViewerDisconnect = () => {
    socket.on(
      SOCKET_EVENTS.VIEWER_DISCONNECT,
      (id_room = 0, id_user_disconnect = 0) => {
        handleNewStateObj((state_obj) => {
          const rooms = [...state_obj.rooms];
          const users = [...state_obj.users];
          const ix_room = getIxRoom(rooms, id_room);
          removeUserViewer(users, rooms[ix_room], id_user_disconnect);

          return {
            ...state_obj,
            rooms: rooms,
            users: users,
          };
        });
      }
    );
  };

  const onPlayingDisconnect = () => {
    socket.on(
      SOCKET_EVENTS.PLAYING_DISCONNECT,
      (
        id_room: number,
        room_picks: (IconName | "")[],
        id_user_disconnect: number,
        arr_is_winner: boolean[],
        obj_id_score: ObjIdScore
      ) => {
        handleNewStateObj((state_obj) => {
          const { rooms, users, ix_room } = makeResult({
            id_room,
            room_picks,
            arr_is_winner,
            obj_id_score,
            state_obj,
          });
          removeUserPlayer(users, rooms[ix_room], id_user_disconnect);

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
    onUserDisconnect,
    onViewerDisconnect,
    onPlayerDisconnect,
    onPlayingDisconnect,
  };
};
