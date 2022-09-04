import { io } from "socket.io-client";

const is_prod = true;
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
      // withCredentials: true,
    }
  );
const socket = getSocket();

export { getSocket, socket };
