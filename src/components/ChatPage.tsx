import {
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { IMessage, MessageStatus } from '../types/data';
import { addMessage, messageCollection } from '../utils/firebase';
import Message from './Message';

import type { DocumentChangeType } from 'firebase/firestore';

const ChatPage: React.FC<{ roomId: string }> = ({ roomId }) => {
  const user = useUser();
  const [messages, setMessages] = useState<{ [key: string]: IMessage }>({});

  useEffect((): any => {
    const unsub = onSnapshot(
      query(messageCollection, orderBy('updateAt')),
      (snapshot) => {
        snapshot.docChanges().forEach((docChange) => {
          const msg = docChange.doc.data() as IMessage;
          msg.id = docChange.doc.id;

          if (docChange.type === 'removed' && messages[msg.id]) {
            delete messages[msg.id];
          } else {
            messages[msg.id] = msg;
          }
        });
        setMessages({ ...messages });
      }
    );
    return () => unsub();
  }, []);

  const sendMessage = async (message: string) => {
    const msg: IMessage = {
      userId: user?.uid,
      username: user?.displayName || 'Anon',
      content: message,
      status: MessageStatus.ONSERVER,
      updateAt: serverTimestamp(),
      createAt: serverTimestamp(),
    };

    await addMessage(msg);
  };

  const onInputKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
      let message = e.target.value;
      e.target.value = '';
      sendMessage(message);
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
          {Object.values(messages).map((msg) => (
            <Message
              key={msg.id}
              content={msg.content}
              updateAt={new Date(
                msg.updateAt ? msg.updateAt.seconds : undefined
              ).toLocaleTimeString(undefined, { timeStyle: 'short' })}
              status={msg.status}
            />
          ))}
        </div>
      </div>
      <div className="h-12 flex bg-second">
        <input
          autoFocus
          className="flex-1 pl-4 pr-4 bg-transparent text-white outline-none"
          type="text"
          onKeyDown={onInputKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatPage;
