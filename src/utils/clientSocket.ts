import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

let socket: Socket;

const clientSocket = () => {
  if (!socket || !socket.connected) {
    socket = io('http://localhost:3000', {
      path: '/api/socketio',
    });
  }
  return socket;
};

export default clientSocket;
