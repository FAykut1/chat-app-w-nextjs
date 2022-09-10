import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user signed in');
        setUser(user);
        router.push('/');
      } else {
        setUser(null);
        router.push('/login');
      }
    });
    return () => authChange();
  }, []);

  return user;
};

export default useUser;
