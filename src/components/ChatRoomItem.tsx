import { Avatar } from '@mui/material';
import { blue, deepOrange } from '@mui/material/colors';
import { useAppDispatch } from '../app/hooks';
import { setRoom } from '../features/chat/roomSlice';
import { IRoom } from '../types/data';
import { extractTime } from '../utils/utils';

const ChatRoomItem: React.FC<{
  room: IRoom;
}> = ({ room }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(setRoom(room))}
      className="flex w-full h-20 px-4 items-center hover:bg-lsecond hover:cursor-pointer"
    >
      <Avatar sx={{ bgcolor: blue[500] }}>N</Avatar>
      <div className="p-1"></div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between">
          <div className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
            {room.name}
          </div>
          <div className="text-tsecond">{extractTime(room.updateAt)}</div>
        </div>
        <div className="lastmessage text-ellipsis whitespace-nowrap overflow-hidden">
          Last message!1.1!
        </div>
      </div>
    </div>
  );
};

export default ChatRoomItem;
