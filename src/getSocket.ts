import { io } from 'socket.io-client';

const getSocket = () => io('http://localhost:4000');

export { getSocket };