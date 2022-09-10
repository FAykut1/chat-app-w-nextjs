import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

let socket: Socket;

const clientSocket = () => {
  if (!socket || !socket.connected) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      path: '/api/socketio',
    });
  }
  return socket;
};

export default clientSocket;
