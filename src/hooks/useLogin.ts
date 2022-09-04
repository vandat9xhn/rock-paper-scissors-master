import {
  AppPropsStateObj,
  AppStateObj,
  handleLoginType,
  Room,
  User,
} from "../type";
import { socket } from "../getSocket";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useLoginProps extends AppPropsStateObj {}

//
export const useLogin = ({ handleNewStateObj }: useLoginProps) => {
  //
  const emitLoginSaved = () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      socket.emit(SOCKET_EVENTS.LOGIN_SAVED_ACCOUNT, username, password);
    } else {
      handleNewStateObj((state_obj) => ({
        ...state_obj,
      }));
    }
  };

  const emitLogin: handleLoginType = (username, password, name) => {
    socket.emit(SOCKET_EVENTS.LOGIN, username, password, name);
  };

  const onLoginSuccess = () => {
    socket.on(
      SOCKET_EVENTS.LOGIN,
      (user: User, users: User[], rooms: Room[]) => {
        handleNewStateObj((state_obj) => {
          return {
            ...state_obj,
            user: user,
            users: users,
            rooms: rooms,
            id_user_event: user.id,
          };
        });
      }
    );

    socket.on(SOCKET_EVENTS.USER_LOGIN, (user: User) => {
      handleNewStateObj((state_obj) => {
        const new_state_obj = {
          ...state_obj,
          users: [...state_obj.users, user],
        };
        return new_state_obj;
      });
    });
  };

  const onLoginFail = () => {
    socket.on(SOCKET_EVENTS.LOGIN_FAIL, (reason: string) => {
      handleNewStateObj((state_obj) => {
        const new_state_obj: AppStateObj = {
          ...state_obj,
          registering: false,
          logging: false,
        };
        return new_state_obj;
      });
      alert("Login fail: " + reason);
    });
  };

  // ----

  return {
    emitLoginSaved,
    emitLogin,
    onLoginSuccess,
    onLoginFail,
  };
};
