import * as React from "react";

import { socket } from "../../getSocket";

import icon_mess from "../../../images/message.png";
import icon_send_mess from "../../../images/send_mess.png";
import { SOCKET_EVENTS } from "../../data/socket_events";
import { removeEventsSocket } from "../../utils/removeEventsSocket";
import { MessageObj } from "../../type";
import ChatContain from "./ChatContain";

//
export interface ChatProps {}

//
function Chat({}: ChatProps) {
  //
  const [arr_mess, setArrMess] = React.useState<MessageObj[]>([]);

  //
  React.useEffect(() => {
    socket.on(SOCKET_EVENTS.MESSAGE, (name: string, message: string) => {
      setArrMess((arr_mess) => {
        const new_arr_mess = [...arr_mess];
        new_arr_mess.unshift({ name: name, content: message });

        return new_arr_mess;
      });
    });

    return () => {
      removeEventsSocket([SOCKET_EVENTS.MESSAGE]);
    };
  }, []);

  // ---

  const handleSend = (mess: string) => {
    socket.emit("message", mess);
  };

  //
  return <ChatContain arr_mess={arr_mess} handleSend={handleSend} />;
}

export default Chat;
