import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import useUser from '../hooks/useUser';
import { IMessage, IRoom, MessageStatus } from '../types/data';
import { database } from '../utils/firebase';
import { extractTime } from '../utils/utils';
import Message from './Message';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatPage: React.FC<{ room: IRoom; handleBack: () => void }> = ({
  room,
  handleBack,
}) => {
  const messageCollection = collection(database, `rooms/${room.id}/messages`);
  const chatDOM = useRef<HTMLDivElement | null>(null);
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

    await addDoc(messageCollection, msg);
  };

  const onInputKeyDown = async (e: any) => {
    if (e.key === 'Enter' && e.target.value) {
      let message = e.target.value;
      e.target.value = '';
      sendMessage(message);
    }
  };

  return (
    <div className="z-50 absolute left-0 right-0 top-0 bottom-0 sm:static h-screen flex-1 flex flex-col bg-first overflow-hidden">
      <div
        onClick={handleBack}
        className="h-20 bg-second p-4 flex items-center"
      >
        <div className="back-icon p-2 rounded-full hover:bg-first hover:cursor-pointer">
          <ArrowBackIcon />
        </div>
        <div className="p-2"></div>
        <div>
          <div className="font-semibold">{room.id}</div>
          <div className="text-tsecond">{extractTime(room.updateAt)}</div>
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
              message={msg}
              isMe={msg.userId === user?.uid}
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
