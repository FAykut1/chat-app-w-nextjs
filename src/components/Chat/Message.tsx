import { IMessage, MessageStatus } from '../../types/data';
import { extractTime } from '../../utils/utils';

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
        className={`flex p-3 min-w-[4rem] max-w-[80%] sm:max-w-[70%] rounded-md break-all hover:cursor-pointer transition ${
          message.status == MessageStatus.SEND
            ? 'bg-red-600 hover:bg-red-500'
            : 'bg-second hover:bg-lsecond'
        }`}
      >
        <div className="flex-1">{message.content}</div>
        <div className="w-2"></div>
        <div className="text-sm flex items-end text-tsecond">
          {extractTime(message.updateAt)}
        </div>
      </div>
    </div>
  );
};

export default Message;
