import { MessageStatus } from '../types/data';

const Message: React.FC<{
  content: string;
  updateAt: Date;
  status?: MessageStatus;
}> = ({ content, updateAt, status }) => {
  return (
    <div className="w-full flex pl-4 pr-4 pb-2 pt-2 items-end">
      <div className="w-10 h-10">
        <div className="w-full h-full bg-black rounded-[50%]" />
      </div>
      <div className="w-4"></div>
      <div
        className={`flex p-4 min-w-[4rem] max-w-1/2 ${
          status == MessageStatus.SEND ? 'bg-red-600' : 'bg-second'
        }  rounded-md`}
      >
        <div className="flex-1 ">{content}</div>
        <div className="w-2"></div>
        <div className="text-sm flex items-end text-tsecond">
          {updateAt.toLocaleTimeString(undefined, { timeStyle: 'short' })}
        </div>
      </div>
    </div>
  );
};

export default Message;
