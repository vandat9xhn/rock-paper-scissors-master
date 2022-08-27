import * as React from "react";

import './VotingItem.scss';

//
export interface VotingItemProps {
  id_player: number;
  player_name: string;
  count_voting: number;
  id_voting: number;
  handleVoteWinner: (id_player: number) => void;
}

//
function VotingItem({
  id_player,
  player_name,
  count_voting,
  id_voting,
  handleVoteWinner,
}: VotingItemProps) {
  //
  const onVote = () => {
    handleVoteWinner(id_player);
  };

  //
  return (
    <div>
      <div>{player_name}</div>

      <div>{count_voting}</div>

      <div>
        <button className={`VotingItem_btn ${id_player === id_voting ? 'VotingItem_btn-active' : ''}`} type="button" disabled={id_voting > 0} onClick={onVote}>
          Vote
        </button>
      </div>
    </div>
  );
}

export default VotingItem;
