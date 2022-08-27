import { AppPropsStateObj, handleRegisterType } from "../type";
import { socket } from "../getSocket";
import { SOCKET_EVENTS } from "../data/socket_events";

//
interface useRegisterType extends AppPropsStateObj {}

//
export const useRegister = ({ handleNewStateObj }: useRegisterType) => {
  //
  const emitRegister: handleRegisterType = (username, password, name) => {
    socket.emit(SOCKET_EVENTS.REGISTER, username, password, name);
    handleNewStateObj((state_obj) => ({
      ...state_obj,
      registering: true,
    }));
  };

  const onRegisterFail = () => {
    socket.on(SOCKET_EVENTS.REGISTER_FAIL, (reason: string) => {
      alert(`Wrong: ${reason}`);

      handleNewStateObj((state_obj) => ({
        ...state_obj,
        registering: false,
      }));
    });
  };

  // ----

  return {
    emitRegister,
    onRegisterFail,
  };
};
