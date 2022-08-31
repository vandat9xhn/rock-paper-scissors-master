import * as React from "react";

import "./VotingItem.scss";

//
export interface VotingItemProps {
  id_player: number;
  player_name: string;
  picked: boolean;
  count_voting: number;
  id_voting: number;
  handleVoteWinner: (id_player: number) => void;
}

//
function VotingItem({
  id_player,
  player_name,
  picked,
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
    <div className="VotingItem">
      <div className="VotingItem_name">{player_name}</div>

      <div className={`VotingItem_pick ${picked ? "" : "VotingItem_picking"}`}>
        {picked ? "Picked" : "Picking..."}
      </div>

      <div className="VotingItem_count">
        {count_voting} vote{count_voting >= 2 ? "s" : ""}
      </div>

      <div>
        <button
          className={`VotingItem_btn ${
            id_player === id_voting ? "VotingItem_btn-active" : ""
          } ${id_voting > 0 ? "VotingItem_btn-disabled" : ""}`}
          type="button"
          disabled={id_voting > 0}
          onClick={onVote}
        >
          Vote
        </button>
      </div>
    </div>
  );
}

export default VotingItem;
