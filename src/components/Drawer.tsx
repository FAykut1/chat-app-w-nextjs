import ChatRoomItem from './ChatRoomItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Drawer: React.FC = () => {
  const logoutBtnClick = () => {
    signOut(auth);
  };

  return (
    <div className="w-80 bg-second">
      <div className="h-20 bg-second p-4 flex items-center justify-between">
        <div className="font-bold">Awesome Chat-App</div>
        <div
          onClick={logoutBtnClick}
          className="p-2 rounded border hover:bg-first hover:cursor-pointer"
        >
          <LogoutIcon />
        </div>
      </div>
      <div className="">
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
    </div>
  );
};

export default Drawer;
