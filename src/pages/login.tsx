import { NextPage } from 'next';
import useUser from '../hooks/useUser';
import { signInAnon } from '../utils/firebase';

const center = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';

const Login: NextPage = () => {
  const user = useUser();

  const login = async () => {
    const userCred = signInAnon();
    console.log(userCred);
  };

  return (
    <div>
      <button
        className={`${center} w-40 h-40 text-3xl font-bold text-white`}
        onClick={login}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
