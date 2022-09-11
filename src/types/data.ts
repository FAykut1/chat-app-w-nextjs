export type IMessage = {
  id?: string;
  userId?: string;
  username?: string;
  status?: MessageStatus;
  content: string;
  updateAt: any;
  createAt: any;
};

export enum MessageStatus {
  FAILED,
  SEND,
  ONSERVER,
  RECEIVED,
  READ,
}
