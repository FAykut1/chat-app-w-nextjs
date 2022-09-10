import { onSnapshot } from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import type { IMessage } from '../types/data';
import { addMessage, messageCollection } from '../utils/firebase';
import Message from './Message';

const ChatPage: React.FC = () => {
  const user = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect((): any => {
    const unsub = onSnapshot(messageCollection, (snapshot) => {
      const _messages = snapshot.docChanges().map((docChange) => {
        const msg = docChange.doc.data() as IMessage;
        msg.id = docChange.doc.id;
        return msg;
      });

      messages.push(..._messages);
      setMessages(messages);
    });

    return () => unsub();
  }, []);

  const sendMessage = async () => {
    const msg: IMessage = {
      userId: user?.uid,
      username: user?.displayName || 'Anon',
      content: message,
    };
    await addMessage(msg);
  };

  const onInputKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
      await sendMessage();
      setMessage('');
      e.target.value = '';
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
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
