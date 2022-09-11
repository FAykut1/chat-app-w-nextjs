import {
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { IMessage, MessageStatus } from '../types/data';
import { addMessage, messageCollection } from '../utils/firebase';
import Message from './Message';

import type { DocumentChangeType } from 'firebase/firestore';

const ChatPage: React.FC<{ roomId: string }> = ({ roomId }) => {
  const user = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect((): any => {
    const unsub = onSnapshot(
      query(messageCollection, orderBy('updateAt')),
      (snapshot) => {
        let updatedMessages = messages;
        snapshot.docChanges().forEach((docChange) => {
          const msg = docChange.doc.data() as IMessage;
          msg.id = docChange.doc.id;
          if (docChange.type === 'added') updatedMessages.push(msg);
          else if (docChange.type === 'modified') {
            const i = updatedMessages.findIndex(
              (_message) => _message.id === msg.id
            );
            updatedMessages[i] = msg;
          } else {
            updatedMessages = updatedMessages.filter(
              (_message) => _message.id !== msg.id
            );
          }
        });
        setMessages([...updatedMessages]);
      }
      // }
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
      await sendMessage(message);
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
          {messages.map((msg) => (
            <Message
              key={msg.id}
              content={msg.content}
              updateAt={new Date(msg.updateAt?.seconds).toLocaleTimeString(
                undefined,
                { timeStyle: 'short' }
              )}
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
