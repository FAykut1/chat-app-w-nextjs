import {
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
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
  const [isMessagesLoad, setIsMessagesLoad] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect((): any => {
    const unsub = onSnapshot(
      query(messageCollection, orderBy('updateAt')),
      (snapshot) => {
        if (!isMessagesLoad) {
          const _messages = snapshot.docs.map((docSnapshot) => {
            const msg = docSnapshot.data() as IMessage;
            msg.id = docSnapshot.id;
            return msg;
          });
          setMessages([..._messages]);
          setIsMessagesLoad(true);
        } else {
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
      }
    );

    return () => unsub();
  }, []);

  const sendMessage = async (e: any) => {
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
      await sendMessage(e);
      e.target.value = '';
      setMessage('');
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
              status={message.status}
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
