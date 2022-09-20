import type { NextPage } from 'next';
import Head from 'next/head';
import { useAppSelector } from '../app/hooks';
import ChatPage from '../components/Chat/ChatPage';
import Drawer from '../components/Drawer';
import useUser from '../hooks/useUser';

const Home: NextPage = () => {
  const user = useUser();

  const currentRoom = useAppSelector((state) => state.room.value);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Head>
        <title>My awesome chat app</title>
      </Head>

      <main className="w-screen h-screen flex text-tfirst relative">
        <>
          <Drawer />
          <div className="w-[1px] h-full bg-first" />
        </>
        {currentRoom ? <ChatPage /> : null}
      </main>
    </div>
  );
};

export default Home;
