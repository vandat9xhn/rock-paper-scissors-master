import { Room } from "../type";

//
export const makeRestart = (room: Room, playing_time: number) => {
  room.playing_state = "waiting";
  room.playing_time = playing_time;
  room.players = room.players.filter((item) => item.online === true);
  room.viewers = room.viewers.filter((item) => item.online === true);

  room.players.forEach((item) => {
    item.has_pick = false;
    item.icon_name = undefined;
    item.is_winner = false;
    item.count_predict_winner = 0;
  });
  room.viewers.forEach((item) => {
    item.id_be_winner = 0;
  });
};
