import { Avatar } from '@mui/material';
import { blue, deepOrange } from '@mui/material/colors';
import { IRoom } from '../types/data';

const ChatRoomItem: React.FC<{
  room: IRoom;
  onClick: React.MouseEventHandler;
}> = ({ room, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full h-20 px-4 items-center hover:bg-lsecond hover:cursor-pointer"
    >
      <Avatar sx={{ bgcolor: blue[500] }}>N</Avatar>
      <div className="p-1"></div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between">
          <div className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
            {room.name}
          </div>
          <div className="text-tsecond">
            {room.updateAt.toLocaleTimeString(undefined, {
              timeStyle: 'short',
            })}
          </div>
        </div>
        <div className="lastmessage text-ellipsis whitespace-nowrap overflow-hidden">
          Last message!1.1!
        </div>
      </div>
    </div>
  );
};

export default ChatRoomItem;
