import { AppStateObj, IconName, ObjIdScore, Room, User } from "../type";
import { getIxRoom } from "./getIndex";

//
export const changeUserScore = (
  user: User,
  users: User[],
  obj_id_score: ObjIdScore
) => {
  users.forEach((item) => {
    if (obj_id_score[item.id]) {
      item.score = obj_id_score[item.id];

      if (user.id === item.id) {
        user.score = item.score;
      }
    }
  });
};

export const makeWinner = (
  room: Room,
  room_picks: (IconName | "")[],
  arr_is_winner: boolean[]
) => {
  room_picks.forEach((item, ix) => {
    room.players[ix].icon_name = item || undefined;
    room.players[ix].has_pick = true;
  });
  arr_is_winner.forEach((is_winner, ix) => {
    room.players[ix].is_winner = is_winner;
  });
};

//
export const makeResult = ({
  id_room,
  room_picks,
  arr_is_winner,
  obj_id_score,

  state_obj,
}: {
  id_room: number;
  room_picks: (IconName | "")[];
  arr_is_winner: boolean[];
  obj_id_score: ObjIdScore;

  state_obj: AppStateObj;
}) => {
  // console.log(obj_id_score);

  const rooms = [...state_obj.rooms];
  const users = [...state_obj.users];
  const ix_room = getIxRoom(rooms, id_room);
  const room = rooms[ix_room];

  room.playing_state = "ending";
  makeWinner(room, room_picks, arr_is_winner);
  changeUserScore(state_obj.user, users, obj_id_score);

  return { rooms, users, ix_room };
};
