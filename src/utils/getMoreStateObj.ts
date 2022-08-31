import { AppStateObj } from "../type";

export const getMoreStateObj = (state_obj: AppStateObj) => {
  const room = state_obj.rooms[state_obj.ix_room];
  const player1 = room ? room.players[0] : undefined;
  const player2 = room ? room.players[1] : undefined;
  const is_player1 = player1 ? player1.id === state_obj.user.id : undefined;
  const is_player2 = player2 ? player2.id === state_obj.user.id : undefined;
  const is_player = is_player1 || is_player2;

  return {
    room,
    player1,
    player2,
    is_player1,
    is_player2,
    is_player,
  };
};
