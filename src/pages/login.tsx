import { NextPage } from 'next';
import useUser from '../hooks/useUser';
import { signInAnon } from '../utils/firebase';

const Login: NextPage = () => {
  const user = useUser();

  const login = async () => {
    const userCred = signInAnon();
    console.log(userCred);
  };

  return (
    <div>
      <div className="">Login page</div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
