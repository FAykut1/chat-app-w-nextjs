import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect } from 'react';

const Invite: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    console.log('Invite mounted!');
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Head>
        <title>Join a group</title>
      </Head>

      <main className="w-screen h-screen flex text-tfirst relative">
        Invite Page
      </main>
    </div>
  );
};

export default Invite;
