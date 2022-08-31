import { AppStateObj, Room, User } from "../type";

//
const USERS_VIEW_DEFAULT: User[] = ["Dat", "Nam", "Hai", "My", "Nguyen"].map(
  (name, ix) => ({
    id: ix + 1,
    name: name,
    score: 0,
  })
);

const USERS_PLAY_DEFAULT: User[] = ["Lan", "Anh"].map((name, ix) => ({
  id: ix + 11,
  name: name,
  score: 0,
}));

const USERS_DEFAULT = [...USERS_PLAY_DEFAULT, ...USERS_VIEW_DEFAULT];

//
export const getRoomDefault = (): Room => ({
  id: 1,
  name: "Room 1",
  viewers: USERS_VIEW_DEFAULT.map((user) => ({
    id: user.id,
    name: user.name,
    id_be_winner: 0,
    online: true,
  })),
  players: USERS_PLAY_DEFAULT.map((user, ix) => ({
    id: user.id,
    name: user.name,
    has_pick: false,
    icon_name: undefined,
    is_winner: false,
    count_predict_winner: 0,
    online: true,
  })),
  playing_state: "waiting",
  playing_time: 60,
  is_bonus: true,
});

//
export const getStateObjDefault = (): AppStateObj => {
  const _room = getRoomDefault();
  const rooms: Room[] = Array.from({ length: 10 }, (k, v) => ({
    ..._room,
    id: v + 1,
    name: `Room ${v + 1}`,
  }));
  const users = USERS_DEFAULT;
  const user = users[0];

  const state_obj = {
    logging_saved_account: false,
    logging: false,
    registering: false,

    user: user,
    users: users,
    rooms: rooms,
    ix_room: -1,

    // ...getInitialGame(true),
    icon_name_arr: [],
    icons_obj: {},
    game_name: "",

    id_user_info: -1,
  };

  return state_obj;
};

//
export const getFuncDefault = () => {
  //
  const handleFunc = (...params: any[]) => {
    console.log(params);
  };

  return {
    handleRegister: handleFunc,
    handleLogin: handleFunc,
    handleLoginSavedAccount: handleFunc,

    joinRoom: handleFunc,
    outRoom: handleFunc,
    becomePlayer: handleFunc,
    becomeViewer: handleFunc,

    playGame: handleFunc,
    changeIsBonus: handleFunc,
    handlePick: handleFunc,
    handleVote: handleFunc,
    playAgain: handleFunc,

    openUserInfo: handleFunc,
    closeUserInfo: handleFunc,
  };
};
