import { SOCKET_EVENT_NAME } from "../data/socket_events";
import { socket } from "../getSocket";

//
export const removeEventsSocket = (event_names: SOCKET_EVENT_NAME[]) => {
  event_names.forEach((event_name) => {
    socket.removeAllListeners(event_name);
  });
};
