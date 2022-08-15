import * as React from "react";

import {
  handleLoginType,
  handlePickType,
  IconName,
  IconsObj,
  Room,
  User,
} from "../type";
import { getInitialGame, getChangeScore } from "../data/icons";
import { getSocket } from "../getSocket";

//
const socket = getSocket();

//
interface useGameState {
  user?: User;
  users: User[];
  room_ix: number;
  rooms: Room[];

  is_bonus: boolean;
  icon_name_arr: IconName[];
  icons_obj: IconsObj;
  game_name: string;

  house_icon?: IconName;
  icon_name?: IconName;
  change_score: 0 | 1 | -1;
  score: number;
}

//
export function useGame() {
  //
  const [state_obj, setStateObj] = React.useState<useGameState>({
    // user: "",
    users: [],
    rooms: [],
    room_ix: -1,

    is_bonus: true,
    icon_name_arr: [],
    icons_obj: {},
    game_name: "",

    // house_icon: "",
    // icon_name: "",
    change_score: 0,
    score: 0,
  });

  //
  React.useEffect(() => {
    handleInitial();
  }, []);

  // ----

  const handleInitial = () => {
    setStateObj((state_obj) => ({
      ...state_obj,
      ...getInitialGame(state_obj.is_bonus),
    }));
  };

  const handleLogin: handleLoginType = (_user_name) => {
    socket.emit("login", _user_name);
    socket.on("login", (user: User, users: User[], rooms: Room[]) => {
      // console.log(user, users, rooms);
      
      setStateObj((state_obj) => ({
        ...state_obj,
        user: user,
        users: users,
        rooms: rooms,
      }));

      socket.on("user_login", (user: User) => {
        setStateObj((state_obj) => ({
          ...state_obj,
          users: [...state_obj.users, user],
        }));
      });
    });
  };

  const joinRoom = (room_id = 0) => {
    socket.emit("join_room", room_id);
    socket.on("join_room", (user_id: number) => {
      console.log(user_id);

      const user_ix = state_obj.users.findIndex((item) => item.id === user_id);
      const room_ix = state_obj.rooms.findIndex((item) => item.id === room_id);
      setStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        rooms[room_ix].users.push(state_obj.users[user_ix]);
        return {
          ...state_obj,
          rooms: rooms,
        };
      });
    });

    socket.on("out_room", (user_id: number) => {
      const user_ix = state_obj.users.findIndex((item) => item.id === user_id);
      const room_ix = state_obj.rooms.findIndex((item) => item.id === room_id);
      setStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        rooms[room_ix].users.splice(user_ix, 1);
        return {
          ...state_obj,
          rooms: rooms,
        };
      });
    });
  };

  const outRoom = () => {
    socket.emit("out_room");
    setStateObj((state_obj) => {
      return {
        ...state_obj,
        room_ix: -1,
      };
    });
  };

  const becomePlayer = () => {
    socket.emit("become_player");
    socket.on("become_player", (user_id: number) => {
      setStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        rooms[state_obj.room_ix].id_players.push(user_id);

        return {
          ...state_obj,
          rooms: rooms,
        };
      });
    });
  };

  const becomeViewer = () => {
    socket.emit("become_viewer");
    socket.on("become_viewer", (user_id: number) => {
      setStateObj((state_obj) => {
        const rooms = [...state_obj.rooms];
        const id_player_ix = rooms.findIndex((item) => item.id === user_id);
        rooms[state_obj.room_ix].id_players.splice(id_player_ix);

        return {
          ...state_obj,
          rooms: rooms,
        };
      });
    });
  };

  // ----

  const changeIsBonus = (_is_bonus = true) => {
    setStateObj((state_obj) => ({
      ...state_obj,
      ...getInitialGame(_is_bonus),
      is_bonus: _is_bonus,
    }));
  };

  //
  const handlePick: handlePickType = (_icon_name) => {
    setStateObj((state_obj) => ({
      ...state_obj,
      icon_name: _icon_name,
    }));

    setTimeout(() => {
      setStateObj((state_obj) => {
        const { icon_name_arr } = state_obj;
        const new_house_icon =
          icon_name_arr[Math.round(Math.random() * (icon_name_arr.length - 1))];

        const _change_score = getChangeScore(
          new_house_icon,
          state_obj.icon_name,
          state_obj.is_bonus
        );
        const _score = state_obj.score + _change_score;

        return {
          ...state_obj,
          house_icon: new_house_icon,
          change_score: _change_score,
          score: _score >= 0 ? _score : 0,
        };
      });
    }, 500);
  };

  const playAgain = () => {
    setStateObj((state_obj) => ({
      ...state_obj,
      ...getInitialGame(state_obj.is_bonus),
      change_score: 0,
      is_bonus: state_obj.is_bonus,
      house_icon: undefined,
      icon_name: undefined,
    }));
  };

  // ---

  return {
    ...state_obj,
    socket,

    handleLogin,
    joinRoom,
    outRoom,
    becomePlayer,
    becomeViewer,

    changeIsBonus,
    handlePick,
    playAgain,
  };
}

export type useGameReturnType = ReturnType<typeof useGame>;
