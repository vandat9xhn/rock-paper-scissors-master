import { AppPropsStateObj } from "../type";
import { socket } from "../getSocket";
import { getIxPlayer, getIxRoom, getIxViewer } from "../utils/getIndex";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useVoteType extends AppPropsStateObj {}

//
export const useVote = ({ handleNewStateObj }: useVoteType) => {
  //
  const emitVote = (id_be_winner = 0) => {
    socket.emit(SOCKET_EVENTS.VOTE, id_be_winner);
    // console.log('vote');
    
  };

  const onVote = () => {
    socket.on(
      SOCKET_EVENTS.VOTE,
      (id_room: number, id_voter = 0, id_be_winner = 0) => {
        handleNewStateObj((state_obj) => {
          const rooms = [...state_obj.rooms];
          const ix_room = getIxRoom(rooms, id_room);
          const room = rooms[ix_room];
          const ix_viewer = getIxViewer(room, id_voter);
          const ix_player = getIxPlayer(room, id_be_winner);
          room.viewers[ix_viewer].id_be_winner = id_be_winner;
          room.players[ix_player].count_predict_winner += 1;

          console.log(room.players);
          

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
    emitVote,
    onVote,
  };
};
