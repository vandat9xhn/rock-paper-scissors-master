import * as React from "react";

import { AppStateObj } from "../type";
import { socket } from "../getSocket";

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

//
export function useGame() {
  //
  const [state_obj, setStateObj] = React.useState<AppStateObj>({
    // user: "",
    logging_saved_account: true,
    users: [],
    rooms: [],
    ix_room: -1,

    icon_name_arr: [],
    icons_obj: {},
    game_name: "",
  });

  //
  const room = state_obj.rooms[state_obj.ix_room];
  const player1 = room ? room.players[0] : undefined;
  const player2 = room ? room.players[1] : undefined;
  const is_player1 = player1 ? player1.id === state_obj.user.id : undefined;
  const is_player2 = player2 ? player2.id === state_obj.user.id : undefined;
  const is_player = is_player1 || is_player2;

  // ----

  const { emitRegister, onRegisterFail } = useRegister({
    handleNewStateObj: setStateObj,
  });
  const { emitLoginSaved, emitLogin, onLoginSuccess, onLoginFail } = useLogin({
    handleNewStateObj: setStateObj,
  });
  const { emitLogout, onLogout, onRoomerLogout } = useLogout({
    handleNewStateObj: setStateObj,
  });

  const { emitJoinRoom, onJoinRoom, onUserJoinRoom } = useJoinRoom({
    handleNewStateObj: setStateObj,
  });
  const { emitOutRoom, onOutRoom } = useOutRoom({
    handleNewStateObj: setStateObj,
  });
  const { emitBecomePlayer, onBecomePlayer } = useBecomePlayer({
    handleNewStateObj: setStateObj,
  });
  const { emitBecomeViewer, onBecomeViewer } = useBecomeViewer({
    handleNewStateObj: setStateObj,
  });
  const { emitChangeIsBonus, onChangeIsBonus } = useChangeIsBonus({
    handleNewStateObj: setStateObj,
  });

  const { emitStartPlay, onStartPlay } = useStartPlay({
    handleNewStateObj: setStateObj,
  });
  const { emitPick, onPick, onPickDone } = usePick({
    handleNewStateObj: setStateObj,
  });
  const { emitVote, onVote } = useVote({
    handleNewStateObj: setStateObj,
  });
  const { emitRestart, onRestart } = useRestart({
    handleNewStateObj: setStateObj,
  });

  const {
    onUserDisconnect,
    onViewerDisconnect,
    onPlayerDisconnect,
    onGamingPlayerDisconnect,
    onGamingViewerDisconnect,
  } = useDisconnect({
    handleNewStateObj: setStateObj,
  });

  //
  React.useEffect(() => {
    onLoginSuccess();
    onRegisterFail();
    onLoginFail();
  }, []);

  React.useEffect(() => {
    if (!!state_obj.user) {
      onJoinRoom();
      onUserJoinRoom()
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
      onGamingViewerDisconnect()
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

  const handleRegister = emitRegister;
  const handleLoginSavedAccount = emitLoginSaved;
  const handleLogin = emitLogin;

  const joinRoom = emitJoinRoom;
  const outRoom = emitOutRoom;
  const becomePlayer = emitBecomePlayer;
  const becomeViewer = emitBecomeViewer;

  const playGame = emitStartPlay;
  const changeIsBonus = emitChangeIsBonus;
  const handlePick = emitPick;
  const handleVote = emitVote;
  const playAgain = emitRestart;

  // ---

  return {
    socket,
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
  };
}

export type useGameReturnType = ReturnType<typeof useGame>;
