import * as React from "react";

import contextAPI from "../../context/contextAPI";

import VotingItem, { VotingItemProps } from "./item/VotingItem";

import "./Voting.scss";

//
export interface VotingProps {}

//
function Voting({}: VotingProps) {
  //
  const { room, handleVote } = React.useContext(contextAPI);

  //
  const [id_voting, setIdVoting] = React.useState(0);

  //
  const arr_voting = room.players.map((item) => ({
    id_player: item.id,
    player_name: item.name,
    count_voting: item.count_predict_winner,
  }));

  // ---

  const handleVoteWinner = (id_player: number) => {
    if (id_voting) {
      return;
    }

    setIdVoting(id_player);
    handleVote(id_player);
  };

  //
  return (
    <div className="Voting">
      <div className="Voting_row flex justify-center">
        {arr_voting.map((item, ix) => (
          <div key={item.player_name} className="Voting_item">
            <VotingItem
              {...item}
              id_voting={id_voting}
              handleVoteWinner={handleVoteWinner}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Voting;
