import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect((): any => {
    if (user) router.push('/');
    else {
      const authChange = onAuthStateChanged(auth, (_user) => {
        if (_user && !user) {
          console.log('user signed in');
          setUser(_user);
          router.push('/');
        } else {
          setUser(null);
          router.push('/login');
        }
      });

      return () => authChange();
    }
  }, []);

  return user;
};

export default useUser;
