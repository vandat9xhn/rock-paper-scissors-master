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
        logging_saved_account: false,
      }));
    }
  };

  const emitLogin: handleLoginType = (username, password) => {
    socket.emit(SOCKET_EVENTS.LOGIN, username, password);
    console.log(1);
  };

  const onLoginSuccess = () => {
    socket.on(
      SOCKET_EVENTS.LOGIN,
      (user: User, users: User[], rooms: Room[]) => {
        handleNewStateObj((state_obj) => {
          const new_state_obj: AppStateObj = {
            ...state_obj,
            user: user,
            users: users,
            rooms: rooms,
            registering: false,
            logging: false,
          };
          return new_state_obj;
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
    socket.on(SOCKET_EVENTS.LOGIN_FAIL, () => {
      handleNewStateObj((state_obj) => {
        const new_state_obj: AppStateObj = {
          ...state_obj,
          registering: false,
          logging: false,
        };
        return new_state_obj;
      });
      alert("Login fail");
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
