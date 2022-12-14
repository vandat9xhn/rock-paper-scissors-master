//
export const SOCKET_EVENTS = {
  USERS_NOT_LOG: 'users_not_log',
  REGISTER: "register",
  REGISTER_FAIL: "register_fail",
  
  LOGIN_SAVED_ACCOUNT: "login_saved_account",
  LOGIN: "login",
  LOGIN_FAIL: "login_fail",
  USER_LOGIN: "user_login",
  LOGOUT: "logout",
  ROOMER_LOGOUT: "roomer_logout",

  MESSAGE: 'message',

  OUT_ROOM: "out_room",
  JOIN_ROOM: "join_room",
  USER_JOIN_ROOM: "user_join_room",
  BECOME_PLAYER: "become_player",
  BECOME_VIEWER: "become_viewer",
  CHANGE_IS_BONUS: "change_is_bonus",

  PLAY_GAME: "play_game",
  PICK: "pick",
  VOTE: "vote",
  PICK_DONE: "pick_done",
  RESTART: "restart",

  USER_DISCONNECT: "user_disconnect",
  VIEWER_DISCONNECT: "viewer_disconnect",
  PLAYER_DISCONNECT: "player_disconnect",
  GAMING_PLAYER_DISCONNECT: "gaming_player_disconnect",
  GAMING_VIEWER_DISCONNECT: "gaming_viewer_disconnect",
} as const;

export type SOCKET_EVENT_NAME =
  typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];
