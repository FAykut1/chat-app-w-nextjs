import { getDocs, onSnapshot, Query } from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import ChatPage from '../components/ChatPage';
import ChatRoomItem from '../components/ChatRoomItem';
import useUser from '../hooks/useUser';
import { messageCollection } from '../utils/firebase';

const Home: NextPage = () => {
  const user = useUser();

  return (
    <div className="">
      <Head>
        <title>My awesome chat app</title>
      </Head>

      <main className="w-screen h-screen flex text-tfirst">
        <div className="w-80 bg-second">
          <ChatRoomItem
            name="Fatih Aykut"
            date="12.12.2022"
            lastMessage="Hello world!"
            pic="/assets/pp.png"
          />
          <ChatRoomItem
            name="Fatih Aykut"
            date="12.12.2022"
            lastMessage="Hello world!"
            pic="/assets/pp.png"
          />
          <ChatRoomItem
            name="Fatih Aykut"
            date="12.12.2022"
            lastMessage="Hello world!"
            pic="/assets/pp.png"
          />
        </div>
        <div className="w-[1px] bg-first" />
        <ChatPage />
      </main>
    </div>
  );
};

export default Home;
