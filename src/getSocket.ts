import { io } from "socket.io-client";

const is_prod = false;
const is_story = false;
const getSocket = () =>
  io(
    is_prod
      ? "https://rock-paper-scissors1111.herokuapp.com"
      : "http://localhost:4000",
    {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      closeOnBeforeunload: false,
      // withCredentials: true,
    }
  );

const socket = is_story ? null : getSocket();

export { getSocket, socket };
