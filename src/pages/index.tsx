import { getDocs, onSnapshot, Query } from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import ChatPage from '../components/ChatPage';
import ChatRoomItem from '../components/ChatRoomItem';
import Drawer from '../components/Drawer';
import useUser from '../hooks/useUser';
import { auth, messageCollection, signInAnon } from '../utils/firebase';

const Home: NextPage = () => {
  const user = useUser();

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <div className="">
      <Head>
        <title>My awesome chat app</title>
      </Head>

      <main className="w-screen h-screen flex text-tfirst">
        <Drawer />
        <div className="w-[1px] bg-first" />
        <ChatPage roomId="" />
      </main>
    </div>
  );
};

export default Home;
