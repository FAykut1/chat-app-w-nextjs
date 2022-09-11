import { IMessage, MessageStatus } from '../types/data';

const Message: React.FC<{
  message: IMessage;
  isMe: boolean;
}> = ({ message, isMe }) => {
  return (
    <div
      className={`w-full flex pl-4 pr-4 pb-2 pt-2 items-end ${
        isMe ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isMe ? (
        <div className="w-10 h-10">
          <div className="w-full h-full bg-black rounded-[50%]" />
        </div>
      ) : null}

      <div className="w-4"></div>
      <div
        className={`flex p-3 min-w-[4rem] max-w-1/2 ${
          message.status == MessageStatus.SEND ? 'bg-red-600' : 'bg-second'
        }  rounded-md`}
      >
        <div className="flex-1 ">{message.content}</div>
        <div className="w-2"></div>
        <div className="text-sm flex items-end text-tsecond">
          {message.updateAt.toLocaleTimeString(undefined, {
            timeStyle: 'short',
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;
