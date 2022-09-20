import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setRoom } from '../../features/chat/roomSlice';
import { extractTime } from '../../utils/utils';

const ChatHeader: React.FC<{}> = () => {
  const room = useAppSelector((state) => state.room.value);
  const dispatch = useAppDispatch();

  return (
    <div className="z-50 absolute left-0 right-0 top-0 bg-second p-4 flex items-center">
      <div
        onClick={() => dispatch(setRoom(null))}
        className="back-icon p-2 rounded-full hover:bg-first hover:cursor-pointer"
      >
        <ArrowBackIcon />
      </div>
      <div className="p-2"></div>
      <div>
        <div className="font-semibold">{room?.name}</div>
        <div className="text-tsecond">{extractTime(room?.updateAt)}</div>
      </div>
    </div>
  );
};

export default ChatHeader;
