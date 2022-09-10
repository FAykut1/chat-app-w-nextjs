import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { IMessage } from '../types/data';
import clientSocket from '../utils/clientSocket';
import Message from './Message';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const socket = clientSocket();

  useEffect((): any => {
    console.log('Mounted');
    console.log(socket.connected);
    socket.on('message', (message: IMessage) => {
      console.log(message);
      messages.push(message);
      setMessages([...messages]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const onInputKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
      await sendMessageToServer();
      setMessage('');
      e.target.value = '';
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const sendMessageToServer = async () => {
    if (message !== '') {
      const msgData: IMessage = {
        content: message,
      };

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msgData),
      });
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-first">
      <div className="h-20 bg-second p-4 flex items-center">
        <div className="">
          <div className="font-semibold">Fatih Aykut</div>
          <div className="text-tsecond">last seen 1 min ago</div>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute bottom-0 w-full">
          {/* Messages */}
          {messages.map((message) => (
            <Message
              key={message.id}
              content={message.content}
              updateAt="19:00"
            />
          ))}
        </div>
      </div>
      <div className="h-12 flex bg-second">
        <input
          autoFocus
          className="flex-1 pl-4 pr-4 bg-transparent text-white outline-none"
          type="text"
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatPage;
