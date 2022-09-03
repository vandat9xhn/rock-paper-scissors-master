import * as React from "react";

import {
  AppStateObj,
  getEmitFuncType,
  getHandleNewStateObjType,
  IconName,
} from "../type";
// import { socket } from "../getSocket";

import { useLogin } from "./useLogin";
import { useLogout } from "./useLogout";
import { useJoinRoom } from "./useJoinRoom";
import { useOutRoom } from "./useOutRoom";
import { useBecomePlayer } from "./useBecomePlayer";
import { useBecomeViewer } from "./useBecomeViewer";
import { useChangeIsBonus } from "./useChangeIsBonus";
import { usePick } from "./usePick";
import { useRegister } from "./useRegister";
import { useStartPlay } from "./useStartPlay";
import { useVote } from "./useVote";
import { useRestart } from "./useRestart";
import { useDisconnect } from "./useDisconnect";
import { SOCKET_EVENTS } from "../data/socket_events";
import { removeEventsSocket } from "../utils/removeEventsSocket";
import { getMoreStateObj } from "../utils/getMoreStateObj";
import { socket } from "../getSocket";

//
export function useGame() {
  //
  const [state_obj, setStateObj] = React.useState<AppStateObj>({
    // user: "",
    socket_connected: false,
    logging_saved_account: false,
    users: [],
    rooms: [],
    ix_room: -1,
    fetching: false,

    icon_name_arr: [],
    icons_obj: {},
    game_name: "",

    id_user_info: -1,
  });

  //
  const { room, player1, player2, is_player1, is_player2, is_player } =
    getMoreStateObj(state_obj);

  // ----

  const getEmitFunc: getEmitFuncType = (
    emitFunc,
    str_fetching = "fetching",
    handleMoreState
  ) => {
    return (...params) => {
      setStateObj((state_obj) => {
        const new_state_obj = {
          ...state_obj,
          [str_fetching]: true,
          str_fetching: str_fetching,
        };
        handleMoreState && handleMoreState(new_state_obj);

        return new_state_obj;
      });
      emitFunc(...params);
    };
  };

  const getHandleNewStateObj: getHandleNewStateObjType = (func) => {
    setStateObj((state_obj) => {
      const { id_user_event, ...new_state_obj } = func(state_obj);

      if (!new_state_obj.str_fetching) {
        return new_state_obj;
      }

      return {
        ...new_state_obj,
        [new_state_obj.str_fetching]:
          new_state_obj.user?.id === id_user_event
            ? false
            : new_state_obj[new_state_obj.str_fetching],
        str_fetching: undefined,
      };
    });
  };

  // ----

  const { emitRegister, onRegisterFail } = useRegister({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitLoginSaved, emitLogin, onLoginSuccess, onLoginFail } = useLogin({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitLogout, onLogout, onRoomerLogout } = useLogout({
    handleNewStateObj: getHandleNewStateObj,
  });

  const { emitJoinRoom, onJoinRoom, onUserJoinRoom } = useJoinRoom({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitOutRoom, onOutRoom } = useOutRoom({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitBecomePlayer, onBecomePlayer } = useBecomePlayer({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitBecomeViewer, onBecomeViewer } = useBecomeViewer({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitChangeIsBonus, onChangeIsBonus } = useChangeIsBonus({
    handleNewStateObj: getHandleNewStateObj,
  });

  const { emitStartPlay, onStartPlay } = useStartPlay({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitPick, onPick, onPickDone } = usePick({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitVote, onVote } = useVote({
    handleNewStateObj: getHandleNewStateObj,
  });
  const { emitRestart, onRestart } = useRestart({
    handleNewStateObj: getHandleNewStateObj,
  });

  const {
    onUserDisconnect,
    onViewerDisconnect,
    onPlayerDisconnect,
    onGamingPlayerDisconnect,
    onGamingViewerDisconnect,
  } = useDisconnect({
    handleNewStateObj: getHandleNewStateObj,
  });

  //
  React.useEffect(() => {
    socket.on("connect", () => {
      setStateObj((state_obj) => ({
        ...state_obj,
        socket_connected: true,
      }));
    });
  }, []);

  //
  React.useEffect(() => {
    onLoginSuccess();
    onRegisterFail();
    onLoginFail();
  }, []);

  React.useEffect(() => {
    if (!!state_obj.user) {
      onJoinRoom();
      onUserJoinRoom();
      onOutRoom();
      onBecomePlayer();
      onBecomeViewer();
      onChangeIsBonus();

      onStartPlay();
      onPick();
      onVote();
      onPickDone();
      onRestart();

      onUserDisconnect();
      onViewerDisconnect();
      onPlayerDisconnect();
      onGamingPlayerDisconnect();
      onGamingViewerDisconnect();
    } else {
      removeEventsSocket([
        SOCKET_EVENTS.JOIN_ROOM,
        SOCKET_EVENTS.OUT_ROOM,
        SOCKET_EVENTS.BECOME_PLAYER,
        SOCKET_EVENTS.BECOME_VIEWER,
        SOCKET_EVENTS.CHANGE_IS_BONUS,

        SOCKET_EVENTS.PLAY_GAME,
        SOCKET_EVENTS.PICK,
        SOCKET_EVENTS.VOTE,
        SOCKET_EVENTS.PICK_DONE,
        SOCKET_EVENTS.RESTART,

        SOCKET_EVENTS.USER_DISCONNECT,
        SOCKET_EVENTS.VIEWER_DISCONNECT,
        SOCKET_EVENTS.PLAYER_DISCONNECT,
        SOCKET_EVENTS.GAMING_PLAYER_DISCONNECT,
        SOCKET_EVENTS.GAMING_VIEWER_DISCONNECT,
      ]);
    }
  }, [!state_obj.user]);

  // ------ EMIT

  const handleRegister = getEmitFunc(emitRegister);
  const handleLoginSavedAccount = emitLoginSaved;
  const handleLogin = getEmitFunc(emitLogin);

  const joinRoom = getEmitFunc(emitJoinRoom);
  const outRoom = getEmitFunc(emitOutRoom);
  const becomePlayer = getEmitFunc(emitBecomePlayer);
  const becomeViewer = getEmitFunc(emitBecomeViewer);

  const playGame = getEmitFunc(emitStartPlay);
  const changeIsBonus = getEmitFunc(emitChangeIsBonus);
  const handlePick = (icon_name: IconName) => {
    const pick = getEmitFunc(emitPick, "fetching", (new_state_obj) => {
      const { is_player1, player1, player2 } = getMoreStateObj(new_state_obj);
      const player = is_player1 ? player1 : player2;
      player.icon_name = icon_name;
    });

    pick(icon_name);
  };
  const handleVote = getEmitFunc(emitVote);
  const playAgain = getEmitFunc(emitRestart);

  // ----

  const openUserInfo = (id_user: number) => {
    setStateObj((state_obj) => ({
      ...state_obj,
      id_user_info: id_user,
    }));
  };

  const closeUserInfo = () => {
    setStateObj((state_obj) => ({
      ...state_obj,
      id_user_info: -1,
    }));
  };

  // ---

  return {
    // socket,
    ...state_obj,

    room,
    player1,
    player2,
    is_player1,
    is_player2,
    is_player,

    handleRegister,
    handleLogin,
    handleLoginSavedAccount,

    joinRoom,
    outRoom,
    becomePlayer,
    becomeViewer,

    playGame,
    changeIsBonus,
    handlePick,
    handleVote,
    playAgain,

    openUserInfo,
    closeUserInfo,
  };
}

export type useGameReturnType = ReturnType<typeof useGame>;
