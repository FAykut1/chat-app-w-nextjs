import {
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import useUser from '../hooks/useUser';
import { IMessage, MessageStatus } from '../types/data';
import { addMessage, messageCollection } from '../utils/firebase';
import Message from './Message';

import type { DocumentChangeType } from 'firebase/firestore';

const ChatPage: React.FC<{ roomId: string }> = ({ roomId }) => {
  const chatDOM = useRef<HTMLDivElement>();
  const user = useUser();
  const [messages, setMessages] = useState<{ [key: string]: IMessage }>({});

  useEffect((): any => {
    const unsub = onSnapshot(
      query(messageCollection, orderBy('updateAt', 'desc')),
      (snapshot) => {
        snapshot.docChanges().forEach((docChange) => {
          const msg = docChange.doc.data() as IMessage;
          msg.id = docChange.doc.id;
          if (!msg.createAt && !msg.updateAt) {
            msg.createAt = new Date();
            msg.updateAt = new Date();
          } else {
            msg.createAt = new Date(msg.createAt.seconds * 1000);
            msg.updateAt = new Date(msg.updateAt.seconds * 1000);
          }
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

  useEffect(() => {
    if (chatDOM.current) {
      chatDOM.current.scrollTop = 0;
    }
  }, [messages]);

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
    <div className="h-screen flex-1 flex flex-col bg-first overflow-hidden">
      <div className="h-20 bg-second p-4 flex items-center">
        <div className="">
          <div className="font-semibold">Fatih Aykut</div>
          <div className="text-tsecond">last seen 1 min ago</div>
        </div>
      </div>
      <div
        ref={chatDOM}
        className="w-full h-screen flex flex-col-reverse overflow-y-auto"
      >
        {Object.values(messages)
          .sort((a, b) => b.updateAt.getTime() - a.updateAt.getTime())
          .map((msg) => (
            <Message
              key={msg.id}
              content={msg.content}
              updateAt={msg.updateAt}
              status={msg.status}
            />
          ))}
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
