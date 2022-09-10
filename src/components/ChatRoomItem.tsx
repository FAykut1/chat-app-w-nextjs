const ChatRoomItem: React.FC<{
  name: string;
  pic: string;
  date: string;
  lastMessage: string;
}> = ({ name, pic, date, lastMessage }) => {
  return (
    <div className="flex w-full h-16 items-center hover:bg-red-500">
      <div className="w-16 h-full p-2">
        <div className="w-full h-full bg-black rounded-[50%]" />
      </div>
      <div className="flex-1 p-2 overflow-hidden">
        <div className="flex justify-between">
          <div className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
            {name}
          </div>
          <div className="text-tsecond">{date}</div>
        </div>
        <div className="lastmessage text-ellipsis whitespace-nowrap overflow-hidden">
          {lastMessage}
        </div>
      </div>
    </div>
  );
};

export default ChatRoomItem;
