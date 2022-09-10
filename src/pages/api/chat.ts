import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types/next';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import type { IMessage } from '../../types/data';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method === 'POST') {
    const message = req.body as IMessage;
    res.socket.server.io.emit('message', message);
    // res.socket.emit('message', message)
    res.status(201).json(message);
  }
}
