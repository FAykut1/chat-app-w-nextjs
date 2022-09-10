import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const Home: NextPage = () => {
  useEffect(() => {
    getSocket();
  }, []);

  const getSocket = async () => {
    const socket = io('http://localhost:3000', {
      path: '/api/socketio',
    });

    socket.on('connect', () => {
      console.log('Connected!', socket.id);
    });
  };

  return (
    <div className="">
      <Head>
        <title>My awesome chat app</title>
      </Head>

      <main className="w-screen h-screen flex">
        <div className="w-80 bg-red-200">
          <div className="flex w-full items-center">
            <div className="min-w-[60px] rounded-[50%] bg-black"></div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <div className="user-name">Fatih Aykut</div>
                <div className="">10/09/2022</div>
              </div>
              <div className="lastmessage text-ellipsis whitespace-nowrap overflow-hidden">
                Connected to Myawesome chat a ppsssss
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow bg-red-300">World</div>
      </main>
    </div>
  );
};

export default Home;
