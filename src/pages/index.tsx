import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import ChatPage from '../components/ChatPage';
import Drawer from '../components/Drawer';
import useUser from '../hooks/useUser';

const Home: NextPage = () => {
  const user = useUser();

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const selectRoom = (roomId: string | undefined) => {
    if (roomId) {
      setSelectedRoom(roomId);
    }
  };

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>My awesome chat app</title>
      </Head>

      <main className="w-screen h-screen flex text-tfirst">
        <Drawer selectRoom={selectRoom} />
        <div className="w-[1px] h-full bg-first" />
        {selectedRoom ? <ChatPage roomId={selectedRoom} /> : null}
      </main>
    </div>
  );
};

export default Home;
