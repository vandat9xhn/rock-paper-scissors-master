import lizard from "../../images/icon-lizard.svg";
import paper from "../../images/icon-paper.svg";
import rock from "../../images/icon-rock.svg";
import scissors from "../../images/icon-scissors.svg";
import spock from "../../images/icon-spock.svg";

import { IconName } from "../type";

//
const SCISSORS = "scissors";
const PAPER = "paper";
const ROCK = "rock";
const LIZARD = "lizard";
const SPOCK = "spock";

//
const ICONS3 = {
  paper: {
    src: paper,
    border: "#5570F5",
  },
  rock: {
    src: rock,
    border: "#DD3F5D",
  },
  scissors: {
    src: scissors,
    border: "#ECA71D",
  },
};

//
export const ICONS5 = {
  lizard: {
    src: lizard,
    border: "#8A5BDD",
  },
  ...ICONS3,
  spock: {
    src: spock,
    border: "#4ABAD0",
  },
};

const ICON5_NAME_ARR: IconName[] = [
  "scissors",
  "paper",
  "rock",
  "lizard",
  "spock",
];

const ICON3_NAME_ARR: IconName[] = ["scissors", "paper", "rock"];

//
const ICONS3_BEAT = {
  scissors: new Set([PAPER]),
  paper: new Set([ROCK]),
  rock: new Set([SCISSORS]),
};

const ICONS5_BEAT = {
  scissors: new Set([PAPER, LIZARD]),
  paper: new Set([ROCK, SPOCK]),
  rock: new Set([SCISSORS, LIZARD]),
  lizard: new Set([PAPER, SPOCK]),
  spock: new Set([ROCK, SCISSORS]),
};

//
export const getInitialGame = (is_bonus = true) => {
  const icons_obj = is_bonus ? ICONS5 : ICONS3;
  const icon_name_arr = is_bonus ? ICON5_NAME_ARR : ICON3_NAME_ARR;
  const game_name = (
    is_bonus ? [ROCK, PAPER, SCISSORS, SPOCK, LIZARD] : [PAPER, SCISSORS, ROCK]
  ).join("\n");

  return {
    icons_obj,
    icon_name_arr,
    game_name,
  };
};

//
export const getChangeScore = (
  house_icon: IconName,
  icon_name: IconName,
  is_bonus = true
) => {
  const icons_beat = is_bonus ? ICONS5_BEAT : ICONS3_BEAT;
  const obj1 = icons_beat[icon_name] as Set<string>;
  const obj2 = icons_beat[house_icon] as Set<string>;

  const is_win = obj1.has(house_icon);
  const is_defeat = obj2.has(icon_name);

  return is_win ? 1 : is_defeat ? -1 : 0;
};
