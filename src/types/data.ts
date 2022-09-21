export type IRoom = {
  id?: string;
  name?: string;
  users: string[];
  type: 'GROUP' | 'PRIVATE';
  invite?: IInvite;
  updateAt: any;
  createAt: any;
};

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

export type IInvite = {
  inviteCode?: string;
  isActive?: boolean;
};
